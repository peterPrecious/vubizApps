/* these are the fields we need for the learner, need to put here to make them global (sadly) */
var
  var_$$_ecomGuid,
  var_$$_ecomAcctId,
  var_$$_ecomId,
  var_$$_ecomPwd,
  var_$$_ecomFirstName,
  var_$$_ecomLastName,
  var_$$_ecomEmail,
  var_$$_ecomOrganization,
  var_$$_ecomCountry,
  var_$$_ecomCountryId,
  var_$$_ecomProvince,
  var_$$_ecomProvinceId,
  var_$$_ecomAddress,
  var_$$_ecomCity,
  var_$$_ecomPostalZip,
  var_$$_ecomPhone,
  var_$$_ecomPhoneExt,
  var_$$_ecomChildId;

$(document).bind("pagebeforeshow", function () {

  if ($.mobile.activePage.attr("id") === "page_$$") {
    $(".ui-header, .ui-footer").hide();

    // get ecomGuid from URL
    $vc.sessionState.ecomGuid = $.getUrlVar("ecomGuid");

    // ensure storeId, custId, cancelUrl and returnUrl were passed in...
    if ($vc.sessionState.storeId === "" || $vc.sessionState.custId === "" || $vc.sessionState.returnUrl === "" || $vc.sessionState.cancelUrl === "") {
      $vc.fn.popup("This app was launched incorrectly! Please contact Systems.<br><br> [...missing or invalid launch parameters: storeId, custId, cancelUrl and/or returnUrl...]");
      $("#content_$$").html("");
    } else {

      // setup formManager
      getFormElements("content_$$");

      $vc.$$.getLearner();
    }
  }

});


$vc.$$ = function () {
  var _doneUrl = function (data, result, xhr) {
    if (data.guid.length > 0) {
      var url = $vc.sessionState.returnUrl + "?ecomGuid=" + $vc.sessionState.ecomGuid + "&token=" + data.guid;
      location.href = url;
    } else {
      $vc.fn.popup("Unable to generate the token, please contact systems!");
    }
  };
  var _doneGet = function (data, result, xhr) {

    if (data !== null) {

      $("#ele_$$_ecomId")[0].innerHTML = "&nbsp; " + data.ecomId; // read only

      // if we have an ecomChildId then we've processed this learner - so grab the data from the memb table
      if (trim(data.ecomChildId).length > 0) { // remember this is char(8) so always has 8 characters (spaces) even if "empty"
        $("#ele_$$_ecomFirstName")[0].value = data.membFirstName;
        $("#ele_$$_ecomLastName")[0].value = data.membLastName;
        $("#ele_$$_ecomEmail")[0].value = data.membEmail;
        $("#ele_$$_ecomPwd")[0].value = data.membPwd;
        $("#ele_$$_ecomOrganization")[0].value = data.membOrganization;
      } else {
        $("#ele_$$_ecomFirstName")[0].value = data.ecomFirstName;
        $("#ele_$$_ecomLastName")[0].value = data.ecomLastName;
        $("#ele_$$_ecomEmail")[0].value = data.ecomEmail;
        $("#ele_$$_ecomPwd")[0].value = data.ecomPwd;
        $("#ele_$$_ecomOrganization")[0].value = data.ecomOrganization;
      }

      $$_setDropDowns(data.ecomCountryId, data.ecomProvinceId);
      $("#ele_$$_ecomAddress")[0].value = data.ecomAddress;
      $("#ele_$$_ecomCity")[0].value = data.ecomCity;
      $("#ele_$$_ecomPostalZip")[0].value = data.ecomPostalZip;
      $("#ele_$$_ecomPhone")[0].value = data.ecomPhone;
      $("#ele_$$_ecomPhoneExt")[0].value = data.ecomPhoneExt;

      var_$$_ecomId = data.ecomId;
      var_$$_ecomCountryId = data.ecomCountryId;
      var_$$_ecomProvinceId = data.var_register_ecomProvinceId;
      var_$$_ecomChildId = data.ecomChildId;

    } else {
      $vc.fn.popup("Your profile cannot be accessed. Please contact systems!");
    }
  };
  var _donePut = function (data, result, xhr) {
    $vc.$$.urlReturn();
  };
  var _fail = function (xhr, result, statusText) {
    $.mobile.loading("hide");
    alert("Error loading learner");
  };
  return {
    getLearner: function () {
      var parm = {};
      parm.ecomGuid = $vc.sessionState.ecomGuid;
      $vc.ws("ecomAccountGet", parm, _doneGet, _fail);
    },
    putLearner: function () {
      var parm = {};
      parm.ecomGuid = $vc.sessionState.ecomGuid;
      parm.ecomFirstName = var_$$_ecomFirstName;
      parm.ecomLastName = var_$$_ecomLastName;
      parm.ecomEmail = var_$$_ecomEmail;
      parm.ecomId = var_$$_ecomId;
      parm.ecomPwd = var_$$_ecomPwd;
      parm.ecomOrganization = var_$$_ecomOrganization;
      parm.ecomCountry = $("#ele_$$_ecomCountry option:selected")[0].text;
      parm.ecomCountryId = $("#ele_$$_ecomCountry option:selected")[0].value;
      parm.ecomProvince = $("#ele_$$_ecomProvince option:selected")[0].text;
      parm.ecomProvinceId = $("#ele_$$_ecomProvince option:selected")[0].value;
      parm.ecomAddress = var_$$_ecomAddress;
      parm.ecomCity = var_$$_ecomCity;
      parm.ecomPostalZip = var_$$_ecomPostalZip;
      parm.ecomPhone = var_$$_ecomPhone;
      parm.ecomPhoneExt = var_$$_ecomPhoneExt;
      parm.ecomChildId = var_$$_ecomChildId;  // send this across to inform SP to update memb record if this is an existing NOP profile


      $vc.ws("ecomAccountPut", parm, _donePut, _fail);
    },
    urlReturn: function () {
      var parm = {};
      parm.minutes = 10;
      $vc.ws("sp8tokenSet", parm, _doneUrl, _fail);
    }
  };
}();

$("#ele_$$_check").on("keypress click", function (e) {
  if (e.which === 13 || e.type === "click") {

    // check for missing fields
    var errors = "";
    if ($("#ele_$$_ecomFirstName")[0].value === "") errors += "First Name<br />";
    if ($("#ele_$$_ecomLastName")[0].value === "") errors += "Last Name<br />";
    if ($("#ele_$$_ecomEmail")[0].value === "") errors += "Email<br />";

    if ($("#ele_$$_ecomPwd")[0].value === "") errors += "Password<br />";
    if ($("#ele_$$_ecomAddress")[0].value === "") errors += "Address<br />";
    if ($("#ele_$$_ecomCity")[0].value === "") errors += "City<br />";
    if ($("#ele_$$_ecomPhone")[0].value === "") errors += "Phone No<br />";
    if (!isNumber(var_$$_ecomCountryId) || var_$$_ecomCountryId === "0") errors += "Country<br />";
    if ((var_$$_ecomCountryId === "1" || var_$$_ecomCountryId === "2") && var_$$_ecomProvinceId === "0") errors += "Prov/State<br />";
    if ((var_$$_ecomCountryId === "1" || var_$$_ecomCountryId === "2") && $("#ele_$$_ecomPostalZip")[0].value === "") errors += "Postal/Zip<br />";

    if (errors.length > 0) {
      $vc.fn.popup("Following fields are mandatory:<br><br>" + errors);
    } else {
      // check validity of fields
      var_$$_ecomFirstName = $("#ele_$$_ecomFirstName")[0].value;
      var_$$_ecomLastName = $("#ele_$$_ecomLastName")[0].value;
      var_$$_ecomEmail = $("#ele_$$_ecomEmail")[0].value.toLowerCase();
      var_$$_ecomPwd = $("#ele_$$_ecomPwd")[0].value.toUpperCase();
      var_$$_ecomOrganization = $("#ele_$$_ecomOrganization")[0].value;
      var_$$_ecomAddress = $("#ele_$$_ecomAddress")[0].value;
      var_$$_ecomCity = $("#ele_$$_ecomCity")[0].value;
      var_$$_ecomPostalZip = $("#ele_$$_ecomPostalZip")[0].value;
      var_$$_ecomPhone = $("#ele_$$_ecomPhone")[0].value;
      var_$$_ecomPhoneExt = $("#ele_$$_ecomPhoneExt")[0].value;

      var ok = true;

      if (ok && !isValid(var_$$_ecomEmail, "email", 4, 128)) {
        ok = false;
        $vc.fn.popup("Please use a valid Email Address.");
      }
      if (ok && !isValid(var_$$_ecomPwd, "password", 4, 128)) {
        ok = false;
        $vc.fn.popup("Please enter a valid Password (4-128 chars).");
      }

      // removed Aug 6th 2019 to enable odd addresses (like in Bahrain: H:1082 B:915 R:1517)
      // removing is essentially allowing any text in the address field
      //if (ok && !isValid(var_$$_ecomAddress, "alphaNumeric", 1, 128)) {
      //  ok = false;
      //  $vc.fn.popup("Please enter a valid Address.");
      //}

      if (ok && !isValid(var_$$_ecomCity, "alphaNumeric", 1, 128)) {
        ok = false;
        $vc.fn.popup("Please enter a valid City.");
      }
      if (ok && !isValid(var_$$_ecomPostalZip, "alphaNumeric", 1, 128)) {
        ok = false;
        $vc.fn.popup("Please enter a valid Postal / Zip.");
      }
      if (ok && !isValid(var_$$_ecomPhone, "phone", 1, 24)) {
        ok = false;
        $vc.fn.popup("Please enter a 10 digit Phone No.");
      }

      if (ok) {
        $vc.$$.putLearner();
      }
    }
  }
});
$("#ele_$$_cancel").on("click", function () {
  var url = $vc.sessionState.cancelUrl;
  location.href = url;
});
$("#ele_$$_ecomCountry").on("change", function () {
  var_$$_ecomCountry = $("#ele_$$_ecomCountry option:selected")[0].text;
  var_$$_ecomCountryId = $("#ele_$$_ecomCountry option:selected")[0].value;
  // craft prov/state dropdown based on country
  $$_dropDown(var_$$_ecomCountryId);
});
$("#ele_$$_ecomProvince").on("change", function () {
  var_$$_ecomProvince = $("#ele_$$_ecomProvince option:selected")[0].text;
  var_$$_ecomProvinceId = $("#ele_$$_ecomProvince option:selected")[0].value;
});

function $$_setDropDowns(country, province) {
  // set the country and prov/state dropdowns on start 
  $(".$$_CA").hide();
  $(".$$_US").hide();
  $(".$$_ProvState_Row").hide();
  //$("#ele_$$_ecomProvinceId").val("0");
  if (country === "1") {
    $(".$$_ProvState").html("State :");
    $(".$$_ProvState_Row").show();
    $(".$$_US").show();
  } else if (country === "2") {
    $(".$$_ProvState").html("Province :");
    $(".$$_ProvState_Row").show();
    $(".$$_CA").show();
  } else {
    var_$$_ecomProvince = "";
    var_$$_ecomProvinceId = "0";
  }
  $("#ele_$$_ecomCountry").val(country).selectmenu("refresh");
  $("#ele_$$_ecomProvince").val(province).selectmenu("refresh");
}
function $$_dropDown(country) {
  // set prov/state dropdown on start and on change based on country selected
  $(".$$_CA").hide();
  $(".$$_US").hide();
  $(".$$_XX").hide();
  $(".$$_ProvState_Row").hide();
  $("#ele_$$_ecomProvinceId").val("0");
  if (country === "1") {
    $(".$$_ProvState").html("State :");
    $(".$$_ProvState_Row").show();
    $(".$$_US").show();
  } else if (country === "2") {
    $(".$$_ProvState").html("Province :");
    $(".$$_ProvState_Row").show();
    $(".$$_CA").show();
  } else {
    var_$$_ecomProvince = "";
    var_$$_ecomProvinceId = "0";
  }
  $("#ele_$$_ecomProvince").val("0").selectmenu("refresh");
}

/* these are help fields */
$("#pop_$$_ecomId").on("click", function () {
  $vc.fn.popup("The Username is your unique identifier and cannot be modified. If absolutely necessary, create a new Profile but note you may have learning activities spread accross multiple profiles.");
});
$("#pop_$$_ecomPwd").on("click", function () {
  $vc.fn.popup("This is for your own use only. Passwords can be modified.");
});
$("#pop_$$_ecomOrganization").on("click", function () {
  $vc.fn.popup("This is an optional field. If available, this might be useful in reports.");
});
$("#pop_$$_ecomAddress").on("click", function () {
  $vc.fn.popup("Put all street info into this field, ie:<br> Apt 7B, 1234 Main Street East.");
});
$("#pop_$$_ecomPostal").on("click", function () {
  $vc.fn.popup("Enter unless outside of North America.");
});
$("#pop_$$_ecomPhone").on("click", function () {
  $vc.fn.popup("Enter a 10 digit Phone No like '9125551212'.");
});
$("#pop_$$_ecomPhoneExt").on("click", function () {
  $vc.fn.popup("An optional field like 'X12'.");
});