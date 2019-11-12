using System;
using System.Net;

namespace vubiz.apps.quickLinks.v8
{
  public partial class Default : System.Web.UI.Page
  {
    protected void Page_Load(object sender, EventArgs e)
    {

      string formGuts = "<input type='hidden' id='appId' name='appId' value='vubiz.8' />";
      formRedirect.InnerHtml = formGuts;



    }
  }
}