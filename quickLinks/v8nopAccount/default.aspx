﻿<!DOCTYPE html>
<html>
<head>
  <title>nopAccount Redirector</title>
  <script>
    var appId = "nopAccount";
    location.href = "/vubizApps/Default.aspx" + location.search + (location.search == "" ? "?" : "&") + "appId=" + appId;
  </script>
</head>
<body></body>
</html>