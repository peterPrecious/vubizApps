using System;



namespace vubiz.apps
{
  public partial class CFIBsignUp2 : System.Web.UI.Page
  {
    //public string membID = "656068";
    //public string membID = "50900624";

    public string membID = "1283240"; // provided in CFIB pdf specs as a valid member
    public string partnerID = "B16%jpR96az1";


    cfib.handshakeAuthentication handshake = new cfib.handshakeAuthentication();

    protected void Page_Load(object sender, EventArgs e)
    {
      // returns "true" or "false"
      string isValidMember = handshake.isValidMember(membID, partnerID);
    }

  }
}