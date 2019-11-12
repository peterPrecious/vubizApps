/* these are the fields we need for the learner */
var var_$$_status,
  var_$$_membGuid,
  var_$$_membNo,
  var_$$_membEmail,
  var_$$_membId,
  var_$$_membPassword,
  var_$$_membFirstName,
  var_$$_membLastName,
  var_$$_membActive,
  var_$$_membMemo,
  var_$$_membLevel,
  var_$$_membSessions;

$(document).bind("pagebeforeshow", function () {

  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);

    $(".ele_$$_membLevel").checkboxradio("enable");
    switch ($vc.sessionState.membLevel) {
      case "2": $(".ele_$$_membLevel").checkboxradio("disable"); break;
      case "3": $("#ele_$$_membLevel_3").checkboxradio("disable"); $("#ele_$$_membLevel_4").checkboxradio("disable"); break;
      case "4": $("#ele_$$_membLevel_4").checkboxradio("disable"); break;
    }

    /* if we have a tempMembGuid then we know it's an Edit  */
    if ($vc.sessionState.tempMembGuid === undefined) $vc.sessionState.tempMembGuid = "";

    if ($vc.sessionState.tempMembGuid === "") { /* Add a new learner profile */
      $vc.$$.setLearner();
    } else { /* Edit learner profile */
      var_$$_status = "Edit";
      $("#ele_$$_title").html(var_$$_status);
      var_$$_membGuid = $vc.sessionState.tempMembGuid;
      $("#var_$$_membPassword").hide();
      $vc.$$.getLearner(var_$$_membGuid); /* get learner to be modified */
    }

    /* create tabindexes and allow Enter = Tab, pass in this page/div to handle Enter/Tab */
    getFormElements("content_$$");
  }
});




$vc.$$ = function () {
  var _doneGet = function (data, result, xhr) {
    $vc.fn.console("Success loading learner");
    if (data !== null) {
      $("#ele_$$_membEmail")[0].value = data.membEmail;
      $("#ele_$$_membEmail").prop("readonly", "readonly");
      var_$$_membPassword = data.membPassword;
      $("#ele_$$_membFirstName")[0].value = data.membFirstName;
      $("#ele_$$_membLastName")[0].value = data.membLastName;
      $("#ele_$$_membMemo")[0].value = data.membMemo;
      if (data.membActive === "True") {
        $("#ele_$$_membActive_1").prop("checked", true).checkboxradio("refresh");
        $("#ele_$$_membActive_0").prop("checked", false).checkboxradio("refresh");
      } else {
        $("#ele_$$_membActive_1").prop("checked", false).checkboxradio("refresh");
        $("#ele_$$_membActive_0").prop("checked", true).checkboxradio("refresh");
      }

      var_$$_membLevel = data.membLevel;
      $(".ele_$$_membLevel").prop("checked", false).checkboxradio("refresh");
      switch (var_$$_membLevel) {
        case "2": $("#ele_$$_membLevel_2").prop("checked", true).checkboxradio("refresh"); break;
        case "3": $("#ele_$$_membLevel_3").prop("checked", true).checkboxradio("refresh"); break;
        case "4": $("#ele_$$_membLevel_4").prop("checked", true).checkboxradio("refresh"); break;
      }
      var_$$_membSessions = data.membSessions;
      if (var_$$_membSessions > 0) {
        $("#ele_$$_delete").hide();
      } else {
        $("#ele_$$_delete").show();
      }

    }
    delete $vc.sessionState.tempMembGuid; /* remove this from the session object */
    $.mobile.loading("hide");
  };
  var _donePut = function (data, result, xhr) {
    if (data.status === "dup") {
      $vc.fn.popup("There is a learner on file with those credentials.");
    } else {
      $vc.fn.popup("That profile was added successfully.");
      $vc.$$.setLearner();
    }
  };
  var _doneDel = function (data, result, xhr) {
    if (data.status === "ok") {
      $vc.fn.popup("That profile was deleted successfully.");
      $vc.$$.setLearner();
    }
  };

  var _fail = function (xhr, result, statusText) {
    $.mobile.loading("hide");
    alert("Error loading learner");
  };

  return {

    setLearner: function () {
      var_$$_status = "Add";
      $("#ele_$$_title").html(var_$$_status);

      $("#ele_$$_membEmail")[0].value = "";
      $("#ele_$$_membPassword")[0].value = "";
      $("#ele_$$_membFirstName")[0].value = "";
      $("#ele_$$_membLastName")[0].value = "";
      $("#ele_$$_membMemo")[0].value = "";

      $("#var_$$_membPassword").show();
      $("#ele_$$_membEmail").prop("readonly", "");
      $("#ele_$$_membActive_1").prop("checked", true).checkboxradio("refresh");
      $("#ele_$$_membActive_0").prop("checked", false).checkboxradio("refresh");
      $("#ele_$$_membLevel_2").prop("checked", true).checkboxradio("refresh");
      $("#ele_$$_membLevel_3").prop("checked", false).checkboxradio("refresh");
      $("#ele_$$_membLevel_4").prop("checked", false).checkboxradio("refresh");
      $("#ele_$$_delete").hide();
    },

    getLearner: function (membGuid) {
      $.mobile.loading("show");
      var parm = {};
      parm.membGuid = membGuid;
      $vc.ws("learner", parm, _doneGet, _fail);
    },

    delLearner: function () {
      var parm = {};
      parm.membGuid = var_$$_membGuid;
      $vc.ws("learnerDelete", parm, _doneDel, _fail);
    },

    putLearner: function () {
      /* extract fields */
      var_$$_membEmail = $("#ele_$$_membEmail")[0].value.toLowerCase();
      var_$$_membId = var_$$_membEmail.toUpperCase();
      var_$$_membPassword = $("#ele_$$_membPassword")[0].value;
      var_$$_membFirstName = $("#ele_$$_membFirstName")[0].value;
      var_$$_membLastName = $("#ele_$$_membLastName")[0].value;
      var_$$_membMemo = $("#ele_$$_membMemo")[0].value;

      var_$$_membActive = $("#ele_learner_membActive_1").prop("checked") ? true : false;
      var_$$_membLevel = $("#ele_learner_membLevel_2").prop("checked") ? 2 : $("#ele_learner_membLevel_3").prop("checked") ? 3 : 4;

      /* edit fields (note: need to consider if there's a password (only on New unless SSO) */
      var ok = true;
      if (ok && !isValid(var_$$_membEmail, "email", 4, 128)) {
        ok = false;
        $vc.fn.popup("Please use a properly formatted Email Address.");
      }
      if (ok && var_$$_status === "New" && !isValid(var_$$_membPassword, "password", 4, 128)) {
        ok = false;
        $vc.fn.popup("Please enter a Password (4-128 chars).");
      }
      if (ok && !isValid(var_$$_membFirstName, "alphaNumeric", 1, 32)) {
        ok = false;
        $vc.fn.popup("Please enter a First Name (or Initial).");
      }
      if (ok && !isValid(var_$$_membLastName, "alphaNumeric", 1, 64)) {
        ok = false;
        $vc.fn.popup("Please enter a Last Name.");
      }

      if (ok) {
        var parm = {};
        if (var_$$_status === "Edit") {
          parm.membActive = var_$$_membActive;
          parm.membEmail = var_$$_membEmail.toLowerCase();
          parm.membFirstName = var_$$_membFirstName;
          parm.membGuid = var_$$_membGuid;
          parm.membLastName = var_$$_membLastName;
          parm.membLevel = var_$$_membLevel;
          parm.membMemo = var_$$_membMemo;
          $vc.ws("learnerEdit", parm, _donePut, _fail);
        } else {
          parm.custId = $vc.sessionState.custId;
          parm.membId = var_$$_membEmail.toUpperCase();
          parm.membEmail = var_$$_membEmail.toLowerCase();
          parm.membFirstName = var_$$_membFirstName;
          parm.membLastName = var_$$_membLastName;
          parm.membActive = var_$$_membActive;
          parm.membMemo = var_$$_membMemo;
          parm.membLevel = var_$$_membLevel;
          parm.membPassword = var_$$_membPassword;
          $vc.ws("learnerNew", parm, _donePut, _fail);
        }
      }
    }

  };

}();


$("#ele_$$_check").on("click", function () {
  $vc.$$.putLearner();
});

$("#ele_$$_delete").on("click", function () {
  $vc.$$.delLearner();
});



$("#pop_$$_membEmail").on("click", function () {
  $vc.fn.popup("This is the unique identifier for this learner. Once assigned, it cannot be modified (currently).");
});

$("#pop_$$_membActive").on("click", function () {
  $vc.fn.popup("Learners with any history cannot be deleted but they can be inactivated. Inactive Learners cannot access this service but they can appear on various reports.");
});

$("#pop_$$_membLevel").on("click", function () {
  $vc.fn.popup("Everyone is a Learner and can access Content. A Facilitator maintains the Learner Profiles and can access Reports. A Manager assigns Facilitators.");
});

$("#pop_$$_membMemo").on("click", function () {
  $vc.fn.popup("This is an optional field that is relevant to your organization. The memo field will appear on the Learner Report (Excel Version).");
});

$("#pop_$$_membPassword").on("click", function () {
  $vc.fn.popup("Passwords are temporarily assigned by Facilitators when a new profile is added. The learner can modify their password on the profile page of the main service.");
});
