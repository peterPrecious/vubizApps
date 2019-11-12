<!DOCTYPE html>
<html>
<head>
  <title>V8 Redirector</title>
  <script>
    var appId = "vubiz.8";
    location.href = "/vubizApps/Default.aspx" + location.search + (location.search == "" ? "?" : "&") + "appId=" + appId;
  </script>
</head>
<body></body>
</html>