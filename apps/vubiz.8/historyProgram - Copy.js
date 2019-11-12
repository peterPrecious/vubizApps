$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_historyPrograms"; /* ensure we return to programs */

    $("#content_$$ h2").html(decodeURI($vc.sessionState.historyProgTitle));
    $vc.$$.historyProgram();
  }
});

$vc.$$ = function () {
  var _doneHistoryProgram = function (data, result, xhr) {
    $vc.fn.console("success HistoryProgram");
    var program = "", progEcomExpired, completed, dataParm, date, score;

    $vc.historyProgramState = data;
    $.each(data, function (key, value) {

      completed = "";
      if (value.status === "passed" || value.status === "" && isDate(value.completed)) {
        date = isDate(value.completed) ? formatDate(value.completed, $vc.sessionState.lang) : "";
        //      completed = "<img src='styles/check_b.png' />";
        if (value.modsCert === "True") {
          completed = "<img style='width:24px; opacity:0.6; vertical-align:bottom;' src='styles/certificate.png' />";
        }
      } else {
        date = isDate(value.lastDate) ? formatDate(value.lastDate) : "";
      }

      // program ecommerce expired? ... added Jan  22, 2019
      if (isDate($vc.sessionState.historyProgEcomExpires)) {
        if (Date($vc.sessionState.historyProgEcomExpires) <= Date()) {
          //          alert("expired");
          progEcomExpired = "1";
        } else {
          progEcomExpired = "0";
        }
      }

      score = value.score !== "" ? parseFloat(value.score).toFixed(1) : ""; // don't parseFloat an empty score

      dataParm = value.modsNo + "|" + value.modsId + "|" + value.modsTitle + "|" + value.score + "|" + date + "|" + progEcomExpired;

      //      + "    <div class='detail module' data-parm='" + dataParm + "'>" + value.modsId + " : " + value.modsTitle + "</div>"


      program = program
        + "<li>"
        + "  <div>"
        + "    <div class='detail module' data-parm='" + dataParm + "'>" + value.modsId + " : " + value.modsTitle + progEcomExpired + "</div>"
        + "    <div class='detail timeSpent'>" + value.timeSpent + "</div>"
        + "    <div class='detail score'>" + score + "</div>"
        + "    <div class='detail date'>" + date + "</div>"
        + "    <div class='detail certificate' data-parm='" + dataParm + "'>" + completed + "</div>"
        + "  </div>"
        + "</li>";

    });
    $("#details_$$").html(program).listview("refresh");
  };

  var _failHistoryProgram = function (xhr, result, statusText) {
    alert("Error retrieving program history: " + statusText);
  };
  return {
    historyProgram: function () {
      var parm = {};
      if ($vc.sessionState.reportByGuest) {
        parm.membNo = $vc.sessionState.guestNo;
      } else {
        parm.membNo = $vc.sessionState.membNo;
      }
      parm.progNo = $vc.sessionState.historyProgNo;
      $vc.ws("historyProgram", parm, _doneHistoryProgram, _failHistoryProgram);
    }
  };
}();


$("#ele_$$_back").on("click", function () {
  $(":mobile-pagecontainer").pagecontainer("change", "#page_historyPrograms2");
});

$("#details_$$").on("click", " .module", function () {
  var dataParm = this.attributes["data-parm"].value.split("|");
  debugger;
//  if (dataParm[5] === "1") {
//    $vc.fn.popup("[[This Program has expired on ]" + 1);
////    $vc.fn.popup("[[This Program has expired on ]" + $vc.sessionState.historyProgEcomExpires);
//  } else {
    $vc.sessionState.historyModsNo = dataParm[0];
    $vc.sessionState.historyModsId = dataParm[1];
    $vc.sessionState.historyModsTitle = dataParm[2];
    $vc.sessionState.historyModsScore = dataParm[3];
    $vc.sessionState.historyModsDate = dataParm[4];
    $vc.sessionState.prevPage = "page_historyProgram";
    $vc.fn.putData();
    $(":mobile-pagecontainer").pagecontainer("change", "#page_content");
  //}
});

$("#details_$$").on("click", ".certificate", function () {
  var dataParm = this.attributes["data-parm"].value.split("|");
  $vc.sessionState.historyModsNo = dataParm[0];
  $vc.sessionState.historyModsId = dataParm[1];
  $vc.sessionState.historyModsTitle = dataParm[2];
  $vc.sessionState.historyModsScore = dataParm[3];
  $vc.sessionState.historyModsDate = dataParm[4];

  $(":mobile-pagecontainer").pagecontainer("change", "#page_certificate");
});