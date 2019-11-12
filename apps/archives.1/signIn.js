
$(document).bind("pagebeforeshow", function () {

  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#ele_$$_homeIcon").hide();
    $("#ele_$$_backIcon").hide();

    //if ($vc.startState.host === "localhost") {
    //$("#ele_$$_membId")[0].value = "CCHS_SALES";
    $("#ele_$$_membId")[0].value = "VUV5_ADM";
    //};

  }
});

$vc.$$ = function () {

  var _doneSp5authenticate = function (data, result, xhr) {
    $vc.fn.console("success sp5authenticate");
    if (data === null) {
      $vc.sessionState.secure = false;
      alert("These Manager Credentials are not on the specified archive.");
    } else {
      $vc.sessionState.secure = true;
      $vc.sessionState.membLevel = data.exists;
      if ($vc.sessionState.membLevel === "5") {
        $vc.sessionState.cust = "****";
      } else {
        $vc.sessionState.cust = left($("#ele_$$_membId")[0].value, 4);
      }
      $.when(
        $vc.fn.putData()
      ).then(function () {
        if ($vc.sessionState.membLevel === "5") {
          $(":mobile-pagecontainer").pagecontainer("change", "#page_adm");
        } else {
          $(":mobile-pagecontainer").pagecontainer("change", "#page_mgr");
        }
      });
    }
  };

  var _failAuthenticate = function (xhr, result, statusText) {
    $vc.sessionState.secure = false;
    alert("These Manager Credentials are not on any archived database : " + statusText);
  };

  return {
    v5authenticate: function (type) {
      var parm = {};
      parm.membId = $("#ele_$$_membId")[0].value.toUpperCase();
      $vc.ws("sp5authenticate", parm, _doneSp5authenticate, _failAuthenticate);
    }
  };

}();

$(function () {
  $("#ele_$$_check").on("click", function () {
    $vc.$$.v5authenticate();
  });
});