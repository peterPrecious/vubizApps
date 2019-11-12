var _getLangs = function (page, callback) {
  $.ajax({
    dataType: "script",
    async: false,
    url: "apps/browser.3/" + page + ".lang.js",
    success: function (data) {
      callback("loaded language pack for " + page + " page");
    },
    done: function (jqXHR, textStatus) {
      alert("fail");
      callback("could NOT load language pack for " + page + " page");
    }
  });

};
