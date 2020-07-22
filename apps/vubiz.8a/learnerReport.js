$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    $vc.sessionState.prevPage = "page_home";
    $vc.$$.restart();
  }
});

$vc.$$ = function () {
  var _doneSetLearners = function (data, result, xhr) {
    $vc.fn.console("Success generating " + data + " learners in excel");
    $(".$$_setLearners").hide();
    $("#$$_getLearners").attr("href", "/vubizExcel/reports/" + $vc.sessionState.membNo + "/learnerReport.xlsx");
    $(".$$_getLearners").show();
    $.mobile.loading("hide");
  };
  var _failLearners = function (xhr, result, statusText) {
    $.mobile.loading("hide");
    alert("Error loading learners");
  };
  return {
    restart: function () {
      $(".$$_setLearners").show();
      $(".$$_getLearners").hide();

      $("#$$_guests_0").prop("checked", true).checkboxradio("refresh");
      $("#$$_guests_0").trigger("click");
    },

    setLearners: function () {
      $.mobile.loading("show");
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      parm.guests = $("#$$_guests_0").is(":checked") ? 0 : 1;
      parm.membNo = $vc.sessionState.membNo;
      parm.lang = $vc.sessionState.lang;
      parm.fileName = "learnerReport";
      parm.url = "/vubizWs/v8server.asmx/";
      parm.dataType = "text";
      $vc.ws("learnerReport2a", parm, _doneSetLearners, _failLearners);
    }
  };
}();

$(".$$_setLearners").on("click", function () {
  $(".$$_setLearners").hide();
  $vc.$$.setLearners();
  $.mobile.loading("show");
});

$(".$$_getLearners").on("click", function () {
  $.mobile.loading("hide");
  $vc.$$.restart();
});
