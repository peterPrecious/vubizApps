$ws.credentials = function (parm, success, error) {

  var request = $.ajax({
    dataType: "json",
    type: "POST",
    async: true,
    url: "/Vubiz.WebService/v8client.asmx/credentials",
    data: {
      membEmail: parm.membEmail
    }
  });

  request.done(function (data) {
    success(data);
  });

  request.fail(function (jqXHR, textStatus) {
    error(jqXHR, textStatus);
  });

};