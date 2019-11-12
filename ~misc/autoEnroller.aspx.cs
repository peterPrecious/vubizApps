using System;
using System.Web.Script.Serialization;

using hiveCat.appBuilder.Services;

namespace vubiz.apps
{
  public partial class autoEnroller : System.Web.UI.Page
  {

    protected void Button1_Click(object sender, EventArgs e)
    {
      com.v8server v8server = new com.v8server();
      JavaScriptSerializer serializer = new JavaScriptSerializer();

      // post the values to the web service
      string JSON = v8server.autoEnroll(_custGuid.Text, _membId.Text.ToUpper(), _membFirstName.Text, _membLastName.Text, _membEmail.Text.ToLower(), _membMemo.Text);
      AutoEnroll autoEnroll = serializer.Deserialize<AutoEnroll>(JSON);
      if (autoEnroll.msgId.Substring(0, 2) == "ok")
      {
        string custAcctId = autoEnroll.custAcctId;
        string custId = autoEnroll.custId;
        string membGuid = autoEnroll.membGuid;
        string membNo = autoEnroll.membNo;

        string url = "../v8?profile=" + _profile.Text.ToLower() + "&custAcctId=" + custAcctId + "&custId=" + custId + "&membGuid=" + membGuid + "&membNo=" + membNo;

        Response.Redirect(url, true);
      }

    }

  }
}