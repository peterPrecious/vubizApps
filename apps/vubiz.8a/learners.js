
/* these are the default report parms, start with Members */
var ele_$$_type = "M";

$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    $vc.sessionState.prevPage = "page_home";

    $vc.$$.restart();
    $.mobile.resetActivePageHeight();
  }
});

$vc.$$ = function () {
  var _done = function (data, result, xhr) {
    $vc.fn.console("Success loading Learners");
    if (data !== null) {
      var learners = "";
      $("#ele_$$_tbody").html(learners);
      $.each(data, function (key, value) {
        learners = learners
          + "  <tr>"
          + "    <td>" + value.membOrganization + "</td>"
          + "    <td>" + value.membEmail + "</td>"
          + "    <td>" + value.membFirstName + "</td>"
          + "    <td>" + value.membLastName + "</td>"
          + "    <td>" + value.membPassword + "</td>"
          + "    <td style='text-align:center'>" + value.membActive + "</td>"
          + "    <td style='text-align:center'><a class='ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-edit ui-alt-icon ui-nodisc-icon' onclick='$$_edit(\"" + value.membGuid + "\")' href='#'>Edit</a></td>"
          + "  </tr>";
      });
      $("#ele_$$_tbody").html(learners);
    }
    $.mobile.loading("hide");
  };
  var _fail = function (xhr, result, statusText) {
    $.mobile.loading("hide");
    alert("Error loading learners");
  };
  return {
    restart: function () {

      ele_$$_type = "M";

      /* when an account has an "employee" class, like CFIB then allow selection */
      if ($vc.sessionState.memb_E) { 
        $(".div_$$_type").show();
        $("#ele_$$_type_M").prop("checked", true).checkboxradio("refresh");
        $("#ele_$$_type_E").prop("checked", false).checkboxradio("refresh");
      }

      $(".ele_$$_table").show();
      $("#ele_$$_tbody").html("");
      $("#ele_$$_lastName")[0].value = "";
      $("#ele_$$_organization")[0].value = "";
      $("#ele_$$_check").hide();

    },
    getLearners: function (type, lastName, organization) {
      $.mobile.loading("show");
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      parm.membType = type;
      parm.membLastName = $("#ele_$$_lastName")[0].value;
      parm.membOrganization = $("#ele_$$_organization")[0].value;
      parm.membLevel = $vc.sessionState.membLevel;
      $vc.ws("learners2", parm, _done, _fail); // orginal was "learners" but needed to add organization thus now "learners2"
    }
  };
}();

$("#ele_$$_lastName, #ele_$$_organization").on("focus", function () {
  $("#ele_$$_lastName")[0].value = "";
  $("#ele_$$_organization")[0].value = "";
  $("#ele_$$_check").hide();
});

$("#ele_$$_lastName, #ele_$$_organization").on("keyup", function () {
  if ($(this).val().length > 0) $("#ele_$$_check").show();
});


$("#ele_$$_type_M").on("click", function () {
  ele_$$_type = "M";
  $("#ele_$$_tbody").html("");
});

$("#ele_$$_type_E").on("click", function () {
  ele_$$_type = "E";
  $("#ele_$$_tbody").html("");
});

$("#ele_$$_check").on("click", function () { /* this is the starting letter of their last name */
  $("#ele_$$_tbody").html("");
  $vc.$$.getLearners(ele_$$_type, $("#ele_$$_lastName")[0].value, $("#ele_$$_organization")[0].value);
});

function $$_edit(membGuid) {
  $vc.sessionState.tempMembGuid = membGuid;
  $(":mobile-pagecontainer").pagecontainer("change", "#page_learner");
}