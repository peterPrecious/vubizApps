<html>
<head>
  <title>Credentials Redirector</title>
  <script>
    var appId = "credentials.2";
    location.href = "/vubizApps/Default.aspx" + location.search + (location.search == "" ? "?" : "&") + "appId=" + appId;
  </script>
</head>
<body></body>
</html>