using hiveCat.appBuilder.com;
using hiveCat.appBuilder.Functions;
using hiveCat.appBuilder.Services;
using hiveCat.appBuilder.Translator;
using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;


namespace vubiz.apps
{
  public partial class Errors : System.Web.UI.Page
  {

    public string lang;

    private readonly JavaScriptSerializer serializer = new JavaScriptSerializer();
    private string JSON;
    private readonly com.v8server v8server = new com.v8server();




    protected void Page_Load(object sender, EventArgs e)
    {
      // instantiate classes
      Function function = new Function();

      string lang = function.getParm("lang", "en").ToLower();
      string errorId = function.getParm("errorId", "?");
      string errorParm = function.getParm("errorParm", "?");

      ErrorDetails.Text = tran("Houston, we have a problem...", lang);


      switch (errorId)
      {
        case "450":
          ErrorText.Text = "You are trying to launch an app that either does not exist or is not available.";
          ErrorDetails.Text = "[appId=" + errorParm + "]";
          break;
        case "451":
          ErrorText.Text = "This app requires a Profile so we know who you are.";
          ErrorDetails.Text = "[ie ...profile=xxxxxx...]";
          break;
        case "452":
          ErrorText.Text = "This app requires a valid Profile. The one submitted is not on file.";
          ErrorDetails.Text = "[profile=" + errorParm + "]";
          break;
        case "453":
          ErrorText.Text = "This app requires a valid Learner No of a Super Manager.  Access via vubiz.com/V5.";
          ErrorDetails.Text = "";
          break;
        case "454":
          ErrorText.Text = "This app requires a the name of the Excel Report.  Access via vubiz.com/V5.";
          ErrorDetails.Text = "";
          break;
        case "455":
          ErrorText.Text = "The Video feed is missing for this application.  Please contact the system administrator.";
          ErrorDetails.Text = "[appId=" + errorParm + "]";
          break;
        case "460":
          ErrorText.Text = "Translation tags are malformed so this app cannot be generated.";
          ErrorDetails.Text = "[appId=" + errorParm + "]";
          break;
        case "470":
          ErrorText.Text = "You refreshed the browser which will kill this session. Use the Back-Arrow to return to the app.";
          ErrorDetails.Text = "";
          break;

        case "501": // from vuEcommerce.aspx
          ErrorText.Text = "You are trying to access the Portal without valid access parameters.";
          ErrorDetails.Text = "[" + errorParm + "]";
          break;
        case "502": // from portal/default.aspx
          ErrorText.Text = tran("Access to the Portal is for Facilitators or above, not Learners.", lang);
          ErrorDetails.Text = "[ <a href='/portal/v7/default.aspx?lang=" + lang + "'>" + tran("Try Again", lang) + "</a> ]";
          break;

        default:
          ErrorText.Text = "We have an unidentified Error.<br />Please contact support.";
          ErrorDetails.Text = "[" + errorId + " " + errorParm + "]";
          break;
      }


    }

    // this will return the langTo version of the EN phrase (copied from Credentials.aspx.cs)
    public string tran(string phraseIn, string lang)
    {
      string phraseEx = "";
      // ensure we have a valid lang, else assume en
      if (lang != "fr" && lang != "es" && lang != "pt")
      {
        return phraseIn;
      }
      else
      {
        // this instantiates the translate object
        // Translate translate = new Translate();

        // grab the translated phrase
        JSON = v8server.translate(phraseIn, lang);
        List<LangParameters> langParameters = serializer.Deserialize<List<LangParameters>>(JSON);
        phraseEx = langParameters[0].phrase;
        // if there is no translated value...
        if (phraseEx == null || phraseEx.Length == 0)
        {
          phraseEx = Translate.translatePhrase(phraseIn, lang);           // get one from MS Translator 
          JSON = v8server.translateUpdate(phraseIn, lang, phraseEx);      // update the translation table
        }
        return phraseEx;
      }
    }



  }
}