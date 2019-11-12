using System;
using System.Web.Script.Serialization;

namespace ibaoTest
{
  public partial class _default : System.Web.UI.Page
  {
    protected void Page_Load(object sender, EventArgs e)
    {

      com.v8server v8server = new com.v8server();
      JavaScriptSerializer serializer = new JavaScriptSerializer();
      string JSON;

      string custGuid, membId, membEmail, membFirstName, membLastName, membType;

      custGuid = "38124613-1370-4d59-af17-d499f04993b2";
      membId = "someOneUnique";
      membFirstName = "Peter";
      membLastName = "Bulloch";
      membEmail = "peterbulloch@someaddress.com";
      membType = "M";

      JSON = v8server.ibaoEnroll(custGuid, membId, membFirstName, membLastName, membEmail, membType);
      IbaoEnroll ibaoEnroll = serializer.Deserialize<IbaoEnroll>(JSON);




      //      IbaoMember ibaoMember = serializer.Deserialize<IbaoMember>(JSON);

      //string membGuid = vubizWS.ibaoEnroll(custGuid, membId, membFirstName, membLastName, membEmail, membType)
      //      public string ibaoEnroll(string custGuid, string membId, string membFirstName, string membLastName, string membEmail, string membType)
      //  v8server.ibaoEnroll(custGuid, membId, membFirstName, membLastName, membEmail, membType);
      //IbaoEnroll ibaoEnroll = serializer.Deserialize<IbaoEnroll>(JSON);
      //if (ibaoEnroll.msgId.Substring(0, 2) == "ok")
      //{
      //  //      string url = "/v8?profile=ibao&membGuid=" + ibaoEnroll.membGuid;
      //  string url = "http://store.vubiz.com/NopAdmin/Authenticatev5.aspx?membGUID=" + ibaoEnroll.membNOPGuid;
      //  Response.Redirect(url, true);
      //}
      //else
      //{
      //  statusMessage.Text += " We are unable to enroll you in The Campus. Please contact Support.";
      //}

    }
  }

}