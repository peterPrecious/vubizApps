var var_$$_init = false;  /* only  initialize once, not each time this page is rendered */

$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") === "page_$$") {

    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");

    if ($vc.sessionState.custId.length !== 8) {
      $(":mobile-pagecontainer").pagecontainer("change", "#page_programs");
    };

    $vc.sessionState.prevPage = "page_home"; /* ensure we return to programs */

    if (!var_$$_init) { /* only load static catalogue once */
      var_$$_init = true;
      $vc.$$.catalogue();
    };

  };
});

$vc.$$ = function () {
  var _doneCatalogue = function (data, result, xhr) {
    $vc.fn.console("Success loading Catalogue");
    $vc.catalogueState = data;
    $vc.fn.putData();

    /* get tiles color and icon from db */
    var tiles = "";
    $.each(data, function (key, value) {
      /* if this is a guest then we only want to render the selected catalogue items, else render all catl items, also catlJITNo must be greater than 0 */
      if (($vc.sessionState.membLevel > 1 || $vc.sessionState.membCatalogue.lastIndexOf(value.catlNo) >= 0) && value.catlJITNo > 0) {
        tiles = tiles
              + "<li id=\"ele_$$_" + key + "\" class=\"tile\" style=\"background-color: " + value.catlTileColor + ";\">"
              + "  <div class=\"tileIcon\" style=\"background-image: url('styles/tiles/" + value.catlTileIcon + "');\"></div>"
              + "  <div class=\"tileTitle\">" + value.catlTitle + "</div>"
              + "</li>";
      };
    });
    $("#tiles_$$").html(tiles);
  };
  var _failCatalogue = function (xhr, result, statusText) {
    alert("Error loading Catalogue!");
  };
  return {
    catalogue: function () {
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      $vc.ws("catalogue", parm, _doneCatalogue, _failCatalogue);
    }
  };
}();


$(function () { /* grab the selected tile number from the end of the parentElement id that was tapped */

  $("#content_$$").on("click", function (event) {
    var tileId = event.target.parentElement.id;
    var idStartsAt = tileId.lastIndexOf("_") + 1;
    var tileLength = tileId.length;
    var tileNo = right(tileId, tileLength - idStartsAt); /* the last 1 or 2 characters are the tile number */
    $vc.sessionState.catalogue = parseInt(tileNo); /* we need to grab this value to determine which tile icon/color to use in subsequent levels */
    $(":mobile-pagecontainer").pagecontainer("change", "#page_jitQuery");
  });

});