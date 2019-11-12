var $var_$$_initialized = false;

$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + ifElse($vc.profileState.logo, "vubz_en.png"))
    $vc.sessionState.status = "";

    if ($vc.startState.host != "vubiz.com") {
      $("#ele_$$_sampId")[0].value = "2016Library";
    };

  };
});

$vc.$$ = function () {
  var _doneGetSampler = function (data, result, xhr) {
    $vc.fn.console("Sampler was loaded successfully");
    $.each(data, function (key, value) {
      if (data.sampNo == 0) {
        $vc.sessionState.status = "";
        alert("That Sampler Id is either not valid or has expired.");
      } else {
        $vc.sessionState.status = "user";
        $vc.sessionState.sampNo = data.sampNo;
        $(":mobile-pagecontainer").pagecontainer("change", "#page_content");
      }
    });
  };
  var _fail = function (xhr, result, statusText) {
    alert("Error loading Sampler");
  };

  return {
    getSamp: function (sampNo) {
      var parm = {};
      parm.sampId = trim($("#ele_$$_sampId")[0].value);
      $vc.ws("samplerNo", parm, _doneGetSampler, _fail);
    },
  };
}();


$(function () {
  $("#ele_$$_next").on("click", function () {
    $vc.$$.getSamp();
  });

  $("#ele_$$_admin").on("click", function () {
    $(":mobile-pagecontainer").pagecontainer("change", "#page_signIn");
  });

});