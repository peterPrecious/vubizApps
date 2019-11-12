$(document).on("pagecontainerbeforeshow", function (event, ui) {

  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    //$("#img_$$_logo").attr("src", "styles/logos/" + ifElse($vc.profileState.logo, "vubz_en.png"))
    $(".ele_$$_example").html($vc.sessionState.sampId);
    $(".ajax-file-upload-container").text(""); // this is the uploader info div that needs to be cleared

    if ($vc.sessionState.sampImage === 0) {
      $(".ele_$$_delete").hide();
    } else {
      $(".ele_$$_image").attr("src", "/samplerLogos/" + $vc.sessionState.sampId + ".png");
      $(".ele_$$_delete").show();
    }
    $vc.sessionState.prevPage = "page_samplers";

    // fileUp contants
    var imageFolder = "samplerLogos";                             // web where images are stored
    var maxSize = 350;                                            // max width/height
    var toName = $vc.sessionState.sampId;

    // this is the hayageek fileupload object, it sends fileupload data to the ws for resizing/retyping and renaming.
    var uploadObj = $("#dragandrophandler").uploadFile({
      url: "/vubizWs/v8client.asmx/sp8samplerLogoUpload",
      allowedTypes: "png,jpg,jpeg,gif",
      dragDrop: true,
      maxFileCount: 1,
      showPreview: true,
      previewWidth: "100px",
      acceptFiles: "image/*",
      formData: { imageFolder: imageFolder, toName: toName, maxSize: maxSize },
      dragDropStr: "<span style='font-weight:bold; color: grey;'>Drag & Drop Logo</span>",
      onSuccess: function (files, data, shr, pd) {
        uploadObj.reset(false);
        $(".ele_$$_image").attr("src", "/samplerLogos/" + $vc.sessionState.sampId + ".png");

      },
    });
  }

});