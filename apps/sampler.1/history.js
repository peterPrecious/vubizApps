$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + ifElse($vc.profileState.logo, "vubz_en.png"))

    $("#ele_$$_sampExpires").datepicker({ inline: true, dateFormat: "M d, yy", yearRange: "-7:+0", changeMonth: true, changeYear: true });

    // default expires date to 90 days from now
    //if ($("#ele_$$_sampExpires")[0].value == "") $("#ele_$$_sampExpires")[0].value = formatDate("", "EN", 90);

    $vc.$$.getSamp($vc.sessionState.sampNo);
    $vc.sessionState.prevPage = "page_samplers";
  };
});

$vc.$$ = function () {
  var _doneGetSampler = function (data, result, xhr) {
    $vc.fn.console("Success loading Sampler");
    $.each(data, function (key, value) {

      $("#ele_$$_sampId").val(value.sampId);
      $("#ele_$$_sampTitle").val(value.sampTitle);
      $("#ele_$$_sampExpires").val(formatDate(value.sampExpires));

      $("#ele_$$_sampTitle01").val(value.sampTitle01);
      $("#ele_$$_sampCont01").val(value.sampCont01);
      $("#ele_$$_sampTitle02").val(value.sampTitle02);
      $("#ele_$$_sampCont02").val(value.sampCont02);
      $("#ele_$$_sampTitle03").val(value.sampTitle03);
      $("#ele_$$_sampCont03").val(value.sampCont03);
      $("#ele_$$_sampTitle04").val(value.sampTitle04);
      $("#ele_$$_sampCont04").val(value.sampCont04);
      $("#ele_$$_sampTitle05").val(value.sampTitle05);
      $("#ele_$$_sampCont05").val(value.sampCont05);
      $("#ele_$$_sampTitle06").val(value.sampTitle06);
      $("#ele_$$_sampCont06").val(value.sampCont06);
      $("#ele_$$_sampTitle07").val(value.sampTitle07);
      $("#ele_$$_sampCont07").val(value.sampCont07);
      $("#ele_$$_sampTitle08").val(value.sampTitle08);
      $("#ele_$$_sampCont08").val(value.sampCont08);

    });
  };
  var _fail = function (xhr, result, statusText) {
    alert("Error loading Sampler");
  };

  return {
    getSamp: function (sampNo) {
      var parm = {};
      parm.sampNo = sampNo;
      $vc.ws("sampler", parm, _doneGetSampler, _fail);
    },

  };
}();

$(function () {
  $("#ele_$$_next").on("click", function () {
    $vc.$$.getId();
  });
});