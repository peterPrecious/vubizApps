
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {

    //$("#globalConfirm").enhanceWithin().popup();
    $("#globalConfirm").popup({ afterclose: function (event, ui) { } });

    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + left($vc.sessionState.custId, 4) + "_" + $vc.profileState.lang + ".png");

    $("#ele_$$_homeIcon").hide();
    $("#ele_$$_backIcon").hide();

    $(".ele_$$_cust").html(left($vc.sessionState.custId, 4));

    $("#ele_$$_strDate")[0].value = formatDate(prvMthStrDate());
    $("#ele_$$_endDate")[0].value = formatDate(prvMthEndDate());

    $("#ele_$$_strDate").datepicker({ inline: true, dateFormat: "M d, yy", changeMonth: true, changeYear: true });
    $("#ele_$$_endDate").datepicker({ inline: true, dateFormat: "M d, yy", changeMonth: true, changeYear: true });
  }
});

var globalConfirm = "";
$vc_$$_rowCount = 0;

$vc.$$ = function () {
  var _doneCnt = function (data, result, xhr) {
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
        }
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
      $vc_$$_fileName = "ecommerceReport.csv";
    } else {
      $vc_$$_fileName = "ecommerceReport.xlsx";
    }
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
      parm.strDate = $("#ele_$$_strDate")[0].value;
      parm.endDate = $("#ele_$$_endDate")[0].value;
      $vc.ws("ecommerceCount", parm, _doneCnt, _failCnt);
    },
    setExcel: function () { /* create the ecommerce report */
      $.mobile.loading("show");
      var parm = {};
      parm.cust = left($vc.sessionState.custId, 4);
      parm.strDate = $("#ele_$$_strDate")[0].value;
      parm.endDate = $("#ele_$$_endDate")[0].value;
      parm.membNo = $vc.sessionState.membNo;
      parm.lang = $vc.sessionState.lang;
      parm.fileName = "ecommerceReport";
      parm.url = "/vubizWs/v8server.asmx/";
      parm.dataType = "text";
      $vc.ws("ecommerceReport", parm, _doneSet, _failSet);
    }
  };
}();

$(".ele_$$_setExcel").on("click", function () {

  var strDate, endDate;

  strDate = $("#ele_$$_strDate").datepicker("getDate");
  endDate = $("#ele_$$_endDate").datepicker("getDate");

  strDate = $("#ele_$$_strDate")[0].value;
  endDate = $("#ele_$$_endDate")[0].value;
  var days = dateDiff(strDate, endDate);

  if (days < 0) {
    $vc.fn.popup("Please enter valid start and end dates");
  } else {
    $vc.$$.cntExcel();
  }
});

$(".ele_$$_getExcel").on("click", function () {
  $.mobile.loading("hide");
  $(this).hide();
});
