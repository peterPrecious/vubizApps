
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_home";
    $("#ele_$$_excelReport").hide();

  }
});


$vc.$$ = function () {
  var _doneExcel = function (data, result, xhr) {
    $vc.fn.console("Success loading customers");
    $("#ele_$$_excelReport").show();
  };
  var _failExcel = function (xhr, result, statusText) {
    $vc.fn.console("Error loading customers");
    alert("Error loading customers");
  };
  return {
    excel: function (type) {
      var parm = {};

      parm.custId = null;
      parm.custAcctId = null;
      parm.custTitle = null;
      parm.custActive = null;


      parm.lang = $vc.sessionState.lang;
      parm.fileName = "customerReport";
      parm.reportName = "Customer Report";

      $vc.ws("excel", parm, _doneExcel, _failExcel);
    }
  };
}();



$("#ele_$$_display").on("click", function () {
  /* get and save report criteria (parms) */
  $vc.parmState = {};
  $vc.parmState.custId = $("#ele_$$_custId")[0].value.toLowerCase();
  $vc.parmState.custAcctId = $("#ele_$$_custAcctId")[0].value.toUpperCase();
  $vc.parmState.custTitle = $("#ele_$$_custTitle")[0].value;
  $vc.parmState.custActive = $(".ele_customerReport_custActive:checked").val();

  $(":mobile-pagecontainer").pagecontainer("change", "#page_customers");
});

$("#ele_$$_excel").on("click", function () {
  $vc.$$.excel();
});
