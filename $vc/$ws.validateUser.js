$ws.validateUser = function (parm, success, error) {

  var debug = ifElse(parm.debug, false);

  if (debug) {
    var request = $.ajax({
      dataType: "json",
      async: false,
      url: "$vc/json/validateUser.json"
    });
  } else {
    var request = $.ajax({
      dataType: "json",
      type: "POST",
      async: true,
      url: "/Vubiz.WebService/V8.asmx/ValidateUser",
      data: {
        appid: parm.appid,
        username: parm.username,
        password: parm.password
      }
    });
  };

  request.done(function (data) {
    success(data);
  });
  request.fail(function (jqXHR, textStatus) {
    error(jqXHR, textStatus);
  });

};