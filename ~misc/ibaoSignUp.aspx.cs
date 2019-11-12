using System;
using System.Web.Script.Serialization;

using hiveCat.appBuilder.Functions;
using hiveCat.appBuilder.Services;

namespace vubiz.apps
{
  public partial class IBAOsignUp : System.Web.UI.Page
  {
    com.v8server v8server = new com.v8server();
    Function function = new Function();
    JavaScriptSerializer serializer = new JavaScriptSerializer();
    string JSON;
    Int16 missingFields = 0;
    string custId = "IBAO6694", custGuid, membId, membEmail, membFirstName, membLastName, membType;

    protected void Page_Load(object sender, EventArgs e)
    {
      membId = function.getForm("membId", "").ToUpper();
      membType = "M"; /* M signifies it is part of the new Member group, null is old members and P is public */

      // if no membId was passed in from /v5/default.asp then we stop [needs a form post]

      if (membId == "")
      {
        campusTable.Visible = false;
        statusMessage.Text = "Sorry, you can only access your Insurance Campus from the IBAO Member Web Site.";
      }
      else
      {
        statusMessage.Text = "";

        // get existing values to see if we need to ask for more
        JSON = v8server.ibaoIsMember(custId, membId);
        IbaoMember ibaoMember = serializer.Deserialize<IbaoMember>(JSON);

        membEmail = ibaoMember.membEmail;
        membFirstName = ibaoMember.membFirstName;
        membLastName = ibaoMember.membLastName;
        custGuid = ibaoMember.custGuid;


        // store these in the hidden fields
        ___membFirstName.Value = membFirstName;
        ___membLastName.Value = membLastName;
        ___membEmail.Value = membEmail;

        ___membId.Value = membId;
        ___custGuid.Value = custGuid;


        if (membEmail.Length > 0)
        {
          _membEmail.Visible = false;
          __membEmail.Text = membEmail;
        }
        else
        {
          missingFields++;
          __membEmail.Visible = false;
        };

        if (membFirstName.Length > 0)
        {
          _membFirstName.Visible = false;
          __membFirstName.Text = membFirstName;
          ___membFirstName.Value = membFirstName;
          statusMessage.Text += "Welcome " + membFirstName + ".";
        }
        else
        {
          missingFields++;
          __membFirstName.Visible = false;
        };

        if (membLastName.Length > 0)
        {
          _membLastName.Visible = false;
          __membLastName.Text = membLastName;
          ___membLastName.Value = membLastName;
        }
        else
        {
          missingFields++;
          __membLastName.Visible = false;
        };


        if (missingFields > 0)
        {
          statusMessage.Text += " Please complete your profile which is necessary for learning certificates, reports, etc. Note that once you enter your name and email address, they cannot be changed.";
        }
        else
        {
          // we are good to enroll (member actually exists with full data)
          JSON = v8server.ibaoEnroll(custGuid, membId, membFirstName, membLastName, membEmail, membType);
          AutoEnroll autoEnroll = serializer.Deserialize<AutoEnroll>(JSON);
          if (autoEnroll.msgId.Substring(0, 2) == "ok")
          {
            string url = "../v8?profile=ibao&membGuid=" + autoEnroll.membGuid;
            Response.Redirect(url, true);
          }
          else
          {
            statusMessage.Text += " We are unable to enroll you in The Campus. Please contact Support.";
          }

        }

      }


    }

    protected void click_enroll(object sender, EventArgs e)
    {

      // get field values if needed
      if (___membFirstName.Value.Length == 0)
      {
        membFirstName = _membFirstName.Text;
      }
      else
      {
        membFirstName = ___membFirstName.Value;
      };
      if (___membLastName.Value.Length == 0)
      {
        membLastName = _membLastName.Text;
      }
      else
      {
        membLastName = ___membLastName.Value;
      }

      if (___membEmail.Value.Length == 0)
      {
        membEmail = _membEmail.Text.ToLower();
      }
      else
      {
        membEmail = ___membEmail.Value;
      }

      custGuid = ___custGuid.Value;
      membId = ___membId.Value;

      JSON = v8server.ibaoEnroll(custGuid, membId, membFirstName, membLastName, membEmail, membType);
      IbaoEnroll ibaoEnroll = serializer.Deserialize<IbaoEnroll>(JSON);
      if (ibaoEnroll.msgId.Substring(0, 2) == "ok")
      {
        string url = "/v8?profile=ibao&membGuid=" + ibaoEnroll.membGuid;
        Response.Redirect(url, true);
      }
      else
      {
        statusMessage.Text += " We are unable to enroll you in The Campus. Please contact Support.";
      }




    }

  }
}