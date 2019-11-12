$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#ele_$$_homeIcon").hide();
    $vc.$$.sampler($vc.sessionState.sampNo);

    if ($vc.sessionState.status == "user") {
      $vc.sessionState.prevPage = "page_home";
    } else {
      $vc.sessionState.prevPage = "page_samplers";
    };
    $("#modules_$$").html("");
    $(".$$_grouTitle").html($vc.sessionState.sampId);

    // close content window if open
    if ($vc.sessionState.samplerWindow != null && !$vc.sessionState.samplerWindow.closed) $vc.sessionState.samplerWindow.close();

  };
});


$vc.$$ = function () {
  var _doneSampler = function (data, result, xhr) {
    $vc.fn.console("Success loading Sampler");
    var sampId = data.sampId;
    var sampImage = data.sampImage;
    if (sampImage === 1) $("#img_$$_logo").attr("src", "/samplerLogos/" + sampImage);
    $("#header_$$_pageName").html(data.sampTitle);

    var tile = ""; /* create group tileset  */
    if (data.sampTitle01.length > 0) tile += "<li data-title='" + data.sampTitle01 + "' data-cont='" + data.sampCont01 + "' class='tile group_$$'>" + data.sampTitle01 + "</li>";
    if (data.sampTitle02.length > 0) tile += "<li data-title='" + data.sampTitle02 + "' data-cont='" + data.sampCont02 + "' class='tile group_$$'>" + data.sampTitle02 + "</li>";
    if (data.sampTitle03.length > 0) tile += "<li data-title='" + data.sampTitle03 + "' data-cont='" + data.sampCont03 + "' class='tile group_$$'>" + data.sampTitle03 + "</li>";
    if (data.sampTitle04.length > 0) tile += "<li data-title='" + data.sampTitle04 + "' data-cont='" + data.sampCont04 + "' class='tile group_$$'>" + data.sampTitle04 + "</li>";
    if (data.sampTitle05.length > 0) tile += "<li data-title='" + data.sampTitle05 + "' data-cont='" + data.sampCont05 + "' class='tile group_$$'>" + data.sampTitle05 + "</li>";
    if (data.sampTitle06.length > 0) tile += "<li data-title='" + data.sampTitle06 + "' data-cont='" + data.sampCont06 + "' class='tile group_$$'>" + data.sampTitle06 + "</li>";
    if (data.sampTitle07.length > 0) tile += "<li data-title='" + data.sampTitle07 + "' data-cont='" + data.sampCont07 + "' class='tile group_$$'>" + data.sampTitle07 + "</li>";
    if (data.sampTitle08.length > 0) tile += "<li data-title='" + data.sampTitle08 + "' data-cont='" + data.sampCont08 + "' class='tile group_$$'>" + data.sampTitle08 + "</li>";
    $("#group_$$").html(tile);

    $(".group_$$").on("click", function () { /* tap group tile and then extract data to create content/module tiles */
      var content_$$ = this.attributes["data-cont"].value.split(" "); /* put group title at top of content section */
      var tile = ""; /* create module tileset  */
      var first = "" /* get initial onclick so we can open modules for first group */
      $(".$$_modsTitle").html(this.attributes["data-title"].value);
      $("#modules_$$").html("");
      $.each(content_$$, function (key, value) {
        var parm = {};
        parm.sampModsId = value;
        $vc.ws("sp8samplerModsTitle",
          parm,
          function (data, result, xhr) {        /* get the title of the module */
            var sampTitle = data[0].modsTitle;
            if (sampTitle.length > 40) { sampTitle = left(sampTitle, 40) + "..." };
            tile = "<li onclick='$vc.$$.module(\"" + value + "\")' class='tile module_$$'>" + value + "<br />" + sampTitle + "</li>";
            $("#modules_$$").append(tile);
          },
          function (xhr, result, statusText) {
            alert("error retrieving Mods Titles")
          }
        );
      });
    });

    $(".group_$$:first").trigger("click");

  };
  var _doneModule = function (data, result, xhr) {
    var modsId = data.modsId;
    var modsNo = data.modsNo;
    //$("#header_$$_title").html(($vc.sessionState.prevPage == "page_historyProgram") ? $vc.sessionState.historyModsTitle : $vc.sessionState.modsTitle);
    //$("#content_$$ iframe").show();
    var url = $vc.startState.rteHost
      + "/Gold/vuSCORM/SCOContainer.aspx"
      + "?vCustId=" + "DEMO1001"
      + "&vMods_No=" + modsNo
      + "&vProg_No=" + 0
      + "&vMemb_No=" + 0
      + "&vLang=" + $vc.sessionState.lang
      + "&app=V8"    /* this parameter tells the RTE to not alert when leaving a module */
      /* 
      + "&SessionReturnURL=";  ...when you don't pass this parm, the return button on the player DOES NOT appear
      */
      + "&jumpto="
      + "&fluid=1"
      + "&close=1"
      + "&certificate=0"
      + "&vModId=" + modsId;
    $vc.fn.console(url);

    // store the window handle so we can close
    $vc.sessionState.samplerWindow = window.open(url, "samplerModule");

  }
  var _fail = function (xhr, result, statusText) {
    alert("Error loading Samplers");
  };
  return {
    sampler: function (sampNo) {
      var parm = {};
      parm.sampNo = sampNo;
      $vc.ws("sp8sampler", parm, _doneSampler, _fail);
    },
    module: function (moduleId) {
      var parm = {};
      parm.modsId = moduleId;
      $vc.ws("sp8module", parm, _doneModule, _fail);
    }
  };
}();

//$(function () {
//  $(window).bind("beforeunload", function () {
//    alert("bye");
//    return confirm("Do you really want to close?");
//  })
//});

