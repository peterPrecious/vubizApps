using System;

using hiveCat.appBuilder.Functions;

namespace vubiz.apps.quickLinks.v8
{
  public partial class Default : System.Web.UI.Page
  {
    protected void Page_Load(object sender, EventArgs e)
    {
      foreach (String key in Request.QueryString.AllKeys)
      {
        Response.Write("Key: " + key + " Value: " + Request.QueryString[key]);
      }

    }
  }
}