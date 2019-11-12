using System;
using System.Web.Script.Serialization;
using System.Web.UI.WebControls;
using System.Collections.Generic;

using hiveCat.appBuilder.Functions;
using hiveCat.appBuilder.Services;

namespace vubiz.apps
{
  public partial class accessSimulator : System.Web.UI.Page
  {
    com.v8server v8server = new com.v8server();
    Function function = new Function();
    JavaScriptSerializer serializer = new JavaScriptSerializer();
    string JSON;
    string _profile, _autoEnrollWs, _logo, _contentSource, _custId;

    protected void Page_Load(object sender, EventArgs e)
    {
      // need profile to determine which fields to render
      _profile = function.getParm("profile", "").ToLower();
      if (_profile.Length == 0) status.Text = "missing profile";
      else
      {
        JSON = v8server.profiles(_profile);
        if (JSON == "null")
        {
          status.Text = "profile is invalid";
        }
        else
        {
          // get profile parms
          List<ProfileParameters> profileParameters = serializer.Deserialize<List<ProfileParameters>>(JSON);
          _logo = getProfile(profileParameters, "logo", "");
          _contentSource = getProfile(profileParameters, "contentSource", "");
          _custId = getProfile(profileParameters, "custId", "");
          _autoEnrollWs = getProfile(profileParameters, "autoEnrollWs", "");

          // currently only setup to handle autoEnrollWs
          if (_autoEnrollWs != "True") {
            status.Text = "service is only configured for 'autoEnrollWs'";
          } else {
            launch.Text = "<a href='http://corporate.vubiz.com/vubizApps/accessSimulator.aspx?profile=" + _profile + "'>"
              + "https://corporate.vubiz.com/vubizApps/accessSimulator.aspx?profile=" + _profile
              + "</a>";
            custLogo.ImageUrl = "styles/logos/" + _logo;
            if (_contentSource != "assigned") rowMembPrograms.Visible = false;

            JSON = v8server.custTitle(_custId);
            CustTitle custTitle = serializer.Deserialize<CustTitle>(JSON);
            title.Text = custTitle.custTitle;

            container.Visible = true;
            status.Text = "Welcome. Please fill in the form then click \"Auto-Enroll & Launch\".";
          }
        }
      }
    }


    protected void enroll_click(object sender, EventArgs e)
    {
      string _simulatorId = simulatorId.Text.ToLower();
      string _custGuid = custGuid.Text;
      string _membId = membId.Text;
      string _membFirstName = membFirstName.Text;
      string _membLastName = membLastName.Text;
      string _membEmail = membEmail.Text;
      string _membMemo = membMemo.Text;
      string _membPrograms = membPrograms.Text;
      bool _membActive = true;

      bool OK = true;  // do basic form checking

      if (OK && _simulatorId != _profile.ToLower() + "-backdoor") { OK = false; status.Text = "'simulatorId' is missing or invalid"; }
      if (OK && _custGuid.Length == 0) { OK = false; status.Text = "'custGuid' is missing"; }
      if (OK && !function.isGuid(_custGuid)) { OK = false; status.Text = "'custGuid' is invalid"; }
      if (OK && _membId.Length == 0) { OK = false; status.Text = "'membId' is missing"; }
      if (OK && _membFirstName.Length == 0) { OK = false; status.Text = "'membFirstName' is missing"; }
      if (OK && _membLastName.Length == 0) { OK = false; status.Text = "'membLastName' is missing"; }
      if (OK && _membEmail.Length == 0) { OK = false; status.Text = "'membEmail' is missing"; }
      if (OK && _membPrograms.Length == 0) { OK = false; status.Text = "'membPrograms' is missing"; }
      if (OK)
      {
        if (membActive.Text == "0") { _membActive = false; }
        else if (membActive.Text == "1") { _membActive = true; }
        else { OK = false; status.Text = "'membActive' is missing"; }
      }

      if (OK)
      {
        // pass the custGuid and the membId to autoEnroll WebService 

        string JSON = v8server.autoEnrollWs(
          _custGuid,
          _membId,
          _membFirstName,
          _membLastName,
          _membEmail,
          _membMemo,
          _membPrograms,
          _membActive
          );
        AutoEnrollWs autoEnrollWs = serializer.Deserialize<AutoEnrollWs>(JSON);
        if (autoEnrollWs.msgId.Substring(0, 3) == "inv")
        {
          // change alignment for errors
          panel.HorizontalAlign = HorizontalAlign.Left;
          status.Text = "" +
            "An errors has occurred ('" + autoEnrollWs.msgId + "'). Possible reasons : <br /><br />" +

            "&ensp;&ensp;&ensp;- custGuid is invalid;<br />" +
            "&ensp;&ensp;&ensp;- custGuid has been inactived;<br />" +
            "&ensp;&ensp;&ensp;- membId is invalid;<br />" +
            "&ensp;&ensp;&ensp;- membPrograms are invalid;<br /><br />" +

            "";
        }
        else // pass the profile and membGuid into V8
        {
          string _membGuid = autoEnrollWs.membGuid;
          string url = "/vubizApps/Default.aspx?appId=vubiz.8&profile=" + _profile + "&membGuid=" + _membGuid;
          Response.Redirect(url, false);
        }
      }
    }


    public string getProfile(List<ProfileParameters> parms, string id, string defaultValue)  //  extracts a profile from the profile collection
    {

      for (int i = 0; i < parms.Count; i++)
      {
        if (parms[i].id == id)
        {
          if (parms[i].value == "")
          {
            return defaultValue;
          }
          else
          {
            return parms[i].value;
          }

        }
      }
      return defaultValue;
    }

  }
}