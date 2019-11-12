

function _done(data, result, xhr) { alert(data.browserNo) };
function _fail(xhr, result, statusText) { alert(statusText) };
function ws(ws, parm, done, fail) {
  var request = $.ajax({
    type: "POST",
    dataType: (isOk(parm.dataType)) ? parm.dataType : "json",
    asynch: false,
    url: (isOk(parm.url)) ? parm.url + ws : "/vubizWs/v8client.asmx/" + ws,
    data: parm
  });
  request.done(function (data) {
    done(data);
  });
  request.fail(function (jqXHR, textStatus) {
    fail(jqXHR, textStatus);
  });
};

var parm = {};
ws("browserCheck", parm, _doneGuest, _failGuest);

