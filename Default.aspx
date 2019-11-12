<%@ Page
  Language="C#"
  AutoEventWireup="true"
  CodeBehind="Default.aspx.cs"
  Inherits="vubiz.apps.Default" %>

<!DOCTYPE html>

<html>

<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />

  <asp:Literal ID="AppHead" runat="server"></asp:Literal>
  <asp:Literal ID="AppColor" runat="server"></asp:Literal>
  <asp:Literal ID="AppStyle" runat="server"></asp:Literal>

  <title>V8</title>

</head>

<body class="ui-mini ">

  <asp:Literal ID="AppData" runat="server"></asp:Literal>
  <asp:Literal ID="AppHtml" runat="server"></asp:Literal>
  <asp:Literal ID="AppScripts" runat="server"></asp:Literal>
  <asp:Literal ID="AppBody" runat="server"></asp:Literal>
  <asp:Literal ID="AppDebug" runat="server"></asp:Literal>

  <div id="globalPopup" data-theme="a" class="help-popup">
    <a id="globalPopupClose" style="margin: 12px;" class="ui-btn ui-corner-all xui-shadow ui-icon-delete ui-btn-icon-notext ui-btn-right" href="#" data-rel=""><asp:Literal ID="literal_Close" runat="server">Close</asp:Literal></a>
    <span id="globalPopupText"></span>
  </div>

  <div id="globalConfirm" data-theme="a" class="help-popup">
    <div id="globalConfirmText" style="text-align: center; margin: 20px; font-size: larger; font-weight: bold;"></div>
    <div style="text-align: center;">
      <a id="globalConfirmTrue" href="#" style="margin: 20px;" class="ui-btn ui-shadow ui-corner-all ui-btn-inline"><asp:Literal ID="literal_Yes" runat="server">Yes</asp:Literal></a>
      <a id="globalConfirmFalse" href="#" style="margin: 20px;" class="ui-btn ui-shadow ui-corner-all ui-btn-inline"><asp:Literal ID="literal_No" runat="server">No</asp:Literal></a>
    </div>
  </div>

</body>

</html>
