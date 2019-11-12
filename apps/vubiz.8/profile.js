
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_home"; /* ensure we return to programs */
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);

    /* populate profile */
    $("#ele_$$_welcome").html("[[Welcome]]" + "&nbsp;" + $vc.sessionState.membFirstName);
    //$("#ele_$$_custId").html($vc.sessionState.custId);
    $("#ele_$$_membId").html($vc.sessionState.membId);
    $("#ele_$$_membFirstName").html($vc.sessionState.membFirstName);
    $("#ele_$$_membLastName").html($vc.sessionState.membLastName);
    $("#ele_$$_membEmail").html($vc.sessionState.membEmail);
    $("#ele_$$_membNoVisits").html($vc.sessionState.membNoVisits);

    /* if there's a guid enable password change, else remains hidden for backdoor */
    if (isValid($vc.sessionState.membGuid, "guid") && $vc.sessionState.password) $("#div_$$_profile").show();

    /* show if passwords can be changed */
    if ($vc.sessionState.password) $("#div_$$_profile").show();

    /* create tabindexes and allow Enter = Tab, pass in this page/div to handle Enter/Tab */
    getFormElements("content_$$");
  }
});

$vc.$$ = function () {
  var _donePassword = function (data, result, xhr) {
    /* check if changed = 1 or 2 */
    if (data.passwordChanged === "1") {
      $vc.fn.popup("[[Your Password has been updated.]]");
      $vc.fn.console("Successfully modified password");
    } else {
      $vc.fn.popup("[[Your Password has NOT been updated.<br />Are you certain you submitted the proper 'Current Password'?]]");
      $vc.fn.console("Unsuccessfully modified password");
    }

  };
  var _failPassword = function (xhr, result, statusText) {
    $vc.fn.popup("[[Your Password has NOT been updated.<br />Are you certain you submitted the proper 'Current Password'?]]");
    $vc.fn.console("Unsuccessfully modified password");
  };

  return {
    _getPasswords: function () {

    },
    password: function () {

      var passwordOld = $("#ele_$$_passwordOld")[0].value.toUpperCase();
      var passwordNew = $("#ele_$$_passwordNew")[0].value.toUpperCase();
      var passwordCon = $("#ele_$$_passwordCon")[0].value.toUpperCase();
      var ok = true;


      if (ok) { /* old password must be at least 5 characters long */
        if (passwordOld.length > 4) {
          ok = true;
        } else {
          ok = false;
          $vc.fn.popup("[[Current Password must be greater than 4 characters in length.]]");
        }
      }

      if (ok) { /* new password must be at least 5 characters long */
        if (passwordNew.length > 4) {
          ok = true;
        } else {
          ok = false;
          $vc.fn.popup("[[New Password must be greater than 4 characters in length.]]");
        }
      }

      if (ok) { /* new and conf must be equal */
        if (passwordNew === passwordCon) {
          ok = true;
        } else {
          ok = false;
          $vc.fn.popup("[[Your New Passwords are not the same.]]");
        }
      }

      if (ok) {
        var parm = {};
        parm.membGuid = $vc.sessionState.membGuid;
        parm.passwordOld = passwordOld;
        parm.passwordNew = passwordNew;
        $vc.ws("password", parm, _donePassword, _failPassword);
      }
    }
  };

}();

$("#ele_$$_learning").on("click", function () {
  $(":mobile-pagecontainer").pagecontainer("change", "#page_learningCenter");
});

$("#ele_$$_browser").on("click", function () {
  window.open("Default.aspx?appId=browser.3&lang=" + $vc.sessionState.lang, "_blank");
});

$("#ele_$$_check").on("click", function () {
  $vc.$$.password();
});
