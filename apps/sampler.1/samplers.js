
$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_home";
    $vc.$$.getSamplers(0, "");
  };
});

$vc.$$ = function () {
  var _doneGetSamplers = function (data, result, xhr) {
    $vc.fn.console("Success loading Samplers");
    var samplers = "", sampId = "", sampImage = "", sampLogo = "";
    $.each(data, function (key, value) {
      sampId = value.sampId;
      sampImage = (value.sampImage === "True") ? "<img src='/samplerLogos/" + sampId + ".png'>" : "";
      samplers = samplers
      + "  <tr>"
      + "    <td>" + sampImage + "</td>"
      + "    <td><span style='font-weight:bold'>" + value.sampId + "</span><br />[" + formatDate(value.sampExpires) + "]</td>"
      + "    <td>" + value.sampTitle + "</td>"
      + "    <td><a onclick='$vc.$$.sampProfile(" + value.sampNo + ")' class='ui-alt-icon ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-edit ui-nodisc-icon' href='#'>Edit</a></td>"
      + "    <td><a onclick='$vc.$$.sampUpload(\"" + value.sampId + "\", \"" + value.sampImage + "\")' class='ui-alt-icon ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-arrow-u ui-nodisc-icon' href='#'>Logo</a></td>"
      + "    <td><a onclick='$vc.$$.sampSettings(" + value.sampNo + ")' class='ui-alt-icon ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-gear ui-nodisc-icon' href='#'>Settings</a></td>"
      + "    <td><a onclick='$vc.$$.sampHistory(" + value.sampNo + ")' class='ui-alt-icon ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-cloud ui-nodisc-icon' href='#'>History</a></td>"
      + "    <td><a onclick='$vc.$$.sampClone(" + value.sampNo + ")' class='ui-alt-icon ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-d-clone ui-nodisc-icon' href='#'>Clone</a></td>"
      + "    <td><a onclick='$vc.$$.sampContent(" + value.sampNo + ")' class='ui-alt-icon ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-action ui-nodisc-icon' href='#'>Content</a></td>"
      + "  </tr>";
    });
    $("#ele_$$_sampId").val(sampId);
    $("#ele_$$_tbody").html(samplers);
  };
  var _doneDeleteSamplers = function (data, result, xhr) {
    $vc.fn.console("Success deleting Samplers");
    $vc.$$.Samplers();
  };
  var _fail = function (xhr, result, statusText) {
    alert("Error loading Samplers");
  };

  return {
    getSamplers: function (includeExpired, sampId) {
      var parm = {};
      parm.includeExpired = includeExpired;
      parm.sampId = sampId;
      $vc.ws("sp8samplers", parm, _doneGetSamplers, _fail);
    },
    sampProfile: function (sampNo) {
      $vc.sessionState.sampNo = sampNo;
      $(":mobile-pagecontainer").pagecontainer("change", "#page_profile");
    },
    sampUpload: function (sampId, sampImage) {
      $vc.sessionState.sampId = sampId;
      $vc.sessionState.sampImage = sampImage;
      $(":mobile-pagecontainer").pagecontainer("change", "#page_upload");
    },
    sampSettings: function (sampNo) {
      $vc.sessionState.sampNo = sampNo;
      $(":mobile-pagecontainer").pagecontainer("change", "#page_settings");
    },
    sampHistory: function (sampNo) {
      $vc.sessionState.sampNo = sampNo;
      $(":mobile-pagecontainer").pagecontainer("change", "#page_history");
    },
    sampContent: function (sampNo) {
      $vc.sessionState.sampNo = sampNo;
      $(":mobile-pagecontainer").pagecontainer("change", "#page_content");
    },
    deleteSamplers: function (SamplersMembGuid, SamplersNoVisits) {
      if (SamplersNoVisits > 0) {
        $vc.fn.popup("[[You cannot delete an active employee. However, they can be inactivated.]]");
      } else {
        var parm = {};
        parm.membGuid = SamplersMembGuid;
        $vc.ws("deleteSamplers", parm, _doneDeleteSamplers, _failDeleteSamplers);
      }
    }
  };
}();


$("#ele_$$_go").on("click", function () {
  var includeExpired = $("#ele_$$_includeExpired-1").is(':checked') ? 1 : 0;
  var sampId = $("#ele_$$_sampId")[0].value;
  $vc.$$.getSamplers(includeExpired, sampId);
});

$("#ele_$$_add").on("click", function () {
  $vc.sessionState.sampNo = 0;
  $(":mobile-pagecontainer").pagecontainer("change", "#page_profile");
});

