"use strict";

/* vubiz objects */
var $vc = {};                             /* vubiz client                                           */
$vc.sessionState = {};                    /* our key store that we can persist                      */
$vc.startState = {};                      /* start from default.aspx                                */
$vc.videoState = {};                      /* video state from _videos.json                          */
$vc.tileState = {};                       /* tile state from default.aspx                           */
$vc.profileState = {};                    /* profile                                                */
$vc.customerState = {};                   /* customer                                               */
$vc.memberState = {};                     /* member		                                              */
$vc.catalogueState = {};                  /* catalogue                                              */
$vc.langState = {};                       /* page lang values                                       */
$vc.parmState = {};                       /* parameters between pages                               */

$vc.fn = {};                              /* vubiz functions                                        */
/* initialization */
$vc.initialized = false;                  /* set to true when loaded on pagecreate                  */
$vc.sessionState.reportByGuest = false;   /* this determines which member to use for history        */
$vc.globalConfirm = "null";               /* this is ussed to store the value of confirm/popup */

var $vc_profile = "";                     /* used to restart objects                                */
document.location.hash = "";              /* if client hits refresh then kill the hash              */

/* web service caller - url defaults to v8client.asmx, if otherwise (ie v8server.asmx) include the url  */
$vc.ws = function (ws, parm, done, fail) {
  var request = $.ajax({
    type: "POST",
    dataType: isOk(parm.dataType) ? parm.dataType : "json",
    asynch: false,
    url: isOk(parm.url) ? parm.url + ws : "/vubizWs/v8client.asmx/" + ws,
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

  return {
    initData: function () {
      /* this will create an entry into localStorage */
      if ($.localStorage($vc.sessionState.appId) === null) {
        $.localStorage($vc.sessionState.appId, "{}");
      }
      $vc.fn.console("completed initData");
    },
    startData: function () {
      var hidden = $("#startState")[0].innerHTML.split("|");            /* get start data from default.aspx */
      var i = -1;

      /* values are alphabetic */
      i++; $vc.startState.appId = hidden[i];                            /* current app id */
      i++; $vc.startState.appProfile = hidden[i];                       /* determines the type of profile system (0 latest) */
      i++; $vc.startState.appVersion = hidden[i];                       /* used in getData - note if changes from [1] */
      i++; $vc.startState.appVideos = hidden[i];                        /* used in getData - note if changes from [1] */
      i++; $vc.startState.cancelUrl = hidden[i];                        /* used in nop routines */
      i++; $vc.startState.custAcctId = hidden[i];
      i++; $vc.startState.custGuid = hidden[i];
      i++; $vc.startState.custId = hidden[i];
      i++; $vc.startState.debug = hidden[i] === "y" ? true : false;     /* debug=y or n */
      i++; $vc.startState.host = hidden[i];                             /* server host */
      i++; $vc.startState.lang = hidden[i];                             /* used for apps specific properties and for lang package - default "en" */
      i++; $vc.startState.membEmail = hidden[i];
      i++; $vc.startState.membFirstName = hidden[i];
      i++; $vc.startState.membGuid = hidden[i];
      i++; $vc.startState.membId = hidden[i];
      i++; $vc.startState.membLastName = hidden[i];
      i++; $vc.startState.membNo = hidden[i];
      i++; $vc.startState.pageId = hidden[i];                           /* typically used for excel */
      i++; $vc.startState.parmCount = hidden[i];                        /* when parmCount > 1 then we don't use localstorage - there is always an appId=XXXX parameter */
      i++; $vc.startState.profileDefault = hidden[i];
      i++; $vc.startState.profileUrl = hidden[i];
      i++; $vc.startState.profile = hidden[i];                          /* used for apps specific properties and for lang package - default "", "Vubiz" or "VUBZ" depending on manifest */
      i++; $vc.startState.returnUrl = hidden[i];                        /* used in V8register - normally in profile*/
      i++; $vc.startState.rteHost = hidden[i];                          /* typically either vubiz.com or corporate.vubiz.com - NOT azure (currently) */
      i++; $vc.startState.startPage = hidden[i];                        /* if there then start app at this page */
      i++; $vc.startState.storeId = hidden[i];                          /* used to determine what NOP store user is from */
      i++; $vc.startState.translate = hidden[i];                        /* not used clientside but will show if the translation engine was used */
      $vc.fn.console("completed startData");

    },
    tileData: function () {
      var hidden = $("#tileState")[0].innerHTML;                        /* get tile data from default.aspx - will be empty if no tiles used*/
      if (hidden !== "") {
        $vc.tileState = $.parseJSON(hidden);
        $vc.fn.console("completed tileData");
      } else {
        $vc.fn.console("no tileData");
      }
    },
    getData: function () {
      /*  localize any values from localStorage UNLESS:
          1) we have passed in any URL parameters OR 
          2) appVersion has changed 
          3) profile has changed
          ...if so then kill localStorage 
 
          first grab the local sessionState so we can see what version and profile was stored 
 
          if $vc.sessionState.appVersion is different then don't use local storage (used when we change the structure of localstorage)
          if $vc.sessionState.profile is different then don't use local storage
      */
      var useLocalStorage = true;

      $vc.sessionState = $.parseJSON($.localStorage($vc.sessionState.appId));

      if ($vc.startState.appVersion !== ok($vc.sessionState.appVersion)) useLocalStorage = false;
      if ($vc.startState.profile !== ok($vc.sessionState.profile)) useLocalStorage = false;
      if ($vc.startState.parmCount > 0) useLocalStorage = false;


      /* if the local store cannot be used then clear it and start with a fresh sessionState, otherwise use it as it was converted above */
      if (useLocalStorage) {
        $vc.fn.console("restored localStorage");
      } else {
        var $ls = $.localStorage();
        $ls.clear();
        $vc.sessionState = {};
        $vc.fn.console("purged localStorage");
      }

      $vc.fn.console("completed getData");
      $vc.sessionState.prevPage = "";
      $vc.sessionState.currPage = "";
    },
    sessionData: function () {
      /* these are key values that we will store in localStorage */
      $vc.sessionState.appId = $vc.startState.appId;                    /* current app id */
      $vc.sessionState.appVersion = $vc.startState.appVersion;
      $vc.sessionState.custGuid = $vc.startState.custGuid;
      $vc.sessionState.custId = $vc.startState.custId;
      $vc.sessionState.lang = $vc.startState.lang;                      /* used for apps specific properties and for lang package - default "en" */
      $vc.sessionState.membGuid = $vc.startState.membGuid;
      $vc.sessionState.membId = $vc.startState.membId;
      $vc.sessionState.membNo = $vc.startState.membNo;
      $vc.sessionState.profile = $vc.startState.profile;
      $vc.sessionState.returnUrl = $vc.startState.returnUrl;
      $vc.sessionState.storeId = $vc.startState.storeId;

      /* put profile into a permanent element which can be used for signOut/signIn */
      $vc_profile = $vc.sessionState.profile;
      $vc.fn.console("completed sessionData");

    },
    deviceData: function () {
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
      $vc.fn.console("completed deviceData");
    },
    profileData: function () {
      /* profile parameters are alphabetic */
      var hidden = $("#profileState")[0].innerHTML.split("|");       /* get profileState from default.aspx */
      var i = -1;

      i++; $vc.profileState.autoEnroll = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.autoEnrollWs = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.autoSignIn = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.certPrograms = hidden[i];
      i++; $vc.profileState.certPrograms_E = hidden[i];
      i++; $vc.profileState.color = hidden[i];
      i++; $vc.profileState.contentSource = hidden[i];
      i++; $vc.profileState.custId = hidden[i];
      i++; $vc.profileState.ecommerce = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.emailFrom = hidden[i];
      i++; $vc.profileState.guests = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.guests_E = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.jit = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.lang = hidden[i];
      i++; $vc.profileState.langEn = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.langFr = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.langEs = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.langPt = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.logo = hidden[i];
      i++; $vc.profileState.memb_E = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.password = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.portal = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.returnUrl = hidden[i];
      i++; $vc.profileState.showSoloPrograms = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.sso = hidden[i];
      i++; $vc.profileState.storeId = hidden[i];
      i++; $vc.profileState.videos = hidden[i] === "True" ? true : false;
      i++; $vc.profileState.vukidz = hidden[i] === "True" ? true : false;

      /* store these in the sessionState as they maintain state */
      $vc.sessionState.certPrograms = $vc.profileState.certPrograms;
      $vc.sessionState.certPrograms_E = $vc.profileState.certPrograms_E;
      $vc.sessionState.contentSource = $vc.profileState.contentSource;
      $vc.sessionState.ecommerce = $vc.profileState.ecommerce;
      $vc.sessionState.guests = $vc.profileState.guests;
      $vc.sessionState.guests_E = $vc.profileState.guests_E;
      $vc.sessionState.jit = $vc.profileState.jit;
      $vc.sessionState.memb_E = $vc.profileState.memb_E;
      $vc.sessionState.password = $vc.profileState.password;
      $vc.sessionState.portal = $vc.profileState.portal;
      $vc.sessionState.returnUrl = $vc.profileState.returnUrl;
      $vc.sessionState.showSoloPrograms = $vc.profileState.showSoloPrograms;
      $vc.sessionState.storeId = $vc.profileState.storeId;
      $vc.sessionState.videos = $vc.profileState.videos;
      $vc.sessionState.vukidz = $vc.profileState.vukidz;

      /* if these values are not in the profile then try the URL */
      if ($vc.profileState.returnUrl !== "") $vc.sessionState.returnUrl = $vc.profileState.returnUrl;
      if ($vc.startState.returnUrl !== "") $vc.sessionState.returnUrl = $vc.startState.returnUrl;
      if ($vc.profileState.cancelUrl !== "") $vc.sessionState.cancelUrl = $vc.profileState.cancelUrl;
      if ($vc.startState.cancelUrl !== "") $vc.sessionState.cancelUrl = $vc.startState.cancelUrl;
      if ($vc.profileState.storeId !== "") $vc.sessionState.storeId = $vc.profileState.storeId;
      if ($vc.startState.storeId !== "") $vc.sessionState.storeId = $vc.startState.storeId;




      if ($vc.sessionState.custId.length !== 8 && $vc.profileState.custId.length === 8) {
        $vc.sessionState.custId = $vc.profileState.custId;
      }

      if ($vc.startState.lang === "fr") { /* V6 gets passed a lang value which we need to respect */
        $vc.sessionState.lang = "fr";
      } else {
        $vc.sessionState.lang = $vc.sessionState.lang.length === 2 ? $vc.profileState.lang : "en";
      }

      //if ($vc.sessionState.lang === "fr") {
      if ($vc.startState.lang === "fr") {// modified May 2018 to allow lang in URL
        if (!$vc.profileState.langFr) {
          alert("This app is not available in French;");
          $vc.sessionState.lang = $vc.profileState.lang;
        }
      }
      //if ($vc.sessionState.lang === "es") {// modified May 2018 to allow lang in URL
      if ($vc.startState.lang === "es") {
        if (!$vc.profileState.langEs) {
          alert("This app is not avilable in Spanish;");
          $vc.sessionState.lang = $vc.profileState.lang;
        }
      }
      //      if ($vc.sessionState.lang === "pt") {// modified May 2018 to allow lang in URL
      if ($vc.startState.lang === "pt") {
        if (!$vc.profileState.langPt) {
          alert("This app is not avilable in Portuguese;");
          $vc.sessionState.lang = $vc.profileState.lang;
        }
      }

      if ($vc.startState.appVideos === 0) {
        $(".videoIcon").hide();
      }

      /* show the lang buttons if needed */
      var langNo = 0;
      if ($vc.profileState.langEn) langNo++;
      if ($vc.profileState.langFr) langNo++;
      if ($vc.profileState.langEs) langNo++;
      if ($vc.profileState.langPt) langNo++;
      if (langNo > 1) {
        $(".langButton").removeClass("langButtonShadow");
        if ($vc.profileState.langEn) $(".langButton_en").show();
        if ($vc.profileState.langFr) $(".langButton_fr").show();
        if ($vc.profileState.langEs) $(".langButton_es").show();
        if ($vc.profileState.langPt) $(".langButton_pt").show();
        /* highlight the selected language */
        $(".langButton_" + $vc.sessionState.lang).addClass("langButtonShadow");
        $(".langButtons").show();
      }

      $vc.fn.console("completed profileData");
    },
    videoData: function () {
      // get any help videos and bind them to the video Icon
      if ($vc.startState.appVideos === "1" && $vc.profileState.videos) {
        $.getJSON("apps/" + $vc.sessionState.appId + "/_videos.json", function (data) {
          var videoState = "{";
          $.each(data, function (key, val) {
            switch ($vc.sessionState.lang) {
              case "en": if (val.videoEn.length > 0) videoState += "\"" + val.videoPage + "\":\"" + val.videoEn + "\", "; break;
              case "fr": if (val.videoFr.length > 0) videoState += "\"" + val.videoPage + "\":\"" + val.videoFr + "\", "; break;
              case "es": if (val.videoEs.length > 0) videoState += "\"" + val.videoPage + "\":\"" + val.videoEs + "\", "; break;
              case "pt": if (val.videoPt.length > 0) videoState += "\"" + val.videoPage + "\":\"" + val.videoPt + "\", "; break;
            }
          });
          videoState = videoState.substring(0, videoState.length - 2) + "}";
          $vc.videoState = $.parseJSON(videoState);
        });
      }
    },
    putData: function () {
      /* store sessionState object in localStorage */
      $.localStorage($vc.sessionState.appId, JSON.stringify($vc.sessionState));
      $vc.fn.console("completed putData");
    },
    endData: function () {
      /* clear localStorage either on initialize if appVersion different or SignOut - sessionStorage remains */
      var $ls = $.localStorage();
      $ls.clear();
      $vc.fn.console("completed endData");
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
    popup: function (message, width) { /* use width if submitted, ie for sessionState, else set to 400 for normal popups */
      $("#globalPopup").css("width", function () { return ifElse(width, 400); });
      message = message.replace(/,/g, ", ");
      $("#globalPopupText").html(message);
      $("#globalPopup").popup("open");
    },
    popupClose: function () {
      $("#globalPopup").popup("close");
    },
    dialogue: function (caller, message) {
      message = message.replace(/,/g, ", ");
      $("#globalConfirmTrue").attr("onclick", "$vc.globalConfirm='" + caller + "_true'");
      $("#globalConfirmFalse").attr("onclick", "$vc.globalConfirm='" + caller + "_false'");
      $("#globalConfirmText").html(message);
      $("#globalConfirm").enhanceWithin().popup();
      $("#globalConfirm").popup("open");
    },
    console: function (message) {  /* comment out below as console is not support in earlier IE */
      console.log(message);
    }
  };
}();

/* do this before any page is created - only once */
$(document).on("pagebeforecreate", function () {

  if (!$vc.initialized) {
    /* initialize before starting one time */
    $vc.initialized = true; /* ensure we only do this once */
    $.ajaxSetup({
      cache: false
    });
    $("#globalPopup").enhanceWithin().popup();
    $("#globalConfirm").enhanceWithin().popup();

    /* grab the current appId from startState then populate the session objects */
    $vc.sessionState.appId = $("#startState")[0].innerHTML.split("|")[0];

    $.when(
      $vc.fn.initData(),
      $vc.fn.startData(),
      $vc.fn.getData(),
      $vc.fn.sessionData(),
      $vc.fn.tileData(),
      $vc.fn.deviceData(),
      $vc.fn.profileData(),
      $vc.fn.videoData(),
      $vc.fn.putData()
    )
      .then(function () {
        $vc.fn.console("completed all session states");
      });
  }

});

/* before any page is shown */
$(document).on("pagecontainerbeforeshow", function (event, ui) {

  /* track current page */
  var page = $(":mobile-pagecontainer").pagecontainer("getActivePage").prop("id");
  $vc.fn.console(page);

  /* ensure we have actually changed pages - might have simply refreshed */
  $vc.sessionState.currPage = ok($vc.sessionState.currPage);
  if (page !== $vc.sessionState.currPage) {
    // sometimes we do NOT want to change the prevPage (when we are coming back from content, etc)
    if ($vc.sessionState.currPage !== "") $vc.sessionState.prevPage = $vc.sessionState.currPage;
    $vc.sessionState.currPage = page;
    $vc.fn.putData();
  }

  /* determine which video icon appears in the page header */
  if ($vc.startState.appVideos === "1") {
    $(".videoIcon").css({ display: "none" });
    $.each($vc.videoState, function (key, value) {
      if (page === "page_" + key) {
        $(".videoIcon").show();
        return false;
      }
    });
  }

});


/* events + enhancements */
$(function () {
  $(window).resize(function () {  /* if window resized update device data */
    var resizeTimer;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout($vc.fn.deviceData, 1000);
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
      if (JSON.stringify($vc.videoState) !== "{}") msg += "video:<br />" + JSON.stringify($vc.videoState) + "<br /><br />";
      $vc.fn.popup(msg, $vc.startState.deviceWidth * .8);
    }
  });
  $(".backIcon").on("click", function (event) {
    if ($vc.sessionState.prevPage !== "") { // this is only used when we ask if they really wanted to return
      $(":mobile-pagecontainer").pagecontainer("change", "#" + $vc.sessionState.prevPage);
    }
  });
  $(".videoIcon").on("click", function () {
    $.each($vc.videoState, function (key, value) {    /* get URL for this page */
      if ($vc.sessionState.currPage === "page_" + key) {
        window.open("video.html?url=" + encodeURIComponent(value));
        return false;
      }
    });
  });
  $("input:text").textinput({ clearBtn: true }); /* this will put a button into text box to clear text */
});
