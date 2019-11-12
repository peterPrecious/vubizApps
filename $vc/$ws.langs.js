$ws.langs = function (parm, done, fail) {

  /* eventually add live feed */

  var request = $.ajax({
    dataType: "json",
    async: false,
    url: "$vc/json/langs/" + parm.appId + "_" + parm.page + ".json"
  });


  request.done(function (data) {
    done(data);
  });

  request.fail(function (jqXHR, textStatus) {
    fail(jqXHR, textStatus);
  });

};

