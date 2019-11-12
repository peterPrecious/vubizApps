﻿"use strict";

/* vubiz objects */
var $vc = {};                     /* vubiz client */
$vc.sessionState = {}             /* our key store that we can persist */
$vc.startState = {};              /* start from default.aspx   */
$vc.profileState = {};            /* profile                   */
$vc.customerState = {};           /* customer                  */
$vc.memberState = {};             /* member		                 */
$vc.catalogueState = {};          /* catalogue                 */
$vc.langState = {};               /* page lang values          */
$vc.fn = {};                      /* vubiz functions */

$vc.initialized = false;          /* set to true when loaded on pagecreate */


/* vubiz web service caller */
$vc.ws = function (ws, parm, done, fail) {
  var request = $.ajax({
    dataType: "json",
    url: "/vubiz.webService/V8.asmx/" + ws,
    data: parm
  });

  request.done(function (data) {
    done(data);
  });

  request.fail(function (jqXHR, textStatus) {
    fail(jqXHR, textStatus);
  });
};


/* client functions */
$vc.fn = function () {
  var _deviceWidth = function () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
  };
  var _deviceHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
  };
  var _doneProfile = function (data, result, xhr) {
    $vc.profileState = data;
    $vc.sessionState.lang = ($vc.sessionState.lang.length == 2) ? $vc.profileState.lang : "en";
    if ($vc.sessionState.lang == "fr") {
      if ($vc.profileState.langFr == "n") {
        alert("This app is not avilable in French;");
        $vc.sessionState.lang = $vc.profileState.lang;
      };
    };
    if ($vc.sessionState.lang == "es") {
      if ($vc.profileState.langEs == "n") {
        alert("This app is not avilable in Spanish;");
        $vc.sessionState.lang = $vc.profileState.lang;
      }
    }
    if ($vc.sessionState.lang == "pt") {
      if ($vc.profileState.langPt == "n") {
        alert("This app is not avilable in Portuguese;");
        $vc.sessionState.lang = $vc.profileState.lang;
      }
    }
    /* show the lang buttons if needed */
    var langNo = 0
    if ($vc.profileState.langEn == "y") langNo++;
    if ($vc.profileState.langFr == "y") langNo++;
    if ($vc.profileState.langEs == "y") langNo++;
    if ($vc.profileState.langPt == "y") langNo++;
    if (langNo > 1) {
      $(".langButton").removeClass("langButtonShadow");
      if ($vc.profileState.langEn == "y") $(".langButton_en").show();
      if ($vc.profileState.langFr == "y") $(".langButton_fr").show();
      if ($vc.profileState.langEs == "y") $(".langButton_es").show();
      if ($vc.profileState.langPt == "y") $(".langButton_pt").show();
      /* highlight the selected language */
      $(".langButton_" + $vc.sessionState.lang).addClass("langButtonShadow");
      $(".langButtons").show();
    };
    callback("completed profileData temp");
  };
  var _failProfile = function (xhr, result, statusText) {
    debugger;
    //alert("Oops... something went wrong here retrieving the profile")
    callback("completed profileData unsuccessfully!");
  };
  return {
    startData: function (callback) {
      var dc_data = $("#startState")[0].innerHTML.split("|");          /* get start data from default.aspx */

      $vc.startState.appId = dc_data[0];                            /* current app id */
      $vc.startState.host = dc_data[1];                             /* server host */
      $vc.startState.debug = (dc_data[2] == "y") ? true : false;    /* debug=y or n */
      $vc.startState.custId = dc_data[3];
      $vc.startState.custGuid = dc_data[4];
      $vc.startState.membId = dc_data[5];
      $vc.startState.membEmail = dc_data[6];
      $vc.startState.membFirstName = dc_data[7];
      $vc.startState.membLastName = dc_data[8];
      $vc.startState.lang = dc_data[9];                            /* used for apps specific properties and for lang package - default "en" */
      $vc.startState.profile = dc_data[10];                        /* used for apps specific properties and for lang package - default "", "Vubiz" or "VUBZ" depending on manifest */
      $vc.startState.hostProfile = dc_data[11];                    /* used for apps specific properties and for lang package - default "", "Vubiz" or "VUBZ" depending on manifest */

      /* put in session store */
      $vc.sessionState.secure = false;
      $vc.sessionState.appId = dc_data[0];                         /* current app id */
      $vc.sessionState.custId = dc_data[3];
      $vc.sessionState.custGuid = dc_data[4];
      $vc.sessionState.membId = dc_data[5];
      $vc.sessionState.lang = dc_data[9];                          /* used for apps specific properties and for lang package - default "en" */
      $vc.sessionState.profile = ($vc.startState.profile.length > 0) ? $vc.startState.profile : $vc.startState.hostProfile

      callback("completed startData");

    },
    initData: function (appId, callback) {
      if ($.localStorage(appId) == null) {
        $.localStorage(appId, "{}");
      };
      callback("completed initData");
    },
    getData: function (appId, callback) {
      $vc.sessionState = $.parseJSON($.localStorage(appId));
      callback("completed getData");
    },
    putData: function (callback) { /* if localStorage (HTML5) available then store our session objects */
      $.localStorage($vc.appId, JSON.stringify($vc.sessionState));
      if (callback && typeof (callback) === "function") { callback("completed putData"); }
    },
    endData: function () {
      /* clear localStorage either on SignIn or SignOut - sessionStorage remains */
      var $ls = $.localStorage();
      $ls.clear();
    },
    deviceData: function (callback) {
      $vc.startState.deviceWidth = _deviceWidth();
      $vc.startState.deviceHeight = _deviceHeight();
      if ($vc.startState.deviceWidth > 1024) {
        $vc.startState.deviceClass = "desktop";
      } else if ($vc.startState.deviceWidth < 600) {
        $vc.startState.deviceClass = "phone"
      } else {
        $vc.startState.deviceClass = "tablet"
      };
      if ($vc.startState.debug) $("body").addClass("ui-mini");
      if (callback && typeof (callback) === "function") { callback("completed deviceData"); }
    },
    profileData: function (callback) {

      /* temp until deferred objects incorporated */

      var data = {};
      data.id = "6";
      data.appId = "vubiz.8";
      data.profile = "cfib";
      data.lang = "en";
      data.langEn = "True";
      data.langFr = "True";
      data.langEs = "False";
      data.langPt = "False";
      data.emailFrom = "";
      data.logo = "CFIB_EN_64px.png";

      $vc.profileState = data;
      $vc.sessionState.lang = ($vc.sessionState.lang.length == 2) ? $vc.profileState.lang : "en";
      if ($vc.sessionState.lang == "fr") {
        if ($vc.profileState.langFr == "n") {
          alert("This app is not avilable in French;");
          $vc.sessionState.lang = $vc.profileState.lang;
        };
      };
      if ($vc.sessionState.lang == "es") {
        if ($vc.profileState.langEs == "n") {
          alert("This app is not avilable in Spanish;");
          $vc.sessionState.lang = $vc.profileState.lang;
        }
      }
      if ($vc.sessionState.lang == "pt") {
        if ($vc.profileState.langPt == "n") {
          alert("This app is not avilable in Portuguese;");
          $vc.sessionState.lang = $vc.profileState.lang;
        }
      }
      /* show the lang buttons if needed */
      var langNo = 0
      if ($vc.profileState.langEn == "y") langNo++;
      if ($vc.profileState.langFr == "y") langNo++;
      if ($vc.profileState.langEs == "y") langNo++;
      if ($vc.profileState.langPt == "y") langNo++;
      if (langNo > 1) {
        $(".langButton").removeClass("langButtonShadow");
        if ($vc.profileState.langEn == "y") $(".langButton_en").show();
        if ($vc.profileState.langFr == "y") $(".langButton_fr").show();
        if ($vc.profileState.langEs == "y") $(".langButton_es").show();
        if ($vc.profileState.langPt == "y") $(".langButton_pt").show();
        /* highlight the selected language */
        $(".langButton_" + $vc.sessionState.lang).addClass("langButtonShadow");
        $(".langButtons").show();
      };

      callback("completed profileData (temp)");

      /*
      if ($vc.sessionState.profile.length > 0) {
        var parm = {};
        parm.appId = $vc.sessionState.appId;
        parm.profile = $vc.sessionState.profile;
        $vc.ws("profile", parm, _doneProfile, _failProfile);
        );
      } else {
        $vc.sessionState.lang = "en";
        callback("completed profileData : none");
      };
      */

    },
    parseError: function (responseText) {
      var message = JSON.parse(responseText);
      var message = message.message;
      var message = JSON.stringify(message);
      var message = message.replace("\"", "");
      var message = message.replace("\"", "");
      return message;
    },
    popup: function (message, hideIcon) {
      message = message.replace(/,/g, ", "); /* ensure there are spaces in the message enabling wrapping */
      $("#globalPopupText").html(message);
      if (isTrue(hideIcon)) {
        $("#globalPopupClose").hide();
      } else {
        $("#globalPopupClose").show();
      };
      $("#globalPopup").popup("open");
    },
    console: function (message) {
      console.log(message);
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
    $vc.sessionState.prevPage = "";
    $vc.sessionState.currPage = "";

    /* grab the current appId from startState */
    $vc.appId = $("#startState")[0].innerHTML.split("|")[0];

    /* create and populate the local storage objects */
    $vc.fn.initData($vc.appId, function (status) {
      console.log(status);

      /* get any session data from local storage */
      $vc.fn.getData($vc.appId, function (status) {
        console.log(status);

        /* get initial data from default.aspx */
        $vc.fn.startData(function (status) {
          console.log(status);

          /* get data from the device itself, if window is resized these values can change */
          $vc.fn.deviceData(function (status) {
            console.log(status);

            /* get possible profiles from server using &profile= (primary) or url prefix (secondary) */
            $vc.fn.profileData(function (status) {
              console.log(status);

              /* save sessionState */
              $vc.fn.putData(function (status) {
                console.log(status);

              });

            });

          });

        });

      });

    });

  };

});



/* before any page is shown */
$(document).on("pagebeforeshow", function () {  /* before any page is shown */

  console.log($.mobile.activePage[0].id);
  /* track position */
  var page = $(":mobile-pagecontainer").pagecontainer("getActivePage").prop("id");
  /* ensure we have actually changed pages - might have simply refreshed */
  if (page != $vc.sessionState.currPage) {
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
    resizeTimer = setTimeout($vc.fn.deviceData, 50);
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
      if (JSON.stringify($vc.startState) != "{}") msg += "start:<br />" + JSON.stringify($vc.startState) + "<br /><br />";
      if (JSON.stringify($vc.customerState) != "{}") msg += "customer:<br />" + JSON.stringify($vc.customerState) + "<br /><br />";
      if (JSON.stringify($vc.memberState) != "{}") msg += "member:<br />" + JSON.stringify($vc.memberState) + "<br /><br />";
      if (JSON.stringify($vc.catalogueState) != "{}") msg += "catalogue:<br />" + JSON.stringify($vc.catalogueState) + "<br /><br />";
      if (JSON.stringify($vc.profileState) != "{}") msg += "profile:<br />" + JSON.stringify($vc.profileState) + "<br /><br />";
      if (JSON.stringify($vc.langState) != "{}") msg += "lang:<br />" + JSON.stringify($vc.langState) + "<br /><br />";
      $vc.fn.popup(msg);
    }
  });
  $(".backIcon").on("click", function () {
    $(":mobile-pagecontainer").pagecontainer("change", "#" + $vc.sessionState.prevPage);
  });
});