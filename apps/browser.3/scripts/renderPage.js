﻿
function renderPage(page, lang) {


  var _getLangs = function (page, callback) {
    $.ajax({
      dataType: "script",
      async: false,
      url: "apps/browser.3/" + page + ".lang.js",
      success: function (data) {
        callback("loaded language pack for " + page + " page");
      },
      done: function (jqXHR, textStatus) {
        alert("fail");
        callback("could NOT load language pack for " + page + " page");
      }
    });
  };


  // show appropriate language fields
  $(".en, .fr, .es, .pt").hide();
  $("." + lang).show();

  // show all language selectors then hide the selected language selector
  $(".langEn").show();
  $(".langFr").show();
  $(".langEs").show();
  $(".langPt").show();
  $(".lang_" + lang).hide();

  // populate test output 
  $("#textName").html(langs[lang].appName);
  $("#textTitle").html(langs[lang].appTitle);
  $("#textPopup").html(langs[lang].popup);
  $("#textBrowser").html(langs[lang].browser);
  $("#textFlash").html(langs[lang].flash);
  $("#textIE").html(langs[lang].IE);
  $("#textIEc").html(langs[lang].IEc);
  $("#textChrome").html(langs[lang].Chrome);
  $("#textChrome54").html(langs[lang].Chrome54);
  $("#textFF31").html(langs[lang].FF31);
  $("#textJava").html(langs[lang].Java);
  $("#textEcom").html(langs[lang].Ecom);

  // render labels
  $("#lab_home_option").html(langs[lang].option);
  $("#lab_home_yourStatus").html(langs[lang].yourStatus);
  $("#lab_home_notes").html(langs[lang].notes);

  $("#lab_home_browserVersion").html(langs[lang].browserVersion);
  $("#lab_home_popupsEnabled").html(langs[lang].popupsEnabled);
  $("#lab_home_cookiesEnabled").html(langs[lang].cookiesEnabled);
  $("#lab_home_enableCookies").html(langs[lang].enableCookies);
  $("#lab_home_flashEnabled").html(langs[lang].flashEnabled);
  $("#lab_home_browserIsIE").html(langs[lang].browserIsIE);
  $("#lab_home_browserIsIEc").html(langs[lang].browserIsIEc);
  $("#lab_home_browserIsChrome").html(langs[lang].browserIsChrome);
  $("#lab_home_browserIsChrome54").html(langs[lang].browserIsChrome54);
  $("#lab_home_browserIsFF31").html(langs[lang].browserIsFF31);
  $("#lab_home_javaEnabled").html(langs[lang].javaEnabled);
  $("#lab_home_ecomReady").html(langs[lang].ecomReady);

  $("#textSupport").html(langs[lang].support);


  // add in profile email from url or profile
  var email = $.getUrlVar("email");
  if (email === undefined) { 
    $("#email").html(profiles[profile].email);
  } else {
    email = "<a href='mailto:" + email + "'>" + email + "</a>";
    $("#email").html(email);
  }


  $(".navigator").hide();

  $("#content_home").show();
}