using System;

using hiveCat.appBuilder.Functions;

namespace vubiz.apps
{
  public partial class excelTester : System.Web.UI.Page
  {

    protected void Page_Load(object sender, EventArgs e)
    {
      Function function = new Function();
      com.v8server v8server = new com.v8server();

      string lang = function.getParm("lang", "en");
      string membNo = function.getParm("membNo", random());
      string fileName = function.getParm("fileName", "");

      if (fileName == "learnerReport")
      {
        string custId = function.getParm("custId", "");

        int rows = v8server.sXlearnerReport(custId, membNo, lang, fileName);
        excelStatus.Text = rows + " records generated";
        excelLaunch.NavigateUrl = "/vubizExcel/reports/" + membNo + "/learnerReport.xlsx";
        excelActivity.Visible = true;
      }
      else if (fileName == "ecommerceReport")
      {
        string cust = function.getParm("cust", "");
        string strDate = function.getParm("strDate", "");
        string endDate = function.getParm("endDate", "");

        int rows = v8server.XecommerceReport(cust, strDate, endDate, membNo, lang, fileName);
        excelStatus.Text = rows + " records generated";
        excelLaunch.NavigateUrl = "/vubizExcel/reports/" + membNo + "/ecommerceReport.xlsx";
        excelActivity.Visible = true;
      }
    }

    string random() // use to create a randome member no for testing
    {
      Random randNum = new Random();
      return randNum.Next(101, 999999).ToString();
    }

  }
}