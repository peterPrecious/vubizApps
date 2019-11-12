/* ensure copy on V5 and vubizApps */

function clearEle(ele) {
  $("#" + ele)[0].value = "";
}
function ifImage(image) { /* if the image has width then it exists */
  var screenImage = $("<img src='" + image + "' />");
  var theImage = new Image();
  theImage.src = screenImage.attr("src");
  var imageWidth = theImage.width;
  return imageWidth > 0;
}
function imageExists(image) { /* generate an image tag if the valid image files exists else '' */
  var img = new Image();
  img.src = image;
  tag = "<img src='" + image + "' />";
  if (img.height === 0) return ""; else return tag;
}
function imagesExists(image) { /* generate an image tag if any valid possible images exists else '' */
  var img;
  // try the image sent, else try with varius suffixes
  img = imageExists(image); if (img !== "") return img;
  img = imageExists(image + ".png"); if (img !== "") return img;
  img = imageExists(image + ".jpg"); if (img !== "") return img;
  img = imageExists(image + ".gif");
  return img;
}
function isWhitespace(charToCheck) {
  var whitespaceChars = " \t\n\r\f";
  return whitespaceChars.indexOf(charToCheck) !== -1;
}
function isValid(x, type, min, max) { /* returns true if the element type x is valid */
  var patt = "";
  switch (type) {
    case "alphaNumeric": patt = /^[0-9A-z\ ]+$/; break;
    case "alpha": patt = /^[A-z]+$/; break;
    case "numeric": patt = /^[0-9]+$/; break;
    case "money": patt = /^[0-9\$\.]+$/; break;
    case "phone": patt = /^[0-9\$\-]+$/; break;
    case "email": patt = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; break;
    case "guid": patt = /^{?([0-9a-fA-F]){8}(-([0-9a-fA-F]){4}){3}-([0-9a-fA-F]){12}}?$/; break;
    case "password": patt = /^[0-9A-z\!\@\$\%\^\*\(\)\_\+\-\{\}\[\]\;\<\>\,\.\:]+$/; break;
  }
  var minOk = true; if (isNumber(min) && x.length < min) minOk = false;
  var maxOk = true; if (isNumber(max) && x.length > max) maxOk = false;

  var Patt = new RegExp(patt);
  var result = Patt.test(x) && minOk && maxOk;
  return result;

}
function isNumber(n) {  /* returns true if numeric */
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function isBoolean(val) {  /* returns true if boolean (true/false) */
  return typeof val === "boolean";}
function isOk(val) { /* returns true if valid value */
  //return val !== null && val.length !== 0 && val !== undefined && val !== "undefined";
  return val !== null && val !== undefined && val !== "undefined";
}
function isTrue(val) { /* returns true if value is boolean and true */
  return isBoolean(val) && val;
}
function isFalse(val) { /* returns true if value is boolean and false */
  return isBoolean(val) && !val;
}
function ifElse(val, retFalse) {  /* if val ok return val else retFalse */
  return isOk(val) ? val : retFalse;
}
function ifOk(val, retTrue, retFalse) {  /* if val ok return retTrue else retFalse */
  return isOk(val) ? retTrue : retFalse;
}
function isDate(date) {  /* returns true if a date where we ? */
  var temp = new Date(date);
  return !isNaN(temp.valueOf());
}
function dateDiff(strDate, endDate) {  /* returns the number of days between start and end dates or -1 if not valid dates */
  if (!isDate(strDate) || !isDate(endDate)) {
    return -1;
  } else {
    var str = Date.parse(strDate);
    var end = Date.parse(endDate);
    if (str > end) {
      return -1;
    } else {
      return Math.ceil((end - str) / (1000 * 60 * 60 * 24));
    }
  }
}
function formatToDate(douseDate) {
  /* returns date from YYYY-MM-DDTHH:MM:SS */
  var yyyy = left(douseDate, 4);
  var mm = douseDate.substr(5, 2);
  var dd = douseDate.substr(8, 2);
  var hh = douseDate.substr(11, 2);
  var mn = douseDate.substr(14, 2);
  var ss = douseDate.substr(17, 2);
  var d = new Date();
  d.setFullYear(yyyy);
  d.setMonth(mm);
  d.setDate(dd);
  d.setHours(hh);
  d.setMinutes(mn);
  d.setSeconds(ss);

  return d;
}
function formatDate(date, lang, plus, hhmm, hhmmss) {
  /* a null date should be ignored, if = '' then it will return today's date */
  if (date === null) return null;

  /* format a valid date, if no lang assume EN, if no Plus days add 0 */
  /* if hhmm add HH:MM or if hhmmss add HH:MM:SS (HH:MM must be false for HH:MM:SS to kick in*/
  /* if a plus (or minus) is included, then add that number of days to "date" */
  /* plus is NOT configured, s/b 0 */
  plus = isNumber(plus) ? plus : 0;

  /* if no date was submitted use todays date */
  var d = isDate(date) ? new Date(date) : new Date();
  d.setDate(d.getDate() + plus);

  var mm = d.getMonth();
  var dd = d.getDate();
  var yy = d.getFullYear();
  var hh = d.getHours();
  var mn = d.getMinutes();
  var ss = d.getSeconds();
  hh = right("00" + hh, 2);
  mn = right("00" + mn, 2);
  ss = right("00" + ss, 2);

  var time = "";
  if (isTrue(hhmm)) {
    time = " " + hh + ":" + mn;
  } else if (isTrue(hhmmss)) {
    time = " " + hh + ":" + mn + ":" + ss;
  }

  lang = ok(lang);
  var mmm;
  if (lang.toUpperCase() === "FR") {
    mmm = ["janv.", "févr.", "mars", "avril", "mai", " juin", "juillet", "août", "sept.", "oct.", "nov.", "déc."];
    return dd + " " + mmm[mm] + ", " + yy + time;
  } else if (lang.toUpperCase() === "ES") {
    mmm = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sept.", "oct.", "nov.", "dic."];
    return dd + " " + mmm[mm] + " " + yy + time;
  } else {
    mmm = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return mmm[mm] + " " + dd + ", " + yy + time;
  }

}
function formatDateSql(date, hour, min) {
  /* format a sql datetime2 '2007-05-08 12:35:00' from valid parms */
  var d = new Date(date);
  var yyyy = d.getFullYear();
  var mm, dd;
  mm = d.getMonth() + 1;
  dd = d.getDate();
  mm = right("00" + mm, 2);
  dd = right("00" + dd, 2);
  hh = right("00" + hour, 2);
  mn = right("00" + min, 2);
  return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mn + ":00";
}
function formatDate_mm_dd_yyyy(date) {
  /* returns date in MM/DD/YYYY */
  var d = new Date(date);
  var yyyy = d.getFullYear();
  var mm, dd;
  mm = d.getMonth() + 1;
  dd = d.getDate();
  mm = right("00" + mm, 2);
  dd = right("00" + dd, 2);
  return mm + "/" + dd + "/" + yyyy;
}
function left(str, n) {
  if (n <= 0)
    return "";
  else if (n > String(str).length)
    return str;
  else
    return String(str).substring(0, n);
}
function ltrim(str) {
  for (var k = 0; k < str.length && isWhitespace(str.charAt(k)); k++);
  return str.substring(k, str.length);
}
function ok(val) { /* return a valid val or "" */
  return isOk(val) ? val : "";
}
function prvMthStrDate(fromDate) {
  /* returns the starting date of month previous to fromDate */
  var yyyy, mm, d;
  if (fromDate === undefined) {
    d = new Date();
  } else {
    d = new Date(fromDate);
  }
  yyyy = d.getFullYear();
  mm = d.getMonth();
  if (mm === 0) {
    mm = 11;
    yyyy--;
  }
  dd = 1;
  return mm + "/" + dd + "/" + yyyy;
}
function prvMthEndDate(fromDate) {
  /* returns the ending date of month previous to fromDate */
  var d1;
  if (fromDate === undefined) {
    d1 = new Date();
  } else {
    d1 = new Date(fromDate);
  }
  var yyyy, mm, d2, dd;
  yyyy = d1.getFullYear();
  mm = d1.getMonth();
  d2 = new Date(yyyy, mm, 0);
  yyyy = d2.getFullYear();
  mm = d2.getMonth() + 1;
  dd = d2.getDate();
  return mm + "/" + dd + "/" + yyyy;
}
function prvQtrStrDate(fromDate) {
  /* returns the starting date of month previous to fromDate */
  //debugger;
  var d;
  if (fromDate === undefined) {
    d = new Date();
  } else {
    d = new Date(fromDate);
  }
  var yyyy = d.getFullYear();
  var mm = d.getMonth();
  if (mm === 0) { // mm from function is 0-11 while for formatting date it's 1-12
    mm = 10;
    yyyy--;
  } else if (mm === 1) {
    mm = 11;
    yyyy--;
  } else if (mm === 2) {
    mm = 12;
    yyyy--;
  } else {
    mm = mm - 2;
  }
  return mm + "/" + 1 + "/" + yyyy;
}
function right(str, n) {
  if (n <= 0)
    return "";
  else if (n > String(str).length)
    return str;
  else {
    var iLen = String(str).length;
    return String(str).substring(iLen, iLen - n);
  }
}
function rtrim(str) {
  for (var j = str.length - 1; j >= 0 && isWhitespace(str.charAt(j)); j--);
  return str.substring(0, j + 1);
}
function trim(str) {
  return ltrim(rtrim(str));
}