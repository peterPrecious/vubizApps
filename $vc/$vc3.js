/* vubiz objects */
var $vc = {};                     /* vubiz client */
$vc.fn = {};                      /* vubiz functions */

$vc.sessionState = {};             /* our key store that we can persist */

$vc.startState = {};              /* start from default.aspx   */
$vc.customerState = {};           /* customer                  */
$vc.memberState = {};             /* member		                 */
$vc.catalogueState = {};          /* catalogue                 */
$vc.profileState = {};            /* profile                   */
$vc.langState = {};               /* page lang values          */

$vc.initialized = false;          /* set to true when loaded on pagecreate */

/* client functions */
$vc.fn = function () {
  var _deviceWidth = function () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
  };
  var _deviceHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
  };
  var _doneProfiles = function (data, result, xhr) {
    $vc.fn.console("extract profile from all profiles");
    if ($vc.profileState === undefined) {
      $vc.profileState = data["vubz"];
    } else {
      $vc.profileState = data[$vc.sessionState.profile];
    }

    /* confirm the selected language is supported */
    $vc.sessionState.lang = $vc.sessionState.lang.length === 2 ? $vc.sessionState.lang : $vc.profileState.lang;

    if ($vc.sessionState.lang === "fr") {
      if ($vc.profileState.langFr === "n") {
        alert("This app is not avilable in French;");
        $vc.sessionState.lang = $vc.profileState.lang;
      }
    }
    if ($vc.sessionState.lang === "es") {
      if ($vc.profileState.langEs === "n") {
        alert("This app is not avilable in Spanish;");
        $vc.sessionState.lang = $vc.profileState.lang;
      }
    }
    if ($vc.sessionState.lang === "pt") {
      if ($vc.profileState.langPt === "n") {
        alert("This app is not avilable in Portuguese;");
        $vc.sessionState.lang = $vc.profileState.lang;
      }
    }

    /* show the lang buttons if needed */
    var langNo = 0;
    if ($vc.profileState.langEn === "y") langNo++;
    if ($vc.profileState.langFr === "y") langNo++;
    if ($vc.profileState.langEs === "y") langNo++;
    if ($vc.profileState.langPt === "y") langNo++;

    if (langNo > 1) {
      $(".langButton").removeClass("langButtonShadow");
      if ($vc.profileState.langEn === "y") $(".langButton_en").show();
      if ($vc.profileState.langFr === "y") $(".langButton_fr").show();
      if ($vc.profileState.langEs === "y") $(".langButton_es").show();
      if ($vc.profileState.langPt === "y") $(".langButton_pt").show();
      /* highlight the selected language */
      $(".langButton_" + $vc.sessionState.lang).addClass("langButtonShadow");
      $(".langButtons").show();
    }
  };
  var _failProfiles = function (xhr, result, statusText) {
    alert("Oops... something went wrong here retrieving the profiles");
  };
  return {
    startData: function () {
      var hidden = $("#startState")[0].innerHTML.split("|");       /* get start data from default.aspx */

      $vc.startState.appId = hidden[0];                            /* current app id */
      $vc.startState.custAcctId = hidden[1];
      $vc.startState.custGuid = hidden[2];
      $vc.startState.custId = hidden[3];
      $vc.startState.debug = hidden[4] === "y" ? true : false;    /* debug=y or n */
      $vc.startState.host = hidden[5];                             /* server host */
      $vc.startState.hostProfile = hidden[6];                    /* used for apps specific properties and for lang package - default "", "Vubiz" or "VUBZ" depending on manifest */
      $vc.startState.lang = hidden[7];                            /* used for apps specific properties and for lang package - default "en" */

      $vc.startState.membEmail = hidden[8];
      $vc.startState.membFirstName = hidden[9];
      $vc.startState.membGuid = hidden[10];
      $vc.startState.membId = hidden[11];
      $vc.startState.membLastName = hidden[12];
      $vc.startState.membNo = hidden[13];

      $vc.startState.profile = hidden[14];                        /* used for apps specific properties and for lang package - default "", "Vubiz" or "VUBZ" depending on manifest */

      /* put in session store */
      $vc.sessionState.appId = hidden[0];                         /* current app id */
      $vc.sessionState.custGuid = hidden[2];
      $vc.sessionState.custId = hidden[3];
      $vc.sessionState.lang = hidden[7];                          /* used for apps specific properties and for lang package - default "en" */
      $vc.sessionState.membGuid = hidden[10];
      $vc.sessionState.membId = hidden[11];
      $vc.sessionState.profile = $vc.startState.profile.length > 0 ? $vc.startState.profile : $vc.startState.hostProfile;
    },
    initData: function (appId) {
      if ($.localStorage(appId) === null) {
        $.localStorage(appId, "{}");
      }
    },
    getData: function (appId) {
      $vc.sessionState = $.parseJSON($.localStorage(appId));
    },
    putData: function () { /* if localStorage (HTML5) available then store our session objects */
      $vc.fn.console("storing local data for " + $vc.appId);
      $.localStorage($vc.appId, JSON.stringify($vc.sessionState));
    },
    endData: function () {
      /* clear localStorage either on SignIn or SignOut - sessionStorage remains */
      var $ls = $.localStorage();
      $ls.clear();
    },
    deviceCheck: function () {
      $vc.startState.deviceWidth = _deviceWidth();
      $vc.startState.deviceHeight = _deviceHeight();
      if ($vc.startState.deviceWidth > 1024) {
        $vc.startState.deviceClass = "desktop";
      } else if ($vc.startState.deviceWidth < 600) {
        $vc.startState.deviceClass = "phone";
      } else {
        $vc.startState.deviceClass = "tablet";
      }
      if ($vc.startState.debug) $("body").addClass("ui-mini");
    },
    parseError: function (responseText) {
      var message;
      message = JSON.parse(responseText);
      message = message.message;
      message = JSON.stringify(message);
      message = message.replace("\"", "");
      message = message.replace("\"", "");
      return message;
    },
    popup: function (message, hideIcon) {
      message = message.replace(/,/g, ", "); /* ensure there are spaces in the message enabling wrapping */
      $("#globalPopupText").html(message);
      if (isTrue(hideIcon)) {
        $("#globalPopupClose").hide();
      } else {
        $("#globalPopupClose").show();
      }
      $("#globalPopup").popup("open");
    },
    console: function (message) {
      $vc.fn.console(message);
    },
    profiles: function (profile) {
      /* if we are using a profile, ie cchs_fr then get the profile set for this app and then extract this selected profile */
      if (profile.length > 0) {
        $vc.fn.console("getting profiles");
        $vc.sessionState.profile = profile;
        $vc.sessionState.debug = true;
        $ws.profiles($vc.sessionState, _doneProfiles, _failProfiles);
      } else {
        $vc.fn.console("no profiles used");
        $vc.sessionState.lang = "en";
      }

    }
  };
}();


/* before any page is created */
$(document).on("pagebeforecreate", function () {

  if (!$vc.initialized) {
    /* initialize before starting one time */
    $vc.initialized = true; /* ensure we only do this once */
    $.ajaxSetup({ cache: false });
    $("#globalPopup").enhanceWithin().popup();

    /*
    $vc.fn.endData();     just run for debugging 
    */

    /* get the appId from default.aspx - will get all below on startData */
    $vc.appId = $("#startState")[0].innerHTML.split("|")[0];

    /* see if we have any session data available from localStorage */
    $vc.fn.initData($vc.appId);
    $vc.fn.getData($vc.appId);

    /* get initial data from default.aspx and the device itself - put all into the startState object - if window is resized the values can change */
    $vc.fn.startData();
    $vc.fn.deviceCheck();

    /* grab any profiles */
    $vc.fn.profiles($vc.startState.profile);

    $vc.sessionState.prevPage = "";
    $vc.sessionState.currPage = "";

    $vc.fn.putData();
  }

});


/* before any page is shown */
$(document).on("pagebeforeshow", function () {  /* before any page is shown */
  $vc.fn.console($.mobile.activePage[0].id);
  /* track position */
  var page = $(":mobile-pagecontainer").pagecontainer("getActivePage").prop("id");
  /* ensure we have actually changed pages - might have simply refreshed */
  if (page !== $vc.sessionState.currPage) {
    $vc.sessionState.prevPage = $vc.sessionState.currPage;
    $vc.sessionState.currPage = page;
    $vc.fn.putData();
  }
});


/* events + enhancements */
$(function () {
  $(window).resize(function () {  /* if window resized update device data */
    var resizeTimer;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout($vc.fn.deviceCheck, 50);
  });
  $(document).on("pageload", function () {  /* this will enforce maxlength in textareas  */
    $("textarea[maxlength]").keyup(function () {
      var max = parseInt($(this).attr("maxlength"));
      if ($(this).val().length > max) {
        $(this).val($(this).val().substr(0, $(this).attr("maxlength")));
      }
    });
  });
  $(".help-popup").on("click", function () { /* this permits a popup close on the popup itself */
    $(this).popup("close");
  });
  $(".sessionState").on("click", function () { /* render session data from footer if in debug mode */
    if ($vc.startState.debug) {
      var msg = "Session Objects:<br /><br />" + "session:<br />" + JSON.stringify($vc.sessionState) + "<br /><br />";
      if (JSON.stringify($vc.startState) !== "{}") msg += "start:<br />" + JSON.stringify($vc.startState) + "<br /><br />";
      if (JSON.stringify($vc.customerState) !== "{}") msg += "customer:<br />" + JSON.stringify($vc.customerState) + "<br /><br />";
      if (JSON.stringify($vc.memberState) !== "{}") msg += "member:<br />" + JSON.stringify($vc.memberState) + "<br /><br />";
      if (JSON.stringify($vc.catalogueState) !== "{}") msg += "catalogue:<br />" + JSON.stringify($vc.catalogueState) + "<br /><br />";
      if (JSON.stringify($vc.profileState) !== "{}") msg += "profile:<br />" + JSON.stringify($vc.profileState) + "<br /><br />";
      if (JSON.stringify($vc.langState) !== "{}") msg += "lang:<br />" + JSON.stringify($vc.langState) + "<br /><br />";
      $vc.fn.popup(msg);
    }
  });
  $(".backIcon").on("click", function () {
    $(":mobile-pagecontainer").pagecontainer("change", "#" + $vc.sessionState.prevPage);
  });
});


/* vubiz web service caller */
$vc.ws = function (ws, parm, done, fail) {
  var request = $.ajax({
    dataType: "json",
    url: "/vubizWS/v8client.asmx/" + ws,
    data: parm
  });

  request.done(function (data) {
    done(data);
  });

  request.fail(function (jqXHR, textStatus) {
    fail(jqXHR, textStatus);
  });
};