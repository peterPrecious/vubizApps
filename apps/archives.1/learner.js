$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    //$.mobile.resetActivePageHeight();
    $vc.sessionState.prevPage = "page_findLearner";
    $vc.$$.getLearnerProfile($vc.sessionState.tempMembNo);
  }
});

$vc.$$ = function () {
  var _doneGetLearnerProfile = function (data, result, xhr) {
    $vc.fn.console("Success loading learner");
    if (data !== null) {
      var dataInsert = "";
      $("#$$_dataInsert tbody").html(dataInsert);
      $.each(data, function (key, value) {
        dataInsert = dataInsert + "<tr><td>" + key + "</td><td>" + value + "</td></tr>";
      });
      $("#$$_profile tbody").html(dataInsert);
    }
    $.mobile.loading("hide");
    $vc.$$.getLearnerPrograms($vc.sessionState.tempMembNo);
  };

  var _doneGetLearnerPrograms = function (data, result, xhr) {
    $vc.fn.console("Success loading programs");
    if (data !== null) {
      var i = -1, dataInsert = "";
      $("#$$_programs tbody").html(dataInsert);
      $.each(data, function (key, value) {
        i++;
        var url = "<a type='button' href='#' onclick='$vc.$$.getLearnerModules(" + $vc.sessionState.tempMembNo + ", " + data[i].progNo + ")'>" + data[i].progId + "</a>";
        dataInsert = dataInsert + "<tr><td>" + data[i].progTitle + "</td><td>" + url + "</td><td>" + data[i].progCompleted + "</td></tr>";
      });
      $("#$$_programs tbody").html(dataInsert);
    }
    $.mobile.loading("hide");
  };

  var _doneGetLearnerModules = function (data, result, xhr) {
    $vc.fn.console("Success loading modules");
    if (data !== null) {
      var i = -1, dataInsert = "";
      $("#$$_modules tbody").html(dataInsert);
      $.each(data, function (key, value) {
        i++;
        dataInsert = dataInsert
          + "<tr>"
          + "  <td>" + data[i].progTitle + "</td>"
          + "  <td>" + data[i].progId + "</td>"
          + "  <td>" + data[i].modsTitle + "</td>"
          + "  <td>" + data[i].modsId + "</td>"
          + "  <td>" + data[i].lastAccessed + "</td>"
          + "  <td>" + data[i].timeSpent + "</td>"
          + "  <td>" + data[i].score + "</td>"
          + "  <td>" + "certComing" + "</td>"
          + "</tr>";
      });
      $("#$$_modules tbody").html(dataInsert);
    }
    $.mobile.loading("hide");
  };

  var _fail = function (xhr, result, statusText) {
    $.mobile.loading("hide");
    alert("Error loading learner");
  };

  return {
    getLearnerProfile: function (membNo) {
      $.mobile.loading("show");
      var parm = {};
      parm.membNo = $vc.sessionState.tempMembNo;
      $vc.ws("sp5learnerProfile", parm, _doneGetLearnerProfile, _fail);
    },
    getLearnerPrograms: function (membNo) {
      $.mobile.loading("show");
      var parm = {};
      parm.membNo = membNo;
      $vc.ws("sp5learnerPrograms", parm, _doneGetLearnerPrograms, _fail);
    },
    getLearnerModules: function (membNo, progNo) {
      $.mobile.loading("show");
      $(".$$_modules").show();
      var parm = {};
      parm.membNo = membNo;
      parm.progNo = progNo;
      $vc.ws("sp5learnerModules", parm, _doneGetLearnerModules, _fail);
    }
  };
}();