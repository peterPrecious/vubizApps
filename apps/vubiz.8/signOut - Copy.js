$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $(".homeIcon").hide();
    $(".backIcon").hide();
    $("#content_$$").hide();

    debugger;


    /* store returnUrl before killing local storage */
    var returnUrl = $vc.sessionState.returnUrl;
    debugger;
    $.when(
      $vc.fn.endData(),
      $vc = {}
    ).then(function () {
      if (returnUrl.length > 3) {
        if (returnUrl.substring(0, 2) === "//") {
          location.href = location.origin + returnUrl;
        } else {
          location.href = returnUrl;
        }
      } else {
        // if no returnUrl then close window
        //$("#content_$$").show();
        window.close();
      };
    });
  };
})

$("#ele_$$_refresh").on("click", function () {
  location.replace("/V8?profile=" + $vc_profile);
});