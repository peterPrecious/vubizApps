var var_$$_init = false;  /* only initialize catalogue once, not each time this page is rendered */

$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);

    if ($vc.sessionState.custId.length !== 8) { // can't remember why we do this?
      $(":mobile-pagecontainer").pagecontainer("change", "#page_programs");
    } else {
      $vc.sessionState.prevPage = "page_home";
      $vc.$$.catalogue();
    }
  }
});

$vc.$$ = function () {
  var _doneCatalogue = function (data, result, xhr) {
    $vc.fn.console("Success loading Catalogue");
    $vc.catalogueState = data;
    $vc.fn.putData();

    /* if there's just one catalogue item then go right over to the Programs */
    if (data.length === 1) {
      $vc.sessionState.catalogue = -1; /* use -1 to signify skipping catalogue - programs will make this 0 */
      $vc.sessionState.currPage = "page_home";
      $(":mobile-pagecontainer").pagecontainer("change", "#page_programs");
    } else {

      /* get tiles color and icon from db */
      var tiles = catlTileColor = catlTileIcon = catlTitle = "";

    //  debugger;

      $.each(data, function (key, value) {
        /* if this is a guest then we only want to render the selected catalogue items (unless set to "0" which is all), else render all catl items */
        if ($vc.sessionState.membLevel > 1 || $vc.sessionState.membCatalogue === "0" || $vc.sessionState.membCatalogue.lastIndexOf(value.catlNo) >= 0) {

          /* if program colors and icons are not setup on the catalogue table then use defaults */
          catlTileColor = (value.catlTileColor === "" ? "red" : value.catlTileColor);
          catlTileIcon = (value.catlTileIcon === "" ? "myCategories.png" : value.catlTileIcon);
          catlTitle = (value.catlTitle.length > 32 ? value.catlTitle.substring(0, 32) + "..." : value.catlTitle);

          tiles = tiles
            + "<li id=\"ele_$$_" + key + "\" class=\"tile\" style=\"background-color: " + catlTileColor + ";\">"
            + "  <div class=\"tileIcon\" style=\"background-image: url('styles/tiles/" + catlTileIcon + "');\"></div>"
            + "  <div class=\"tileTitle\">" + catlTitle + "</div>"
            + "</li>";
        }
      });
    }
    $("#tiles_$$").html(tiles);
  };
  var _failCatalogue = function (xhr, result, statusText) {
    alert("Error loading Catalogue!" + " ..." + result);
    alert(statusText);
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
    $(":mobile-pagecontainer").pagecontainer("change", "#page_programs");
  });
});