﻿<!DOCTYPE html>
<html>
<head>
  <title>V8 Redirector</title>

  <script src="//ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js"></script>
  <script src="/vubizApps/scripts/$urls.js"></script>
  <script>
    var appId = "vubiz.8";
    $(function () {
      var form = "<form action='/vubizApps/default.aspx?appId=" + appId + "' method='post'></form>";
      $form = $(form);

      if (location.search != "") {  // pass through any variables (other than appId)
        var data = $.getUrlVars();
        $.each(data, function (no, key) {
          value = $.getUrlVar(key);
          $form.append("<input type='hidden' name='" + key + "' value='" + value + "'>");
        });
      }

      $("body").append($form);
      $("form").submit();
    });
  </script>

</head>
<body></body>
</html>