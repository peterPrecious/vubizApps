
$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo)
    $("#ele_$$_sampExpires")[0].innerHTML = formatDate("", "EN", 30);  // display default date of 30 days from now
    $vc.$$.getSamp($vc.sessionState.sampNo);
    $vc.sessionState.prevPage = "page_samplers";

  };
});

$vc.$$ = function () {
  var _doneGet = function (data, result, xhr) {
    $vc.fn.console("Success loading Sampler");

    $("#ele_$$_sampExpires").text(formatDate(data[0].sampExpires));
    $("#ele_$$_sampLimitPages").val(data[0].sampLimitPages);
    $("#ele_$$_sampStartPage").val(data[0].sampStartPage);
    $("#ele_$$_sampStartPage").val(data[0].sampStartPage);
    $("#ele_$$_sampEndPage").val(data[0].sampEndPage);
    $("#ele_$$_sampMaxVisits").val(data[0].sampMaxVisits);
    $("#ele_$$_sampMaxVisits").val(data[0].sampMaxMinutes);
    $("#ele_$$_sampProduction").val(data[0].sampProduction);

    // set number of days from expiry date (stored)
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var today = new Date();
    var expires = new Date(formatDate(data[0].sampExpires));
    var days = Math.round(Math.abs((expires - today) / (oneDay)));
    $("#ele_$$_numDays").val(days + 1);
  };
  var _doneUpd = function (data, result, xhr) {
    $vc.fn.dialogue("$$", "Sampler was updated successfully. Continue?");
  };
  var _fail = function (xhr, result, statusText) {
    alert("Error loading Sampler");
  };
  return {
    getSamp: function (sampNo) {
      var parm = {};
      parm.sampNo = sampNo;
      $vc.ws("sp8samplerSettings", parm, _doneGet, _fail);
    },
    resSamp: function () {
      $("#ele_$$_numDays").val(90); $("#ele_$$_sampExpires")[0].innerHTML = formatDate("", "EN", parseInt($(this)[0].value));
      $("#ele_$$_sampLimitPages").val(10);
      $("#ele_$$_sampStartPage").val(0);
      $("#ele_$$_sampEndPage").val(0);
      $("#ele_$$_sampMaxVisits").val(25);
      $("#ele_$$_sampMaxMinutes").val(120);
    },
    updSamp: function (sampNo) {
      var parm = {}, ok = true;
      parm.sampNo = sampNo;
      parm.sampExpires = $("#ele_$$_sampExpires")[0].innerHTML;
      parm.sampLimitPages = $("#ele_$$_sampLimitPages")[0].value;
      parm.sampStartPage = $("#ele_$$_sampStartPage")[0].value;
      parm.sampEndPage = $("#ele_$$_sampEndPage")[0].value;
      parm.sampMaxVisits = $("#ele_$$_sampMaxVisits")[0].value;
      parm.sampMaxMinutes = $("#ele_$$_sampMaxMinutes")[0].value;
      //parm.sampProduction = $("#ele_$$_sampProduction")[0].value;
      parm.sampProduction = 1;
      $vc.ws("sp8samplerSettingsUpd", parm, _doneUpd, _fail);
    }

  };
}();

$(function () {
  $("#ele_$$_next").on("click", function () {
    $vc.$$.getId();
  });

  // to reset value to zero
  $(".clearId").on("click", function () {
    var id = $(this)[0].attributes["data"].value;
    $("#" + id).val("0");
  });

  // when quickclicking days, display new values
  $(".setValue").on("click", function () {
    var id = $(this)[0].attributes["data"].value;
    var value = $(this)[0].innerHTML;
    $("#" + id).val(value);
    $("#ele_$$_sampExpires")[0].innerHTML = formatDate("", "EN", parseInt(value));
  });

  // when changing number of days, display new date
  $("#ele_$$_numDays").on("change", function () {
    $("#ele_$$_sampExpires")[0].innerHTML = formatDate("", "EN", parseInt($(this)[0].value));
  });

  /* these are for the 3 buttons at the bottom of the page */
  $("#ele_$$_res").on("click", function () {    // reset sampler
    $vc.$$.resSamp();
  });

  $("#ele_$$_can").on("click", function () {    // return without any activity
    $(":mobile-pagecontainer").pagecontainer("change", "#page_samplers");
  });

  $("#ele_$$_upd").on("click", function () {    // update sample
    $vc.$$.updSamp($vc.sessionState.sampNo);
  });

});