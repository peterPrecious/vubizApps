<%@ Page
  Language="C#"
  AutoEventWireup="true"
  CodeBehind="xml.aspx.cs"
  ValidateRequest="false"
  Inherits="vubiz.apps.apps.simulator._1.xml" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>

  <link rel="stylesheet" href="//code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css" />
  <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
  <script src="//code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
  <style>
    .jit { font-family: Courier New, Courier, monospace; color: black; }
    .button { font-size: 1em; background-color: #2ad; border-color: #2ad; color: #fff; border: none; padding: 5px 10px; }
  </style>
</head>
<body>
  <form id="form1" runat="server" style="margin: 0px;">
    <p>
      Paste XML below with no leading or trailing spaces then click the <span class="jit">POST</span> button.
			Note: XML must start with: <span class="jit">&lt;?xml version="1.0" encoding="UTF-8"?&gt;</span>.
    </p>
    <asp:TextBox Width="100%" Height="300px" ID="TextBox1" TextMode="MultiLine" runat="server"><?xml version="1.0" encoding="UTF-8"?><SalesTransaction xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" TransactionSource="CAAMP" Action="C" OrderDate="5/8/2018 5:46:58 PM" UserID="86192d7f-9af7-e711-80e5-00155d01c202" CompanyID="CAAMP21345" OrderID="INV-334595-G0L7" UserFirstName="Samir" UserLastName="Asusa3" UserEmail="samir.asusa@gmail.com" UserPassword="184109" TransactionType="I" CustomerID="CAAM3001" MemberType="Member" Memo="" Currency="CAD" TransactionGroup="Group2"><LineItem OrderID="703d7a4b-0953-e811-80ce-00155d23c822" ProgramID="P6998EN" Seats="1" UnitPrice="0" GSTAmount="0" ExtendedPrice="0" HSTAmount="0" PSTAmount="0" LineTotal="0" /><LineItemTotal SeatsTotal="1" ExtendedTotal="0" GSTTotal="0" PSTTotal="0" HSTTotal="0" OrderTotal="0" /></SalesTransaction></asp:TextBox>
    <br /><br />
    <p style="width: 180px">
      <asp:Button CssClass="button" ID="Button1" runat="server" Text="POST" OnClick="Button1_Click" />
    </p>
    <br />
    If successful the Account Id, Password, Expiry Date and Response Guid will be returned.
			If not, then the error message will be returned.
		<br />
    <asp:TextBox Width="100%" Height="100px" ID="TextBox2" TextMode="MultiLine" runat="server"></asp:TextBox>
  </form>
</body>
</html>
