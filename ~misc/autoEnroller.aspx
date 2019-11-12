<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="autoEnroller.aspx.cs" Inherits="vubiz.apps.autoEnroller" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>
</head>
<body>
  <form id="form1" runat="server">
    <div>
      <asp:Label ID="Label1" runat="server" Text="V8 SSO Tester"></asp:Label>
      <br /><br />

      <asp:Table ID="Table1" runat="server" Height="184px">
        <asp:TableRow>
          <asp:TableCell>profile *1</asp:TableCell>
          <asp:TableCell>
            <asp:TextBox ID="_profile" runat="server" Width="50px" Enabled="False"></asp:TextBox></asp:TableCell>
        </asp:TableRow>
        <asp:TableRow>
          <asp:TableCell>custGuid *1</asp:TableCell>
          <asp:TableCell>
            <asp:TextBox ID="_custGuid" runat="server" Width="300px" Enabled="False">38124613-1370-4d59-af17-d499f04993b2</asp:TextBox></asp:TableCell>
        </asp:TableRow>
        <asp:TableRow>
          <asp:TableCell>membId *2</asp:TableCell>
          <asp:TableCell>
            <asp:TextBox ID="_membId" runat="server" Width="200px">123456789</asp:TextBox></asp:TableCell>
        </asp:TableRow>
        <asp:TableRow>
          <asp:TableCell>membFirstName *3</asp:TableCell>
          <asp:TableCell>
            <asp:TextBox ID="_membFirstName" runat="server">Peter</asp:TextBox></asp:TableCell>
        </asp:TableRow>
        <asp:TableRow>
          <asp:TableCell>membLastName *3</asp:TableCell>
          <asp:TableCell>
            <asp:TextBox ID="_membLastName" runat="server">Bulloch</asp:TextBox></asp:TableCell>
        </asp:TableRow>
        <asp:TableRow>
          <asp:TableCell>membEmail *3</asp:TableCell>
          <asp:TableCell>
            <asp:TextBox ID="_membEmail" runat="server" Width="200px">pbulloch@bulloch.ca</asp:TextBox></asp:TableCell>
        </asp:TableRow>
        <asp:TableRow>
          <asp:TableCell>membMemo *4</asp:TableCell>
          <asp:TableCell>
            <asp:TextBox ID="_membMemo" runat="server" Width="400px">Optional info separated by pipes, ie Vancouver|BC</asp:TextBox></asp:TableCell>
        </asp:TableRow>
      </asp:Table>
      <br /><br />
      <asp:Button ID="Button1" runat="server" Text="Auto Enroll/Update" OnClick="Button1_Click" />
      <br /><br />
      <asp:Label ID="Label2" runat="server" Text="*1 existing profile for account"></asp:Label><br />
      <asp:Label ID="Label3" runat="server" Text="*2 existing guid for the account"></asp:Label><br />
      <asp:Label ID="Label5" runat="server" Text="*3 mandatory, can be modified"></asp:Label><br />
      <asp:Label ID="Label4" runat="server" Text="*4 optional"></asp:Label>

    </div>
  </form>
</body>
</html>
