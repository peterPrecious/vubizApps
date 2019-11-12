$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    $vc.sessionState.prevPage = "page_home";
    $(".$$_isGovernment").html("");
    $vc.fn.popup("Populating the Organization List.<br>This can take several minutes.<br>This is only needed once for each unique date range.");
    $("#ele_$$_back").hide();
    $("#ele_$$_next").hide();
    $vc.$$.organizations(); /* populate Organizations/Departments list */
  }
});

$vc.$$ = function () {
  var _fail = function (xhr, result, statusText) {
    $vc.fn.console("Failed populating the Organization List");
    $vc.fn.popup("We were unable to populate the Organization List. Please contact support.");
  };
  var _done = function (data, result, xhr) {
    $vc.fn.console("success Organizations");
    $vc.fn.popupClose();
    if (data === null) {
      $vc.fn.console("There are no Organizations to list.");
      $vc.fn.popup("There are no Organizations to list. Try another date range.");
      $("#ele_$$_back").show();
    } else {
      var org, isGovernment = "";
      $.each(data, function (key, value) {
        org = data[key].organization;
        isGovernment = isGovernment + "  <label><input class='$$_ele_organizations' name='organizations' type='checkbox' id='" + org + "' value='" + org + "'>" + org + "</label>";
      });
      $(".$$_isGovernment").html(isGovernment);
      $("[type='checkbox']").checkboxradio();
      $("#ele_$$_next").show();
      $vc.fn.console("Organizations listed");
    }
  };
  return {
    organizations: function () {
      var parm = {};
      parm.strDate = $vc.sessionState.strDate;
      parm.endDate = $vc.sessionState.endDate;
      $vc.ws("isGovOrganizations", parm, _done, _fail);
    }
  };
}();

$(function () {
  $("#ele_$$_next").on("click", function () {
    if ($(".$$_ele_organizations:checked").length === 0) {
      $vc.sessionState.organizations = [null];
      // now we can start building the excel for ALL organizations
      $(":mobile-pagecontainer").pagecontainer("change", "#page_excel");
    } else {
      // save the selected organizations
      $vc.sessionState.organizations = $('.$$_ele_organizations:checked').map(function () { return this.value; }).get();
      // now we can start building the excel for selected organizations
      $(":mobile-pagecontainer").pagecontainer("change", "#page_excel");
    }
  });

  $("#ele_$$_back").on("click", function () {
    $(":mobile-pagecontainer").pagecontainer("change", "#page_home");
  });
});