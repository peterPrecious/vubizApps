var var_$$_init = false;  /* only  initialize once, not each time this page is rendered */

$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);

    $("#ele_$$_homeIcon").hide();
    $("#ele_$$_backIcon").hide();

    /* if this is the first visit then launch the video - this only happens on this page*/
    if ($vc.sessionState.membNoVisits === 0 && var_$$_init === false) {
      var video = eval("$vc.videoState." + "$$"); /* do we have a video for this page */
      if (video !== undefined) {
        window.open("video.html?url=" + encodeURIComponent(video));
      }
    }

    /* not sure how you can get here if you are not secure... probably reloaded the page which is a no-no */
    if (!$vc.sessionState.secure) {
      alert("Oops. You are not currently authenticated to use this service.!");
    }

    if (!var_$$_init) {
      var_$$_init = true;
      var tile = "";
      /* get home tileset from tileState object */
      $.each($vc.tileState, function (key, value) {
        var ok = false;
        if (value.tilePage === "$$") {
          /* render appropriate tiles class based on member class */
          if (value.tileClass === "guest" && ($vc.sessionState.membClass === "guest" || $vc.sessionState.membClass === "learner" || $vc.sessionState.membClass === "facilitator" || $vc.sessionState.membClass === "manager" || $vc.sessionState.membClass === "administrator")) ok = true;
          if (value.tileClass === "learner" && ($vc.sessionState.membClass === "learner" || $vc.sessionState.membClass === "facilitator" || $vc.sessionState.membClass === "manager" || $vc.sessionState.membClass === "administrator")) ok = true;
          if (value.tileClass === "facilitator" && ($vc.sessionState.membClass === "facilitator" || $vc.sessionState.membClass === "manager" || $vc.sessionState.membClass === "administrator")) ok = true;
          if (value.tileClass === "manager" && ($vc.sessionState.membClass === "manager" || $vc.sessionState.membClass === "administrator")) ok = true;
          if (value.tileClass === "administrator" && $vc.sessionState.membClass === "administrator") ok = true;
          if (ok) {
            tile = tile
                 + "<li id=\"ele_$$_" + value.tileNo + "\" class=\"tile\" style=\"background-color: " + value.tileColor + ";\">"
                 + "  <div class=\"tileIcon\" style=\"background-image: url('" + value.tileIcon + "');\"></div>"
                 + "  <div class=\"tileTitle\">" + value.tileTitle + "</div>"
                 + "</li>";
          }
        }
      });

      if (tile.length > 0) {
        $("#tile_$$").html(tile);
      } else {
        $vc.fn.popup("You require a higher Access Level to access any services. Please contact Support.");
      }

      /* create the events to the above tiles */
      $("#ele_$$_0").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_accountActivity");
      });
      $("#ele_$$_1").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_programActivity");
      });

      $("#ele_$$_2").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_programStarts");
      });
      $("#ele_$$_3").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_programCompletionSummary");
      });
      $("#ele_$$_33").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_programActivityDetails");
      });


      $("#ele_$$_4").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_learner");
      });
      $("#ele_$$_5").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_learners");
      });
      $("#ele_$$_6").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_learnerReport");
      });


      $("#ele_$$_20").on("click", function () {
        //var url = "//vubiz.com/V5/Default.asp?vCust=" + $vc.sessionState.custId + "&vId=" + $vc.sessionState.membId + "&vGoTo=/V5/Code/Default.asp~3vPage~2RTE_History_F.asp";
        var url = "/V5/Default.asp?vCust=" + $vc.sessionState.custId + "&vId=" + $vc.sessionState.membId + "&vGoTo=/V5/Code/Default.asp~3vPage~2RTE_History_F.asp";
        window.open(url);
      });
      $("#ele_$$_21").on("click", function () {
        //var url = "//vubiz.com/Gold/vuClientReportingDev/AssReportFilter.aspx?AccountID=" + right($vc.sessionState.custId, 4) + "&MembNo=" + $vc.sessionState.membNo + "&reportId=1";
        var url = "/Gold/vuClientReportingDev/AssReportFilter.aspx?AccountID=" + right($vc.sessionState.custId, 4) + "&MembNo=" + $vc.sessionState.membNo + "&reportId=1";
        window.open(url);
      });
      $("#ele_$$_22").on("click", function () {
        var url = "/Gold/vuClientReportingDev/AssReportFilter.aspx?AccountID=" + right($vc.sessionState.custId, 4) + "&MembNo=" + $vc.sessionState.membNo + "&reportId=2";
        window.open(url);
      });


      $("#ele_$$_98").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_style");
      });
      $("#ele_$$_99").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_signOut");
      });
    }

    $vc.fn.console("completed loading home tiles");
  }
});