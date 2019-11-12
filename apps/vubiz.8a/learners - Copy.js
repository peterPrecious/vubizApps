
/* these are the default report parms, start with Members whose last name starts with 'A' */
var $$_type = "M";
var $$_init = "A";

$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    $vc.sessionState.prevPage = "page_home";

    $vc.$$.restart();
    $.mobile.resetActivePageHeight();
  };
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

      $$_type = "M";
      $$_init = "A";
      if ($vc.sessionState.memb_E) { /* when an account has an "employee" class, like CFIB then allow selection */
        $(".$$_type").show();
        $("#$$_type_M").prop("checked", true).checkboxradio("refresh");
        $("#$$_type_E").prop("checked", false).checkboxradio("refresh");
      };
      $(".$$_tileSet").show();
      $(".$$_table").show();
      $("#ele_$$_tbody").html("");

      /* when an account has an "employee" class, like CFIB then allow selection */
      if ($vc.sessionState.memb_E) $(".$$_type").show();

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
      parm.membLevel = $vc.sessionState.membLevel;
      $vc.ws("learners", parm, _done, _fail);
    }
  };
}();

$("#$$_type_M").on("click", function () {
  $$_type = "M";
  $(".$$_tile").first().trigger("click");
  $("#ele_$$_tbody").html("");
});

$("#$$_type_E").on("click", function () {
  $$_type = "E";
  $(".$$_tile").first().trigger("click");
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
  $("#ele_$$_tbody").html("");
  $vc.$$.getLearners($$_type, $$_init);
});

function $$_edit(membGuid) {
  $vc.sessionState.tempMembGuid = membGuid;
  $(":mobile-pagecontainer").pagecontainer("change", "#page_learner");
};