using System;

namespace vubiz.apps
{
  public partial class launch : System.Web.UI.Page
  {
    protected void Page_Load(object sender, EventArgs e)
    {      
      // this is like portal/iframe.aspx - used to launch Bryan's gold reports
      string url = Request["url"];
      goldApps.Attributes["src"] = url;
    }

  }
}