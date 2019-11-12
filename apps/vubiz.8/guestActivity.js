
$(document).bind("pagebeforeshow", function () {
  if ($.mobile.activePage.attr("id") === "page_$$") {
    $("#footer_$$_title").html($vc.sessionState.appId + " | $$");
    $vc.sessionState.prevPage = "page_myGuests"; /* ensure we return to programs */

    $vc.$$.guests();
  };
});

$vc.$$ = function () {
  var _doneGuests = function (data, result, xhr) {
    $vc.fn.console("Success loading Guest Activities");
    var guests = "", link = "";

    $.each(data, function (key, value) {
      if (value.membNoMods > 0) {
        link = "<a onclick='$vc.$$.reportCard(" + value.membNo + ", \"" + value.membId + "\", \"" + value.membFirstName + "\", \"" + value.membLastName + "\") ' class='ui-btn ui-shadow ui-btn-icon-notext ui-btn-inline ui-icon-d-more' href='#'>More</a>";
      } else {
        link = "";
      };

      guests = guests
      + "  <tr class='ui-alt-icon ui-nodisc-icon'>"
      + "    <td>" + value.membFirstName + ' ' + value.membLastName + "</td>"
      + "    <td style='text-align:center'>" + value.membNoVisits + "</td>"
      + "    <td style='text-align:center'>" + ifElse(value.membNoMods, 0) + "</td>"
      + "    <td style='text-align:center'>" + ifElse(value.membNoMins, 0) + "</td>"
      + "    <td style='text-align:center'>" + link + "</td>"
      + "  </tr>";
    });

    $("#ele_$$_tbody").html(guests);
  };

  var _failGuests = function (xhr, result, statusText) {
    alert("Error loading Guest Activities");
  };
  return {
    guests: function () {
      var parm = {};
      parm.membNo = $vc.sessionState.membNo;
      $vc.ws("guests", parm, _doneGuests, _failGuests);
    },
    reportCard: function (guestNo, guestId, guestFirstName, guestLastName) {
      $vc.sessionState.guestNo = guestNo;
      $vc.sessionState.guestId = guestId;
      $vc.sessionState.guestFirstName = guestFirstName;
      $vc.sessionState.guestLastName = guestLastName;
      $vc.sessionState.reportByGuest = true;
      $(":mobile-pagecontainer").pagecontainer("change", "#page_historyPrograms2");
    }
  };
}();


$("#ele_$$_add").on("click", function () {
  $(":mobile-pagecontainer").pagecontainer("change", "#page_guest");
});
