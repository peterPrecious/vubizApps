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
  public partial class vuEcommerce : System.Web.UI.Page
  {
    protected void Page_Load(object sender, EventArgs e)
    {
      Function function = new Function();
      JavaScriptSerializer serializer = new JavaScriptSerializer();
      com.v8server v8server = new com.v8server();
      string url;

      var defaultToken = new Guid("87ad511d-36d2-4740-bfa7-2150f19c6776").ToString();
      var defaultLogGuid = new Guid("b05e6628-a598-4f9d-8bdb-cde5376b1471").ToString();

      // test errors
      // defaultToken = new Guid("E48DAC0B-6E61-4B7C-BC11-623D4DB09A29").ToString(); // expired token
      // defaultLogGuid = new Guid("3E591BEE-2C94-4670-8582-0959CE2D06AF").ToString(); // invalid logEntry
      // defaultToken = null;
      // defaultLogGuid = null;

      string token = function.getParm("token", defaultToken);
      string logGuid = function.getParm("logGuid", defaultLogGuid);
      string returnUrl = function.getParm("returnUrl", "");

      if (logGuid == "")
      {
        url = "/vubizApps/Errors.aspx?errorId=501&errorParm=Missing logGuid";
        Response.Redirect(url);
      }

      else if (returnUrl == "")
      {
        url = "/vubizApps/Errors.aspx?errorId=501&errorParm=Missing returnUrl";
        Response.Redirect(url);

      }

      else
      {
        //result = status ~ profile ~ membGuid ~ custId
        string result = v8server.vuEcommerce(token, logGuid);
        string[] results = result.Split('~');

        if (results[0].Length > 0) // return that status if not 200...
        {
          url = "/vubizApps/Errors.aspx?errorId=501&errorParm=" + results[0];
        }
        else
        {
          url = "/portal/v7/Default.aspx?profile=" + results[1] + "&membGuid=" + results[2] + "&custId=" + results[3] + "&source=nop&returnUrl=" + returnUrl;
        }

        Response.Redirect(url);
      }




    }
  }
}