
/* these are the default report parms, start with Members whose last name starts with 'A' */
var $$_rept = "O";
var $$_type = "M";
var $$_init = "A";

$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {

    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_home";
    $vc.$$.restart();

    $.mobile.resetActivePageHeight();

  }
});

$vc.$$ = function () {
  var _doneGetLearners = function (data, result, xhr) {
    if ($("#$$_rept_O")[0].checked) {
      $vc.fn.console("Success loading learners");
      var learners = "";
      $("#ele_$$_tbody").html(learners);
      $.each(data, function (key, value) {
        learners = learners
        + "  <tr>"
        + "    <td>" + value.membFirstName + "</td>"
        + "    <td>" + value.membLastName + "</td>"
        + "    <td>" + value.membEmail + "</td>"
        + "    <td style='text-align:center'>" + value.membActive + "</td>"
        + "  </tr>";
        //+ "    <td class='pooh' style='text-align:center'><a class='ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-edit ui-alt-icon ui-nodisc-icon' href='javascript:alert(\"Coming\")'>Edit</a></td>"
      });
      $("#ele_$$_tbody").html(learners);
    } else {
      $(".$$_excelRetrieve").show();
    }
    $.mobile.loading("hide");
  };
  var _doneSetXLearners = function (data, result, xhr) {
    $vc.fn.console("Success generating " + data + " learners in excel");
    $(".$$_setXLearners").hide();
    $("#$$_getXLearners").attr("href", "/vubizExcel/reports/" + $vc.sessionState.membNo + "/learnerReport.xlsx");
    $(".$$_getXLearners").show();
    $.mobile.loading("hide");
  };
  var _failLearners = function (xhr, result, statusText) {
    $.mobile.loading("hide");
    alert("Error loading learners");
  };
  return {
    restart: function () {

      $$_rept = "O";
      $$_type = "M";
      $$_init = "A";

      $(".$$_selector").show();
      $(".$$_tileSet").show();
      $(".$$_table").show();
      $("#ele_$$_tbody").html("");

      $(".$$_excelGenerate").hide();
      $(".$$_excelRetrieve").hide();

      $("#$$_rept_O").css({
        "background-color": "#4c8be8",
        "color": "white"
      });

      $("#$$_rept_E").css({
        "background-color": "white",
        "color": "#4c8be8"
      });


      /* when an account has an "employee" class, like CFIB then allow selection */
      if ($vc.sessionState.memb_E) $(".$$_type").show();

      $("#$$_rept_O").prop("checked", true).checkboxradio("refresh");
      $("#$$_rept_E").prop("checked", false).checkboxradio("refresh");
      $("#$$_type_M").prop("checked", true).checkboxradio("refresh");
      $("#$$_type_E").prop("checked", false).checkboxradio("refresh");

      $(".$$_tile").first().trigger("click");

    },
    getLearners: function (type, init) {
      $.mobile.loading("show");
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      parm.membType = type;
      parm.membLastName = init;
      $vc.ws("learnerReport", parm, _doneGetLearners, _failLearners);
    },
    setXLearners: function () {
      $.mobile.loading("show");
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      parm.membNo = $vc.sessionState.membNo;
      parm.lang = $vc.sessionState.lang;
      parm.fileName = "learnerReport";
      parm.url = "/vubizWs/v8server.asmx/";
      parm.dataType = "text";
      $vc.ws("cXlearnerReport", parm, _doneSetXLearners, _failLearners);
    }
  };
}();

$("#$$_rept_O").on("click", function () {


  $("#$$_rept_O").css({
    "background-color": "#4c8be8",
    "color": "white"
  });

  $("#$$_rept_E").css({
    "background-color": "white",
    "color": "#4c8be8"
  });




  $(".$$_tile").css({
    "background-color": "white",
    "color": "#4c8be8"
  });

  $$_rept = "O";
  $(".$$_tileSet").show();
  $(".$$_table").show();
  $("#ele_$$_tbody").html("");

  $(".$$_tile").first().trigger("click");

});

$("#$$_rept_E").on("click", function () {
  $(".$$_tile").css({
    "background-color": "white",
    "color": "#4c8be8"
  });
  $$_rept = "E";
  $$_init = "";
  $(".$$_selector").hide();
  $(".$$_tileSet").hide();
  $(".$$_table").hide();
  $(".$$_setXLearners").show();
});

$(".$$_setXLearners").on("click", function () {
  $(".$$_setXLearners").hide();
  $vc.$$.setXLearners();
  $.mobile.loading("show");
});

$(".$$_excelRetrieve").on("click", function () {
  $.mobile.loading("hide");
  $(".$$_excelGenerate").hide();
  $(".$$_selector").show();
  $(this).hide();
  //$vc.$$.restart();

});

$("#$$_type_M").on("click", function () {

  $(".$$_employees").css({
    "background-color": "white",
    "color": "#4c8be8"
  });

  $(".$$_members").css({
    "background-color": "#4c8be8",
    "color": "white"
  });

  $(".$$_tile").css({
    "background-color": "white",
    "color": "#4c8be8"
  });

  $$_type = "M";
  $(".$$_table").show();
  $("#ele_$$_tbody").html("");
});

$("#$$_type_E").on("click", function () {

  $(".$$_members").css({
    "background-color": "white",
    "color": "#4c8be8"
  });

  $(".$$_employees").css({
    "background-color": "#4c8be8",
    "color": "white"
  });

  $(".$$_tile").css({
    "background-color": "white",
    "color": "#4c8be8"
  });

  $$_type = "E";
  $("#ele_$$_tbody").html("");
});

$(".$$_tile").on("click", function () { /* this is the starting letter of their last name */
  $(".$$_tile").css({
    "background-color": "white",
    "color": "#4c8be8"
  });
  $(this).css({
    "background-color": "#4c8be8",
    "color": "white"
  });
  $$_init = this.innerHTML;
  $vc.$$.getLearners($$_type, $$_init, ($$_rept === "E"));
});
