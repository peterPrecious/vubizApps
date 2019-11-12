$ws.catalogue = function (parm, done, fail) {

  var request = $.ajax({
    dataType: "json",
    type: "POST",
    async: true,
    url: "/Vubiz.WebService/v8client.asmx/catalogue",
    data: {
      custId: parm.custId
    }
  });

  request.done(function (data) {
    done(data);
  });

  request.fail(function (jqXHR, textStatus) {
    fail(jqXHR, textStatus);
  });

};