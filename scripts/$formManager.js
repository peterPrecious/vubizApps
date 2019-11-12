// used for v8 (similiar to #formManagerAsp.js)
// global variables for form management
var elementMax = 0, elementCur = 0, elements = []; // these are the tabbable form elements;
var elementLog = true; // log movement? true/false

$(function () { // Enter handler
  $(document).on("keypress", function (e) { // check for enter key unless in textarea
    var element = this.activeElement;
    var elementId = element.id;
    var elementType = element.type;
    var elementCur = $.inArray(elementId, elements); // current tabbable field

    if (e.which === 13 && elementType !== "textarea") { // process enter key except if inside a TextArea or on a button/div
      if (elementCur === elementMax) { // at last tabbable field
        e.preventDefault(); // ignore Enter key and trigger click next
        if (element.className.indexOf("ui-icon-d-check") >= 0) $("#" + elementId).trigger("click"); // if this is an (update) div
      } else {
        elementCur++; // point to next tabbable field
        if (elementLog) console.log("focus on: #" + elements[elementCur] + ", type:" + $("#" + elements[elementCur])[0].type);
        $("#" + elements[elementCur])[0].focus();
      }
    }
  });
  $(document).on("keydown", function (e) { // Tab handler
    var element = this.activeElement.id;
    elementCur = $.inArray(element, elements);
    if (e.which === 9 && !e.shiftKey) { // tab
      if (elementCur === elementMax) { // at last tabbable field
        e.preventDefault(); // ignore key (tab or enter)
      } else {
        elementCur++; // point to next tabbable field
      }
      if (elementLog) console.log("focus on: #" + elements[elementCur]);
    }
    if (e.which === 9 && e.shiftKey) { // back tab
      if (elementCur === 0) { // at last tabbable field
        e.preventDefault(); // ignore key (tab or enter)
      } else {
        elementCur--; // point to next tabbable field
      }
      if (elementLog) console.log("focus on: #" + elements[elementCur]);
    }
  });
});

function getFormElements(page) {  // create an array of :input elements and update icons in this page, also set their tabindex
  var element;
  var elementx = $("#" + page).find(":input, .ui-icon-d-check, .ui-icon-check");
  if (elementLog) console.log("# elementx: " + elementx.length);
  elementCur = 0;
  $(elementx).each(function () {
    element = $(this)[0];
    if (element.style.display !== "none" && (element.disabled === undefined || element.disabled === false)) { // divs (for buttons) cannot be disabled but might be undefined (which is OK)
      element.tabIndex = elementCur + 1;
      if (elementLog) console.log("element #:" + elementCur + ", id:" + element.id + ", tab:" + element.tabIndex);
      elementCur++;
      elements.push(element.id);
    }
  });
  elementMax = elements.length - 1;

  if (elementLog) { console.log("elements str:0, end:" + elementMax); } // element log
}


