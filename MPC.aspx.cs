using System;
using System.Text;
using System.Web.Script.Serialization;
using System.Web.UI.WebControls;

using hiveCat.appBuilder.Functions;
using hiveCat.appBuilder.Services;

namespace vubiz.apps
{
  public partial class MPC : System.Web.UI.Page
  {
    com.v8server v8server = new com.v8server();
    Function function = new Function();
    JavaScriptSerializer serializer = new JavaScriptSerializer();

    protected void Page_Load(object sender, EventArgs e)
    {
      status.Text = "Please enter the<br />Simulator ID, Campus Guid and MPC No";
//      if (function.getHost() == "localhost") membId.Text = "80086";

    }

    protected void enroll_click(object sender, EventArgs e)
    {
      // pass the custGuid and the membId to caamEnroll WS (which will return the membNo or null)
      string _custGuid = custGuid.Text;
      string _membId = membId.Text;
      string _lang = (langEn.Checked) ? "en" : "fr";
      string JSON = v8server.caamEnroll(_custGuid, _membId);
      CaamEnroll caamEnroll = serializer.Deserialize<CaamEnroll>(JSON);
      if (caamEnroll == null || simulator.Text.ToLower() != "mpcbackdoor")
      {
        panel.HorizontalAlign = System.Web.UI.WebControls.HorizontalAlign.Left;
        status.Text = "" +
          "Access to the Campus has been denied. Possible reasons : <br /><br />" +
          "&ensp;&ensp;&ensp;- there is NO content available for this learner;<br />" +
          "&ensp;&ensp;&ensp;- content for this learner has expired;<br />" +
          "&ensp;&ensp;&ensp;- the MPC No is not a valid Learner Id;<br />" +
          "&ensp;&ensp;&ensp;- the MPC No is valid but Inactive;<br />" +
          "&ensp;&ensp;&ensp;- the Campus GUID is invalid for CAAM3001;<br />" +
          "&ensp;&ensp;&ensp;- the Campus GUID is valid but CAAM3001 is Inactive;<br />" +
          "&ensp;&ensp;&ensp;- Simulator Id is missing or invalid;<br />";
      }
      else // pass both the membGuid and the membNo into V8
      {
        string _membGuid = caamEnroll.membGuid;
        string _membNo = caamEnroll.membNo;

        //        string url = "/v8/?profile=caam&membGuid=" + _membGuid + "&membNo=" + _membNo;
        string url = "/v8/?profile=caam&membGuid=" + _membGuid + "&membNo=" + _membNo + "&lang=" + _lang;

        Response.Redirect(url, false);


      }
    }
  }
}