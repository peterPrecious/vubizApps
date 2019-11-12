$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");

  };
});


$(function () {
  $("#ele_$$_check").on("click", function (event) {

    // these are passed to the engine
    var v5Commit = $("#v5CommitOn")[0].checked ? "y" : "n";
    var v5Step = $("#v5StepOn")[0].checked ? "y" : "n";

    // this is the ecommerce transaction
    var trans = $("#ele_$$_trans")[0].value;

    if (v5Commit == "y") {
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
      fields += "<input type='hidden' name='" + parm[0] + "' value='" + parm[1] + "' />"
    });
    fields += "<input type='hidden' name='vTest'  value='y' />"
    fields += "<input type='hidden' name='v5Step' value='" + v5Step + "' />"
    $("#$$_form").html(fields);


  $("#$$_form").attr("action", "/V6/ecomGenerateId.aspx")
//    $("#$$_form").attr("action", "/V6/ecomTester.aspx")

    // for testing submit a total of max transactions (normally 1 but can be say 10)
    var j = 0; max = 10;
    for (j = 1; j <= max; j++) {
      $vc.fn.console("posted transaction: " + j);
      $("#$$_form").submit();
    };

    $("#$$_form").submit();
    $("#$$_form").submit();
    $("#$$_form").submit();
    $("#$$_form").submit();
    $("#$$_form").submit();


  });
});
