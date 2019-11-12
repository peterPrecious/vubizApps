$ws.profiles = function (parm, done, fail) {

  /* get profiles for this app - add live feed eventually */

  var url = "$vc/json/profiles/" + parm.appId + ".json";
  var request = $.ajax({
    dataType: "json",
    async: false,
    url: url
  });

  request.done(function (data) {
    done(data);
  });

  request.fail(function (jqXHR, textStatus) {
    fail(jqXHR, textStatus);
  });

};