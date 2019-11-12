
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") == "page_$$") {

    $("#globalConfirm").popup({ afterclose: function (event, ui) { } });

    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + left($vc.sessionState.custId, 4) + "_" + $vc.profileState.lang + ".png")

    $("#ele_$$_homeIcon").hide();
    $("#ele_$$_backIcon").hide();

    $(".ele_$$_cust").html(left($vc.sessionState.custId, 4));

    $("#ele_$$_strDate")[0].value = formatDate(prvMthStrDate(), $vc.sessionState.lang);
    $("#ele_$$_endDate")[0].value = formatDate(prvMthEndDate(), $vc.sessionState.lang);

    if ($vc.sessionState.lang == "fr") {
      $.datepicker.setDefaults($.datepicker.regional["fr"]);
      $("#ele_$$_strDate").datepicker({ inline: true, dateFormat: "d MM, yy", changeMonth: true, changeYear: true });
      $("#ele_$$_endDate").datepicker({ inline: true, dateFormat: "d MM, yy", changeMonth: true, changeYear: true });
    }
    else {
      $("#ele_$$_strDate").datepicker({ inline: true, dateFormat: "M d, yy", changeMonth: true, changeYear: true });
      $("#ele_$$_endDate").datepicker({ inline: true, dateFormat: "M d, yy", changeMonth: true, changeYear: true });
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
    $vc.fn.dialogue("$$", "[[Report will contain]] " + data.rowCount + " [[rows]]. [[Continue?]]");
  };
  var _failCnt = function (xhr, result, statusText) {
    $vc.fn.console("Error loading data");
    alert("[[This service is currently tied up.]]\n\n[[Please try again after a few minutes.]]");
  };
  var _doneSet = function (data, result, xhr) {
    if ($vc_$$_rowCount > 5000) {
      var $vc_$$_fileName = "ecommerceReport.csv";
    } else {
      var $vc_$$_fileName = "ecommerceReport.xlsx";
    };
    $vc.fn.console("Success generating " + data + " ecommerce excel records");
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
      parm.cust = left($vc.sessionState.custId, 4);
      parm.strDate = formatDate($vc_$$_strDate);
      parm.endDate = formatDate($vc_$$_endDate);
      $vc.ws("ecommerceCount", parm, _doneCnt, _failCnt);
    },
    setExcel: function () { /* create the report */
      $.mobile.loading("show");
      var parm = {};
      parm.cust = left($vc.sessionState.custId, 4);
      parm.strDate = formatDate($vc_$$_strDate);
      parm.endDate = formatDate($vc_$$_endDate);
      parm.membNo = $vc.sessionState.membNo;
      parm.lang = $vc.sessionState.lang;
      parm.fileName = "ecommerceReport";
      parm.url = "/vubizWs/v8server.asmx/";
      parm.dataType = "text";
      $vc.ws("ecommerceReport", parm, _doneSet, _failSet);
    }
  };
}();

$(".ele_$$_strDate").on("focus", function () {
  $("#ele_$$_endDate")[0].value = "";
})








$(".ele_$$_setExcel").on("click", function () {
  if ($vc.sessionState.lang == "fr") {
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
})

$(".ele_$$_getExcel").on("click", function () {
  $.mobile.loading("hide");
  $(this).hide();
  $(".ele_$$_endExcel").show();
});

$(".ele_$$_endExcel").on("click", function () {
  $(this).hide();
  $(".ele_$$_setExcel").show();
});

$("#globalConfirm").on("popupafterclose", function (event, ui) { //   after 1/2 second, take action from dialogue and store in globalConfirm
  setTimeout(function () {
    if ($vc.globalConfirm == "$$_true") {
      $(".ele_$$_setExcel").hide();
      $vc.$$.setExcel();
    } else {
      $.mobile.loading("hide");
    };
  }, 500)
});
