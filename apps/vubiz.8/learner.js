
$(document).bind("pagebeforeshow", function () {

  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
  };

  /* if we have a logo, display it */
  //if ($vc.profileState.logo === undefined || $vc.profileState.logo.length === 0) {
  if ($vc.profileState.logo === undefined) {
    $("#ele_$$_logo").hide();
  } else {
    $("#ele_$$_logo").show();
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
  };


});

