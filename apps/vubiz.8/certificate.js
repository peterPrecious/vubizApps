$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_historyProgram"; /* ensure we return to programs */
    $vc.$$.renderCertificate();
  };
});

$vc.$$ = function () {
  return {
    renderCertificate: function () {
      $("#content_$$ iframe").show();

      // ensure there are no undefined fields here else v5 will puke
      if (typeof $vc.sessionState.custId === "undefined") $vc.sessionState.custId = "";
      if (typeof $vc.sessionState.historyProgId === "undefined") $vc.sessionState.historyProgId = "";
      if (typeof $vc.sessionState.historyModsId === "undefined") $vc.sessionState.historyModsId = "";
      if (typeof $vc.sessionState.historyModsScore === "undefined") $vc.sessionState.historyModsScore = "";
      if (typeof $vc.sessionState.historyModsDate === "undefined") $vc.sessionState.historyModsDate = "";
      if (typeof $vc.sessionState.historyModsDate === "undefined") $vc.sessionState.historyModsDate = "";
      if (typeof $vc.sessionState.membEmail === "undefined") $vc.sessionState.membEmail = "";

      var url = $vc.startState.rteHost
        + "/V5/Default.asp"
        + "?vCust=" + $vc.sessionState.custId
        + "&vId=" + $vc.sessionState.historyMembId
        + "&vSource=v8"
        + "&vGoto=" + "/v5/certificate.asp"
        + "~3vCustId~2" + $vc.sessionState.custId
        + "~1vProgId~2" + $vc.sessionState.historyProgId
        + "~1vModsId~2" + $vc.sessionState.historyModsId
        + "~1vScore~2" + $vc.sessionState.historyModsScore
        + "~1vDate~2" + $vc.sessionState.historyModsDate
        + "~1vEmail~2" + $vc.sessionState.membEmail;

      $vc.fn.console(url);
      $("#content_$$ iframe").attr("width", 800).attr("height", 650).attr("frameborder", 0).attr("src", url);
    }
  };
}();


$("#ele_$$_back").on("click", function () {
  /* maybe force a V5 close? */
  $(":mobile-pagecontainer").pagecontainer("change", "#page_historyProgram");
});