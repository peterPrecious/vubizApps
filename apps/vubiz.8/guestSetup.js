var var_$$_init = false;  /* only  initialize once, not each time this page is rendered */
var var_$$_catlItems = "";

$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_myGuests"; /* ensure we return to programs */

    if (!var_$$_init) { /* only load static catalogue once */
      var_$$_init = true;
      $vc.$$.catalogue();
      var_$$_catlItems = $vc.sessionState.membCatalogue.split("|");
    };
  };
});

$vc.$$ = function () {
  var _getCustId = function () { /* get customer ID from URL or use house account */
    return ifElse($.getUrlVar("custId"), $("#ele_$$_custId")[0].value);
  };
  var _getMember = function (type) {
    $vc.sessionState.applicationId = 1;
    /* if type = auto then we have the values stored in parameterState */
    if (type === "form") {
      $vc.sessionState.membId = $("#ele_$$_membId")[0].value;
      $vc.sessionState.userName = $("#ele_$$_custId")[0].value + "\\" + $("#ele_$$_membId")[0].value;
      $vc.sessionState.membPassword = $("#ele_$$_membPassword")[0].value;
    };
  };
  var _getGuid = function () {
    $vc.sessionState.membGuid = $vc.memberState.membGuid;
  };
  var _isChecked = function (catlNo) {
    for (i = 0; i <= var_$$_catlItems.length; i++) {
      if (var_$$_catlItems[i] === catlNo) return "checked=\"checked\"";
    }
    return "";
  };
  var _clearChecks = function () {

    $(".$$_items").prop("checked", true);

    //$("input:checkbox").each(function () {
    //  this.checked = true;
    //});
  };

  var _doneCatalogue = function (data, result, xhr) {
    $vc.fn.console("Success loading Catalogue");
    $vc.catalogueState = data;
    $vc.fn.putData();
    /* start list of catalogue values with "All" (value *), then follow with catalogue values so we know what this learner's guess can access */
    var catlItems = "<label><input class='$$_items' type='checkbox' name='ele_$$_items' id='ele_$$_0' " + _isChecked("0") + ">[[All THEMES]]</label>";
    $.each(data, function (key, value) {
      catlItems = catlItems
        + "<label><input class=\"$$_items\" type=\"checkbox\" name=\"ele_$$_items\" id=\"ele_$$_" + value.catlNo + "\" " + _isChecked(value.catlNo) + ">" + value.catlTitle + "</label>";
    });
    $("#ele_$$_catlItems").append(catlItems);
    $(".$$_items").checkboxradio();
    $("#ele_$$_catlItems").controlgroup("refresh");

    $(".$$_items").change(function () { // if selecting themes
      if ($("#ele_$$_0")[0].checked) {
        $(".$$_items").each(function () {
          $(this).prop("checked", false).checkboxradio("refresh");
        });
        $(this).prop("checked", true).checkboxradio("refresh");
      }
    });
  };
  var _doneCustomer = function (data, result, xhr) {
    if (data === null) {
      alert("An empty Customer Record was returned");
    } else {
      $vc.fn.console("starting customer");
      $vc.customerState = data;
      $vc.customerState.langEn = (data.langEn === "1");
      $vc.customerState.langFr = (data.langFr === "1");
      $vc.customerState.langEs = (data.langEs === "1");
      $vc.customerState.langPt = (data.langPt === "1");

      $vc.sessionState.custNo = data.custNo;
      $vc.fn.putData();

      /* render the customer title on the header */
      $("#header_$$_title").html($vc.customerState.custTitle);
      $vc.fn.console("completed customer");
    };
  };
  var _doneAuthenticate = function (data, result, xhr) {
    $vc.fn.console("success authenticate");
    if (data === null) {
      $vc.sessionState.secure = false;
      $vc.fn.popup("Invalid or missing password.<br />Note: passwords are not case sensitive.");
    } else {
      $vc.sessionState.secure = true;
      $vc.sessionState.membGuid = data.membGuid;
      $vc.memberState.membGuid = data.membGuid;
      $vc.fn.putData();
      $vc.$$.member(); /* get this member's data */
    }
  };
  var _doneMember = function (data, result, xhr) {
    $vc.fn.console("success member");
    $vc.memberState = data;
    $vc.sessionState.membNo = parseInt(data.membNo);
    $vc.sessionState.membId = data.membId;
    $vc.sessionState.membEmail = data.membEmail;
    $vc.sessionState.membFirstName = data.membFirstName;
    $vc.sessionState.membLastName = data.membLastName;
    $vc.sessionState.membLevel = data.membLevel;
    $vc.sessionState.membNoVisits = data.membNoVisits;

    $vc.sessionState.secure = true;

    switch (parseInt(data.membLevel)) { /* these are used to turn on/off tiles */
      case (0): $vc.sessionState.membClass = "public"; break;
      case (1): $vc.sessionState.membClass = "guest"; break;
      case (2): $vc.sessionState.membClass = "learner"; break;
      case (3): $vc.sessionState.membClass = "facilitator"; break;
      case (4): $vc.sessionState.membClass = "manager"; break;
      case (5): $vc.sessionState.membClass = "administrator"; break;
    };

    $.when(
      $vc.fn.putData()
    ).then(function () {
      $(":mobile-pagecontainer").pagecontainer("change", "#page_home");
    });

  };
  var _doneGuestSetup = function (data, result, xhr) {
    if (data.Status === "err") {
      $vc.fn.popup("Error Creating the Employee Training Centre.<br/>Please contact support.");
    } else {
      $(":mobile-pagecontainer").pagecontainer("change", "#page_myGuests");
    }
  };

  var _fail = function (xhr, result, statusText) {
    alert("Data Error! Call Systems [" + statusText + "]");
  };

  return {
    customer: function () {
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      $vc.ws("customer", parm, _doneCustomer, _fail);
    },
    authenticate: function (type) {
      $vc.fn.console("about to authenticate");
      _getMember(type);
      var parm = {};
      parm.applicationId = $vc.sessionState.applicationId;
      parm.userName = $vc.sessionState.userName;
      parm.membPassword = $vc.sessionState.membPassword;
      $vc.ws("authenticate", parm, _doneAuthenticate, _fail);
    },
    member: function () {
      var parm = {};
      parm.membGuid = $vc.sessionState.membGuid;
      $vc.ws("member", parm, _doneMember, _fail);
    },
    catalogue: function () {
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      $vc.ws("catalogue", parm, _doneCatalogue, _fail);
    },
    guestSetup: function () { /* update the member record */
      var parm = {};
      parm.membGuid = $vc.sessionState.membGuid;
      parm.membCatalogue = $vc.sessionState.membCatalogue;
      $vc.ws("guestSetup", parm, _doneGuestSetup, _fail);
    }
  };
}();

$(function () {
  $("#ele_$$_check").on("click", function () {
    var catlItems = "";
    for (i = 0; i < $(".$$_items").length; i++) {
      if ($(".$$_items")[i].checked) {
        catlItems = catlItems + "|" + $(".$$_items")[i].id.split("_")[2];
      };
    };
    /* strip off leading pipe */
    var catlArray = catlItems.split("|");
    if (catlArray.length > 0) catlItems = catlItems.substr(1, 999);
    $vc.sessionState.membCatalogue = catlItems;
    $vc.fn.putData();

    $vc.$$.guestSetup();
  });
});
