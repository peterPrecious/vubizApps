<%@ Page 
  Language="C#" 
  AutoEventWireup="true" 
  CodeBehind="launch.aspx.cs" 
  Inherits="vubiz.apps.launch" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
  <title></title>

  <style>
    .goldApps { background-color: white; border: none; width: 100%; margin: 50px 0 0 0; }
    .exit { position: absolute; top: 40px; right: 40px; width:30px;}
  </style>

  <script>

    /* resize on load */
    $(function () {
      goldAppsResize();
    });

    /* resize on resize */
    $(window).on("resize", function () {
      var resizeTimer;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(goldAppsResize, 500);
    });

    function goldAppsResize() {
      $(".goldApps").height($(window).height() - 100);
    }

  </script>
</head>
<body>
  <form id="form1" runat="server">
    <div>
      <asp:ImageButton CssClass="exit" ImageUrl="~/styles/icons/cancel.png" runat="server" OnClientClick="window.close()" />
      <iframe class="goldApps" id="goldApps" runat="server"></iframe>
    </div>
  </form>
</body>
</html>
