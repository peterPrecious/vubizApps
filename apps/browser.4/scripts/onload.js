
var profile, profiles, langs, lang;

$(function () {

  /* get the language pack for this page */
  _getLangs("home", function (status) {
    console.log(status);

    /* get test profiles and start testing */
    _getProfiles(function (status) {
      console.log(status);

      /* get a specific profile (ie ?profile=secondCup) or use default */
      profile = $.getUrlVar("profile");
      if (profile == undefined) {
        profile = "default"
      };
      profile = profile.toLowerCase();

      /* grab whatever is available from the URL else use profile */
      lang = $.getUrlVar("lang");
      if (lang == undefined) {
        lang = "en";
      } else {
        lang = lang.toLowerCase();
        if (lang != "en" && lang != "fr" && lang != "es" && lang != "pt") {
          lang = "en";
        }
      };

      /* put focus on right lang button */
      switch (lang) {
        case "fr":
          $("#ele_home_langFr").addClass("langButtonShadow");
          break;
        case "es":
          $("#ele_home_langEs").addClass("langButtonShadow");
          break;
        case "pt":
          $("#ele_home_langPt").addClass("langButtonShadow");
          break;
        default:
          $("#ele_home_langEn").addClass("langButtonShadow");
          break;
      }

      /* grab the required tests */
      testFlash = $.getUrlVar("testFlash");
      if (testFlash == undefined) {
        testFlash = profiles[profile].testFlash;
      };
      testFlash = testFlash.toLowerCase();
      testFlash = (testFlash == "n") ? false : true;

      testIE = $.getUrlVar("testIE");
      if (testIE == undefined) {
        testIE = profiles[profile].testIE;
      };
      testIE = testIE.toLowerCase();
      testIE = (testIE == "y") ? true : false;

      testIEc = $.getUrlVar("testIEc");
      if (testIEc == undefined) {
        testIEc = profiles[profile].testIEc;
      };
      testIEc = testIEc.toLowerCase();
      testIEc = (testIEc == "y") ? true : false;

      testChrome = $.getUrlVar("testChrome");
      if (testChrome == undefined) {
        testChrome = profiles[profile].testChrome;
      };
      testChrome = testChrome.toLowerCase();
      testChrome = (testChrome == "y") ? true : false;


      /* which text profile do we want */
      profile = $.getUrlVar("profile");
      if (profile == undefined) profile = "default";
      profile = profile.toLowerCase();

      /* load up navigator details which can be optionally rendered */
      $(".navigator").html(navigator.userAgent + "&ensp;&ensp;[" + navigator.platform + "]");


      /* test that we are not using a nasty old IE browser */
      if (/MSIE ((5\\.5)|6)/.test(navigator.userAgent) && navigator.platform == "Win32") {
        $("#browserOk").hide(); $("#browserNo").show();
      } else {
        $("#browserOk").show(); $("#browserNo").hide();
      };

      /* test for enabled cookies by setting and reading a cookie */
      document.cookie = "testcookie"
      cookies = (document.cookie.indexOf("testcookie") != -1);
      if (cookies) {
        $("#cookiesOk").show(); $("#cookiesNo").hide();
      } else {
        $("#cookiesOk").hide(); $("#cookiesNo").show();
      };

      /* test to ensure flash is installed */
      if (!testFlash) {
        $(".flash").hide();
      } else {
        /* flash is true if version 10 or greater is installed */
        if (swfobject.getFlashPlayerVersion().major > 9) {
          $("#flashOk").show(); $("#flashNo").hide();
        } else {
          $("#flashOk").hide(); $("#flashNo").show(); $("#textFlash").show(); $("#notes").show();
        };
      };

      /* test to ensure browser is IE */
      if (!testIE) {
        $(".ie").hide();
      } else {
        /* ie is false for old nasty IE browsers else true */
        if ((/MSIE/.test(navigator.userAgent) || /Trident/.test(navigator.userAgent)) && navigator.platform == "Win32") {
          $("#ieOk").show(); $("#ieNo").hide();
        }
        else {
          $("#ieOk").hide(); $("#ieNo").show(); $("#textIE").show(); $("#notes").show();
        };
      };

      /* if using IE (Trident) ensure compatibility is on */
      if (!testIEc || !(/Trident/.test(navigator.userAgent))) {
        $(".IEc").hide();
      } else {
        /* if ie10 (Trident) check if compatibility is on */
        if (/compatible; MSIE 7/.test(navigator.userAgent)) {
          $("#IEcOk").show(); $("#IEcNo").hide();
        }
        else {
          $("#IEcOk").hide(); $("#IEcNo").show(); $("#textIEc").show(); $("#notes").show();
        };
      };


      /* test to see if Chrome browser (contains bug) */
      if (!testChrome || !(/Chrome/.test(navigator.userAgent))) {
        $(".chrome").hide();
      } else {
        $("#chromeOk").hide(); $("#chromeNo").show(); $("#textChrome").show(); $("#notes").show();
      };


      /* ensure popups are not blocked then render everything (mandatory) */
      var popup = window.open("apps/browser.3/popup.html", "popupTester", "width=10,height=10,left=1,top=1,scrollbars=no,location=no,menubar=no,toolbar=no,statusbar=no");
      setTimeout(function () {

        if (popup == null || typeof (popup) == "undefined") {
          $("#popupsOk").hide(); $("#popupsNo").show(); $("#textPopup").show(); $("#notes").show();
        }

        else {
          popup.close();
          $("#popupsOk").show(); $("#popupsNo").hide();
        };

        /* generate the page in the appropriate language */
        renderPage("home", lang);

        /* hide the noscript and display the script since we are in fact scripting */
        $(".noscript").hide();
        $(".script").show();


      }, 500);


    });

  });


});