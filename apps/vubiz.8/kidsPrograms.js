$(document).bind("pagebeforeshow", function () {

  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_home";

    /* if we have a logo, display it */
    if ($vc.profileState.logo === undefined || $vc.profileState.logo.length === 0) {
      $("#ele_$$_logo").hide();
    } else {
      $("#ele_$$_logo").show();
      $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    }

    // this is the kids program we want to launch - it must be a catalogue title
    $vc.$$_catlItem = $vc.sessionState.lang === "en" ? "Kids Business Literacy" : "Connaissance du monde des affaires pour les enfants";
  }

});

$("#ele_$$_1").on("click", function () { $vc.$$.catalogue(); }); // this will launch the designated program
$("#ele_$$_2").on("click", function () { window.open("//vukidz.vubiz.com"); });
$("#ele_$$_3").on("click", function () { window.open("//misformoney.ca"); });

$vc.$$ = function () {
  var _doneCatalogue = function (data, result, xhr) {
    $vc.fn.console("Success loading Catalogue via Kidz tile");
    $vc.catalogueState = data;
    $vc.fn.putData();
    $vc.$$.findCatlItem($vc.$$_catlItem);
  };
  var _fail = function (xhr, result, statusText) {
    alert("Error loading Catalogue from Kidz tile!" + " ..." + result);
    alert(statusText);
  };
  return {
    catalogue: function () {    // get the catalogue if never retrieved
      if ($vc.catalogueState.length === undefined) {
        var parm = {};
        parm.custId = $vc.sessionState.custId;
        $vc.ws("catalogue", parm, _doneCatalogue, _fail);
      } else {
        $vc.$$.findCatlItem($vc.$$_catlItem);
      }
    },
    findCatlItem: function (catlTitle) {
      var ok = false;
      $.each($vc.catalogueState, function (key, value) {
        // look for a catlItem with a matching title
        // if a guest ensure the catlItem is on the members record
        if
          (
            value.catlTitle === catlTitle && $vc.sessionState.membLevel > 1
            ||
            value.catlTitle === catlTitle && $vc.sessionState.membCatalogue.lastIndexOf(value.catlNo) >= 0
          ) {
          $vc.sessionState.catalogue = parseInt(key);
          ok = true;
          $(":mobile-pagecontainer").pagecontainer("change", "#page_programs");
        }
      });
      // if this catlTitle is not on the catalogue then alert - common for CFIB Guests
      var message = "[[Sorry, but ']]" + catlTitle + "[[' is not available. Please contact your site administrator.]]";
      if (!ok) $vc.fn.popup(message);
    }
  };
}();