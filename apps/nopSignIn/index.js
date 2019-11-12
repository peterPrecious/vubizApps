// these are the fields we need for the learner 
var var_$$_ecomId, var_$$_ecomPwd, var_$$_ecomGuid;

//var var_$$_membMemo = "nopAdmin";

$(document).bind("pagebeforeshow", function () {

  if ($.mobile.activePage.attr("id") === "page_$$") {
    $(".ui-header, .ui-footer").hide();

    if ($vc.sessionState.storeId === "" || $vc.sessionState.custId === "" || $vc.sessionState.returnUrl === "" || $vc.sessionState.cancelUrl === "") {
      // ensure storeId, custId, cancelUrl and returnUrl were passed in...
      $("#content").html("");
      $vc.fn.popup("This app was launched incorrectly! Please contact Systems.<br><br> [...missing or invalid launch parameters: storeId, custId, cancelUrl and/or returnUrl...]");
    } else {
      // otherwise go to portal for signin, passing through stuff
      $(".ui-page").hide();
      location.href = location.origin + "/portal/v7/default.aspx" + location.search;
    }
  }
});


$(function () {
  $("#" + elements[0]).focus();
});

$vc.$$ = function () {
  var _doneUrl = function (data, result, xhr) {
    if (data.guid.length > 0) {
      var url = $vc.sessionState.returnUrl + "?ecomGuid=" + var_$$_ecomGuid + "&token=" + data.guid;
      //$vc.fn.popup("That profile was added successfully.<br>Returning to " + url);
      location.href = url;
    } else {
      $vc.fn.popup("Unable to generate the token, please contact systems!");
    }
  };
  var _doneGet = function (data, result, xhr) {
    if (data === null) {
      $vc.fn.popup("I'm sorry but those credentials are not on file or you are registered in another store.");
    } else if (isValid("guid", data.ecomGuid)) {
      var_$$_ecomGuid = data.ecomGuid;
      $vc.index.urlReturn();
    } else {
      $vc.fn.popup("These credentials are problematic. Please contact systems!");
    }
  };
  var _fail = function (xhr, result, statusText) {
    $.mobile.loading("hide");
    alert("Error loading learner");
  };
  return {
    setLearner: function () {
      $("#ele_$$_ecomId")[0].value = "";
      $("#ele_$$_ecomPwd")[0].value = "";
    },
    getLearner: function () {
      var parm = {};
      parm.ecomId = var_$$_ecomId;
      parm.ecomPwd = var_$$_ecomPwd;
      parm.ecomStoreId = $vc.sessionState.storeId;
      $vc.ws("ecomSignIn", parm, _doneGet, _fail);
    },
    urlReturn: function () {
      var parm = {};
      parm.minutes = 10;
      $vc.ws("sp8tokenSet", parm, _doneUrl, _fail);
    }
  };
}();

/* these are click events */
$("#ele_$$_check").on("keypress click", function (e) {
  if (e.which === 13 || e.type === "click") {
    var errors = "";
    if ($("#ele_$$_ecomId")[0].value === "") errors += "Id / Username<br />";
    if ($("#ele_$$_ecomPwd")[0].value === "") errors += "Password<br />";
    if (errors.length > 0) {
      $vc.fn.popup("Please enter:<br><br>" + errors);
    } else {
      // ele3 validity of fields
      var_$$_ecomId = $("#ele_$$_ecomId")[0].value.toUpperCase();
      var_$$_ecomPwd = $("#ele_$$_ecomPwd")[0].value.toUpperCase();
      var ok = true;
      if (ok) { $vc.index.getLearner(); }
    }
  }
});
$("#ele_$$_cancel").on("click", function () {
  var url = $vc.sessionState.cancelUrl;
  location.href = url;
});
$("#ele_$$_register").on("click", function () { // this is called when they tried to login but haven't yet registered
  var url = location.href;
  url = url.replace("nopSignIn", "nopRegister");
  location.href = url;
});
$("#ele_$$_retrieve").on("click", function () { // this is called when they want to retrieve their password, using the custId get the profile
  var parm = {};
  parm.custId = $.getUrlVar("custId");
  //    alert(parm.custId);
  $vc.ws("v8profile", parm,
    function (data, result, xhr) {
      if (data.profile.length === 0) {
        $vc.fn.popup("Cannot determine Profile. Contact Systems.");
      } else {
        var url = "/v8credentials?profile=" + data.profile;
        window.open(url);
      }
    },
    function (xhr, result, statusText) {
      $vc.fn.popup("Cannot acquire Profile. Contact Systems.");
    }
  );
});

/* these are help fields */
$("#pop_$$_ecomId").on("click", function () {
  $vc.fn.popup("The User Name is your unique identifier that you assigned during Registration. Note this field cannot be modified.");
});
$("#pop_$$_ecomPwd").on("click", function () {
  $vc.fn.popup("Enter the Password you assigned during Registration.");
});
