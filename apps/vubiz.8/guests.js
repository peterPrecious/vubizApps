
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_myGuests";
    $vc.$$.guests();
  }
});

$vc.$$ = function () {
  var _doneGuests = function (data, result, xhr) {
    $vc.fn.console("Success loading Guests");
    var guests = "";
    $.each(data, function (key, value) {
      guests = guests
      + "  <tr>"
      + "    <td>" + value.membFirstName + ' ' + value.membLastName + "</td>"
      + "    <td>" + value.membEmail + "</td>"
      + "    <td style='background-image:url(styles/" + (value.membActive === "True" ? "check" : "x") + ".gif); background-repeat:no-repeat; background-position:center;'></td>"
      + "    <td style='text-align:center'>" + value.membNoVisits + "</td>"
      + "    <td style='text-align:right'><a onclick='$vc.$$.editGuest(" + value.membNo + ")' class='ui-alt-icon ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-edit ui-nodisc-icon' href='#'>Edit</a></td>";

      if (value.membNoVisits > 0) {
        guests = guests
        + "    <td style='text-align:right'>&ensp;</td>"
        + "  </tr>";
      } else {
        guests = guests
        + "    <td style='text-align:right'><a onclick='$vc.$$.deleteGuest(\"" + value.membGuid + "\", " + value.membNoVisits + ")' class='ui-alt-icon ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-d-delete ui-nodisc-icon' href='#'>Delete</a></td>"
        + "  </tr>";
      };
    });
    $("#ele_$$_tbody").html(guests);
  };
  var _doneDeleteGuest = function (data, result, xhr) {
    $vc.fn.console("Success deleting Guest");
    $vc.$$.guests();
  };

  var _failGuests = function (xhr, result, statusText) {
    alert("Error loading Guests");
  };
  var _failDeleteGuest = function (xhr, result, statusText) {
    alert("Error deleting Guest");
  };
  return {
    guests: function () {
      var parm = {};
      parm.membNo = $vc.sessionState.membNo;
      $vc.ws("guests", parm, _doneGuests, _failGuests);
    },
    editGuest: function (guestNo) {
      $vc.sessionState.guestNo = guestNo;
      $(":mobile-pagecontainer").pagecontainer("change", "#page_guest");
    },
    deleteGuest: function (guestMembGuid, guestNoVisits) {
      if (guestNoVisits > 0) {
        $vc.fn.popup("[[You cannot delete an active employee. However, they can be inactivated.]]");
      } else {
        var parm = {};
        parm.membGuid = guestMembGuid;
        $vc.ws("deleteGuest", parm, _doneDeleteGuest, _failDeleteGuest);
      }
    }
  };
}();


$("#ele_$$_add").on("click", function () {
  $(":mobile-pagecontainer").pagecontainer("change", "#page_guest");
});
