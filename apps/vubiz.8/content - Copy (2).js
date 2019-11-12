$(document).on("pagecontainerbeforeshow", function (event, ui) {
	if ($.mobile.activePage.attr("id") === "page_$$") {
		$("#footer_$$_title").html($vc.sessionState.appId + " | $$");
		$("#ele_content_homeIcon").hide();
		$("#ele_content_backIcon").hide();

		//check popups
		//var popup = window.open("apps/browser.3/popup.html", "popupTester", "width=20,height=20,left=1,top=1,scrollbars=no,location=no,menubar=no,toolbar=no,statusbar=no");
		//setTimeout(function () {
		//  if (popup === null || typeof popup === "undefined") {
		//    $("#content_$$_message").hide();
		//    $vc.fn.popup("[[Oops!<br />You must DISABLE your popup blocker.]]");
		//  }
		//  else {
		//    popup.close();
		//    $("#content_$$_message").show();
		//    $vc.$$.getModuleData();
		//  }
		//}, 500);

		$vc.$$.getModuleData();
	}
});

$vc.$$ = function () {
	var _doneModules = function (data, result, xhr) {
		$vc.fn.console("success module");
		$vc.modulesState = data;
		$vc.$$.renderModule();
	};
	var _failModules = function (xhr, result, statusText) {
		alert("Error Loading module data!");
	};
	return {
		getModuleData: function () {
			var parm = {};
			parm.modsId = $vc.sessionState.prevPage === "page_historyProgram" ? $vc.sessionState.historyModsId : $vc.sessionState.modsId;
			window.open("about:blank", "myContent");
			$vc.ws("module", parm, _doneModules, _failModules);
		},
		renderModule: function () {
			$("#header_$$_title").html($vc.sessionState.prevPage === "page_historyProgram" ? $vc.sessionState.historyModsTitle : $vc.sessionState.modsTitle);
			//     $("#content_$$ iframe").show();
			/* this can be launched by the content tiles or historyProgram report */
			/* either http://vubiz.com or http://corporate.vubiz.com - comes from web.config */
			var url = $vc.startState.rteHost
				+ "/Gold/vuSCORM/SCOContainer.aspx"
				+ "?vCustId=" + $vc.sessionState.custId
				+ "&vMods_No=" + ($vc.sessionState.prevPage === "page_historyProgram" ? $vc.sessionState.historyModsNo : $vc.sessionState.modsNo)
				+ "&vProg_No=" + ($vc.sessionState.prevPage === "page_historyProgram" ? $vc.sessionState.historyProgNo : $vc.sessionState.progNo)
				+ "&vMemb_No=" + $vc.sessionState.membNo
				+ "&vLang=" + $vc.sessionState.lang
				+ "&app=V8"    /* this parameter tells the RTE to not alert when leaving a module */
				+ "&jumpto="
				+ "&fluid=1"
				+ "&close=1"
				+ "&certificate=0"
				+ "&vModId=";

			/* + "&SessionReturnURL=";  ...when you DO NOT pass this parm, the return button on the player DOES NOT appear */

			$vc.fn.console(url);

			/* if H module then launch in a separate window/tab else in-screen/iframe */

			//$("#content_$$ iframe").hide();
			$("#content_$$_message").hide();

			//if ($vc.modulesState.modsType === "H" || $vc.modulesState.modsType !== "H") { // send all mods to new tab
			//if ($vc.modulesState.modsType === "H") { // just send H mods to new tab

			$("#content_$$_message").show();
			window.open(url, "myContent");

			//setTimeout(function () { $vc.fn.popupClose(); }, 2000);

			//} else {

			//  $("#content_$$ iframe").show();
			//  $("#content_$$ iframe").attr("src", url);
			//  $vc.$$.resizeModule();
			//}
		},
		resizeModule: function () {
			var width = $vc.startState.deviceWidth * .85;
			var height = $vc.startState.deviceHeight * .8;
			var style = "width: " + width + "px; height: " + height + "px; border: none;";
			$("#content_$$ iframe").attr("style", style);
			$("#content_$$ iframe").attr("scrolling", "no");
			$("#page_$$ #footer").css({ "display": "none" });
		}
	};
}();

$(window).resize(function () {  /* if window resized then resize the iframe */
	var resizeTimer;
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout($vc.$$.resizeModule, 1000);
});

$("#ele_$$_back").on("click", function () {
	$vc.sessionState.currPage = ""; // this means the prevPage will not be overwritte when we go back
	$("#content_$$ iframe").attr("src", "");  /* this triggers the RTE to terminate */
	/* return to modules, if more than one, else return to programs */
	$(":mobile-pagecontainer").pagecontainer("change", "#" + $vc.sessionState.prevPage);
});