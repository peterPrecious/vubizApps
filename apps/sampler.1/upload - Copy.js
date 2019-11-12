$(document).on("pagecontainerbeforeshow", function (event, ui) {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    //$("#img_$$_logo").attr("src", "styles/logos/" + ifElse($vc.profileState.logo, "vubz_en.png"))
    $(".ele_$$_example").html($vc.sessionState.sampId);
    $(".ajax-file-upload-container").text(""); // this is the uploader info div that needs to be cleared

    if ($vc.sessionState.sampImage.length === 0) {
      $(".ele_$$_delete").hide();
    } else {
      $(".ele_$$_image").attr("src", "/samplerLogos/" + $vc.sessionState.sampImage);
      $(".ele_$$_delete").show();
    }
    $vc.sessionState.prevPage = "page_samplers";
  }
});


$(function () {
  $("#dragandrophandler").uploadFile({
    url: "/vubizWs/v8client.asmx/sp8samplerLogoUpload",
    allowedTypes: "png,jpg,jpeg,gif",
    dragDrop: true,
    maxFileCount: 9,
    showPreview: true,
    previewWidth: "100px",
    acceptFiles: "image/*",
    formData: { "samplerId": "_test" },
    dragDropStr: "<span style='font-weight:bold; color: grey;'>Drag & Drop Logo</span>",
    //onSelect: function (files) {
    //var fileName = files[0].name.split(".");
    //if ($vc.sessionState.sampId.toUpperCase() != fileName[0].toUpperCase()) {
    //  alert(
    //    "Please select a logo with file name: \"" + $vc.sessionState.sampId +
    //    "\".\n\nSelected file : \"" + files[0].name + "\" is not valid."
    //    );
    //  return false; //stop submission.
    //} else {
    //  return true; //allow submission.
    //};
    //},
    onSuccess: function (files, data, shr, pd) {
      alert("Logo '" + files[0] + "' has been uploaded!");
    }
  });
});