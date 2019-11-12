using System;
using System.Collections.Generic;
using System.Text;
using System.Web;
using System.Web.Script.Serialization;
using System.Configuration;
using System.Linq;

using hiveCat.appBuilder.Assembly;
using hiveCat.appBuilder.Functions;
using hiveCat.appBuilder.Manifests;
using hiveCat.appBuilder.Services;

namespace vubiz.apps
{
  public partial class Default : System.Web.UI.Page
  {
    // global parameter
    string appId;
    bool translateApp = false;

    protected void Page_Load(object sender, EventArgs e)
    {
      #region appSetup

      // instantiate classes
      Function function = new Function();
      Assembler assembler = new Assembler();  // this builds out the HTML

      // test for random numbers, not used yet
      //int str = 1001, end = 9999;
      //string pooh = function.random(str, end);

      JavaScriptSerializer serializer = new JavaScriptSerializer();

      // assemble all the pages as defined in the manifest into 3 blocks for insertion into default.aspx
      StringBuilder sbStyle = new StringBuilder();
      StringBuilder sbHTML = new StringBuilder();
      StringBuilder sbScript = new StringBuilder();
      StringBuilder sbAppData = new StringBuilder();

      // this is used only if there's a url parameter: peterDebug=y
      // then we can put whatever we want in this string and render it rather than the normal rendering
      StringBuilder sbAppDebug = new StringBuilder();

      bool peterDebug = (function.getParm("peterDebug", "n") == "y") ? true : false;

      if (peterDebug) sbAppDebug.Append("<br /><br />" + "debugging");

      string JSON = "";
      // web service used for profiles/profileParameters/autoEnroll/translation, etc
      // the source of the service is determined by the web.config (for release)
      com.v8server v8server = new com.v8server();

      // get hosts manifest array 
      List<HostsManifest> hosts = serializer.Deserialize<List<HostsManifest>>(assembler.getRootManifest("_hosts"));

      // get apps array to see if it contains a secure section for hidden div bottom + get the appsVersion
      List<AppsManifest> apps = serializer.Deserialize<List<AppsManifest>>(assembler.getRootManifest("_apps"));

      // get the RTEhost from webConfig - this is the server from which the RTE launches and tracks - either corporate.vubiz.com or vubiz.com
      // for trials, azure must use either of the above
      string rteHost = ConfigurationManager.AppSettings["rteHost"];

      // determine startup app based on who's calling us - use vubiz.apps/host.json
      string startUpAppId = function.getStartUpAppId(hosts);
      bool isDebug = function.isThisDebug(hosts);

      // see if there's an appId override on the URL profileParameters for the startUpAppId
      appId = function.getParm("appId", startUpAppId);

      // get the app values from the apps array - NOTE app MUST exist
      string appVersion = "", appProfileType = "", appProfileDefault = "", appTiles = "", appVideos = "";
      for (int appsNo = 0; appsNo < apps.Count; appsNo++)
      {
        if (apps[appsNo].appsId == appId)
        {
          appVersion = apps[appsNo].appsVersion;
          appProfileType = apps[appsNo].appsProfileType;
          appProfileDefault = apps[appsNo].appsProfileDefault;
          appTiles = apps[appsNo].appsTiles;
          translateApp = apps[appsNo].appsTranslate == "y" ? true : false;
          appVideos = apps[appsNo].appsVideos;
        }
      };

      string profile = "", profileUrl = "";
      string host = function.getHost().ToLower();

      // the profile is mandatory and available from the appsProfileDefault or the url parameter (&profile=cfib)
      profileUrl = function.getParm("profile", "").ToLower();
      if (profileUrl.Length > 0) profile = profileUrl;
      if (profile.Length == 0) profile = appProfileDefault;

      // advanced profiles and enroll/signin features are for appProfileType type = 0 (cfib) only
      string color = "", custId = "", custAcctId = "", custGuid = "", lang = "", membId = "", membEmail = "", membFirstName = "", membLastName = "", membPassword = "", membNo = "", membGuid = "", membMemo = "", pageId = "", startPage = "", membPrograms = "", membActive = "1", storeId = "1", returnUrl = "", cancelUrl = "";
      string nameCatalogue = "", namePrograms = "", nameReports = "";
      bool useVideos = false, isAutoEnroll = false, isAutoEnrollWs = false, isAutoSignIn = false, isSSOmembNo = false, isSSOmembId = false, isSSOmembGuid = false;

      // store profile data in <div id="profileState"...  for appProfileType = 0, and empty for appProfileType = "n"
      sbAppData.Append("\n\t<div id='profileState' style='display:none'>");

      if (peterDebug) sbAppDebug.Append("<br /><br />" + "profile: " + profile);
      if (peterDebug) sbAppDebug.Append("<br /><br />" + "starting profileState");



      // get pages used in the app via the page manifest (error 1000 - invalid appId) - used to check is URL parm startPage is valid PLUS assembling the page set
      JSON = assembler.getManifest(appId, "_app");
      if (JSON == "") Response.Redirect("Errors.aspx?errorId=450&errorParm=" + appId, true);
      AppManifest app = serializer.Deserialize<AppManifest>(JSON);
      List<PageManifest> page = serializer.Deserialize<List<PageManifest>>(assembler.getManifest(appId, "_pages"));

      List<TileManifest> tile = serializer.Deserialize<List<TileManifest>>(assembler.getManifest(appId, "_tiles"));

      #endregion

      #region profiles

      if (appProfileType == "n") /* no profile - simple utility - leave lots of room for more empty profiles*/
      {
        sbAppData.Append("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
      }
      else if (appProfileType == "0") /* advanced for v8/v8a */
      {
        if (profile.Length == 0) Response.Redirect("Errors.aspx?errorId=451&errorParm=" + profile, true);
        JSON = v8server.profiles(profile);
        if (JSON == "null") Response.Redirect("Errors.aspx?errorId=452&errorParm=" + profile, true);

        List<ProfileParameters> profileParameters = serializer.Deserialize<List<ProfileParameters>>(JSON);
        if (peterDebug) sbAppDebug.Append("<br /><br />" + JSON);

        // extract the profile parameters from the profile table in the apps db (or use default)
        int i = -1;

        i++; sbAppData.Append(getProfile(profileParameters, "autoEnroll", "False") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "autoEnrollWs", "False") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "autoSignIn", "False") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "certPrograms", "") + "|");             /* if CustId present then expose the certificate programs tile and configure CustId - auto enroll into V5 */
        i++; sbAppData.Append(getProfile(profileParameters, "certPrograms_E", "") + "|");           /* if CustId present then offer certificate programs, auto enroll into V5 */
        i++; sbAppData.Append(getProfile(profileParameters, "color", "") + "|");                    /* added Mar 14, 2018 to replace "skin" - color is used for headers, footers etc in v8 and Nop  */
        i++; sbAppData.Append(getProfile(profileParameters, "contentSource", "catalogue") + "|");   /* one of: catalogue/ecommerce/assigned/ecom-assigned (last was added for MPC Oct 25 2017) */
        i++; sbAppData.Append(getProfile(profileParameters, "custId", "") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "ecommerce", "False") + "|");           /* show/hide the ecommerce subsystem tile */
        i++; sbAppData.Append(getProfile(profileParameters, "emailFrom", "support@vubiz.com") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "guests", "False") + "|");              /* show/hide the Guest subsystem tile */
        i++; sbAppData.Append(getProfile(profileParameters, "guests_E", "False") + "|");            /* if member type = "E" then show/hide the Guest subsystem tile */
        i++; sbAppData.Append(getProfile(profileParameters, "jit", "False") + "|");                 /* show/hide the JIT subsystem tile */
        i++; sbAppData.Append(getProfile(profileParameters, "lang", "en") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "lang_en", "") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "lang_fr", "") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "lang_es", "") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "lang_pt", "") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "logo", "") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "memb_E", "False") + "|");              /* if True then this account supports "employees" type - like CFIB */
        i++; sbAppData.Append(getProfile(profileParameters, "password", "False") + "|");            /* default changed to False Apr 2, 2019 - most sites do not use passwords */
        i++; sbAppData.Append(getProfile(profileParameters, "portal", "False") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "returnUrl", "") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "showSoloPrograms", "False") + "|");    /* if True than show single Programs rather than jumping to Module(s) */
        i++; sbAppData.Append(getProfile(profileParameters, "sso", "") + "|");                      /* one of: membNo, membId, membGuid, custMembGuid (NOP) */
        i++; sbAppData.Append(getProfile(profileParameters, "storeId", "1") + "|");                 /* use from NOP to so we know what store they are registering for */
        i++; sbAppData.Append(getProfile(profileParameters, "videos", "False") + "|");
        i++; sbAppData.Append(getProfile(profileParameters, "vukidz", "False") + "|");              /* show/hide the Vukidz features */

        #region profile overrides 
        // grab any text overrides in the profile then apply later so they can be translated (positioning added May 30 2018)
        // appTiles check added Apr 23, 2018 to avoid conflict with apps like "credentials2"

        if (appTiles == "1")
        {
          nameCatalogue = getProfile(profileParameters, "nameCatalogue", "");
          namePrograms = getProfile(profileParameters, "namePrograms", "");
          nameReports = getProfile(profileParameters, "nameReports", "");
        }

        //if (appTiles == "1")
        //{
        //	// check if any page name overrides in the profile, if so change the page array AND the tile array
        //	pageNameOverride = getProfile(profileParameters, "nameCatalogue", "");
        //	if (pageNameOverride != "")
        //	{
        //		foreach (var pageItem in page.Where(x => x.pageId == "catalogue")) pageItem.pageName = pageNameOverride;
        //		foreach (var tileItem in tile.Where(x => (x.tilePage == "home") && (x.tileNo == "0"))) tileItem.tileTitle = pageNameOverride;
        //	}
        //	pageNameOverride = getProfile(profileParameters, "namePrograms", "");
        //	if (pageNameOverride != "")
        //	{
        //		foreach (var pageItem in page.Where(x => x.pageId == "programs")) pageItem.pageName = pageNameOverride;
        //	}
        //	pageNameOverride = getProfile(profileParameters, "nameReports", "");
        //	if (pageNameOverride != "")
        //	{
        //		foreach (var pageItem in page.Where(x => x.pageId == "historyPrograms2")) pageItem.pageName = pageNameOverride;
        //		foreach (var tileItem in tile.Where(x => (x.tilePage == "home") && (x.tileNo == "23"))) tileItem.tileTitle = pageNameOverride;
        //	}
        //}
        #endregion

        isAutoEnroll = (getProfile(profileParameters, "autoEnroll", "False") == "True") ? true : false;
        isAutoEnrollWs = (getProfile(profileParameters, "autoEnrollWs", "False") == "True") ? true : false;
        isAutoSignIn = (getProfile(profileParameters, "autoSignIn", "False") == "True") ? true : false;

        isSSOmembNo = (getProfile(profileParameters, "sso", "") == "membNo") ? true : false;
        isSSOmembId = (getProfile(profileParameters, "sso", "") == "membId") ? true : false;
        isSSOmembGuid = (getProfile(profileParameters, "sso", "") == "membGuid") ? true : false;

        lang = getProfile(profileParameters, "lang", "en");
        custId = getProfile(profileParameters, "custId", "");
        if (custId.Length == 4)
        {
          custAcctId = custId.Substring(4, 4);  /* note this is wrong, need to get from customer table */
        }

        color = getProfile(profileParameters, "color", "");
        color = ""; // don't use color any more - stick to VU Blue
        color = (color == "") ? "#0178B9" : color;

        // if we use videos then we need to add in an icon at the top of each page, which than is controlled by the app page by page
        useVideos = (getProfile(profileParameters, "videos", "False") == "True") ? true : false;
      }

      sbAppData.Append("</div>\n");

      if (peterDebug) sbAppDebug.Append("<br /><br />" + sbAppData.ToString());

      int parmCount = 0;                                             // we determine if the client uses localstore by the number of parmCounts

      #endregion

      #region base64 parms
      // other than profile, first check for base64 parms else regular parms
      string parms = function.getParm("parms", "");
      if (parms != "")
      {
        parms = System.Text.Encoding.UTF8.GetString(Convert.FromBase64String(parms));
        char[] split1 = { '&' };
        string[] parms1 = parms.Split(split1);
        if (parms1.Length > 0) // extract supported values
        {
          char[] split2 = { '=' };
          foreach (string parms2 in parms1)
          {
            string[] parms3 = parms2.Split(split2);
            // added .toLower when MORT passed in membID rather than membId
            if (parms3[0].ToLower() == "custid") { custId = parms3[1].ToString(); }
            if (parms3[0].ToLower() == "membid") { membId = parms3[1].ToString(); }
            if (parms3[0].ToLower() == "membno") { membNo = parms3[1].ToString(); }
            if (parms3[0].ToLower() == "pageid") { pageId = parms3[1].ToString(); }
            if (parms3[0].ToLower() == "lang") { lang = parms3[1].ToString(); }
            if (parms3[0].ToLower() == "membguid") { membGuid = parms3[1].ToString(); } // added Jan 25, 2018
            if (parms3[0].ToLower() == "returnurl") { returnUrl = parms3[1].ToString(); } // added Dec 11, 2018
          }
        }
      }
      #endregion

      #region url parms
      else
      {
        cancelUrl = function.getParm("cancelUrl", "").ToLower();
        custId = function.getParm("custId", "").ToUpper();              // used in v8.register - passed in via NOP
        custGuid = function.getParm("custGuid", "");                    // when present with a membId then we auto enroll (not used)
        lang = function.getParm("lang", "").ToLower();                  // added May 30, 2018 for MPC to use same profile with different languages
        membActive = function.getParm("memb_active", "1");              // used in autoEnrollAdvanced      
        membId = function.getParm("membId", "").ToUpper();
        membEmail = function.getParm("membEmail", "").ToLower();
        membFirstName = function.getParm("membFirstName", "");
        membGuid = function.getParm("membGuid", "").ToUpper();          // this MUST be a temp guid - get real guid from GUID table
        membLastName = function.getParm("membLastName", "");
        membMemo = function.getParm("membMemo", "");
        membNo = function.getParm("membNo", "");
        membPassword = function.getParm("membPassword", "").ToUpper();  // when present with a membId then we auto signIn
        membPrograms = function.getParm("membPrograms", "").ToUpper();  // used in autoEnrollAdvanced
        returnUrl = function.getParm("returnUrl", "").ToLower();
        startPage = function.getParm("startPage", ""); startPage = function.isPage(page, startPage) ? "page_" + startPage : "";
        storeId = function.getParm("storeId", "1");                     // used for NOP to determine source of store
      }
      #endregion

      #region profile overrides 
      // grabbed above, applied here for translation)   
      if (nameCatalogue != "")
      {
        foreach (var pageItem in page.Where(x => x.pageId == "catalogue"))
        { 
          pageItem.pageName = translate(nameCatalogue, lang);

        }

        foreach (var tileItem in tile.Where(x => (x.tilePage == "home") && (x.tileNo == "0")))
        { 
          tileItem.tileTitle = translate(nameCatalogue, lang);

        }
      }
      if (namePrograms != "")
      {
        foreach (var pageItem in page.Where(x => x.pageId == "programs")) pageItem.pageName = translate(namePrograms, lang);
      }
      if (nameReports != "")
      {
        foreach (var pageItem in page.Where(x => x.pageId == "historyPrograms2")) pageItem.pageName = translate(nameReports, lang);
        foreach (var tileItem in tile.Where(x => (x.tilePage == "home") && (x.tileNo == "23"))) tileItem.tileTitle = translate(nameReports, lang);
      }
      #endregion
      
      #region isSSOmembNo
      // sso using membNo from base64 parms - assumes learner is on file, get temp GUID
      if (isSSOmembNo)
      {
        if (function.isNumeric(membNo))
        {
          JSON = v8server.ssoMembNo(membNo);
          //function.logTxt(JSON);                          // ****  for testing only - log certain fields to text file
          if (JSON != "null")
          {
            SSOmembNo ssoMembNo = serializer.Deserialize<SSOmembNo>(JSON);
            membGuid = ssoMembNo.membGuid;
          }
          else
          {
            membGuid = "";
          }
        }
      }
      #endregion

      #region isSSOmembId
      // sso using membId from base64 parms - assumes learner is on file
      if (isSSOmembId)
      {
        if (membId.Length > 0 && custId.Length > 0)
        {
          JSON = v8server.ssoMembId(custId, membId);
          if (JSON != "null")
          {
            AutoSignIn autoSignIn = serializer.Deserialize<AutoSignIn>(JSON);
            membGuid = autoSignIn.membGuid;
            membNo = autoSignIn.membNo;
          }
          else
          {
            membGuid = "";
            membNo = "";
          }
        }
      }
      #endregion

      #region isSSOmembGuid
      // sso using membGuid directly
      if (isSSOmembGuid)
      {
        JSON = v8server.ssoMembGuid(membGuid);
        if (JSON != "null")
        {
          SSOmembGuid ssoMembGuid = serializer.Deserialize<SSOmembGuid>(JSON);
          //        membNo = ssoMembGuid.membNo;
        }
        else
        {
          membNo = "";
        }
      }
      #endregion

      #region isAutoEnroll
      // autoenroll requires all fields except membMemo which is optional
      // values are typically passed in via URL
      // we don't need to do this is isAutoEnrollWs cuz it's been done earlier in a WS
      if (isAutoEnroll)
      {
        if (function.isGuid(custGuid) && membId.Length > 0 && membFirstName.Length > 0 && membLastName.Length > 0 && membEmail.Length > 0)
        {
          JSON = v8server.autoEnroll(custGuid, membId, membFirstName, membLastName, membEmail, membMemo);
          AutoEnroll autoEnroll = serializer.Deserialize<AutoEnroll>(JSON);
          if (autoEnroll.msgId.Substring(0, 2) == "ok")
          {
            custAcctId = autoEnroll.custAcctId;
            custId = autoEnroll.custId;
            membGuid = autoEnroll.membGuid;
            membNo = autoEnroll.membNo;
          }
          else
          {
            custAcctId = "";
            custId = "";
            membGuid = "";
            membNo = "";
          }
        }
      }
      #endregion

      #region isAutoEnrollWs
      // autoEnrollWs occurs outside of V8, it allows use of membPrograms and membActive
      // since custGuid and membGuid will be passed in the div, we don't need to do any more
      // v8/signin.js will sign in this member

      // when you get here we just need to signin using custGuid and membGuid
      //if (isAutoEnrollWs)
      //{
      //  if (function.isGuid(custGuid) && function.isGuid(membGuid))
      //  {
      //    JSON = v8server.autoEnroll(custGuid, membId, membFirstName, membLastName, membEmail, membMemo);
      //    AutoEnroll autoEnroll = serializer.Deserialize<AutoEnroll>(JSON);
      //    if (autoEnroll.msgId.Substring(0, 2) == "ok")
      //    {
      //      custAcctId = autoEnroll.custAcctId;
      //      custId = autoEnroll.custId;
      //      membGuid = autoEnroll.membGuid;
      //      membNo = autoEnroll.membNo;
      //    }
      //    else
      //    {
      //      custAcctId = "";
      //      custId = "";
      //      membGuid = "";
      //      membNo = "";
      //    }
      //  }
      //}
      #endregion

      #region isAutoSignIn
      // autoSignin with custAcctId, membId and membPassword
      if (isAutoSignIn)
      {
        if (custAcctId.Length == 4 && membId.Length > 0 && membPassword.Length > 0)
        {
          JSON = v8server.autoSignIn(custAcctId, membId, membPassword);
          if (JSON != "null")
          {
            AutoSignIn autoSignIn = serializer.Deserialize<AutoSignIn>(JSON);
            membGuid = autoSignIn.membGuid;
            membNo = autoSignIn.membNo;
          }
          else
          {
            membGuid = "";
            membNo = "";
          }
        }
      }
      #endregion

      #region pass into Divs
      // if any of these are passed in any querystring values then we will not use localstorage but assume a fresh visit
      if (cancelUrl.Length > 0) parmCount++;
      if (custId.Length > 0) parmCount++;
      if (custGuid.Length > 0) parmCount++;
      if (membGuid.Length > 0) parmCount++;
      if (membId.Length > 0) parmCount++;
      if (membNo.Length > 0) parmCount++;
      if (membEmail.Length > 0) parmCount++;
      if (membFirstName.Length > 0) parmCount++;
      if (membLastName.Length > 0) parmCount++;
      if (membPassword.Length > 0) parmCount++;
      if (membMemo.Length > 0) parmCount++;
      if (returnUrl.Length > 0) parmCount++;
      if (storeId.Length > 0) parmCount++;
      if (lang.Length > 0) parmCount++; // added May 30, 2018

      if (peterDebug) sbAppDebug.Append("<br /><br />" + "appTiles: " + appTiles);
      if (peterDebug) sbAppDebug.Append("<br /><br />" + "starting tileState");

      #region store tile info in Div

      // get any tiles and embed as JSON string in hidden div
      // we need to embed them here so they can optionally be translated
      sbAppData.Append("\n\t<div id='tileState' style='display:none'>");
      if (appTiles == "1")
      {
        // string tiles = assembler.getManifest(appId, "_tiles");
        // orignal above was changed to list<T> to override titleTitle based on Profile entries
        // so we now need to create the JSON string

        string tiles = "[";
        for (var i = 0; i < tile.Count; i++)
        {
          tiles += "{";
          tiles += "\"tilePage\": \"" + tile[i].tilePage + "\",";
          tiles += "\"tileNo\": \"" + tile[i].tileNo + "\",";
          tiles += "\"tileTitle\": \"" + tile[i].tileTitle + "\",";
          tiles += "\"tileColor\": \"" + tile[i].tileColor + "\",";
          tiles += "\"tileIcon\": \"" + tile[i].tileIcon + "\",";
          tiles += "\"tileClass\": \"" + tile[i].tileClass + "\"";
          tiles += "},";
        }
        tiles += "]";
        tiles = tiles.Replace("},]", "}]"); // remove trailing comma

        sbAppData.Append(tiles);
        sbAppData.Replace("  ", "");
        //      sbAppData.Replace("\t", "");
      }
      sbAppData.Append("</div>\n");

      if (peterDebug) sbAppDebug.Append("<br /><br />" + sbAppData.ToString());

      string debug = (isDebug ? "y" : "n");

      #endregion

      // store start data alphabetically in <div id="startState"...
      HttpBrowserCapabilities browser = Request.Browser;
      sbAppData.Append("\n\t<div id='startState' style='display:none'>");

      sbAppData.Append(appId + "|");
      sbAppData.Append(appProfileType + "|");
      sbAppData.Append(appVersion + "|");
      sbAppData.Append(appVideos + "|");
      sbAppData.Append(cancelUrl + "|");
      sbAppData.Append(custAcctId + "|");
      sbAppData.Append(custGuid + "|");
      sbAppData.Append(custId + "|");
      sbAppData.Append(debug + "|");
      sbAppData.Append(host + "|");
      sbAppData.Append(lang + "|");
      sbAppData.Append(membEmail + "|");
      sbAppData.Append(membFirstName + "|");
      sbAppData.Append(membGuid + "|");
      sbAppData.Append(membId + "|");
      sbAppData.Append(membLastName + "|");
      sbAppData.Append(membNo + "|");
      sbAppData.Append(pageId + "|");
      sbAppData.Append(parmCount + "|");
      sbAppData.Append(appProfileDefault + "|");
      sbAppData.Append(profileUrl + "|");
      sbAppData.Append(profile + "|");
      sbAppData.Append(returnUrl + "|");
      sbAppData.Append(rteHost + "|");
      sbAppData.Append(startPage + "|");
      sbAppData.Append(storeId + "|");
      sbAppData.Append(translateApp + "|");

      sbAppData.Append("empty</div>\n");
      // insert the these parameter blocks and translate
      AppData.Text = translate(sbAppData.ToString(), lang);

      #endregion

      #region build page set


      // there are diffent type of pages, each with distinct layouts
      for (int pageNo = 0; pageNo < page.Count; pageNo++)
      {
        string pageHTML = page[pageNo].pageId.ToString();
        assembler.assembleHTML(app, page, pageNo, useVideos, isDebug, sbStyle, sbHTML, sbScript);

        // replace any occurrence of $$ in a page or script with the pageId
        // note css or less scripts cannot use $$ since it can't be replaced
        sbHTML.Replace("$$", pageHTML);
        sbScript.Replace("$$", pageHTML);
      }


      // get the app script
      assembler.injectAppScript(appId, sbScript);

      // strip double spaces
      sbStyle.Replace("  ", "");
      sbHTML.Replace("  ", "");
      sbScript.Replace("  ", "");


      // insert the code blocks (translate the HTML) unless we are in special debugging mode - change tag openings
      if (peterDebug)
      {
        AppDebug.Text = sbAppDebug.ToString().Replace(":none", ":normal");
      }
      else
      {
        AppHead.Text = assembler.injectDocument_head(appId, isDebug);
        AppStyle.Text = "" + sbStyle.ToString() + "\n";
        AppColor.Text = "<style>"
                      + "  .ui-header, .ui-footer { background-color:" + color + " !important; }"
                      + "  .ui-header { color:white !important; }"
                      + "  .ui-footer { color:" + color + " !important; }"
                      + "</style>";
        AppHtml.Text = "" + translate(sbHTML.ToString(), lang) + "\n";
        AppScripts.Text = "<script id='page_scripts'>\n\t\t" + translate(sbScript.ToString(), lang) + "\n  </script>";
        AppBody.Text = assembler.injectDocument_body(appId, isDebug);
      }

      // these are a few values in the popups at the top of Default.aspx
      literal_Close.Text = translate("[[Close]]", lang);
      literal_Yes.Text = translate("[[Yes]]", lang);
      literal_No.Text = translate("[[No]]", lang);

      #endregion
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

    public string translate(string text, string lang) // translate a block of code (HTML or Script) from [[english text]] to "lang" (note supports only left to right langs, not RTL like Arabic))
    {

      // only use this service if the app requires translation - if not ensure there are not tags from routines that might use them
      if (!translateApp) return text.Replace("[[", "").Replace("]]", "");

      // this instantiates the translate object (no longer functional when moved to azure)
      // Translate translate = new Translate();

      // first ensure there are same number of matching tags
      int l = 0, r = 0;
      for (int i = 0; i <= text.Length - 2; i++)
      {
        if (text.Substring(i, 2) == "[[") l++;
        if (text.Substring(i, 2) == "]]") r++;
      }
      if (l != r) Response.Redirect("Errors.aspx?errorId=460&errorParm=" + appId, true);

      // since all prompts are in EN, unless we are translating to fr/es or pb then simply remove the starting and ending "tags"
      if (lang != "fr" && lang != "es" && lang != "pt")
      {
        text = text.Replace("[[", "");
        text = text.Replace("]]", "");
      }

      // otherwise, get all phraseIns between the tags and replace with the lang equivalent
      else
      {
        // web service used for profiles/profileParameters/autoEnroll/translation, etc
        com.v8server v8server = new com.v8server();
        JavaScriptSerializer serializer = new JavaScriptSerializer();

        int str = 0, end = text.Length - 1, fr = 0, to = 0;
        string JSON, phraseIn = "", phraseEx = "", left = "", right = "";


        while (str < end)
        {
          fr = text.IndexOf("[[", str);
          if (fr == -1)
          {
            end = 0;
          }
          else
          {
            to = text.IndexOf("]]", fr + 2);
            if (to == -1)
            {
              end = 0;
            }
            else
            {
              phraseIn = text.Substring(fr + 2, to - fr - 2);

              str = to + 2;
              left = text.Substring(0, fr);
              right = text.Substring(to + 2);

              // grab the translated phrase
              JSON = v8server.translate(phraseIn, lang);
              List<LangParameters> langParameters = serializer.Deserialize<List<LangParameters>>(JSON);
              phraseEx = langParameters[0].phrase;

              // if there is no translated value (note: orginally got value from Bing translator before that moved to Azure
              // too complex now so if not on DB then return EN
              if (phraseEx == null || phraseEx.Length == 0)
              {
                //phraseEx = translate.translatePhrase(phraseIn, lang);           // get one from MS Translator 
                //JSON = v8server.translateUpdate(phraseIn, lang, phraseEx);      // update the translation table
                phraseEx = phraseIn;
              }

              // lock in FR quotes « »
              phraseEx = phraseEx.Replace("« ", "«&nbsp;");
              phraseEx = phraseEx.Replace(" »", "&nbsp;»");

              text = left + phraseEx + right;

            }
          }
        }

      }
      return text;
    }
  }

}