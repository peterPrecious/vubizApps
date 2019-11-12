$(function () {

  var page = "home";

  /* set default to EN unless reset by code */
  $("#ele_home_langEn").addClass("langButtonShadow");

  $("#ele_home_langEn").on("click", function () {
    removeShadow();
    $("#ele_home_langEn").addClass("langButtonShadow");
    renderPage(page, "en");
  });
  $("#ele_home_langFr").on("click", function () {
    removeShadow();
    $("#ele_home_langFr").addClass("langButtonShadow");
    renderPage(page, "fr");
  });
  $("#ele_home_langEs").on("click", function () {
    removeShadow();
    $("#ele_home_langEs").addClass("langButtonShadow");
    renderPage(page, "es");
  });
  $("#ele_home_langPt").on("click", function () {
    removeShadow();
    $("#ele_home_langPt").addClass("langButtonShadow");
    renderPage(page, "pt");
  });

});


function removeShadow() {
  $("#ele_home_langEn").removeClass("langButtonShadow");
  $("#ele_home_langFr").removeClass("langButtonShadow");
  $("#ele_home_langEs").removeClass("langButtonShadow");
  $("#ele_home_langPt").removeClass("langButtonShadow");
}