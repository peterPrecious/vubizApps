<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Errors.aspx.cs" Inherits="vubiz.apps.Errors" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>
  <style>
    table { width: 400px; margin: 30px auto; padding: 30px; border: 10px solid silver; border-radius: 1em; }
      table tr td { text-align: center; font-family: 'Trebuchet MS', sans-serif; }
    .td1 { font-size: 1.5em; }
    .td2 { font-size: 1.3em; padding-top: 20px; }
    .td3 { padding-top: 20px; }
    .td4 { font-size: 1.2em; padding-top: 20px; text-align: left; }
    .td5 { font-size: 1.1em; padding-top: 10px; }
  </style>
</head>
<body>
  <form id="form1" runat="server">
    <div>
      <table>
        <tr>
          <td class="td1">Oops!</td>
        </tr>
        <tr>
          <td class="td2">
            <asp:Literal ID="Literal1" runat="server"></asp:Literal>
          </td>
        </tr>
        <tr>
          <td class="td3">
            <img src="styles/sadFace.gif" /></td>
        </tr>
        <tr>
          <td class="td4">
            <asp:Literal ID="ErrorText" runat="server"></asp:Literal></td>
        </tr>
        <tr>
          <td class="td5">
            <asp:Literal ID="ErrorDetails" runat="server"></asp:Literal></td>
        </tr>
      </table>
    </div>
  </form>
</body>
</html>
