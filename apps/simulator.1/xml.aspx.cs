using System;
using System.Web.Services.Protocols;
using hiveCat.appBuilder.Functions;

namespace vubiz.apps.apps.simulator._1
{
  public partial class xml : System.Web.UI.Page
  {

    Function function = new Function();
    string action;

    protected void Page_Load(object sender, EventArgs e)
    {
      string host = function.getHost();

      action = function.getParm("vAction", "V");
    }

    protected void Button1_Click(object sender, EventArgs e)
    {
      string transaction, accountId, password, responseGuid; DateTime? expiryDate;

      TextBox2.Text = "";
      transaction = TextBox1.Text;
      string host = function.getHost();

      if (transaction == "")
      {
        TextBox2.Text = "Error: No XML detected.";
      }
      else if (transaction.IndexOf("<?xml") == -1)
      {
        TextBox2.Text = "Error: Invalid XML detected.";
      }
      else if (transaction.IndexOf("Action=") == -1)
      {
        TextBox2.Text = "Error: No Action parameter detected.";
      }
      else
      {

        // ensure we use the correct action
        action = "Action=\"" + action + "\"";
        transaction = transaction.Replace("Action=\"C\"", action);
        transaction = transaction.Replace("Action=\"V\"", action);

        vubiz.apps.simulate.Exchange ws = new vubiz.apps.simulate.Exchange();


        try
        {
          int retVal = ws.PostSalesTrans(transaction, false, out accountId, out password, out expiryDate, out responseGuid);
          TextBox2.Text =
            "Account Id: " + accountId + "\n" +
            "Password: " + password + "\n" +
            "Expiry Date: " + expiryDate + "\n" +
            "ResponseGuid: " + responseGuid;
        }
        catch (SoapException ex)
        {
          string error = ex.Message;

          try
          {
            error = error.Substring(error.IndexOf("("));
            error = error.Substring(0, error.IndexOf("<b") - 1);
          }
          catch(Exception)
          { }



          TextBox2.Text = "Error: " + error;
          }
        }
      }
    }
  }