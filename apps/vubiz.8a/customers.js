
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_customerReport";
    $vc.$$.customers();
  }
});

$vc.$$ = function () {
  var _doneCustomers = function (data, result, xhr) {
    $vc.fn.console("Success loading Customers");
    var customers = "";
    $.each(data, function (key, value) {
      customers = customers
      + "  <tr>"
      + "    <td>" + value.custId + "</td>"
      + "    <td>" + value.custAcctId + "</td>"
      + "    <td>" + value.custTitle + "</td>"
      + "    <td style='background-image:url(styles/" + (value.custActive === "True" ? "check" : "x") + ".gif); background-repeat:no-repeat; background-position:center;'></td>"
      + "    <td style='text-align:right'><a onclick='$vc.$$.editCustomers(" + value.membNo + ")' class='ui-alt-icon ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-edit ui-nodisc-icon' href='#'>Edit</a></td>"
      + "  </tr>";
    });
    $("#ele_$$_tbody").html(customers);
  };
  var _doneDeleteCustomers = function (data, result, xhr) {
    $vc.fn.console("Success deleting Customers");
    $vc.$$.customers();
  };
  var _failCustomers = function (xhr, result, statusText) {
    alert("Error loading Customers");
  };
  var _failDeleteCustomers = function (xhr, result, statusText) {
    alert("Error deleting Customers");
  };

  return {
    customers: function () {
      var parm = {};
      parm.custId = $vc.parmState.custId;
      parm.custAcctId = $vc.parmState.custAcctId;
      parm.custTitle = $vc.parmState.custTitle;
      parm.custActive = $vc.parmState.custActive;

      $vc.ws("customerReport", parm, _doneCustomers, _failCustomers);
    },
    editCustomers: function (guestNo) {
      $vc.sessionState.guestNo = guestNo;
      $(":mobile-pagecontainer").pagecontainer("change", "#page_guest");
    },
    deleteCustomers: function (guestMembGuid, guestNoVisits) {
      if (guestNoVisits > 0) {
        $vc.fn.popup("[[You cannot delete an active employee. However, they can be inactivated.]]");
      } else {
        var parm = {};
        parm.membGuid = guestMembGuid;
        $vc.ws("deleteCustomers", parm, _doneDeleteCustomers, _failDeleteCustomers);
      }
    }
  };
}();


$("#ele_$$_back").on("click", function () {
  $(":mobile-pagecontainer").pagecontainer("change", "#page_customerReport");
});
