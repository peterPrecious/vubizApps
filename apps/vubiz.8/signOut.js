$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $(".homeIcon").hide();
    $(".backIcon").hide();
    $("#content_$$").hide();

    /* store returnUrl before killing local storage */
    var returnUrl = $vc.sessionState.returnUrl;
    var profile = $vc.sessionState.profile;
    $.when(
      $vc.fn.endData(),
      $vc = {}
    ).then(function () {
      if (returnUrl.length === 0) { // if no return URL then restart (typically to signin page)
        location.href = location.origin + location.pathname + location.search;
      } else {
        if (returnUrl.substring(0, 2) === "//") {
          location.href = location.origin + returnUrl;
        } else if (returnUrl.indexOf("//") > 0) {
          location.href = returnUrl;
        }
      }
    });

  };
});

$("#ele_$$_refresh").on("click", function () {
  location.replace("/V8?profile=" + $vc_profile);
});