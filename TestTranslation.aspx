<%@ Page
  Language="C#"
  AutoEventWireup="true"
  CodeBehind="TestTranslation.aspx.cs"
  Inherits="vubiz.apps.Errors" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>
</head>
<body>
  <form>
    <table style="margin: 30px auto; padding: 30px; border: 10px solid silver; border-radius: 1em; text-align: center;">
      <tr>
        <td style="font-size: 48px">Oops !</td>
      </tr>
      <tr>
        <td style="font-size: 1.2em; padding-top: 40px; text-align: left;">
          <asp:Literal ID="ErrorText" runat="server"></asp:Literal></td>
      </tr>
      <tr>
        <td style="font-size: 1.1em; padding-top: 10px;">
          <asp:Literal ID="ErrorDetails" runat="server"></asp:Literal></td>
      </tr>
    </table>
  </form>
</body>
</html>
