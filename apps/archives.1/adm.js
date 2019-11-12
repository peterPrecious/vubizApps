var var_$$_init = false;  /* only  initialize once, not each time this page is rendered */

$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $(".ele_archId").html($vc.sessionState.archId);

    $("#ele_$$_homeIcon").hide();
    $("#ele_$$_backIcon").hide();

     /* not sure how you can get here if you are not secure... probably reloaded the page which is a no-no */
    if (!$vc.sessionState.secure) {
      alert("Oops. You are not currently authenticated to use this service.!");
    }

    if (!var_$$_init) {
      var_$$_init = true;
      var tile = "";
      /* get home tileset from tileState object */
      $.each($vc.tileState, function (key, value) {
        var ok = false;
        if (value.tilePage === "$$") {
          tile = tile
                + "<li id=\"ele_$$_" + value.tileNo + "\" class=\"tile\" style=\"background-color: " + value.tileColor + ";\">"
                + "  <div class=\"tileIcon\" style=\"background-image: url('" + value.tileIcon + "');\"></div>"
                + "  <div class=\"tileTitle\">" + value.tileTitle + "</div>"
                + "</li>";
        }
      });
      $("#tile_$$").html(tile);

      /* create the events to the above tiles */
      $("#ele_$$_1").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_findLearner");
      });


      $("#ele_$$_99").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_signIn");
      });
    }

    $vc.fn.console("completed loading home tiles");
  }
});