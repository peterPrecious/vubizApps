// used for .net (similiar to $formManager.js)
// global variables for form management
var elementMax = 0, elementCur = 0, elements = []; // these are the tabbable form elements;

// log movement? true/false
var elementLog = true;
if (elementLog) console.log("starting...");

$(function () {
  $(document).on("keypress", function (e) { // Enter controller (e.which = 13)
    var element = this.activeElement;
    var elementId = element.id;
    var elementType = element.type;
    var elementCur = $.inArray(elementId, elements);

    if (e.which === 13 && elementType !== "textarea") { // process enter key except if inside a TextArea or on a button/div

      if (elementCur === elementMax) { // at last tabbable field
        if (elementType === "submit") {
          //         $("#" + elementId).trigger("click");
          //       else
          // e.preventDefault(); // ignore key (tab or enter)
        }
      } else {
        elementCur++; // point to next tabbable field
        if (elementLog) console.log("focus: #" + elements[elementCur]); // log
        $("#" + elements[elementCur])[0].focus();
      }

    }

  });


  $(document).on("keydown", function (e) { // Tab controller (e.which = 9)
    var elementId = this.activeElement.id;
    elementCur = $.inArray(elementId, elements);

    if (e.which === 9 && !e.shiftKey) { // tab
      if (elementCur === elementMax) { // at last tabbable field?
        e.preventDefault(); // ignore key (tab or enter)
      } else {
        elementCur++; // point to next tabbable field
      }
      if (elementLog) console.log("focus: #" + elements[elementCur]); // log
    }
    if (e.which === 9 && e.shiftKey) { // back tab
      if (elementCur === 0) { // at last tabbable field
        e.preventDefault(); // ignore key (tab or enter)
      } else {
        elementCur--; // point to next tabbable field
      }
      if (elementLog) console.log("focus: #" + elements[elementCur]); // log
    }
  });



});


function getFormElements(section) { // create an array of :input elements and anchors (for linkbuttons)
  var element;
  var elementx = $("#" + section).find(":input, a");
  if (elementLog) console.log("# elementx: " + elementx.length);
  elementCur = 0;
  elements = [];
  $(elementx).each(function () {
    element = $(this)[0];
    if (element.style.display !== "none" && element.tabIndex > 0) {
      if (elementLog) console.log(elementCur + ", " + element.id + ", " + element.type + ", " + element.tabIndex);
      elementCur++;
      elements.push(element.id);
    }
  });
  elementMax = elements.length - 1;
  if (elementLog) { console.log("elements str:0, end:" + elementMax); } // element log
}


// this disables form submission via Enter Key on text fields
function stopRKey(evt) {
  evt = evt ? evt : event ? event : null;
  var node = evt.target ? evt.target : evt.srcElement ? evt.srcElement : null;
  if (evt.keyCode === 13 && (node.type === "text" || node.type === "checkbox" || node.type === "password")) { return false; }
}
document.onkeypress = stopRKey;