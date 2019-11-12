/*
  sources: http://jquery-howto.blogspot.ca/2009/09/get-url-parameters-values-with-jquery.html, http://snipplr.com/view/799/get-url-variables/
  ...to get object of URL parameters use:  var allVars = $.getUrlVars();
  ...to get URL var by its name use:  var byName = $.getUrlVar("name");

  ...modifid Mar 29, 2018 to only split on first =; ie abc=heloo== we want abc to be helo==, where embedded = are comon in base64 values

*/

$.extend({

  getUrlVars: function () {

    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&");
    for (var i = 0; i < hashes.length; i++) {

      //hash = hashes[i].split("=");
      //vars.push(hash[0]);
      //vars[hash[0]] = hash[1];

      var equal, left, right;
      equal = hashes[i].indexOf("=");
      left = hashes[i].substring(0, equal);
      right = hashes[i].substring(equal + 1);
      vars.push(left);
      vars[left] = right;
    }
    return vars;
  },

  getUrlVar: function (name) {
    return $.getUrlVars()[name];
  }

});