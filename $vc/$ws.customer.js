$ws.customer = function (parm, success, error) {

  var request = $.ajax({
    dataType: "json",
    type: "POST",
    async: false,
    url: "/Vubiz.WebService/v8client.asmx/customer",
    data: {
      custId: parm.custId
    }
  });

  request.done(function (data) {
    success(data);
  });

  request.fail(function (jqXHR, textStatus) {
    error(jqXHR, textStatus);
  });

};