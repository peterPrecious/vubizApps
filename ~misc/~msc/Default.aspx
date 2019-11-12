<%@ Page
  Language="C#"
  AutoEventWireup="true"
  CodeBehind="Default.aspx.cs"
  Inherits="vubiz.apps.quickLinks.v8.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
  <title>V8 Redirector</title>
    <script src="//ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js"></script>

  <script>
    $(function () {
      $("form").submit();
    })
  </script>
</head>

<body>
  <form id="formRedirect" runat="server" action="/vubizApps/default.aspx?refresh=backarrow" method="post">
<%--    <div>
      <input type='hidden' id='appId' name='appId' value='" + appId + "' />
      <input type='hidden' id='parms' name='parms' />
    </div>--%>
  </form>
</body>

</html>