
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {

    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");

    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    $vc.sessionState.prevPage = "page_home";

    $("#ele_$$_strDate").datepicker({ inline: true, dateFormat: "M d, yy", yearRange: "-7:+0", changeMonth: true, changeYear: true });
    $("#ele_$$_endDate").datepicker({ inline: true, dateFormat: "M d, yy", yearRange: "-7:+0", changeMonth: true, changeYear: true });

    if (!$vc.sessionState.guests) { $(".$$_guests").hide(); };

    $vc.$$.restart();
  };

});


$vc.$$ = function () {

  var _doneSetProgramCompletions = function (data, result, xhr) {
    $vc.fn.console("Success generating " + data + " Learner Activity in excel");
    $(".$$_setProgramCompletions").hide();
    $("#$$_getProgramCompletions").attr("href", "/vubizExcel/reports/" + $vc.sessionState.membNo + "/learnerActivityReport.xlsx");
    $(".$$_getProgramCompletions").show();
    $.mobile.loading("hide");
  };
  var _failProgramCompletions = function (xhr, result, statusText) {
    $.mobile.loading("hide");
    alert("Error loading ProgramCompletions");
  };

  return {
    restart: function () {

      $(".$$_dates").show();
      $("#$$_dates_0").prop("checked", true).checkboxradio("refresh");
      $("#$$_dates_0").trigger("click");

      if ($vc.sessionState.guests) {
        $(".$$_guests").show();
        $("#$$_guests_0").prop("checked", true).checkboxradio("refresh");
        $("#$$_guests_0").trigger("click");
      } else {
        $("#$$_guests_0").prop("checked", true);
      };
      $(".$$_setProgramCompletions").show();
      $(".$$_getProgramCompletions").hide();
    },

    dates: function () {
      if ($("#$$_dates_0").is(":checked")) return 0;
      if ($("#$$_dates_1").is(":checked")) return 1;
    },

    guests: function () {
      if ($("#$$_guests_0").is(":checked")) return 0;
      if ($("#$$_guests_1").is(":checked")) return 1;
    },

    setProgramCompletions: function () {

      $.mobile.loading("show");
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      parm.completed = 1; /* set for program completions */
      parm.guests = $("#$$_guests_0").is(":checked") ? 0 : 1;
      parm.strDate = $("#ele_$$_strDate")[0].value;
      parm.endDate = $("#ele_$$_endDate")[0].value;

      parm.membNo = $vc.sessionState.membNo;
      parm.lang = $vc.sessionState.lang;
      parm.fileName = "learnerActivityReport";
      parm.type = 1;
      parm.url = "/vubizWs/v8server.asmx/";
      parm.dataType = "text";

      $vc.ws("learnerActivityReport", parm, _doneSetProgramCompletions, _failProgramCompletions);
    }
  };
}();


$("#$$_dates_0").on("click", function () {
  $("#ele_$$_strDate")[0].value = "";
  $("#ele_$$_endDate")[0].value = "";
  $(".ele_$$_table").hide();
});

$("#$$_dates_1").on("click", function () {
  $("#ele_$$_strDate")[0].value = formatDate(prvMthStrDate());
  $("#ele_$$_endDate")[0].value = formatDate(prvMthEndDate());
  $(".ele_$$_table").show();
});

$(".$$_setProgramCompletions").on("click", function () {
  $(".$$_dates").hide();
  $(".$$_guests").hide();
  $(".$$_setProgramCompletions").hide();
  $vc.$$.setProgramCompletions();
  $.mobile.loading("show");
});

$(".$$_getProgramCompletions").on("click", function () {
  $.mobile.loading("hide");
  $vc.$$.restart();
});
