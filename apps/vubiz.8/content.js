﻿$(document).on("pagecontainerbeforeshow", function (event, ui) {
	if ($.mobile.activePage.attr("id") === "page_$$") {
		$("#footer_$$_title").html($vc.sessionState.appId + " | $$");
		$("#ele_content_homeIcon").hide();
		$("#ele_content_backIcon").hide();
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
			window.open("about:blank", "myWindow");
			$vc.ws("module", parm, _doneModules, _failModules);
		},
		renderModule: function () {
			$("#header_$$_title").html($vc.sessionState.prevPage === "page_historyProgram" ? $vc.sessionState.historyModsTitle : $vc.sessionState.modsTitle);
			/* this can be launched by the content tiles or historyProgram report */
			/* either http://vubiz.com or http://corporate.vubiz.com - comes from web.config */
			/* + "&SessionReturnURL=";  ...when you DO NOT pass this parm, the return button on the player DOES NOT appear */
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

			//url = "//vubiz.com/Gold/vuSCORM/SCOContainer.aspx?vCustId=CFIB5288&vMods_No=25503&vProg_No=6611&vMemb_No=1692969&vLang=en&app=V8&jumpto=&fluid=1&close=1&certificate=0&vModId=";
			$vc.fn.console(url);
			window.open(url, "myWindow");

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