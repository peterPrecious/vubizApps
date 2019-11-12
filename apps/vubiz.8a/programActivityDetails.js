$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    $vc.sessionState.prevPage = "page_home";

    // commented this out Feb 5, 2018 as not sure why it's here
//    $("#globalConfirm").popup({ afterclose: function (event, ui) { } });

    $("#ele_$$_strDate")[0].value = formatDate(prvMthStrDate(), $vc.sessionState.lang);
    $("#ele_$$_endDate")[0].value = formatDate(prvMthEndDate(), $vc.sessionState.lang);

    if ($vc.sessionState.lang === "fr") {
      $.datepicker.setDefaults($.datepicker.regional["fr"]);
      $("#ele_$$_strDate").datepicker({ inline: true, dateFormat: "d MM, yy", yearRange: "-7:+0", changeMonth: true, changeYear: true });
      $("#ele_$$_endDate").datepicker({ inline: true, dateFormat: "d MM, yy", yearRange: "-7:+0", changeMonth: true, changeYear: true });
    }
    else {
      $("#ele_$$_strDate").datepicker({ inline: true, dateFormat: "M d, yy", yearRange: "-7:+0", changeMonth: true, changeYear: true });
      $("#ele_$$_endDate").datepicker({ inline: true, dateFormat: "M d, yy", yearRange: "-7:+0", changeMonth: true, changeYear: true });
    }
  };
});

var globalConfirm = "";
$vc_$$_rowCount = 0;
$vc_$$_strDate = ""; /* dates are stored here as an English Date for SQL */
$vc_$$_endDate = "";

$vc.$$ = function () {
  var _doneCnt = function (data, result, xhr) {
    $.mobile.loading("hide");
    $vc.fn.console("Success counting excel records");
    $vc_$$_rowCount = data.rowCount;
    $vc.fn.dialogue("$$", "Report will contain " + data.rowCount + " rows. Continue?");

    $("#globalConfirm").on("popupafterclose", function (event, ui) { //   after 1/2 second, take action from dialogue and store in globalConfirm
      setTimeout(function () {
        if ($vc.globalConfirm === "$$_true") {
          $(".ele_$$_setExcel").hide();
          $vc.$$.setExcel();
        } else {
          $.mobile.loading("hide");
        };
      }, 500);
    });
  };
  var _failCnt = function (xhr, result, statusText) {
    $vc.fn.console("Error loading data");
    alert("This service is currently tied up.\n\nPlease try again after a few minutes.");
  };
  var _doneSet = function (data, result, xhr) {
    var $vc_$$_fileName;
    if ($vc_$$_rowCount > 5000) {
      $vc_$$_fileName = "programActivityDetailsReport.csv";
    } else {
      $vc_$$_fileName = "programActivityDetailsReport.xlsx";
    };
    $vc.fn.console("Success generating " + data + " program activity details");
    $(".ele_$$_setExcel").hide();
    $("#ele_$$_getExcel").attr("href", "/vubizExcel/reports/" + $vc.sessionState.membNo + "/" + $vc_$$_fileName);
    $(".ele_$$_getExcel").show();

    $.mobile.loading("hide");
  };
  var _failSet = function (xhr, result, statusText) {
    $vc.fn.console("Error loading data");
    alert("This service is currently tied up.\n\nPlease try again after a few minutes.");
  };
  return {
    cntExcel: function () { /* count the number of rows in the report */
      $.mobile.loading("show");
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      parm.strDate = formatDate($vc_$$_strDate, "en");
      parm.endDate = formatDate($vc_$$_endDate, "en");
      parm.membId = $("#ele_$$_userId")[0].value;
      $vc.ws("programActivityDetailsCount", parm, _doneCnt, _failCnt);
    },
    setExcel: function () { /* create the report */
      $.mobile.loading("show");
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      parm.strDate = formatDate($vc_$$_strDate, "en");
      parm.endDate = formatDate($vc_$$_endDate, "en");
      parm.membId = $("#ele_$$_userId")[0].value;
      parm.membNo = $vc.sessionState.membNo;
      parm.lang = $vc.sessionState.lang;
      parm.fileName = "programActivityDetailsReport";
      parm.url = "/vubizWs/v8server.asmx/";
      parm.dataType = "text";
      $vc.ws("programActivityDetailsReport", parm, _doneSet, _failSet);
    }
  };
}();

$(".ele_$$_strDate").on("focus", function () {
  $("#ele_$$_endDate")[0].value = "";
});

$("#$$_emptyDates").on("click", function () {
  $("#ele_$$_strDate")[0].value = null;
  $("#ele_$$_endDate")[0].value = null;
  $("#ele_$$_strDate").textinput("refresh");
  $("#ele_$$_endDate").textinput("refresh");
});

$("#$$_emptyUserId").on("click", function () {
  $("#ele_$$_userId")[0].value = null;
  $("#ele_$$_userId").textinput("refresh");
});

$(".ele_$$_setExcel").on("click", function () {
  if ($vc.sessionState.lang === "fr") {
    $vc_$$_strDate = $.datepicker.parseDate("d MM, yy", $("#ele_$$_strDate")[0].value);
    $vc_$$_endDate = $.datepicker.parseDate("d MM, yy", $("#ele_$$_endDate")[0].value);
  } else {
    $vc_$$_strDate = $("#ele_$$_strDate").datepicker("getDate");
    $vc_$$_endDate = $("#ele_$$_endDate").datepicker("getDate");
  }
  var days = dateDiff($vc_$$_strDate, $vc_$$_endDate);
  if (days < 0) {
    $vc.fn.popup("Please enter valid start and end dates");
  } else {
    $vc.$$.cntExcel();
  };
});

$(".ele_$$_getExcel").on("click", function () {
  $.mobile.loading("hide");
  $(this).hide();
  $(".ele_$$_endExcel").show();
});

$(".ele_$$_endExcel").on("click", function () {
  $(this).hide();
  $(".ele_$$_setExcel").show();
});



// moved this up to _doneCnt on Feb 18 2018 to better capture event
//$(document).bind("pageinit", function () { // added this on Feb 5, 2018 to ensure this fires [http://jsfiddle.net/MauriceG/8qZdf/]
//  $("#globalConfirm").on("popupafterclose", function (event, ui) { //   after 1/2 second, take action from dialogue and store in globalConfirm
//    setTimeout(function () {
//      if ($vc.globalConfirm === "$$_true") {
//        $(".ele_$$_setExcel").hide();
//        $vc.$$.setExcel();
//      } else {
//        $.mobile.loading("hide");
//      };
//    }, 100)
//  });
//});




$("#pop_$$_userId").on("click", function () {
  $vc.fn.popup("If you just wish to return details for a specific learner, enter their unique identifier. Leave empty to return all learners.");
});