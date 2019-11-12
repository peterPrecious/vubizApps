var var_$$_init = false;  /* only  initialize once, not each time this page is rendered */

$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") === "page_$$") {

    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);
    $("#ele_$$_homeIcon").hide();
    $("#ele_$$_backIcon").hide();

    /* if this is the first visit then launch the video (if we use videos) - this only happens on this page*/
    if ($vc.sessionState.videos) {
      if ($vc.sessionState.membNoVisits === 0 && var_$$_init === false) {
        var video = eval("$vc.videoState." + "$$"); /* do we have a video for this page */
        if (video !== undefined) {
          window.open("video.html?url=" + encodeURIComponent(video));
        };
      };
    };


    /* not sure how you can get here if you are not secure... probably reloaded the page which is a no-no */
    if (!$vc.sessionState.secure) {
      alert("Oops. You are not currently authenticated to use this service.!");
    };
    if (!var_$$_init) {
      var_$$_init = true;

      /* start with browser budgie tile then get home tileset from tileState object - Robin suggested color: #585858 - prefer black */
      var tileNo = "x", tileColor = "#000", tileIcon = "styles/tiles/browserCheck.png", tileTitle = "[[Browser Readiness Test]]";
      var tile = ""
        + "<li id=\"ele_$$_" + tileNo + "\" class=\"tile\" style=\"background-color: " + tileColor + ";\">"
        + "  <div class=\"tileIcon\" style=\"background-image: url('" + tileIcon + "');\"></div>"
        + "  <div class=\"tileTitle\">" + tileTitle + "</div>"
        + "</li>";


      $.each($vc.tileState, function (key, value) {
        var ok = false;
        if (value.tilePage === "$$") {
          /* render appropriate tiles class based on member class */
          if (value.tileClass === "guest" && ($vc.sessionState.membClass === "guest" || $vc.sessionState.membClass === "learner" || $vc.sessionState.membClass === "facilitator" || $vc.sessionState.membClass === "manager" || $vc.sessionState.membClass === "administrator")) ok = true;
          if (value.tileClass === "learner" && ($vc.sessionState.membClass === "learner" || $vc.sessionState.membClass === "facilitator" || $vc.sessionState.membClass === "manager" || $vc.sessionState.membClass === "administrator")) ok = true;
          if (value.tileClass === "facilitator" && ($vc.sessionState.membClass === "facilitator" || $vc.sessionState.membClass === "manager" || $vc.sessionState.membClass === "administrator")) ok = true;
          if (value.tileClass === "manager" && ($vc.sessionState.membClass === "manager" || $vc.sessionState.membClass === "administrator")) ok = true;
          if (value.tileClass === "administrator" && ($vc.sessionState.membClass === "administrator")) ok = true;

          ///* tile title override - note: only en currently available  - this is now done via overrides in default.aspx*/
          //if (value.tileNo === "0" & $vc.sessionState.titleCourses_en.length > 0) value.tileTitle = $vc.sessionState.titleCourses_en;

          /* don't render a "jit" tile if jit = "False" */
          if (value.tileNo === "1" & !$vc.sessionState.jit) ok = false;

          /* don't render a "profile" tile if SSO or autoEnrollWs  */
          if (value.tileNo === "2" & ($vc.profileState.sso.length > 0 || $vc.profileState.autoEnrollWs)) ok = false;

          /* don't render a "guest" tile if an employee, ie membType = "E" */
          if (value.tileNo === "4" & $vc.sessionState.membType === "E") ok = false;

          /* don't render a "guest" tile if guests = false  */
          if (value.tileNo === "4" & !$vc.sessionState.guests) ok = false;

          /* don't render a "certificate" tile if certPrograms = "" */
          if (value.tileNo === "8" & !$vc.sessionState.ecommerce) ok = false;

          /* don't render an "ecommerce " tile if ecommerce = False */
          if (value.tileNo === "5" & $vc.sessionState.certPrograms === "") ok = false;

          /* don't render the "vukidz" tile if vukidz = False */
          if (value.tileNo === "9" & !$vc.sessionState.vukidz) ok = false;

          if (ok) {
            tile = tile
                 + "<li id=\"ele_$$_" + value.tileNo + "\" class=\"tile\" style=\"background-color: " + value.tileColor + ";\">"
                 + "  <div class=\"tileIcon\" style=\"background-image: url('" + value.tileIcon + "');\"></div>"
                 + "  <div class=\"tileTitle\">" + value.tileTitle + "</div>"
                 + "</li>";
          };
        };
      });
      $("#tile_$$").html(tile);

      /* create the events for the above tiles */
      $("#ele_$$_0").on("click", function () {
        if ($vc.sessionState.contentSource === "ecommerce" || $vc.sessionState.contentSource === "assigned" || $vc.sessionState.contentSource === "ecom-assigned") {
          $(":mobile-pagecontainer").pagecontainer("change", "#page_programs");
        } else {
          $(":mobile-pagecontainer").pagecontainer("change", "#page_catalogue");
        };
      });
      $("#ele_$$_1").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_jitCatalogue");
      });
      $("#ele_$$_2").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_profile");
      });
      //$("#ele_$$_3").on("click", function () {
      //  $vc.sessionState.reportByGuest = false;
      //  $(":mobile-pagecontainer").pagecontainer("change", "#page_historyPrograms");
      //});
      $("#ele_$$_23").on("click", function () {
        $vc.sessionState.reportByGuest = false;
        $(":mobile-pagecontainer").pagecontainer("change", "#page_historyPrograms2");
      });
      $("#ele_$$_4").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_myGuests");
      });
      $("#ele_$$_5").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_certificatePrograms");
      });
      $("#ele_$$_9").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_kidsPrograms");
      });
      $("#ele_$$_6").on("click", function () {
        var url;
        if ($vc.sessionState.portal === true) {
          url = "/portal/v7/default.aspx?source=v8&profile=" + $vc.sessionState.profile + "&membGuid=" + $vc.sessionState.membGuid;
        } else {
          url = "/v8a?profile=" + $vc.sessionState.profile + "&membGuid=" + $vc.sessionState.membGuid;
        }
				location.href = url;
      });
      $("#ele_$$_7").on("click", function () {
        $(":mobile-pagecontainer").pagecontainer("change", "#page_signOut");
      });
      $("#ele_$$_8").on("click", function () {
        var url = "http://store.vubiz.com/NopAdmin/Authenticatev5.aspx?membGUID=" + $vc.sessionState.membNOPGuid;
				location.href = url;
//      window.open(url);
      });
      $("#ele_$$_x").on("click", function () {
        var url = "/browser?lang=" + $vc.sessionState.lang + "&email=" + $vc.profileState.emailFrom;
        window.open(url);
      });

    };

    $vc.fn.console("completed loading home tiles");

  };
});