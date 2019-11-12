using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using hiveCat.appBuilder.Functions;

namespace vubiz.apps
{
  public partial class vuEcommerceError : System.Web.UI.Page
  {
    protected void Page_Load(object sender, EventArgs e)
    {
      Function function = new Function();
      labError.Text = "Sorry but we could not complete this activity. Please contact systems.<br /><br />[Error: " + function.getParm("errorMessage", "Error! Please notify systems.") + "]";
    }
  }
}