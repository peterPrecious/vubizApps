var $var_$$_initialized = false;

$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    if ($vc.startState.host === "localhost") $("#ele_$$_accessId")[0].value = "vub!z";

    $("#ele_$$_strDate").datepicker({ inline: true, dateFormat: "M d, yy", yearRange: "-7:+0", changeMonth: true, changeYear: true });
    $("#ele_$$_endDate").datepicker({ inline: true, dateFormat: "M d, yy", yearRange: "-7:+0", changeMonth: true, changeYear: true });

    if (!$var_$$_initialized) {

      $("#ele_$$_strDate")[0].value = formatDate(prvQtrStrDate());
      $("#ele_$$_endDate")[0].value = formatDate(prvMthEndDate());

      $var_$$_initialized = true;
      $vc.sessionState.secure = true;
      $vc.$$.initGUI();
    }




  }
});

$vc.$$ = function () {
  return {
    getId: function () {

      $vc.sessionState.membNo = 0;
      $vc.sessionState.accessId = $("#ele_$$_accessId").val().toUpperCase();

      if ($vc.sessionState.accessId === "GOVDEPT") $vc.sessionState.membNo = 1; /* this is CCOHS user */
      if ($vc.sessionState.accessId === "VUB!Z") $vc.sessionState.membNo = 2; /* this is VUBIZ user */

      if ($vc.sessionState.membNo === 0) {
        $vc.fn.popup("Please enter a valid Access Id.");
      } else {
        $vc.sessionState.strDate = formatDate($("#ele_$$_strDate")[0].value);
        $vc.sessionState.endDate = formatDate($("#ele_$$_endDate")[0].value);
        $(":mobile-pagecontainer").pagecontainer("change", "#page_organizations");
      }
    },
    initGUI: function () {
      $("#ele_$$_homeIcon").hide();
      $("#ele_$$_backIcon").hide();
      $("#ele_$$_videoIcon").hide();
    }

  };
}();

$(function () {
  $("#ele_$$_next").on("click", function () {
    $vc.$$.getId();
  });
});