$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");

    $(".homeIcon").hide();
    $(".backIcon").hide();

    $("#content_$$").hide();

    /* store returnUrl before killing local storage */
    var returnUrl = $vc.sessionState.returnUrl;

    /* clear local storage */
    $vc.fn.endData();
    $vc.fn.console("localStorage cleared")

    /* is there a returnUrl */
    if (returnUrl.length > 0) {
      location.href = returnUrl;
    } else {
      $("#content_$$").show();
    };

  };
});

$("#ele_$$_refresh").on("click", function () {
  location.replace("/V8a?profile=" + $vc_profile);
});