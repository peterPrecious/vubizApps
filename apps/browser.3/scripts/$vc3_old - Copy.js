/* vubiz objects */
var $vc = {};                     /* vubiz client */
$vc.fn = {};                      /* vubiz functions */

$vc.startState = {};              /* get Default.aspx start data    (sessionStorage) */
$vc.parameterState = {}           /* use to pass paramaters         (sessionStorage  */
$vc.sessionState = {};            /* stored session                 (localStorage) */
$vc.deviceState = {};             /* current device state           (localStorage) */
$vc.appState = {};                /* current app                    (localStorage) */
$vc.customerState = {};           /* current customer               (localStorage) */
$vc.memberState = {};             /* current member		              (localStorage) */
$vc.catalogueState = {};          /* current catalogue              (localStorage) */

$vc.fn.initialized = false;       /* set to true when loaded on pagecreate */

/* client functions */
$vc.fn = function () {
  var _deviceWidth = function () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
  };
  var _deviceHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
  };
  return {
    getStartState: function () {
      /* get start data (from default.aspx) */
      var dc_data = $("#dc_data")[0].innerHTML;
      dc_data = dc_data.split("|");
      $vc.startState.appId        = dc_data[0];                  /* current app id */
      $vc.startState.type         = dc_data[1];                   /* touch or desktop device? */
      $vc.startState.host         = dc_data[2];                   /* start host */
      $vc.startState.debug        = dc_data[3];                  /* debug=y or n */
      $vc.startState.secureApp    = dc_data[4];              /* secureApp=y or n - used on signin to go to the secure app */
      $vc.startState.appSecurity  = dc_data[5];              /* secureApp=y or n - used on signin to go to the secure app */

      $vc.startState.custId       = dc_data[6];
      $vc.startState.learnerId    = dc_data[7];
      $vc.startState.email        = dc_data[8];
      $vc.startState.firstName    = dc_data[9];
      $vc.startState.lastName     = dc_data[10];
      $vc.startState.lang         = dc_data[11];

      var i = $vc.startState.appId.indexOf("_");
      if (i == -1) {
        $vc.startState.parentId = $vc.startState.appId;
      } else {
        $vc.startState.parentId = $vc.startState.appId.substr(0, i);     /* get parent  */
      };

      $vc.fn.putData();
    },
    getCookies: function () {
      if ($.cookie("$vc." + $vc.startState.parentId + ".app") != null) {
        $vc.appState = $.parseJSON($.cookie("$vc." + $vc.startState.parentId + ".app"));
      };
      if ($.cookie("$vc." + $vc.startState.parentId + ".device") != null) {
        $vc.deviceState = $.parseJSON($.cookie("$vc." + $vc.startState.parentId + ".device"));
      };
      if ($.cookie("$vc." + $vc.startState.parentId + ".member") != null) {
        $vc.memberState = $.parseJSON($.cookie("$vc." + $vc.startState.parentId + ".member"));
      };
      if ($.cookie("$vc." + $vc.startState.parentId + ".appInstance") != null) {
        $vc.appInstanceState = $.parseJSON($.cookie("$vc." + $vc.startState.parentId + ".appInstance"));
      };
      if ($.cookie("$vc." + $vc.startState.parentId + ".memberAppInstance") != null) {
        $vc.memberAppInstanceState = $.parseJSON($.cookie("$vc." + $vc.startState.parentId + ".memberAppInstance"));
      };
      if ($.cookie("$vc." + $vc.startState.parentId + ".reminder") != null) {
        $vc.reminderState = $.parseJSON($.cookie("$vc." + $vc.startState.parentId + ".reminder"));
      };
      if ($.cookie("$vc." + $vc.startState.parentId + ".session") != null) {
        $vc.sessionState = $.parseJSON($.cookie("$vc." + $vc.startState.parentId + ".session"));
      };
      if ($vc.sessionState.secure == undefined) {
        $vc.sessionState.secure = false;
      };

    },
    setCookies: function () {
      $.cookie("$vc." + $vc.appState.parentId + ".app", JSON.stringify($vc.appState));
      $.cookie("$vc." + $vc.appState.parentId + ".device", JSON.stringify($vc.deviceState));
      $.cookie("$vc." + $vc.appState.parentId + ".member", JSON.stringify($vc.memberState));
      $.cookie("$vc." + $vc.appState.parentId + ".appInstance", JSON.stringify($vc.appInstanceState));
      $.cookie("$vc." + $vc.appState.parentId + ".memberAppInstance", JSON.stringify($vc.memberAppInstanceState));
      $.cookie("$vc." + $vc.appState.parentId + ".reminder", JSON.stringify($vc.reminderState));
      if ($vc.sessionState.rememberMe) {
        $.cookie("$vc." + $vc.appState.parentId + ".session", JSON.stringify($vc.sessionState), { expires: 30 });
      } else {
        $.cookie("$vc." + $vc.appState.parentId + ".session", JSON.stringify($vc.sessionState));
      };
    },
    endCookies: function () {
      $.cookie("$vc." + $vc.appState.parentId + ".app", "", { expires: -30 });
      $.cookie("$vc." + $vc.appState.parentId + ".device", "", { expires: -30 });
      $.cookie("$vc." + $vc.appState.parentId + ".member", "", { expires: -30 });
      $.cookie("$vc." + $vc.appState.parentId + ".appInstance", "", { expires: -30 });
      $.cookie("$vc." + $vc.appState.parentId + ".reminder", "", { expires: -30 });
      $.cookie("$vc." + $vc.appState.parentId + ".session", "", { expires: -30 });
    },
    initData: function () {
      if ($.support.localStorage) {
        if ($.sessionStorage("start") == null) $.sessionStorage("start", "{}");
        if ($.sessionStorage("parameter") == null) $.sessionStorage("parameter", "{}");
        if ($.localStorage("session") == null) $.localStorage("session", "{}");
        if ($.localStorage("device") == null) $.localStorage("device", "{}");
        if ($.localStorage("app") == null) $.localStorage("app", "{}");
        if ($.localStorage("customer") == null) $.localStorage("customer", "{}");
        if ($.localStorage("member") == null) $.localStorage("member", "{}");
        if ($.localStorage("catalogue") == null) $.localStorage("catalogue", "{}");
      }
    },
    getData: function () {
      if ($.support.localStorage) {
        $vc.startState = $.parseJSON($.sessionStorage("start"));
        $vc.parameterState = $.parseJSON($.sessionStorage("parameter"));
        $vc.sessionState = $.parseJSON($.localStorage("session"));
        $vc.deviceState = $.parseJSON($.localStorage("device"));
        $vc.appState = $.parseJSON($.localStorage("app"));
        $vc.customerState = $.parseJSON($.localStorage("customer"));
        $vc.memberState = $.parseJSON($.localStorage("member"));
        $vc.catalogueState = $.parseJSON($.localStorage("catalogue"));
      };
    },
    putData: function () { /* if localStorage (HTML5) available then store our session objects */
      if ($.support.localStorage) {
        $.sessionStorage("start", JSON.stringify($vc.startState));
        $.sessionStorage("parameter", JSON.stringify($vc.parameterState));
        $.localStorage("session", JSON.stringify($vc.sessionState));
        $.localStorage("device", JSON.stringify($vc.deviceState));
        $.localStorage("app", JSON.stringify($vc.appState));
        $.localStorage("customer", JSON.stringify($vc.customerState));
        $.localStorage("member", JSON.stringify($vc.memberState));
        $.localStorage("catalogue", JSON.stringify($vc.catalogueState));
      };
    },
    endData: function () {
      var $ls = $.localStorage();
      $ls.clear();
    },
    setAppState: function () {
      $vc.appState.id = $vc.startState.appId;
      $vc.appState.parentId = $vc.startState.parentId;
      $vc.appState.debug = ($vc.startState.debug == "debug=y"); /* true/false */
      $vc.appState.lang = "EN";
    },
    deviceCheck: function () {
      $vc.deviceState.type = $vc.startState.type;
      $vc.deviceState.host = $vc.startState.host;
      $vc.deviceState.width = _deviceWidth();
      $vc.deviceState.height = _deviceHeight();

      if ($vc.deviceState.width > 1024) {
        $vc.deviceState.size = "desktop";
        /* $("body").addClass("ui-mini"); */
      } else if ($vc.deviceState.width < 600) {
        /* $("body").removeClass("ui-mini"); */
        $vc.deviceState.size = "phone"
      } else {
        /* $("body").removeClass("ui-mini"); */
        $vc.deviceState.size = "tablet"
      };



      /* over ride for development enabling small screens with small fonts */
      if ($vc.appState.debug) $("body").addClass("ui-mini");
    },
    restoreState: function () {

      $vc.parameterState.debug = false;
      //$vc.parameterState.custId = "CFIB5288";
      $vc.parameterState.custId = ifElse($vc.startState.custId, "CFIB5288") /* can get custId from URL */

      /*
      if (!$vc.sessionState.secure) {
        if ($vc.appState.id != $vc.appState.parentId) {
          location.href = "Default.aspx?appId=" + $vc.appState.parentId;
        }
      }
      else {
        if ($vc.sessionState.authentication == "accessId" && $vc.memberState.guid == undefined && $vc.sessionState.memberGuid != undefined) {
          $vc.fn.restoreStateByAccessGuid($vc.sessionState.memberGuid);
        }
        if ($vc.sessionState.authentication == "passwordId" && $vc.memberState.id == undefined && $vc.sessionState.memberId != undefined) {
          $vc.fn.restoreStateByPasswordId($vc.sessionState.memberId);
        }
      }
      */


    },
    restoreStateByPasswordId: function (id) {
      var _successAppInstance = function (data, result, xhr) {
        douse.framework.debug.log(data);
        douse.framework.debug.log(result);
        $vc.appInstanceState = data;
        $vc.fn.setCookies();
        location.href = "Default.aspx?appId=" + $vc.appState.parentId + "_secure";
      };
      var _successMember = function (data, result, xhr) {
        douse.framework.debug.log(data);
        douse.framework.debug.log(result);
        $vc.sessionState.accessed = new Date();
        $vc.memberState = data;
        $vc.fn.setCookies();
        /* next see if you are in a particular hive */
        if ($vc.sessionState.appInstanceId != undefined) {
          douse.framework.repository.appInstance.fetch(
            [$vc.sessionState.appInstanceId],
            _successAppInstance,
            _error
          );
        };
      };
      var _error = function (xhr, result, statusText) {
        douse.framework.debug.log(result);
        douse.framework.debug.log(statusText);
        $vc.sessionState.errorResult = result;
        $vc.sessionState.errorStatusText = statusText;
        $vc.fn.setCookies();

        var header = "Auto Sign In Error : ";
        var content = result + " : " + statusText;
        $vc.fn.renderDialog(header, content);
      };
      douse.framework.repository.member.fetch(
        [id],
        _successMember,
        _error
      );
    },
    restoreStateByAccessId: function (id) {
      var _successAppInstance = function (data, result, xhr) {
        douse.framework.debug.log(data);
        douse.framework.debug.log(result);
        $vc.appInstanceState = data;
        $vc.fn.setCookies();
        location.href = "Default.aspx?appId=" + $vc.appState.parentId + "_secure";
      };
      var _successMember = function (data, result, xhr) {
        douse.framework.debug.log(data);
        douse.framework.debug.log(result);
        $vc.sessionState.accessed = new Date();
        $vc.memberState = data;
        $vc.fn.setCookies();
        /* next see if you are in a particular hive */
        if ($vc.sessionState.appInstanceId != undefined) {
          douse.framework.repository.appInstance.fetch(
            [$vc.sessionState.appInstanceId],
            _successAppInstance,
            _error
          );
        };
      };
      var _error = function (xhr, result, statusText) {
        douse.framework.debug.log(result);
        douse.framework.debug.log(statusText);
        $vc.sessionState.errorResult = result;
        $vc.sessionState.errorStatusText = statusText;
        $vc.fn.setCookies();

        var header = "Auto Sign In Error : ";
        var content = result + " : " + statusText;
        $vc.fn.renderDialog(header, content);
      };
      douse.framework.repository.member.fetch(
        [id],
        _successMember,
        _error
      );
    },
    parseError: function (responseText) {
      var message = JSON.parse(responseText);
      var message = message.message;
      var message = JSON.stringify(message);
      var message = message.replace("\"", "");
      var message = message.replace("\"", "");
      return message;
    },
    popup: function (message, addCloseIcon) {
      message = message.replace(/,/g, ", "); /* ensure there are spaces in the message enabling wrapping */
      $("#globalPopupText").html(message);
      if (isTrue(addCloseIcon)) {
        $("#globalPopupClose").show();
      } else {
        $("#globalPopupClose").hide();
      };
      $("#globalPopup").popup("open");
    },
    console: function (message) {
      console.log(message);
    }
  };
}();

/* initialize before anything - not sure when to do this - but just do it once */
$(document).on("pagebeforecreate", function () {
  if (!$vc.fn.initialized) {
    $vc.fn.initialized = true; /* ensure we only do this once */
    $.ajaxSetup({ cache: false });
    //$vc.fn.endData(); /* just run for debugging */
    $vc.fn.initData();
    $vc.fn.getData();
    $vc.fn.getStartState();
    $vc.fn.deviceCheck();
    $vc.fn.setAppState();
    $vc.fn.putData();
    $vc.fn.restoreState();
  };
});

/* events + enhancements */
$(function () {
  $(window).resize(function () {  /* if window resized update device data */
    var resizeTimer;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout($vc.fn.deviceCheck, 50);
  });
  $(document).bind("pagebeforeshow", function () {

    console.log($.mobile.activePage[0].id);

    /*
    $("#footer_$$_title").html($vc.appState.id + " | " + $.mobile.activePage[0].id);
    */

    var SHITE = false;
    if (SHITE) {
      if ($vc.sessionState.secure == false) {  /* show/hide signin/signout */
        $(".signOff").hide();
        $(".secure").hide();
        $(".next").hide();
      } else {
        $(".signIn").hide();
        $(".notSecure").hide();
        /* are we at the parent? */
        if (window.location.href.indexOf("?appId=" + $vc.appState.parentId + "_") == -1) {
          $vc.appState.id = $vc.appState.parentId;
          $(".next").show();
        } else {
          $(".next").hide();
        };
      };

      /* 
        render the appropriate functionality base on globalRoles (outside of the hive) and the role (memberAppInstance)
        globalRole: anonymous, guest (has guid but not signed up), member (signed up), administrator
        memberAppInstance role: user, facilitator, manager 
      */

      /* disable appropriate features, leave anonymous (public) */
      $(".guest, .member, .administrator").hide();

      /* anonymouse is always on */
      if ($vc.memberState.globalRole == undefined) {
        $vc.memberState.globalRole = "anonymous"
      } else if ($vc.memberState.globalRole.toLowerCase() == "guest") {
        $(".guest").show();
      } else if ($vc.memberState.globalRole.toLowerCase() == "member") {
        $(".guest, .member").show();
      } else if ($vc.memberState.globalRole.toLowerCase() == "administrator") {
        $(".guest, .member, .administrator").show();
      };

      if ($vc.memberAppInstanceState.globalRole != undefined) {

        $(".user, .facilitator, .manager").hide();

        if ($vc.memberAppInstanceState.role.toLowerCase() == "user") {
          $(".user").show();
        } else if ($vc.memberAppInstanceState.role.toLowerCase() == "facilitator") {
          $(".user, .facilitator").show();
        } else if ($vc.memberAppInstanceState.role.toLowerCase() == "manager") {
          $(".user, .facilitator, .manager").show();
        };
      };


      var roles = $vc.memberState.classes.split(" ");
      if (roles.length > 1) {
        $(".facilitator, .manager, .administrator, .architect").hide();
        $.each(roles, function (key, value) {
          $("." + value).show();
        });
      };
    }

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
  $("#globalPopup").enhanceWithin().popup();   /* enhance global popup */
  $(".sessionState").on("click", function () { /* render sessions from footer if debug=y */
    if ($vc.startState.debug = "debug=y") {
      var msg = "Session Objects:<br /><br />" +
      "start:<br />" + JSON.stringify($vc.startState) + "<br /><br />" +
      "parameter:<br />" + JSON.stringify($vc.parameterState) + "<br /><br />" +
      "session:<br />" + JSON.stringify($vc.sessionState) + "<br /><br />" +
      "device:<br />" + JSON.stringify($vc.deviceState) + "<br /><br />" +
      "app:<br />" + JSON.stringify($vc.appState) + "<br /><br />" +
      "customer:<br />" + JSON.stringify($vc.customerState) + "<br /><br />" +
      "member:<br />" + JSON.stringify($vc.memberState);
      $vc.fn.popup(msg);
    }
  });
});