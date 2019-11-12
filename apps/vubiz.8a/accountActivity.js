
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_home";
    $vc.$$.activity();
  }
});

$vc.$$ = function () {
  var _doneActivity = function (data, result, xhr) {
    $vc.fn.console("Success loading Activity");

    if (data.mem === "0" || data.mem === "") $(".ele_$$_mem").hide(); else $("#ele_$$_mem").html(data.mem);
    if (data.gue === "0" || data.gue === "") $(".ele_$$_gue").hide(); else $("#ele_$$_gue").html(data.gue);
    if (data.emp === "0" || data.emp === "") $(".ele_$$_emp").hide(); else $("#ele_$$_emp").html(data.emp);
    if (data.fac === "0" || data.fac === "") $(".ele_$$_fac").hide(); else $("#ele_$$_fac").html(data.fac);
    if (data.mgr === "0" || data.mgr === "") $(".ele_$$_mgr").hide(); else $("#ele_$$_mgr").html(data.mgr);
    if (data.all === "0" || data.all === "") $(".ele_$$_all").hide(); else $("#ele_$$_all").html(data.all);

    if (data.mCv === "0" || data.mCv === "") $(".ele_$$_mCv").hide(); else $("#ele_$$_mCv").html(data.mCv);
    if (data.mCp === "0" || data.mCp === "") $(".ele_$$_mCp").hide(); else $("#ele_$$_mCp").html(data.mCp);
    if (data.mCd === "0" || data.mCd === "") $(".ele_$$_mCd").hide(); else $("#ele_$$_mCd").html(parseInt(data.mCd));
    if (data.eCv === "0" || data.eCv === "") $(".ele_$$_eCv").hide(); else $("#ele_$$_eCv").html(data.eCv);

    $("#alert_$$").hide();

  };
  var _failActivity = function (xhr, result, statusText) {
    alert("Error loading Activity data");
  };
  return {
    activity: function () {
      var parm = {};

      parm.custId = $vc.sessionState.custId;
      parm.certPrograms = $vc.sessionState.certPrograms;
      parm.certPrograms_E = $vc.sessionState.certPrograms_E;

      $vc.ws("accountActivity", parm, _doneActivity, _failActivity);
    }
  };
}();