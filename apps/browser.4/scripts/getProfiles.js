var _getProfiles = function (callback) {

  $.ajax({
    dataType: "json",
    async: false,
    url: "apps/browser.3/scripts/json/profiles.json",
    success: function (data) {
      profiles = data;
      callback("getProfiles");
    }
  });

};