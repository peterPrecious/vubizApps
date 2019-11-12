$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
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
  }
});

$vc.$$ = function () {
  var _done = function (data, result, xhr) {
    $vc.fn.console("success HistoryPrograms");
    var programsC = "", programsI = "", dataParm, completed;

    if (data === null) {
      $vc.fn.popup("[[There is no history to report.]]");
    } else {

      $.each(data, function (key, value) {

        /* when embedding a parameter containing single quotes, convert them */
        // dataParm = value.progNo + "|" + value.progId + "|" + value.progTitle1.replace("'", "%27") + "|" + value.progCompleted;
        // added progEcomExpires Jan 22, 2019 to disable launching courses
        // dataParm = value.progNo + "|" + value.progId + "|" + value.progTitle1.replace("'", "%27") + "|" + value.progCompleted + "|" + value.progEcomExpires;
        // changed progEcomExpires to progExpires - not sure where progEcomExpires came from  
        // value.progInCatalogue was added May 15, 2019 for the Report Card (determines if we can launch a module or not)
        dataParm = value.progNo + "|" + value.progId + "|" + value.progTitle1.replace("'", "%27") + "|" + value.progCompleted + "|" + value.progExpires + "|" + value.progInCatalogue;
        //        alert(dataParm);

        completed = "";

        if (value.progCompleted.length > 0) {

          // Completed Certificate icon
          if (value.progCertSimple === "True") {
            completed = ""
              + "<div "
              + " class='$$_cert'"
              + " data-parm='" + dataParm + "'"
              + ">"
              + "  <img src='styles/certificate_sm.png' />"
              + "</div >";
          } else {
            completed = "<div class='$$_none'></div>";
          }
        }

        // Completed Programs links
        if (value.progCompleted.length > 0) {

          programsC = programsC
            + "<li "
            + " data-parm='" + dataParm + "'>"
            + " <div class='$$_cont'>"
            + "   <div class='$$_prog' data-parm='" + dataParm + "'>"
            +       value.progTitle1 + "(" + value.progId + ")"
            + "   </div >"
            +     completed
            + " </div>"
            + "</li>";


          // In-Progress Programs links (do not include if not in catalogue)
        } else {

          if (value.progInCatalogue !== "0") {
            programsI = programsI
              + "<li "
              + " data-parm='" + dataParm + "'>"
              + " <div class='$$_cont'>"
              + "   <div class='$$_prog' data-parm='" + dataParm + "'>"
              + value.progTitle1 + "(" + value.progId + ")"
              + "   </div >"
              + completed
              + " </div>"
              + "</li>";
          }

        }

      });

      if (programsC.length === 0) programsC = "<li>[[There are no completed programs.]]</li>";
      if (programsI.length === 0) programsI = "<li>[[There is no in-progress programs.]]</li>";

      $("#programsC_$$").html(programsC).listview("refresh");
      $("#programsI_$$").html(programsI).listview("refresh");

    }
  };
  var _fail = function (xhr, result, statusText) {
    alert("Error retrieving accessed programs : " + statusText);
  };
  return {
    historyPrograms: function (membNo) {
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      parm.membNo = membNo;
      //parm.progNo = 0;
      //$vc.ws("historyPrograms", parm, _done, _fail);
      // changed May 14, 2019 removing parm.progNo
      $vc.ws("historyPrograms2", parm, _done, _fail);
    }
  };
}();

// certificate (Program Simple) added May 29, 2018
$("#programsC_$$").on("click", "li .$$_cert", function () {
  var dataParms = $(this)[0].attributes["data-parm"].value.split("|");
  $vc.sessionState.historyProgNo = dataParms[0];
  $vc.sessionState.historyProgId = dataParms[1];
  $vc.sessionState.historyProgTitle = dataParms[2];
  $vc.sessionState.historyModsDate = dataParms[3];
  $vc.sessionState.historyProgExpires = dataParms[4];

  $(":mobile-pagecontainer").pagecontainer("change", "#page_certificate");
});

$("#programsC_$$, #programsI_$$").on("click", "li .$$_prog", function () {
  var dataParm = $(this)[0].attributes["data-parm"].value;
  var dataParms = dataParm.split("|");
  $vc.sessionState.historyProgNo = dataParms[0];
  $vc.sessionState.historyProgId = dataParms[1];
  $vc.sessionState.historyProgTitle = dataParms[2];
  $vc.sessionState.historyProgExpires = dataParms[4];
  $vc.sessionState.historyProgInCatalogue = dataParms[5];

  $(":mobile-pagecontainer").pagecontainer("change", "#page_historyProgram");
});