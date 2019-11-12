<html>
<head>
  <title>Redirector</title>
  <script>
    var appId = "simulatorDirect";
    location.href = "/vubizApps/Default.aspx" + location.search + (location.search == "" ? "?" : "&") + "appId=" + appId;
  </script>
</head>
<body></body>
</html>