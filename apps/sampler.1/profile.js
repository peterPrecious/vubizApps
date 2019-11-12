$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") == "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_samplers";
    $("#lab1_$$_sampId").hide();
    if ($vc.sessionState.sampNo == 0) {
      $vc.sessionState.state = "new";
      $("#ele_$$_del").hide();
      $vc.$$.clrSamp(0);
    } else {
      $vc.sessionState.state = "old";
      $("#ele_$$_del").show();
      $vc.$$.getSamp($vc.sessionState.sampNo);
    };
  };
});

$vc.$$ = function () {
  var _doneGetSampler = function (data, result, xhr) {
    $vc.fn.console("Sampler was loaded successfully");
    $("#ele_$$_sampId").val(data.sampId);
    $("#ele_$$_sampTitle").val(data.sampTitle);
    $("#ele_$$_sampTitle01").val(data.sampTitle01);
    $("#ele_$$_sampCont01").val(trim(data.sampCont01));
    $("#ele_$$_sampTitle02").val(data.sampTitle02);
    $("#ele_$$_sampCont02").val(trim(data.sampCont02));
    $("#ele_$$_sampTitle03").val(data.sampTitle03);
    $("#ele_$$_sampCont03").val(trim(data.sampCont03));
    $("#ele_$$_sampTitle04").val(data.sampTitle04);
    $("#ele_$$_sampCont04").val(trim(data.sampCont04));
    $("#ele_$$_sampTitle05").val(data.sampTitle05);
    $("#ele_$$_sampCont05").val(trim(data.sampCont05));
    $("#ele_$$_sampTitle06").val(data.sampTitle06);
    $("#ele_$$_sampCont06").val(trim(data.sampCont06));
    $("#ele_$$_sampTitle07").val(data.sampTitle07);
    $("#ele_$$_sampCont07").val(trim(data.sampCont07));
    $("#ele_$$_sampTitle08").val(data.sampTitle08);
    $("#ele_$$_sampCont08").val(trim(data.sampCont08));

    /* check if all modules exist and are SCORM */
    $vc.$$.chkSamp($("#ele_$$_sampCont01"), $("#ele_$$_sampCont01")[0].value);
    $vc.$$.chkSamp($("#ele_$$_sampCont02"), $("#ele_$$_sampCont02")[0].value);
    $vc.$$.chkSamp($("#ele_$$_sampCont03"), $("#ele_$$_sampCont03")[0].value);
    $vc.$$.chkSamp($("#ele_$$_sampCont04"), $("#ele_$$_sampCont04")[0].value);
    $vc.$$.chkSamp($("#ele_$$_sampCont05"), $("#ele_$$_sampCont05")[0].value);
    $vc.$$.chkSamp($("#ele_$$_sampCont06"), $("#ele_$$_sampCont06")[0].value);
    $vc.$$.chkSamp($("#ele_$$_sampCont07"), $("#ele_$$_sampCont07")[0].value);
    $vc.$$.chkSamp($("#ele_$$_sampCont08"), $("#ele_$$_sampCont08")[0].value);
  };
  var _doneDelSampler = function (data, result, xhr) {
    if (data.status == "ok") {
      $vc.fn.dialogue("$$", "Sampler was deleted successfully. Continue?");
    };
  };
  var _doneUpdSampler = function (data, result, xhr) {
    if (data.status == "ok") {
      $vc.fn.dialogue("$$", "Sampler was updated successfully. Continue?");
    };
  };
  var _fail = function (xhr, result, statusText) {
    alert("Error loading Sampler");
  };

  return {
    clrSamp: function () {
      $(".tab_$$ input:text").val("");
      $(".tab_$$ textarea").val("");
    },
    getSamp: function (sampNo) {
      $("#lab2_$$_sampId")[0].innerHTML = "";
      var parm = {};
      parm.sampNo = sampNo;
      $vc.ws("sp8sampler", parm, _doneGetSampler, _fail);
    },
    delSamp: function (sampNo) {
      var parm = {};
      parm.sampNo = sampNo;
      $vc.ws("sp8samplerDelete", parm, _doneDelSampler, _fail);
    },
    updSamp: function (sampNo) {
      var parm = {}, ok = true;

      parm.sampNo = sampNo; /* if 0 then we are adding a new sampler */

      parm.sampId = $("#ele_$$_sampId")[0].value;
      parm.sampTitle = $("#ele_$$_sampTitle")[0].value;

      parm.sampTitle01 = $("#ele_$$_sampTitle01")[0].value;
      parm.sampCont01 = trim($("#ele_$$_sampCont01")[0].value);
      parm.sampTitle02 = $("#ele_$$_sampTitle02")[0].value;
      parm.sampCont02 = trim($("#ele_$$_sampCont02")[0].value);
      parm.sampTitle03 = $("#ele_$$_sampTitle03")[0].value;
      parm.sampCont03 = trim($("#ele_$$_sampCont03")[0].value);
      parm.sampTitle04 = $("#ele_$$_sampTitle04")[0].value;
      parm.sampCont04 = trim($("#ele_$$_sampCont04")[0].value);
      parm.sampTitle05 = $("#ele_$$_sampTitle05")[0].value;
      parm.sampCont05 = trim($("#ele_$$_sampCont05")[0].value);
      parm.sampTitle06 = $("#ele_$$_sampTitle06")[0].value;
      parm.sampCont06 = trim($("#ele_$$_sampCont06")[0].value);
      parm.sampTitle07 = $("#ele_$$_sampTitle07")[0].value;
      parm.sampCont07 = trim($("#ele_$$_sampCont07")[0].value);
      parm.sampTitle08 = $("#ele_$$_sampTitle08")[0].value;
      parm.sampCont08 = trim($("#ele_$$_sampCont08")[0].value);

      /* ensure at least first four fields have been entered */
      if (
        trim(parm.sampId).length == 0 ||
        trim(parm.sampTitle).length == 0 ||
        trim(parm.sampTitle01).length == 0 ||
        trim(parm.sampCont01).length == 0
      ) {
        $vc.fn.popup("The first four fields are mandatory.")
        ok = false;
      };

      /* update if all ok */
      if (ok) $vc.ws("sp8samplerUpdate", parm, _doneUpdSampler, _fail);

    },
    chkSamp: function (ele, sampCont) {
      /* confirm module on modsTable and is valid SCORM */
      if (sampCont.length > 0) { /* assuming we've entered a module */
        var type; var parm = {};
        ele.css("background-color", "transparent");
        parm.sampCont = sampCont;
        $vc.ws("sp8samplerCont", parm, function (data, result, xhr) {
          $.each(data, function (index, value) {
            if (data[index].modsType == "") {
              alert(data[index].modsId + " is not on the module table!");
              ele.css("background-color", "yellow");
              $vc.sessionState.sampOk = false;
            } else {
              type = data[index].modsType;
              if (type != "FX" && type != "XX" && type != "Z" && type != "H") {
                alert(data[index].modsId + " is not a valid SCORM module!");
                ele.css("background-color", "yellow");
                $vc.sessionState.sampOk = false;
              };
            };
          });
        }, function (xhr, result, statusText) { alert("Error checking Sampler Id") });
      }
    }
  }
}();

$(function () {

  /* these are for the icon that clears text from textarea */
  $(".del_$$").attr("title", "Clear text");
  $(".del_$$ img").on("click", function () { $(this).parent().prev().children().val(""); });
  $(".del_$$ img").attr("src", "styles/icons/textAreaDelete.png");

  /* these are for the 3 buttons at the bottom of the page */
  $("#ele_$$_del").on("click", function () {    // delete sample 
    $vc.$$.delSamp($vc.sessionState.sampNo);
  });

  $("#ele_$$_can").on("click", function () {    // returning without any activity
    $(":mobile-pagecontainer").pagecontainer("change", "#page_samplers");
  });

  $("#ele_$$_upd").on("click", function () {    // update sample
    $vc.$$.updSamp($vc.sessionState.sampNo);
  });

  $("#ele_$$_sampId").on("blur", function () {
    var parm = {};
    parm.sampId = trim($("#ele_$$_sampId")[0].value);
    if (parm.sampId == "") {
      $("#lab1_$$_sampId").html("Hello? You need to enter something reasonable here...").show();
    } else {
      $vc.ws("sp8samplerId", parm, function (data, result, xhr) {
        if (data.trueFalse == "True") { $("#lab1_$$_sampId").html("Oops. Sampler Id \"" + parm.sampId + "\" is already in use!").show(); $("#ele_$$_sampId").val(""); }
      }, function (xhr, result, statusText) { alert("Error checking Sampler Id") });
    };
  });

  $("#ele_$$_sampId").on("focus", function () {
    $("#lab1_$$_sampId").hide();
  });

  $(".ele_$$_sampCont").on("blur", function () {
    $vc.$$.chkSamp($(this), trim($(this)[0].value));
  });

  $(".ele_$$_sampCont").on("focus", function () {
    $(this).css("background-color", "transparent");
  });


  $("#globalConfirm").on("popupafterclose", function (event, ui) { //   after 1/2 second, take action from dialogue and store in globalConfirm
    setTimeout(function () {
      if ($vc.globalConfirm == "$$_true") {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_samplers");
      } else {
        $.mobile.loading("hide");
      };
    }, 500)
  });

});