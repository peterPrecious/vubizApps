$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") === "page_$$") {

    //* hide page in case there is only one program and we go directly to modules */
    //$("#" + "page_$$").hide()
    //$vc.fn.popup("Loading...");

    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    $vc.sessionState.prevPage = $vc.sessionState.contentSource === "ecommerce" || $vc.sessionState.contentSource === "assigned" ? "page_home" : "page_catalogue";

    /* added Apr 26, 2017 - not sure about this... */
    $vc.sessionState.catalogue = $vc.sessionState.catalogue === -1 ? 0 : $vc.sessionState.catalogue;

    $vc.$$.programs();  /* generate dynamic program tiles each visit */
  }
});

$vc.$$ = function () {
  var _donePrograms = function (data, result, xhr) {
    $vc.fn.console("success programs");
    $vc.programsState = data;
    $vc.fn.putData();
    var catlTileIcon, catlTileColor;

    if (data === null) {
      $vc.fn.popup("There are no Programs available to review!");
    } else {
      if ($vc.sessionState.contentSource === "ecommerce" || $vc.sessionState.contentSource === "assigned" || $vc.sessionState.contentSource === "ecom-assigned") { /* get tiles color and icon from catalogue object */
        catlTileIcon = "myCategories.png";
        /* default tile color to secondary color ... hack */
        $('<span id="getSecondaryColor" class="secondaryColor"></span>').appendTo('body');
        catlTileColor = $("#getSecondaryColor").css("color");
        $("#getSecondaryColor").remove();

      } else { /* get tiles color and icon from catalogue object */
        catlTileIcon = $vc.catalogueState[$vc.sessionState.catalogue].catlTileIcon;
        catlTileColor = $vc.catalogueState[$vc.sessionState.catalogue].catlTileColor;
      }

      var tiles = "", title, completed;
      //    debugger;

      $vc.sessionState.showSoloPrograms = true;

      if (data.length === 1 && !$vc.sessionState.showSoloPrograms) { /* if there's only one program then just render modules - UNLESS we want to show a single program */
        $vc.sessionState.program = 0; /* we need to grab this value to determine which tile icon/color to use in subsequent levels */
        $vc.sessionState.progId = data[0].progId;
        $vc.sessionState.progNo = data[0].progNo;

        $vc.sessionState.currPage = $vc.sessionState.prevPage;
        $vc.fn.putData();
        $(":mobile-pagecontainer").pagecontainer("change", "#page_modules");
      } else {
        $.each(data, function (key, value) {
          if (value.progCompleted.length > 0) {
            completed = " checked-tile";
          } else {
            completed = "";
          }
          if (value.progTitle2.indexOf($vc.sessionState.custId) === 0) { /* see if there is a custom title */
            title = value.progTitle2.substr(9, 128);
          } else {
            title = value.progTitle1;
          }

          /* if program colors and icons are not setup on the catalogue table then use defaults */
          catlTileColor = catlTileColor === "" ? "red" : catlTileColor;
          catlTileIcon = catlTileIcon === "" ? "myCategories.png" : catlTileIcon;
          title = title.length > 32 ? title.substring(0, 32) + "..." : title;

          tiles = tiles
            + "<li id=\"ele_$$_" + key + "\" class=\"tile" + completed + "\" style=\"background-color: " + catlTileColor + ";\">"
            + "  <div class=\"tileIcon\" style=\"background-image: url('styles/tiles/" + catlTileIcon + "');\"></div>"
            + "  <div class=\"tileTitle\">" + title + "</div>"
            + "</li>";
        });
        $("#tiles_$$").html(tiles);
        $vc.fn.popupClose();
      }
    }
  };

  var _failPrograms = function (xhr, result, statusText) {
    alert("Error Loading Programs!");
  };
  return {
    programs: function () {

      var parm;
      //alert($vc.sessionState.prevPage + " _programs");

      /* get programs from ecommerce */
      if ($vc.sessionState.contentSource === "ecommerce") {
        parm = {};
        parm.custId = $vc.sessionState.custId;
        parm.membNo = $vc.sessionState.membNo;
        $vc.ws("programsEcommerce", parm, _donePrograms, _failPrograms);
      }
      /* get programs from assigned on member table */
      else if ($vc.sessionState.contentSource === "assigned") {
        parm = {};
        parm.membNo = $vc.sessionState.membNo;
        $vc.ws("programsAssigned", parm, _donePrograms, _failPrograms);
      }
      /* get programs from ecommerce and/or assigned on member table  */
      else if ($vc.sessionState.contentSource === "ecom-assigned") {
        parm = {};
        parm.custId = $vc.sessionState.custId;
        parm.membNo = $vc.sessionState.membNo;
        $vc.ws("programsEcomAssigned", parm, _donePrograms, _failPrograms);
      }
      /* get programs from catalogue */
      else {
        /* extract the catlNo from catalogueState using parameterState.catalogue which is the tile number */
        $vc.sessionState.catlNo = $vc.catalogueState[$vc.sessionState.catalogue].catlNo;
        /* show video icon for each theme */
        $("#ele_programs_videoIcon").show();
        parm = {};
        parm.custId = $vc.sessionState.custId;
        parm.catlNo = $vc.sessionState.catlNo;
        parm.membNo = $vc.sessionState.membNo;
        $vc.ws("programs", parm, _donePrograms, _failPrograms);
      }
    }
  };
}();

$(function () { /* grab the selected tile number from the end of the parentElement id that was tapped */

  $("#content_$$").on("click", function (event) {



    var tileId = event.target.parentElement.id;
    var idStartsAt = tileId.lastIndexOf("_") + 1;
    var tileLength = tileId.length;
    var tileNo = right(tileId, tileLength - idStartsAt); /* the last 1 or 2 characters are the tile number */
    $vc.sessionState.program = parseInt(tileNo); /* we need to grab this value to determine which tile icon/color to use in subsequent levels */
    $vc.sessionState.progId = $vc.programsState[$vc.sessionState.program].progId;
    $vc.sessionState.progNo = $vc.programsState[$vc.sessionState.program].progNo;

    $(":mobile-pagecontainer").pagecontainer("change", "#page_modules");
  });

  $("#ele_programs_videoIcon").on("click", function (event) {
    var video = eval("$vc.videoState.catalogue_" + $vc.sessionState.catalogue);
    //alert("$vc.videoState.catalogue_" + $vc.sessionState.catalogue + "\n" + video);
    window.open("video.html?url=" + encodeURIComponent(video));
  });

});