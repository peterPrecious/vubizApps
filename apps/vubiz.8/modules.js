var myWindow;

$(document).on("pagecontainerbeforeshow", function (event, ui) {
	if ($.mobile.activePage.attr("id") === "page_$$") {

		//* hide page in case there is only one module and we go directly to content */
		//$("#" + "page_$$").hide()
		//$vc.fn.popup("Loading...");

		$("#footer_$$_title").html($vc.sessionState.appId + " | $$");
		$("#img_$$_logo").attr("src", "styles/logos/" + $vc.profileState.logo);

		$vc.$$.modules();  /* generate dynamic module tiles each visit */
	};
});

$vc.$$ = function () {
	var _done = function (data, result, xhr) {
		$vc.fn.console("success modules");
		$vc.modulesState = data;
		$vc.fn.putData();

		if (data === null) {
			$vc.fn.popup("There are no Modules available to review!");
		} else {
			if ($vc.sessionState.contentSource === "ecommerce" || $vc.sessionState.contentSource === "assigned" || $vc.sessionState.contentSource === "ecom-assigned") { /* get tiles color and icon from catalogue object */
				var catlTileIcon;
				catlTileIcon = "myCategories.png";
				/* default tile color to secondary color ... hack */
				$('<span id="getSecondaryColor" class="secondaryColor"></span>').appendTo('body');
				catlTileColor = $("#getSecondaryColor").css("color");
				$("#getSecondaryColor").remove();
			} else { /* get tiles color and icon from catalogue object */
				catlTileIcon = $vc.catalogueState[$vc.sessionState.catalogue].catlTileIcon;
				catlTileColor = $vc.catalogueState[$vc.sessionState.catalogue].catlTileColor;
			};
			var tiles = "", completed;
			if (data.length === 1) { /* if there's only one module then just launch that */
				var tileNo = 1;  /* the is the tile number / array number */
				$vc.sessionState.module = 1; /* we need to grab this value to determine which tile icon/color to use in subsequent levels */
				$vc.sessionState.modsId = data[0].modsId;
				$vc.sessionState.modsNo = data[0].modsNo;
				$vc.sessionState.currPage = $vc.sessionState.prevPage;
				$vc.fn.putData();

				//$(":mobile-pagecontainer").pagecontainer("change", "#page_content");
				// to avoid popup issues, trigger an onclick event
				$("#tile_modules").on("click", function () {
					$(":mobile-pagecontainer").pagecontainer("change", "#page_content");
				});
				$("#tile_modules").trigger("click");

			} else {
				/* otherwise render the tiles - first close the window required for single modules, it will be created later */
				window.open("about:blank", "myWindow").close();

				$vc.sessionState.prevPage = "page_programs";
				$.each(data, function (key, value) {
					if (value.modsCompleted.length > 0) {
						completed = " checked-tile";
					} else {
						completed = "";
					};
					/* if this is an exam then change icon */
					if (value.modsId === value.modsExam) {
						catlTileIcon = "exam.png";
					} else {
						if ($vc.sessionState.contentSource === "ecommerce" || $vc.sessionState.contentSource === "assigned" || $vc.sessionState.contentSource === "ecom-assigned") { 
							catlTileIcon = "myCategories.png";
						} else {
							catlTileIcon = $vc.catalogueState[$vc.sessionState.catalogue].catlTileIcon;
						};
					};
					tiles = tiles
							 + "<li id=\"ele_$$_" + key + "\" class=\"tile" + completed + "\" style=\"background-color: " + catlTileColor + ";\">"
							 + "  <div class=\"tileIcon\" style=\"background-image: url('styles/tiles/" + catlTileIcon + "');\"></div>"
							 + "  <div class=\"tileTitle\">" + value.modsTitle + "</div>"
							 + "</li>";
				});
				$("#tiles_$$").html(tiles);

				//$("#" + "page_$$").show()
				$vc.fn.popupClose();
			};
		};
	};
	var _fail = function (xhr, result, statusText) {
		alert("Error Loading Modules!");
	};
	return {
		modules: function () { /* this is used for ecommerce and assigned */

			myWindow = window.open("about:blank", "myWindow");
//      debugger;
			var parm = {};

			if ($vc.sessionState.contentSource === "ecommerce" || $vc.sessionState.contentSource === "assigned" || $vc.sessionState.contentSource === "ecom-assigned") {
				$vc.sessionState.catlNo = 0;
				$vc.sessionState.progId = $vc.programsState[$vc.sessionState.program].progId;
				parm.progId = $vc.sessionState.progId;
				parm.membNo = $vc.sessionState.membNo;
				$vc.ws("modulesEcommerce", parm, _done, _fail); // use for ecommerce or assigned

			} else { /* extract the catlNo from catalogueState using parameterState.catalogue which is the tile number */
				$vc.sessionState.catlNo = $vc.catalogueState[$vc.sessionState.catalogue].catlNo;
				$vc.sessionState.progId = $vc.programsState[$vc.sessionState.program].progId;
				parm.custId = $vc.sessionState.custId;
				parm.catlNo = $vc.sessionState.catlNo;
				parm.progId = $vc.sessionState.progId;
				parm.membNo = $vc.sessionState.membNo;
				//var myWindow = window.open("about:blank", "myWindow");
				$vc.ws("modules", parm, _done, _fail);
			};
		}
	};
}();

$(function () { /* grab the selected tile number from the end of the parentElement id that was tapped */

	$("#content_$$").on("click", function (event) {
		//$("#" + "page_$$").hide()
		var tileId = event.target.parentElement.id;
		var idStartsAt = tileId.lastIndexOf("_") + 1;
		var tileLength = tileId.length;
		var tileNo = right(tileId, tileLength - idStartsAt); /* the last 1 or 2 characters are the tile number / array number */
		$vc.sessionState.module = parseInt(tileNo); /* we need to grab this value to determine which tile icon/color to use in subsequent levels */
		$vc.sessionState.modsId = $vc.modulesState[$vc.sessionState.module].modsId;
		$vc.sessionState.modsNo = $vc.modulesState[$vc.sessionState.module].modsNo;

		//    $vc.sessionState.prevPage = "page_modules";
		$vc.fn.putData();

		$(":mobile-pagecontainer").pagecontainer("change", "#page_content");
	});

});