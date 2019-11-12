$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#img_$$_logo").attr("src", "styles/logos/" + ifElse($vc.profileState.logo, "vubz_en.png"))
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#ele_$$_homeIcon").hide();

    if ($vc.startState.host != "vubiz.com") {
      $("#ele_$$_membId")[0].value = "james.howe@vubiz.com";
      $("#ele_$$_membPwd")[0].value = "vub!z";
    };
  };
});

$vc.$$ = function () {
  var _done = function (data, result, xhr) {
    $vc.fn.console("success member");
    $vc.sessionState.membNo = parseInt(data.membNo);
    if ($vc.sessionState.membNo > 0) {
      $(":mobile-pagecontainer").pagecontainer("change", "#page_samplers");
    } else {
      $vc.fn.popup("Those credentials are not valid!");
    };
  };
  var _fail = function (xhr, result, statusText) {
    alert("Error accessing the Member Record : " + statusText);
  };

  return {
    member: function (membId, membPwd) {
      var parm = {};
      parm.membAcctId = "1001"; /* sampler uses DEMO1001 */
      parm.membId = membId;
      parm.membPwd = membPwd;
      $vc.ws("sp8samplerSignIn", parm, _done, _fail);
    }
  };
}();

$(function () {
  $("#ele_$$_check").on("click", function () {
    /* ensure two valid fields are entered */
    var membId = $("#ele_$$_membId")[0].value.toUpperCase();
    var membPwd = $("#ele_$$_membPwd")[0].value.toUpperCase();
    var ok = true;
    if (ok) { /* password must be at least 4 characters long */
      if (membId.length > 3) {
        ok = true
      } else {
        ok = false;
        $vc.fn.popup("[[Please enter a valid Email Address.]]");
      };
    };
    if (ok) { /* password must be at least 5 characters long */
      if (membPwd.length > 3) {
        ok = true
      } else {
        ok = false;
        $vc.fn.popup("[[Please enter a valid Password.]]");
      };
    };
    if (ok) {
      $vc.$$.member(membId, membPwd);
    };

  });
});