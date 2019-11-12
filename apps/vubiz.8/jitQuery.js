
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {

    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_jitCatalogue"; /* ensure we return to programs */

    $("#header_$$_title").html($vc.catalogueState[$vc.sessionState.catalogue].catlTitle);
    $("#ele_$$_query").show();
    $("#ele_$$_content").hide();

    $("#list_$$").hide();
  }
});


$vc.$$ = function () {
  var _doneSearch = function (data, result, xhr) {

    if (data.length === 0) {
      $vc.fn.console("No JIT data was returned");
      $vc.fn.popup("[[Those word(s) do not appear in any modules in this Theme.]]");

    } else {
      $vc.fn.console("successly retrieved jit data");
      var list = "", link = "";
      /* get any modules and page numbers frm the JIT request */
      $.each(data, function (key, value) {
        link = "$vc.$$.renderModule(\"" + value.modsTitle + "\", " + value.modsNo + ", " + value.pageNo + ")";
        list += "<li><a href='#' onclick='" + link + "'>" + value.modsTitle + " (Page " + value.pageNo + ")</a></li>";
      });
      $("#list_$$").html(list);
      $("#list_$$").listview("refresh");
      $("#list_$$").show();
    }
  };
  var _failSearch = function (xhr, result, statusText) {
    $vc.fn.popup("[[The Just In Time service did not return any results.]]");
  };
  return {
    start: function () {
      if ($vc.catalogueState[$vc.sessionState.catalogue].catlJITNo === 0) {
        $vc.fn.popup("[[The Just In Time service is not configured properly for this Learner Collection. Please notify support.]]");
      } else {
        var parm = {};
        parm.search = $("#ele_$$_search")[0].value;
        parm.url = "/vknowledge/service/searchJson.asmx/";
        parm.membGuid = $vc.sessionState.membGuid;
        parm.catlNo = $vc.catalogueState[$vc.sessionState.catalogue].catlNo;
        parm.programs = $vc.catalogueState[$vc.sessionState.catalogue].catlJITNo; /* extracted JITNo from the V5 catalogue table for this account */
        parm.lang = $vc.sessionState.lang;
        $vc.ws("SearchCourses", parm, _doneSearch, _failSearch);
        $vc.fn.console(parm.url);
      }
    },
    renderModule: function (modsTitle, modsNo, jumpTo) {
      $("#header_$$_title").html(modsTitle);
      $("#ele_$$_query").hide();
      $("#ele_$$_content").show();

      var url = $vc.startState.rteHost  /* either http://vubiz.com or http://corporate.vubiz.com - comes from web.config  */
              + "/Gold/vuSCORM/SCOContainer.aspx"
              + "?vCustId=" + $vc.sessionState.custId
              + "&vMods_No=" + modsNo
              + "&vProg_No=" + "0"
              + "&vMemb_No=" + $vc.sessionState.membNo
              + "&vLang=" + $vc.sessionState.lang
              + "&app=V8"    /* this parameter tells the RTE to not alert when leaving a module */
              + "&SessionReturnURL="
              + "&scorm=0"
              + "&jumpto=" + jumpTo

              + "&fluid=1"
              + "&close=1"
              + "&certificate=0"

              + "&vModId=";

      $vc.fn.console(url);
      //$("#content_$$ iframe").attr("width", 800).attr("height", 615).attr("frameborder", 0).attr("src", url);
      $("#content_$$ iframe").attr("width", $vc.startState.deviceWidth - 115).attr("height", $vc.startState.deviceHeight - 177).attr("frameborder", 0).attr("src", url);
    }

  };
}();

$(function () {

  $("#ele_$$_start").on("click", function () {
    if ($("#ele_$$_search")[0].value === "") {
      $vc.fn.popup("[[Please enter search values.]]");
    } else if ($("#ele_$$_search")[0].value.length > 50) {
      $("#ele_$$_search")[0].value = left($("#ele_$$_search")[0].value, 50);
      $vc.fn.popup("[[Please limit the search value to 50 characters.]]");
    } else {
      $("#list_$$").hide();
      $vc.$$.start();
    }
  });

  $("#ele_$$_back").on("click", function () {
    $("#content_$$ iframe").attr("src", "");  /* this triggers the RTE to terminate */
    $("#header_$$_title").html($vc.catalogueState[$vc.sessionState.catalogue].catlTitle);
    $("#ele_$$_query").show();
    $("#ele_$$_content").hide();
  });

});