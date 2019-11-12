$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#ele_$$_homeIcon").hide();
    $("#ele_$$_backIcon").hide();
  }
});

$("#$$_xml").on("click", function () { $(":mobile-pagecontainer").pagecontainer("change", "#page_xml"); });
$("#$$_url").on("click", function () { $(":mobile-pagecontainer").pagecontainer("change", "#page_url"); });
