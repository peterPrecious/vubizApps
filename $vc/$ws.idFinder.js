$ws.idFinder = function (parm, success, error) {

  var request = $.ajax({
    dataType: "json",
    type: "POST",
    async: true,
    url: "/Vubiz.WebService/V8.asmx/idFinder",
    data: {
      custId: parm.custId,
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