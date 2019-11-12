$ws.email = function (parm, done, fail) {

  var request = $.ajax({
    dataType: "json",
    type: "POST",
    async: true,
    url: "/Vubiz.WebService/v8client.asmx/email",
    data: {
      emailFrom: parm.emailFrom,
      emailTo: parm.emailTo,
      emailSubject: parm.emailSubject,
      emailBody: parm.emailBody
    }
  });

  request.done(function (data) {
    done(data);
  });

  request.fail(function (jqXHR, textStatus) {
    fail(jqXHR, textStatus);
  });

};