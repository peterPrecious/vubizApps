using System;
using System.Web;



namespace vubiz.apps
{
  public partial class CFIBsignUp2 : System.Web.UI.Page
  {
    // CFIB values
//  public string membID = "656068";
    public string membID = "50900624";
    public string key = "B16%jpR96az1";
    public string isValidMember;

    // WS values
    cfib.handshakeAuthentication handshake = new cfib.handshakeAuthentication();

    protected void Page_Load(object sender, EventArgs e)
    {
      // returns "true" or "false"
      isValidMember = handshake.isValidMember(membID, key);
    }

  }
}