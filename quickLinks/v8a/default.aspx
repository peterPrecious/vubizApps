<!DOCTYPE html>
<html>
<head>
  <title>V8a Redirector</title>
  <script>
    var appId = "vubiz.8a";
    location.href = "/vubizApps/Default.aspx" + location.search + (location.search == "" ? "?" : "&") + "appId=" + appId;
  </script>
</head>
<body></body>
</html>