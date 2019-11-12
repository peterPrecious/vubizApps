<!DOCTYPE html>
<html>
<head>
  <title>nopRegister Redirector</title>
  <script>
    var appId = "nopRegister";
    location.href = "/vubizApps/Default.aspx" + location.search + (location.search == "" ? "?" : "&") + "appId=" + appId;
  </script>
</head>
<body></body>
</html>