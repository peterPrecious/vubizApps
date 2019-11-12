$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = ($vc.sessionState.membLevel === "4" ? "page_mgr" : "page_adm");
    $(".ele_$$_archive").html($vc.sessionState.archId);
  }
});

$vc.$$ = function () {
  var _done = function (data, result, xhr) {
    $vc.fn.console("Success loading Archived Learners");
    if (data !== null) {
      var learners = "";
      $("#$$_list").html(learners);
      $.each(data, function (key, value) {
        learners = learners
        + "<li data-membNo='" + value.membNo + "'>"
        + value.custId + " | " + value.membFirstName + " " + value.membLastName + " (" + value.membId + ")"
        + (value.custId.length > 8 ? "&emsp;&emsp;&emsp;<span style='color:white; background-color:blue; font-weight:bold'>&ensp;Archived&ensp;</span>" : "")
        + "</li>";
      });
      $("#$$_list").html(learners);
    }
    $.mobile.loading("hide");
    $("#$$_list").listview("refresh");
  };
  var _fail = function (xhr, result, statusText) {
    $.mobile.loading("hide");
    alert("Error loading learners");
  };
  return {
    findLearner: function (type, init) {
      $.mobile.loading("show");
      var parm = {};
      parm.cust = $vc.sessionState.cust;
      parm.membFirstName = $("#ele_$$_firstName")[0].value;
      parm.membLastName = $("#ele_$$_lastName")[0].value;
      $vc.ws("sp5findLearner", parm, _done, _fail);
    }
  };
}();

$(function () {
  $("#ele_$$_check").on("click", function () {
    $vc.$$.findLearner();
  });
});

$("#$$_list").on("click", "li", function () {
  $vc.sessionState.tempMembNo = this.attributes["data-membNo"].value; /* this is for learner.js */
  $(":mobile-pagecontainer").pagecontainer("change", "#page_learner");
});