<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CredentialsAsp.aspx.cs" Inherits="vubiz.apps.CredentialsAsp" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>
  <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>

  <script src="scripts/$formManagerAsp.js"></script>
  <script>
    $(function () {
      getFormElements("section2");
    })
  </script>

</head>
<body>
  <form id="form1" runat="server">
    <section class="section1">
      <asp:TextBox runat="server" ID="TextBox1" /><br />
      <asp:TextBox runat="server" ID="TextBox2" /><br />
      <asp:CheckBox runat="server" ID="CheckBox1" /><br />
      <asp:CheckBox runat="server" ID="CheckBox2" /><br />
      <asp:TextBox runat="server" ID="TextBox3" /><br />
      <asp:Button runat="server" ID="Button1" Text="Sign In 1" />
    </section>
    <br />
    <br />
    <section class="section2">
      <asp:TextBox runat="server" ID="TextBox1a" /><br />
      <asp:TextBox runat="server" TextMode="Password" ID="TextBox3a" /><br />
      <asp:TextBox runat="server" ID="TextBox2a" /><br />
      <asp:CheckBox runat="server" ID="CheckBox1a" /><br />
      <asp:CheckBox runat="server" ID="CheckBox2a" /><br />
      <asp:Button runat="server" ID="Button1a" Text="Sign In 2" />





    </section>

  </form>
</body>
</html>
