var var_$$_status;

$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_myGuests"; /* ensure we return to programs */

    if (isOk($vc.sessionState.guestNo)) {
      /* if we came here from the guest list then we want to edit a guest */
      var_$$_status = "upd";
      $(".$$_upd").show();
      $(".$$_new").hide();
      /* get existing guest and populate form */
      $vc.$$.getGuest($vc.sessionState.guestNo);
      /* overwrite password */
      $("#ele_$$_membPassword")[0].value = "";
      $vc.sessionState.guestNo = null;
      $("#header_$$_title").html("[[Update Employee]]");
      $("#ele_$$_check").html("[[Update Employee]]");
    } else {
      /* if we came here from the guest list then we want to edit a guest */
      var_$$_status = "new";
      $(".$$_upd").hide();
      $(".$$_new").show();
      $("#ele_$$_membEmail")[0].value = "";
      $("#ele_$$_membPassword")[0].value = "";
      $("#ele_$$_membFirstName")[0].value = "";
      $("#ele_$$_membLastName")[0].value = "";
      $("#ele_$$_membActive").prop("checked", true).checkboxradio("refresh");
      $("#ele_$$_membActive_0").prop("checked", false).checkboxradio("refresh");
      $("#header_$$_title").html("[[Add an Employee]]");
      $("#ele_$$_check").html("[[Add an Employee]]");
    }

    /* create tabindexes and allow Enter = Tab, pass in this page/div to handle Enter/Tab */
    getFormElements("content_$$");
  }
});

$vc.$$ = function () {

  var _doneGetGuest = function (data, result, xhr) {
    $vc.fn.console("Successfully retrieved guest");
    /* populate form */
    $("#ele_$$_membEmail")[0].value = data.membEmail;
    $("#ele_$$_membPassword")[0].value = data.membPassword;
    $("#ele_$$_membFirstName")[0].value = data.membFirstName;
    $("#ele_$$_membLastName")[0].value = data.membLastName;
    $("#ele_$$_membActive").prop("checked", data.membActive === "True").checkboxradio("refresh");
    $("#ele_$$_membActive_0").prop("checked", data.membActive !== "True").checkboxradio("refresh");
  };
  var _failGetGuest = function (xhr, result, statusText) {
    $vc.fn.console("Unsuccessfully retrieved guest");
  };
  var _doneGuest = function (data, result, xhr) {
    if (data.msgId === "ins ok") {
      //$vc.fn.popup("Guest has been added successfully.")
      $vc.fn.console("Successfully added guest");
      $(":mobile-pagecontainer").pagecontainer("change", "#page_guests");
    } else if (data.msgId === "upd ok") {
      //$vc.fn.popup("Guest has been modified successfully.")
      $vc.fn.console("Successfully modified guest");
      $(":mobile-pagecontainer").pagecontainer("change", "#page_guests");
    } else if (data.msgId === "id on file") {
      $vc.fn.popup("That email address is already on file.");
      $vc.fn.console("Did NOT add guest");
    }
  };
  var _failGuest = function (xhr, result, statusText) {
    $vc.fn.console("Unsuccessfully modified guest");
    $vc.fn.popup("This Guest has NOT been updated.\nCertain fields must be invalid.");
  };

  return {
    getGuest: function (membNo) {
      var parm = {};
      parm.membNo = membNo;
      $vc.ws("getGuest", parm, _doneGetGuest, _failGetGuest);
    },
    guest: function () {
      var var_$$_membEmail = $("#ele_$$_membEmail")[0].value.toLowerCase();
      var var_$$_membPassword = $("#ele_$$_membPassword")[0].value.toUpperCase();
      var var_$$_membFirstName = $("#ele_$$_membFirstName")[0].value;
      var var_$$_membLastName = $("#ele_$$_membLastName")[0].value;
      var var_$$_membActive = $("#ele_$$_membActive")[0].checked;

      var ok = true;
      /* if "new" then check email and password */
      if (var_$$_status === "new") {
        if (ok && !isValid(var_$$_membEmail, "email", 4, 128)) {
          ok = false;
          $vc.fn.popup("[[Please use a properly formatted Email Address.]]");
        }
        if (ok && !isValid(var_$$_membPassword, "password", 4, 128)) {
          ok = false;
          $vc.fn.popup("[[Password must be unique using only English alpha, numeric and !@$%^*()_+-{}[];<>,.: characters. It is NOT case sensitive.]]");
        }
      }

      /* always check name */
      if (ok && !isValid(var_$$_membFirstName, "alphaNumeric", 1, 32)) {
        ok = false;
        $vc.fn.popup("[[Please enter a First Name (or Initial).]]");
      }
      if (ok && !isValid(var_$$_membLastName, "alphaNumeric", 1, 64)) {
        ok = false;
        $vc.fn.popup("[[Please enter a Last Name.]]");
      }
      if (ok) {
        var parm = {};
        parm.custId = $vc.sessionState.custId;
        parm.membEmail = var_$$_membEmail;
        parm.membPassword = var_$$_membPassword;
        parm.membFirstName = var_$$_membFirstName;
        parm.membLastName = var_$$_membLastName;
        parm.membActive = var_$$_membActive;
        parm.membParent = $vc.sessionState.membNo;
        parm.membOrganization = ifElse($vc.sessionState.membOrganization, 0); // if there is no organization use 0

        $vc.ws("guest", parm, _doneGuest, _failGuest);
      }
    }
  };

}();

$("#ele_$$_check").on("click", function () {
  $vc.$$.guest();
});