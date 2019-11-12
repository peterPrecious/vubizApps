var $var_$$_initialized = false;

$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    $vc.sessionState.prevPage = "page_organizations";
    $("#globalConfirm").popup({ afterclose: function (event, ui) { } });
    $(".ele_$$_getExcel").hide();
    $(".ele_$$_endExcel").hide();
  }
});

$vc.$$ = function () {
  var _clean = function (arrayList) { /* in case there are any embedded commas, look at each element in the array and create a string separated by pipes */
    var stringList = "";
    $.each(arrayList, function (index, value) { stringList += value + '|'; });
    stringList = left(stringList, stringList.length - 1); // remove the trailing pipe
    return stringList;
  };
  var _doneSet = function (data, result, xhr) {
    $.mobile.loading("hide");
    $vc.fn.console("Success counting excel records");
    $vc_$$_rowCount = data.rowCount;
    $vc.fn.dialogue("$$", "Report will contain " + data.rowCount + " rows. Continue?");
  };
  var _fail = function (xhr, result, statusText) {
    $vc.fn.console("Error loading data");
    alert("This service is currently tied up.\n\nPlease try again after a few minutes.");
  };
  var _doneGet = function (data, result, xhr) {
    var $vc_$$_fileName;
    if ($vc_$$_rowCount > 5000) {
      $vc_$$_fileName = "isGovActivityReport.csv";
    } else {
      $vc_$$_fileName = "isGovActivityReport.xlsx";
    }
    $vc.fn.console("Success generating " + data + " program activity details");
    $(".ele_$$_setExcel").hide();
    $("#ele_$$_getExcel").attr("href", "/vubizExcel/reports/" + $vc.sessionState.membNo + "/" + $vc_$$_fileName);
    $(".ele_$$_getExcel").show();

    $.mobile.loading("hide");
  };
  return {
    setExcel: function () { /* count the number of rows in the report */
      $.mobile.loading("show");
      var parm = {};
      parm.organizations = _clean($vc.sessionState.organizations);
      parm.strDate = $vc.sessionState.strDate;
      parm.endDate = $vc.sessionState.endDate;
      parm.repType = 0; /* 0:count 1:report */
      $vc.ws("isGovActivity", parm, _doneSet, _fail);
    },
    getExcel: function () { /* create the report */
      $.mobile.loading("show");
      var parm = {};
      parm.organizations = _clean($vc.sessionState.organizations);
      parm.strDate = $vc.sessionState.strDate;
      parm.endDate = $vc.sessionState.endDate;
      parm.repType = 1; /* 0:count 1:report */
      parm.membNo = $vc.sessionState.membNo;
      parm.lang = $vc.sessionState.lang;
      parm.fileName = "isGovActivityReport";
      parm.url = "/vubizWs/v8server.asmx/";
      parm.dataType = "text";
      $vc.ws("isGovActivity", parm, _doneGet, _fail);
    }
  };
}();

$(".ele_$$_setExcel").on("click", function () {
  $vc.$$.setExcel();
});

$(".ele_$$_getExcel").on("click", function () {
  $.mobile.loading("hide");
  $(this).hide();
  $(".ele_$$_endExcel").show();
  $vc.$$.getExcel();
});

$(".ele_$$_endExcel").on("click", function () {
  $(this).hide();
  $(".ele_$$_setExcel").show();
});

$("#globalConfirm").on("popupafterclose", function (event, ui) { //   after 1/2 second, take action from dialogue and store in globalConfirm
  setTimeout(function () {
    if ($vc.globalConfirm === "$$_true") {
      $(".ele_$$_setExcel").hide();
      $vc.$$.getExcel();
    } else {
      $.mobile.loading("hide");
    }
  }, 500);
});
