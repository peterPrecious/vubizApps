using hiveCat.appBuilder.com;
using hiveCat.appBuilder.Functions;
using hiveCat.appBuilder.Services;
using hiveCat.appBuilder.Translator;
using System;
using System.Collections.Generic;
using System.Web.Script.Serialization;

namespace vubiz.apps
{
  public partial class credentials : System.Web.UI.Page
  {
    //if (memb_id == "00656068") membType = "E"; /* for testing the VUBIZ member ID will be set to Employee */
    public bool vubizOk = true;
    public string membId, membEmail, membPassword, membFirstName, membLastName, membOrganization, membType, membMemo, membGuid, lang, profile, custId;

    private readonly Function function = new Function();
    private readonly JavaScriptSerializer serializer = new JavaScriptSerializer();
    private string JSON;
    private readonly com.v8server v8server = new com.v8server();

    protected void Page_Load(object sender, EventArgs e)
    {

      if (!IsPostBack)
      {
        Session["lang"] = function.getParm("lang", "en").ToLower();
      }

      lang = Session["lang"].ToString();
      profile = (lang == "fr") ? "FCEI" : "CFIB";


      // find/retrieve Profile custId parameter = profileParameters[4].value;
      JSON = v8server.profiles(profile);
      List<ProfileParameters> profileParameters = serializer.Deserialize<List<ProfileParameters>>(JSON);
      for (int i = 0; i < profileParameters.Count; i++)
      {
        if (profileParameters[i].id == "custId")
        {
          custId = profileParameters[i].value;
        }
      }

      logo.ImageUrl = "~/styles/logos/cfib_" + lang.ToLower() + ".png";

      // temporary notice
      //if (lang == "fr") litNotice.Text = "À compter du 1er décembre 2018, la transition au SIMDUT 2015 sera terminée. Si vous suivez le cours SIMDUT 1988 et 2015 actuellement, veuillez le compléter avant le 30 novembre. À compter du vendredi 30 novembre, il y aura un nouveau cours intitulé SIMDUT 2015 - Un aperçu, disponible dans le Centre d'apprentissage.";


      // translate literals
      litHeader.Text = tran(litHeader.Text, lang);
      litWarning.Text = tran(litWarning.Text, lang);
      support.Text = tran(support.Text, lang);

      litRegister.Text = tran(litRegister.Text, lang);

      cfibId.Text = tran(cfibId.Text, lang);

      companyName.Text = tran(companyName.Text, lang);
      companyPhoneNumber.Text = tran(companyPhoneNumber.Text, lang);
      companyPostalCode.Text = tran(companyPostalCode.Text, lang);

      email1.Text = tran(email1.Text, lang);
      password1.Text = tran(password1.Text, lang);
      firstName.Text = tran(firstName.Text, lang);
      lastName.Text = tran(lastName.Text, lang);
      register.Text = tran(register.Text, lang);

      litSignIn.Text = tran(litSignIn.Text, lang);
      email2.Text = tran(email1.Text, lang);        // use prev
      password2.Text = tran(password1.Text, lang);  // use prev
      signIn.Text = tran(signIn.Text, lang);

      litPassword.Text = tran(litPassword.Text, lang);
      password.Text = tran(password.Text, lang);
    }

    protected void register_Click(object sender, EventArgs e)
    {
      if (
        txtCfibId.Text.Length < 1 ||

        txtCompanyName.Text.Length < 1 ||
        txtCmpanyPhoneNumber.Text.Length < 1 ||
        txtCompanyPostalCode.Text.Length < 1 ||

        txtMembEmail1.Text.Length < 1 || 
        txtMembPassword1.Text.Length < 1 || 
        txtMembFirstName.Text.Length < 1 || 
        txtMembLastName.Text.Length < 1)
      {
        panStatus.Visible = true;
        vubizOk = false;
        litError.Text = tran("Oops!<br />One or more fields have not been filled in.", lang) + "<br /><span style='font-size:smaller'>(Register Form)</span>";

        //Control starter = FindControl("txtCfibId");
        //starter.Focus();
        //        Response.Redirect("Credentials.aspx?section=registerSection", true);
      }

      if (vubizOk)
      {

        membOrganization = function.right("00000000" + txtCfibId.Text, 8);
        membEmail = txtMembEmail1.Text;
        membPassword = txtMembPassword1.Text;
        membFirstName = txtMembFirstName.Text;
        membLastName = txtMembLastName.Text;
        membType = (membOrganization.Length == 8 && membOrganization.Substring(0, 2) == "50") ? "E" : ""; /* put "E" if employee */

        membMemo = txtCompanyName.Text + "|" + txtCmpanyPhoneNumber.Text + "|" + txtCompanyPostalCode.Text;


        // confirm there is no cfib Member already registered
        JSON = v8server.cfibIsMember(custId, membOrganization, membEmail);
        Status status = serializer.Deserialize<Status>(JSON);
        string err = status.trueFalse.Substring(0, 3); // "org_asfdalsdkjalsdkfjalsdfjf" or "mai_lakjlkjlkjlj;lj"
        string msg = status.trueFalse.Substring(4);

        if (status.trueFalse != "False")
        {
          panStatus.Visible = true;
          vubizOk = false;
          if (err == "org")
          {
            litError.Text = tran("Oops!<br />An account has already been set up for your organization by ", lang) + msg + ".";
          }
          if (err == "ema")
          {
            litError.Text = tran("Oops!<br />An account has already been set up for your organization with that email address by ", lang) + msg + ".";
          }
        }
      }

      if (vubizOk)
      {
        // will insert/update if the user is on file and custId is valid - return "ok"
        // note: as of Jul 19, 2018, most of the editting was done in the previous step
        // Aug 21, 2019 added membMemo
        JSON = v8server.cfibEnroll(custId, membEmail, membPassword, membFirstName, membLastName, membOrganization, membType, membMemo);
        CfibEnroll cfibEnroll = serializer.Deserialize<CfibEnroll>(JSON);
        membGuid = cfibEnroll.membGuid;

        if (cfibEnroll.msgId != "ok")
        {
          panStatus.Visible = true;
          vubizOk = false;
          litError.Text = tran("Oops!<br />An Account has either been created with this email address (unique identifier) or by another member of your organization.", lang);
        }
        else
        {
          string url = "Default.aspx?appId=vubiz.8&profile=" + profile + "&membGuid=" + membGuid;
          Response.Redirect(url, true);
        };
      };
    }

    protected void signIn_Click(object sender, EventArgs e)
    {
      membEmail = txtMembEmail2.Text;
      membPassword = txtMembPassword2.Text;

      vubizOk = true;
      if (membEmail.Length < 1 || membPassword.Length < 1)
      {
        panStatus.Visible = true;
        vubizOk = false;
        litError.Text = tran("Oops!<br />One or more fields have not been filled in.", lang) + "<br /><span style='font-size:smaller'>(Sign In Form)</span>";
        //txtMembEmail2.Text = "pooh";
        //txtMembEmail2.Focus();
      }

      if (vubizOk)
      {
        // if OK return guid
        JSON = v8server.cfibSignIn(profile, membEmail, membPassword);
        if (JSON == "null")
        {
          litError.Text = tran("" + "Oops!<br />Invalid Email Address / Password.", lang);
          panStatus.Visible = true;
        }
        else
        {
          SSOmembGuid ssoMembGuid = serializer.Deserialize<SSOmembGuid>(JSON);
          membGuid = ssoMembGuid.membGuid;
          string url = "/v8?profile=" + profile + "&membGuid=" + membGuid;
          Response.Redirect(url, true);
        }

      };
    }

    protected void password_Click(object sender, EventArgs e)
    {
      string url = "Default.aspx?appId=credentials.2&profile=" + profile;
      Response.Write("<script>");
      Response.Write("window.open('" + url + "','_blank')");
      Response.Write("</script>");
    }

    // this will return the langTo version of the EN phrase
    public string tran(string phraseIn, string lang)
    {
      string phraseEx;
      // ensure we have a valid lang, else assume en
      if (lang != "fr" && lang != "es" && lang != "pt")
      {
        return phraseIn;
      }
      else
      {
        // this instantiates the translate object
        //Translate translate = new Translate();

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