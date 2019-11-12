
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#footer_$$_title").html($vc.appState.id + " | $$");

    $("#ele_$$_homeIcon").hide();
    $("#ele_$$_backIcon").hide();
    $("#ele_$$_videoIcon").hide();

  };

});