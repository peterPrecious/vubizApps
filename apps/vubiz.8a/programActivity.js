
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_home";
    $.mobile.loading("show");
    $vc.$$.activity(1);
  };
});

$vc.$$ = function () {
  var _done = function (data, result, xhr) {
    $vc.fn.console("Success loading programActivity");
    if (data !== null) {
      var values = "";
      $("#ele_$$_tbody").html(values);
      $.each(data, function (key, value) {
        values = values
        + "  <tr>"
        + "    <td>" + value.programActivityTitle + "</td>"
        + "    <td>" + value.programActivityTaken + "</td>"
        + "    <td>" + value.programActivityCompleted + "</td>"
        + "  </tr>";
      });
      $("#ele_$$_tbody").html(values);
    }
    $.mobile.loading("hide");

  };
  var _fail = function (xhr, result, statusText) {
    alert("Error loading programActivity data");
  };
  return {
    activity: function (orderBy) {
      var parm = {};
      parm.custId = $vc.sessionState.custId;
      parm.orderBy = orderBy;
      $vc.ws("programActivity", parm, _done, _fail);
    }

  };
}();