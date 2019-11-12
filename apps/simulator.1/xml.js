$(document).bind("pagebeforeshow", function() {
    if ($.mobile.activePage.attr("id") === "page_$$") {
        $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    }
});


$(function() {
    // the iframe source defaults to "apps/simulator.1/xml.aspx?vAction=C", this selection overwrites this SRC
  $("input[name='$$_action']").on("change", function (event) {
    var $$url = "apps/simulator.1/xml.aspx?vAction=" + this.value;
    $("#$$_iframe").attr("src", $$url);
  });
});
