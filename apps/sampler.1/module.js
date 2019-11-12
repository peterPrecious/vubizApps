$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_samplers";

    $("#content_module").load($vc.sessionState.url);
  };
});