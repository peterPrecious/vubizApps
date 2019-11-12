<!DOCTYPE html>
<html>
<head>
  <title>V8 Redirector</title>

  <script src="//ajax.aspnetcdn.com/ajax/jQuery/jquery-3.3.1.min.js"></script>
  <script src="/vubizApps/scripts/$urls.js"></script>
  <script>
    var appId = "vubiz.8";
    var profile = "";
    var type = "url"; // either 'url' (querystring) or for 'post'
    var parms = "";

    $(function () {

      if (location.search != "") {    // capture any parms (keep profile separate)
        var data = $.getUrlVars();
        $.each(data, function (no, key) {
          value = $.getUrlVar(key);
          if (key == "profile") {
            profile = value;
          } else {
            parms += "&" + key + "=" + value
          }
        });
        parms = window.btoa(parms);   // encode
      }

      if (type === "url") {
        location.href = "/vubizApps/Default.aspx?appId=" + appId + "&profile=" + profile + (parms = "" ? "" : "&parms=" + parms);

      } else {
        var form = ""
          + "<form action='/vubizApps/default.aspx' method='post'>"
          + "  <input type='hidden' name='appId' value='" + appId + "' />"
          + "  <input type='hidden' name='profile' value='" + profile + "' />"
          + "</form>";
        $form = $(form);
        $form.append("<input type='hidden' name='parms' value='" + parms + "'>");
        $("body").append($form);
        $("form").submit();
      }

    });

  </script>

</head>
<body></body>
</html>