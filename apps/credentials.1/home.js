var $var_$$_initialized = false;

$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");

    if (!$var_$$_initialized) {
      $var_$$_initialized = true;
      $vc.sessionState.debug = true;
      $vc.$$.initGUI();
      $vc.$$.getLanguagePack();
    }
  }
});

$vc.$$ = function () {
  var _doneEmail = function (data, result, xhr) {
    $vc.fn.console("Success running email");
    var msg = $vc.langs[$vc.sessionState.lang].doneEmail;
    $vc.fn.popup(msg);
  };
  var _failEmail = function (xhr, result, statusText) {
    $vc.fn.console("Failed running email");
    var msg = $vc.langs[$vc.sessionState.lang].failEmail;
    $vc.fn.popup(msg);
  };
  var _doneGetId = function (data, result, xhr) {
    $vc.fn.console("Success running credentials");
    if (data === null) {
      var msg = $vc.langs[$vc.sessionState.lang].doneGetId;
      $vc.fn.popup(msg);
    } else {
      var parm = {};
      parm.emailFrom = $vc.profileState.emailFrom;
      parm.emailTo = $vc.sessionState.membEmail;
      parm.emailSubject = $vc.langs[$vc.sessionState.lang].emailSubject;
      parm.emailBody = $vc.langs[$vc.sessionState.lang].emailBody1
                     + " : "
                     + data[0].custId
                     + ";;"  /* double ;; will generate a <br /> */
                     + $vc.langs[$vc.sessionState.lang].emailBody2
                     + " : "
                     + data[0].membId;
      $vc.ws("email", parm, _doneEmail, _failEmail);
    }
  };
  var _failGetId = function (xhr, result, statusText) {
/*  var msg = "We were unable to run the service that retrieves your credentials.<br />Please alert support!";  */
    var msg = $vc.langs[$vc.sessionState.lang].failGetId;
    $vc.fn.popup(msg);
  };
  var _doneGetLanguagePack = function (data, result, xhr) {
    $vc.langs = data;

    $("#header_home_title").html($vc.langs[$vc.sessionState.lang].pageTitle);

    $("#txt_home_title").html($vc.langs[$vc.sessionState.lang].title);
    $("#txt_home_subTitle").html($vc.langs[$vc.sessionState.lang].subTitle);
    $("#lab_home_custId").html($vc.langs[$vc.sessionState.lang].custId);
    $("#lab_home_membEmail").html($vc.langs[$vc.sessionState.lang].membEmail);
    $("#ele_home_search").html($vc.langs[$vc.sessionState.lang].search);
    $("#ele_home_contactUs").html($vc.langs[$vc.sessionState.lang].contactUs);
    $("#ele_home_emailFrom").html($vc.profileState.emailFrom);

    $("#ele_$$_membEmail").attr("placeholder", $vc.langs[$vc.sessionState.lang].membEmail);  /* email placeholder */
  };
  var _failGetLanguagePack = function (data, result, xhr) {
    var msg;
    msg = "We were unable to load the language pack for this page.<br />Please alert support!";
    msg = $vc.langs[$vc.sessionState.lang].failGetLanguagePack;
    $vc.fn.popup(msg);
  };
  return {
    getId: function () {
      var msg;
      $vc.sessionState.membEmail = $("#ele_$$_membEmail").val();
      if ($vc.sessionState.membEmail.length < 6) {
        msg = $vc.langs[$vc.sessionState.lang].noEmail;
        $vc.fn.popup(msg);
      } else {
        msg = "We are calling up the Login Helper service. This should just take a few moments.";
        msg = $vc.langs[$vc.sessionState.lang].getId;
        $vc.fn.popup(msg, true);
        var parm = {};

        parm.membEmail = $vc.sessionState.membEmail;
        parm.lang = $vc.sessionState.lang;
        $vc.ws("credentials", parm, _doneGetId, _failGetId);
      }
    },
    initGUI: function () {
      $("#ele_$$_homeIcon").hide();
      $("#ele_$$_backIcon").hide();
      $("#ele_$$_videoIcon").hide();
      $("#ele_$$_langEs").hide();
      $("#ele_$$_langPt").hide();
      $("#ele_$$_logo").addClass($vc.sessionState.profile);       /* embed the profile logo */
    },
    getLanguagePack: function () {
      $vc.fn.console("getting language pack for $$");
      /*
            $vc.sessionState.profile = $vc.sessionState.appId;
      */
      $vc.sessionState.page = "$$";
      $ws.langs($vc.sessionState, _doneGetLanguagePack, _failGetLanguagePack);
    },
    changeLang: function (lang) {
      $vc.sessionState.lang = lang;
      $(".langButton").removeClass("langButtonShadow");
      $(".langButton_" + lang).addClass("langButtonShadow");
      $vc.$$.getLanguagePack();
    }
  };
}();

$(function () {
  $("#ele_$$_search").on("click", function (event) { $vc.$$.getId(); });
  $(".langButton_en").on("click", function () { $vc.$$.changeLang("en"); });
  $(".langButton_fr").on("click", function () { $vc.$$.changeLang("fr"); });
  $(".langButton_es").on("click", function () { $vc.$$.changeLang("es"); });
  $(".langButton_pt").on("click", function () { $vc.$$.changeLang("pt"); });
});