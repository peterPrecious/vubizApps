
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {

    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#ele_$$_homeIcon").hide();
    $("#ele_$$_backIcon").hide();

    /* if we have a logo, display it */
    if ($vc.profileState.logo === undefined || $vc.profileState.logo.length === 0) {
      $("#ele_$$_logo").hide();
    } else {
      $("#ele_$$_logo").show();
      $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    }

    if (ok($vc.sessionState.membGuid).length === 36) {
      $("#content_$$").hide();
      $vc.$$.member();
    } else if (ok($vc.sessionState.userName).length > 9) {
      $("#content_$$").hide();
      $vc.$$.authenticate("auto");
    } else if (ok($vc.sessionState.custId).length === 8) {
      $("#content_$$").show();
      $("#div_$$_custId").hide();
      $("#ele_$$_custId")[0].value = $vc.sessionState.custId;
      $vc.$$.customer();
    }

    /* create tabindexes and allow Enter = Tab, pass in this page/div to handle Enter/Tab */
    getFormElements("content_$$");
  }

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
    }
  };
  var _getGuid = function () {
    $vc.sessionState.membGuid = $vc.memberState.membGuid;
  };
  var _doneCustomer = function (data, result, xhr) {
    if (data === null) {
      $vc.fn.popup("[[This account is inactive or has expired.]]");
    } else {
      $vc.fn.console("starting customer");
      $vc.customerState = data;
      $vc.customerState.langEn = data.langEn === "1";
      $vc.customerState.langFr = data.langFr === "1";
      $vc.customerState.langEs = data.langEs === "1";
      $vc.customerState.langPt = data.langPt === "1";
      $vc.sessionState.custNo = data.custNo;
      $vc.fn.putData();

      /* render the customer title on the header */
      $("#header_$$_title").html($vc.customerState.custTitle);
      $vc.fn.console("completed customer");
    }
  };
  var _doneAuthenticate = function (data, result, xhr) {
    $vc.fn.console("success authenticate");
    if (data.membGuid === "") {
      $vc.sessionState.secure = false;
      $vc.fn.popup("Invalid credentials. Note: Username<br />and Password are NOT case sensitive.");
    } else {
      $vc.sessionState.secure = true;
      $vc.sessionState.membGuid = data.membGuid;
      $vc.memberState.membGuid = data.membGuid;
      $vc.fn.putData();
      $vc.$$.member(); /* get this member's data */
    }
  };
  var _doneMember = function (data, result, xhr) {

    if (data === null) {
      alert("That member GUID is not on file!");

    } else {
      $vc.fn.console("success member");
      $vc.memberState = data;
      $vc.sessionState.membNo = parseInt(data.membNo);
      $vc.sessionState.membId = data.membId;
      $vc.sessionState.membEmail = data.membEmail;
      $vc.sessionState.membFirstName = data.membFirstName;
      $vc.sessionState.membLastName = data.membLastName;
      $vc.sessionState.membLevel = data.membLevel;
      $vc.sessionState.membNoVisits = data.membNoVisits;
      $vc.sessionState.membCatalogue = data.membCatalogue;
      $vc.sessionState.membOrganization = data.membOrganization;
      $vc.sessionState.membType = data.membType;
      $vc.sessionState.membNOPGuid = data.membNOPGuid;

      $vc.sessionState.secure = true;

      switch (parseInt(data.membLevel)) { /* these are used to turn on/off tiles */
        case 0: $vc.sessionState.membClass = "public"; break;
        case 1: $vc.sessionState.membClass = "guest"; break;
        case 2: $vc.sessionState.membClass = "learner"; break;
        case 3: $vc.sessionState.membClass = "facilitator"; break;
        case 4: $vc.sessionState.membClass = "manager"; break;
        case 5: $vc.sessionState.membClass = "administrator"; break;
      }

      $.when(
        $vc.fn.putData()
      ).then(function () {
        if ($vc.startState.startPage === undefined || $vc.startState.startPage === "") {
          $(":mobile-pagecontainer").pagecontainer("change", "#page_home");
        } else { // startPage comes via a URL parameter in Default.aspx
          $(":mobile-pagecontainer").pagecontainer("change", "#" + $vc.startState.startPage);
        }
      });
    }

  };
  var _failCustomer = function (xhr, result, statusText) {
    alert("Error accessing the Customer  Record : " + statusText);
  };
  var _failAuthenticate = function (xhr, result, statusText) {
    $vc.sessionState.secure = false;
    alert("Error trying to Authenticate : " + statusText);
  };
  var _failMember = function (xhr, result, statusText) {
    alert("Error accessing the Member Record : " + statusText);
  };

  return {
    customer: function () {
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      $vc.ws("customer", parm, _doneCustomer, _failCustomer);
    },
    authenticate: function (type) {
      $vc.fn.console("about to authenticate");
      _getMember(type);
      var parm = {};
      parm.applicationId = $vc.sessionState.applicationId;
      parm.userName = $vc.sessionState.userName;
      parm.membPassword = $vc.sessionState.membPassword;
      $vc.ws("authenticate", parm, _doneAuthenticate, _failAuthenticate);
    },
    member: function () {
      var parm = {};
      parm.membGuid = $vc.sessionState.membGuid;
      $vc.ws("member", parm, _doneMember, _failMember);
    }
  };
}();

$(function () {
  $("#ele_$$_check").on("click", function () {

    /* ensure two valid fields are entered */
    var membId = $("#ele_$$_membId")[0].value.toUpperCase();
    var membPassword = $("#ele_$$_membPassword")[0].value.toUpperCase();

    var ok = true;
    if (ok) { /* password must be at least 4 characters long */
      if (membId.length > 3) {
        ok = true;
      } else {
        ok = false;
        $vc.fn.popup("[[Please enter a valid Email Address.]]");
      }
    }
    if (ok) { /* password must be at least 5 characters long */
      if (membPassword.length > 3) {
        ok = true;
      } else {
        ok = false;
        $vc.fn.popup("[[Please enter a valid Password.]]");
      }
    }


    if (ok) {

      $vc.sessionState.applicationId = 1;
      $vc.sessionState.userName = $("#ele_$$_custId")[0].value + "\\" + $("#ele_$$_membId")[0].value;
      $vc.sessionState.membPassword = $("#ele_$$_membPassword")[0].value;
      $vc.$$.authenticate("form");

    }

  });
});