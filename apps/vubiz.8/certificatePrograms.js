
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {

    /* if this is an employee then don't render this page but launch the certificate program and go to the home page */
    if ($vc.sessionState.membType === "E") {
      $vc.$$.certificatePrograms();
      $(":mobile-pagecontainer").pagecontainer("change", "#page_home");
    };

    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_home";

    /* if we have a logo, display it */
    if ($vc.profileState.logo === undefined || $vc.profileState.logo.length === 0) {
      $("#ele_$$_logo").hide();
    } else {
      $("#ele_$$_logo").show();
      $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    };

  };
});



$vc.$$ = function () {
  return {
    _notUsed: function () { },
    certificatePrograms: function () {
      if ($vc.sessionState.membGuid === "") $vc.sessionState.membGuid = "mockGuidForTesting"; /* this should only work for V8 with GUIDS */
      var account = ($vc.sessionState.membType === "E") ? $vc.sessionState.certPrograms_E : $vc.sessionState.certPrograms;
      var url = $vc.startState.rteHost
              + "/V5/Default.asp"
              + "?vCust=" + account
              + "&vId=" + $vc.sessionState.membEmail
              + "&vFirstName=" + $vc.sessionState.membFirstName
              + "&vLastName=" + $vc.sessionState.membLastName
              + "&vEmail=" + $vc.sessionState.membEmail
              + "&vLang=" + $vc.sessionState.lang.toUpperCase()
              + "&vSource=" + "CLOSE"
              + "";
      window.open(url);
    }
  };
}();



$("#ele_$$_check").on("click", function () {
  $vc.$$.certificatePrograms();
});