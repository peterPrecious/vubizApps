<%@ Page
  Language="C#"
  AutoEventWireup="true"
  CodeBehind="GoodBye.aspx.cs"
  Inherits="vubiz.apps.GoodBye" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>
  <style>
    .goodbyeButton {
      color: #0178B9;
      background-color: transparent;
      font-weight: bold;
      font-size: 1.0em;
      padding: 10px 20px;
      margin: 30px;
      text-decoration: none;
      background-color: white;
      border-top: 1px solid gray;
      border-left: 1px solid gray;
      border-right: 2px solid black;
      border-bottom: 2px solid black;
    }

      .goodbyeButton:hover {
        color: black;
      }
  </style>
</head>
<body>
  <form id="form1" runat="server">
    <table style="margin: 30px auto; padding: 30px; border: 10px solid silver; border-radius: 1em;">
      <tr>
        <td style="text-align: center; font-family: 'Trebuchet MS', sans-serif; font-size: 24px; padding: 30px;">
          <asp:LinkButton ID="goodbyeButton" CssClass="goodbyeButton" OnClick="butReturn_Click" runat="server">sample 1</asp:LinkButton>
        </td>
      </tr>
    </table>
  </form>
</body>
</html>
