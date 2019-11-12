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
    var program = "", completed, dataParm, date, score;

    $vc.historyProgramState = data;
    $.each(data, function (key, value) {

      completed = "";
      //      if (value.status === "passed" || value.status === "" && isDate(value.completed)) {
      if (value.status === "completed" || value.status === "passed" || value.status === "" && isDate(value.completed)) {
        date = isDate(value.completed) ? formatDate(value.completed, $vc.sessionState.lang) : "";
        //      completed = "<img src='styles/check_b.png' />";
        if (value.modsCert === "True") {
          completed = "<img style='width:24px; opacity:0.6; vertical-align:bottom;' src='styles/certificate.png' />";
        }
      } else {
        date = isDate(value.lastDate) ? formatDate(value.lastDate) : "";
      }
      score = value.score !== "" ? parseFloat(value.score).toFixed(1) : ""; // don't parseFloat an empty score
      dataParm = value.modsNo + "|" + value.modsId + "|" + value.modsTitle + "|" + value.score + "|" + date;

      program = program
        + "<li>"
        + "  <div>"
        + "    <div class='detail module' data-parm='" + dataParm + "'>" + value.modsId + " : " + value.modsTitle + "</div>"
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
  if (isDate($vc.sessionState.historyProgExpires)) {
    $vc.fn.popup("[[Content in this Program has exired.]]");
  } else if ($vc.sessionState.historyProgInCatalogue === "0") {  // added May 19, 2019 to ensure you can't launch a module if it's program has been removed from the catalogue
    $vc.fn.popup("[[This Content has been removed from the Catalogue.]]");
  } else {
    $vc.sessionState.historyModsNo = dataParm[0];
    $vc.sessionState.historyModsId = dataParm[1];
    $vc.sessionState.historyModsTitle = dataParm[2];
    $vc.sessionState.historyModsScore = dataParm[3];
    $vc.sessionState.historyModsDate = dataParm[4];
    $vc.sessionState.prevPage = "page_historyProgram";
    $vc.fn.putData();
    $(":mobile-pagecontainer").pagecontainer("change", "#page_content");
  }
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