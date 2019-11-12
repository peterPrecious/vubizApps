
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {

    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");

    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    $vc.sessionState.prevPage = "page_home";

    $("#ele_$$_strDate").datepicker({ inline: true, dateFormat: "M d, yy", yearRange: "-7:+0", changeYear: true });
    $("#ele_$$_endDate").datepicker({ inline: true, dateFormat: "M d, yy", yearRange: "-7:+0", changeYear: true });

    if (!$vc.sessionState.guests) { $(".$$_guests").hide();};

    $vc.$$.restart();
  };

});


$vc.$$ = function () {

  var _doneSetProgramStarts = function (data, result, xhr) {
    $vc.fn.console("Success generating " + data + " Learner Activity in excel");
    $(".$$_setProgramStarts").hide();
    $("#$$_getProgramStarts").attr("href", "/vubizExcel/reports/" + $vc.sessionState.membNo + "/learnerActivityReport.xlsx");
    $(".$$_getProgramStarts").show();
    $.mobile.loading("hide");
  };
  var _failProgramStarts = function (xhr, result, statusText) {
    $.mobile.loading("hide");
    alert("Error loading ProgramStarts");
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

      $(".$$_setProgramStarts").show();
      $(".$$_getProgramStarts").hide();
    },

    dates: function () {
      if ($("#$$_dates_0").is(":checked")) return 0;
      if ($("#$$_dates_1").is(":checked")) return 1;
    },

    guests: function () {
      if ($("#$$_guests_0").is(":checked")) return 0;
      if ($("#$$_guests_1").is(":checked")) return 1;
    },

    setProgramStarts: function () {

      $.mobile.loading("show");
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      parm.completed = 0; /* set for program starts */
      parm.guests = $("#$$_guests_0").is(":checked") ? 0 : 1;
      parm.strDate = $("#ele_$$_strDate")[0].value;
      parm.endDate = $("#ele_$$_endDate")[0].value;

      parm.membNo = $vc.sessionState.membNo;
      parm.lang = $vc.sessionState.lang;
      parm.fileName = "learnerActivityReport";
      parm.type = 0;
      parm.url = "/vubizWs/v8server.asmx/";
      parm.dataType = "text";
      $vc.ws("learnerActivityReport", parm, _doneSetProgramStarts, _failProgramStarts);
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

$(".$$_setProgramStarts").on("click", function () {
  $(".$$_dates").hide();
  $(".$$_guests").hide();
  $(".$$_setProgramStarts").hide();
  $vc.$$.setProgramStarts();
  $.mobile.loading("show");
});

$(".$$_getProgramStarts").on("click", function () {
  $.mobile.loading("hide");
  $vc.$$.restart();
});
