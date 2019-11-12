using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Script.Serialization;

using hiveCat.appBuilder.Functions;
using hiveCat.appBuilder.Services;
using hiveCat.appBuilder.Translator;

namespace vubiz.apps
{
  public partial class CFIBsignUp : System.Web.UI.Page
  {
    public bool vubizOk, debug;
    string lang;

    // CFIB values
    public string partnerKey, ticket, ticketEncoded, memb_id, memb_first_name, memb_last_name, memb_bus_name, isValidTicket;

    // VUBIZ values
    public string membEmail, membPassword, membFirstName, membLastName, membOrganization, membType, profile, custId;

    // WS values
    cfib.handshakeAuthentication handshake = new cfib.handshakeAuthentication();   

    Function function = new Function();
    JavaScriptSerializer serializer = new JavaScriptSerializer();
    string JSON;

    // web service used for profiles/profileParameters/autoEnroll/translation, etc
    // the source of the service is determined by the web.config (for release)
    com.v8server v8server = new com.v8server();

    protected void Page_Load(object sender, EventArgs e)
    {

      debug = true;
      partnerKey = "B16%jpR96az1";

      profile = function.getParm("profile", "").ToUpper();
      inputProfile.Text = profile;
      lang = "en"; if (profile == "FCEI") lang = "fr";
      if (profile != "CFIB" && profile != "FCEI")
      {
        Literal.Text = tran("Oops. This service has been accessed incorrectly.<br /> [Missing Profile].", lang);
      }

      ticket = function.getParm("vTicket", "");
      ticketEncoded = HttpUtility.UrlEncode(ticket);
      inputTicket.Text = ticket;
      inputTicketEncoded.Text = ticketEncoded;

      isValidTicket = handshake.isValidTicket(ticketEncoded, partnerKey);
      WSisValidTicket.Text = isValidTicket;

      if (isValidTicket == "true")
      {
        memb_id = handshake.getMemberInfo(ticketEncoded, partnerKey, "memb_id");
        WSmemb_id.Text = memb_id; HFmemb_id.Value = memb_id;

        memb_first_name = handshake.getMemberInfo(ticketEncoded, partnerKey, "memb_first_name");
        WSmemb_first_name.Text = memb_first_name;

        memb_last_name = handshake.getMemberInfo(ticketEncoded, partnerKey, "memb_last_name");
        WSmemb_last_name.Text = memb_last_name;

        memb_bus_name = handshake.getMemberInfo(ticketEncoded, partnerKey, "memb_bus_name");
        WSmemb_bus_name.Text = memb_bus_name;

        // find/retrieve Profile custId parameter
        JSON = v8server.profiles(profile);
        List<ProfileParameters> profileParameters = serializer.Deserialize<List<ProfileParameters>>(JSON);
        //custId = profileParameters[4].value;
        for (int i = 0; i < profileParameters.Count; i++) 
        {
          if (profileParameters[i].id == "custId")
          {
            custId = profileParameters[i].value;
          }
        }

        // confirm there is no cfib Member already registered
        JSON = v8server.cfibIsMember(custId, memb_id);
        //List<ProfileParameters> profileParameters = serializer.Deserialize<List<ProfileParameters>>(JSON);
        Status status = serializer.Deserialize<Status>(JSON);

        if (status.trueFalse == "True")
        {
          Literal.Text = tran("Oops!<br>An account has already been set up for your organization.", lang);
        }
        else
        {
//        Literal.Text = tran("Welcome. As an accredited CFIB Member, please Create An Account.<br />[CFIB Member ID: " + memb_id + "]", lang);
          Literal.Text = tran("Welcome. As an accredited CFIB Member, please Create An Account.<br />[CFIB Member ID:", lang) + " " + memb_id + "]";
        }


      }
      else
      {
        Literal.Text = tran("We're sorry, only accredited CFIB Members can Create An Account.", lang);
      }


      logo.ImageUrl = "~/styles/logos/cfib_" + lang.ToLower() + ".png";

      // translate
      support.Text = tran(support.Text, lang);
      header.Text = tran(header.Text, lang);
      title.Text = tran(title.Text, lang);
      email.Text = tran(email.Text, lang);
      password.Text = tran(password.Text, lang);
      firstName.Text = tran(firstName.Text, lang);
      lastName.Text = tran(lastName.Text, lang);
      signUpButton.Text = tran(signUpButton.Text, lang);

    }

    protected void signUpButton_Click(object sender, EventArgs e)
    {

      membEmail = txtMembEmail.Text;
      membPassword = txtMembPassword.Text;
      membFirstName = txtMembFirstName.Text;
      membLastName = txtMembLastName.Text;
      membOrganization = HFmemb_id.Value;

      membType = (memb_id.Length == 8 && memb_id.Substring(0, 2) == "50") ? "E" : ""; /* put "E" if employee */
      //if (memb_id == "00656068") membType = "E"; /* for testing the VUBIZ member ID will be set to Employee */

      isValidTicket = "true";
      vubizOk = true;

      if (isValidTicket == "true" && vubizOk)
      {

        // will insert/update if the user is on file and custId is valid - return "ok"
        JSON = v8server.cfibEnroll(custId, membEmail, membPassword, membFirstName, membLastName, membOrganization, membType);
        CfibEnroll cfibEnroll = serializer.Deserialize<CfibEnroll>(JSON);

        if (cfibEnroll.msgId != "ok")
        {
          Literal.Text = tran("An Account has either been created with this email address (user name) or by another member of your organization.", lang);
        }
        else
        {
          Literal.Text = tran("Your account has been created.", lang);

          WScustGuid.Text = cfibEnroll.custGuid;
          WSmembGuid.Text = cfibEnroll.membGuid;

          HFmembGuid.Value = cfibEnroll.membGuid;
          HFlaunchUrl.Value = "Default.aspx?appId=vubiz.8&profile=" + profile + "&membGuid=" + cfibEnroll.membGuid;
          launchUrl.Text = HFlaunchUrl.Value;

          string url = "Default.aspx?appId=vubiz.8&profile=" + profile + "&membGuid=" + cfibEnroll.membGuid;

          Response.Redirect(url, true);

        };
      };

    }

    protected void startApp_Click(object sender, EventArgs e)
    {
      string url = HFlaunchUrl.Value;
      Response.Redirect(url, false);
    }

    // this will return the langTo version of the EN phrase
    public string tran(string phraseIn, string lang)
    {
      var phraseEx = "";
      // ensure we have a valid lang, else assume en
      if (lang != "fr" && lang != "es" && lang != "pt")
      {
        return phraseIn;
      }
      else
      {
        // this instantiates the translate object
        Translate translate = new Translate();

        // grab the translated phrase
        JSON = v8server.translate(phraseIn, lang);
        List<LangParameters> langParameters = serializer.Deserialize<List<LangParameters>>(JSON);
        phraseEx = langParameters[0].phrase;
        // if there is no translated value...
        if (phraseEx == null || phraseEx.Length == 0)
        {
          phraseEx = translate.translatePhrase(phraseIn, lang);           // get one from MS Translator 
          JSON = v8server.translateUpdate(phraseIn, lang, phraseEx);      // update the translation table
        }
        return phraseEx;
      }
    }


  }
}