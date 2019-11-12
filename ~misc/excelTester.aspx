<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="excelTester.aspx.cs" Inherits="vubiz.apps.excelTester" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>
</head>
<body>

  Sample: 
  <a href="excelTester.aspx?custId=CFIB5288&fileName=learnerReport">learnerReport</a> 
  <a href="excelTester.aspx?cust=CCHS&strDate=Jan 29, 2014&endDate=Jan 31, 2014&fileName=ecommerceReport">ecommerceReport</a>

  <div>
    <asp:Panel ID="excelActivity" runat="server" Visible="false">
      <asp:Label ID="excelStatus" runat="server" Text="...waiting for status"></asp:Label><br />
      <asp:HyperLink ID="excelLaunch" runat="server">Launch Excel</asp:HyperLink><br />
    </asp:Panel>
  </div>


</body>
</html>

