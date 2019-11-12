$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
  };
});


$(function () {
  $("#ele_$$_check").on("click", function (event) {

    // these are passed to the engine
    var $$_v5Commit = $("#$$_v5CommitOn")[0].checked ? "y" : "n";
    var $$_v5Step = $("#$$_v5StepOn")[0].checked ? "y" : "n";

    // this is the ecommerce transaction
    var trans = $("#ele_$$_trans")[0].value;

    if ($$_v5Commit === "y") {
      trans = trans.replace("vAction=V", "vAction=C");
    } else {
      trans = trans.replace("vAction=C", "vAction=V");
    }

    // assemble form and submit
    $("#ele_$$_trans")[0].value = trans;
    var parms = trans.split("&");
    var fields = "";
    $("#$$_form").html(fields);
    $.each(parms, function (i, val) {
      var parm = parms[i].split("=");
      fields += "<input type='hidden' id='" + parm[0] + "' name='" + parm[0] + "' value='" + parm[1] + "' />"
    });
    fields += "<input type='hidden' name='vTest'  value='y' />"
    fields += "<input type='hidden' name='v5Step' value='" + $$_v5Step + "' />"
    $("#$$_form").html(fields);
    $("#$$_form").attr("action", "/portal/services/ecomGenerateId3.aspx")
    $("#$$_form").submit();

  });
});
