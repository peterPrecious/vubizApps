$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_home"; /* ensure we return to programs */

    /* turn on the completed option when starting */
    $("#ele_$$_completed").prop("checked", true).checkboxradio("refresh");
    $vc.sessionState.historyCompleted = 1;

    /* if reportByGuest is true then this is for an employee */
    if ($vc.sessionState.reportByGuest) {
      $vc.sessionState.historyMembId = $vc.sessionState.guestId;
      $("#ele_$$_name").html($vc.sessionState.guestFirstName + " " + $vc.sessionState.guestLastName);
      $vc.$$.historyPrograms($vc.sessionState.guestNo);
    } else {
      $vc.sessionState.historyMembId = $vc.sessionState.membId;
      $("#ele_$$_name").html($vc.sessionState.membFirstName + " " + $vc.sessionState.membLastName);
      $vc.$$.historyPrograms($vc.sessionState.membNo);
    }
  };
});

$vc.$$ = function () {
  var _doneHistoryPrograms = function (data, result, xhr) {

    $vc.fn.console("success HistoryPrograms");
    var programs = "", dataParm, completed;
    if (data == null) {
      $vc.fn.popup("[[There is no history to report.]]");
    } else {
      $.each(data, function (key, value) {

        if (value.progCompleted.length > 0) {
          completed = " class='checked-list' ";
        } else {
          completed = ""
        };

        /* when embedding a parameter containing single quotes, convert them */
        dataParm = value.progNo + "|" + value.progId + "|" + value.progTitle1.replace("'", "%27");
        programs = programs
        + "<li" + completed + " data-parm='" + dataParm + "'>" + value.progTitle1 + " (" + value.progId + ")</li>";

      });
      $("#programs_$$").html(programs).listview("refresh");
    }
  };
  var _failHistoryPrograms = function (xhr, result, statusText) {
    alert("Error retrieving accessed programs : " + statusText);
  };
  return {
    historyPrograms: function (membNo) {
      var parm = {};
      parm.membNo = membNo;
      parm.completed = $vc.sessionState.historyCompleted;
      $vc.ws("historyPrograms", parm, _doneHistoryPrograms, _failHistoryPrograms);
    }
  };
}();

$("#ele_$$_completed").on("click", function (event) {
  $vc.sessionState.historyCompleted = this.checked ? 1 : 0;
  if (this.checked) {
    $("#lab_$$_completed").addClass("checked-list");
  } else {
    $("#lab_$$_completed").removeClass("checked-list");
  };
  $vc.$$.historyPrograms($vc.sessionState.membNo);
});

$("#programs_$$").on("click", "li", function (event) {

  var dataParm = $(this)[0].attributes["data-parm"].value;
  var dataParms = dataParm.split("|");
  $vc.sessionState.historyProgNo = dataParms[0];
  $vc.sessionState.historyProgId = dataParms[1];
  $vc.sessionState.historyProgTitle = dataParms[2];

  $(":mobile-pagecontainer").pagecontainer("change", "#page_historyProgram");
});
