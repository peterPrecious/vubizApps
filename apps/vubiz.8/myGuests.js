
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_home"; /* ensure we return to programs */

    var tile = "";

    /* get guest tileset from tileState object */
    $.each($vc.tileState, function (key, value) {
      if (value.tilePage === "$$") {

        tile = tile
          + "<li id=\"ele_$$_" + value.tileNo + "\" class=\"tile\" style=\"background-color: " + value.tileColor + ";\">"
          + "  <div class=\"tileIcon\" style=\"background-image: url('" + value.tileIcon + "');\"></div>"
          + "  <div class=\"tileTitle\">" + value.tileTitle + "</div>"
          + "</li>";

        /* if the centre has not been set up then only render the first tile */
        if ($vc.sessionState.membCatalogue.length === 0) return false;

      }
    });

    $("#tile_$$").html(tile);

    /* create the events to the above tiles */
    $("#ele_$$_0").on("click", function () {
      $(":mobile-pagecontainer").pagecontainer("change", "#page_guestSetup");
    });
    $("#ele_$$_1").on("click", function () {
      $(":mobile-pagecontainer").pagecontainer("change", "#page_guests");
    });
    $("#ele_$$_2").on("click", function () {
      $(":mobile-pagecontainer").pagecontainer("change", "#page_guest");
    });
    $("#ele_$$_3").on("click", function () {
      $vc.sessionState.reportByGuest = true;
      $(":mobile-pagecontainer").pagecontainer("change", "#page_guestActivity");
    });   
    $("#ele_$$_4").on("click", function () {  /* completion report added Sep 25, 2019 - coming */
      var url = "/vubizApps/launch.aspx?url=%2fGold%2fvuClientReporting%2fReportExport.aspx%3fAccountID%3d" + right($vc.sessionState.custId, 4) + "%26reportfile%3drepLearnerCompletionExport.frx%26type%3dCSV";
      window.open(url);
    });
  }

  $vc.fn.console("completed loading guest tiles");

});