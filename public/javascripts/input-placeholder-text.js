/*

Project:	Input Placeholder Text
Title:		Automatic population of form fields with contents of title attributes
Created:	13 August 2005 by Jon Gibbins (aka dotjay)
Modified:	13 November 2006 by Jon Gibbins (aka dotjay)


Potential additions:

Add in handling of default text if an initial value is detected (line 60, line 93, etc) using something like:
if (!el.defaultValue) continue;
el.onfocus = function() {
	if (this.value == this.defaultValue) this.value = "";
}
el.onblur = function() {
	if (this.value == "") this.value = this.defaultValue;
}

Notes:

Add the following classes to text inputs or textareas to get the desired behaviour:

auto-select
	Will pre-populate the input with the title attribute and select the text when it receives focus.

auto-clear
	Will pre-populate the input with the title attribute and clear the text when it receives focus.
	Note: if auto-select and auto-clear are set, auto-select takes precedence.

populate
	Will just populate the input with the title attribute.

*/

window.onload = function () {

	if (!document.getElementsByTagName) return true;

	ourForms = document.getElementsByTagName('form');

	// go through each form
	var numForms = ourForms.length;
	for (var i=0;i<numForms;i++) {

		// go through each form element
		var numFormElements = ourForms[i].elements.length;
		for (var j=0;j<numFormElements;j++) {

			var el = ourForms[i].elements[j];

			// ignore submit buttons
			if (el.type == "submit") continue;

			// if we got a text type input
			if (el.type == "text") {
				// only populate if we want it to
				// note: might want title attribute but no pre-population of inputs
				var ourClassName = el.className;
				if (ourClassName.match('auto-select') || ourClassName.match('auto-clear') || ourClassName.match('populate')) {
					// only populate if empty
					if (el.value == '') el.value = el.title;
				}

				// add auto select if class contains auto-select
				// note: else if below so auto-select takes precedence (assuming select is better than clear)
				if (el.className.match('auto-select')) {
					el.onfocus = function () {
						if (this.value == this.title) this.select();
					}
					if (el.captureEvents) el.captureEvents(Event.FOCUS);
				}

				// add auto clear if class contains auto-clear
				else if (el.className.match('auto-clear')) {
					el.onfocus = function () {
						if (this.value == this.title) this.value = '';
					}
					if (el.captureEvents) el.captureEvents(Event.FOCUS);

					el.onblur = function () {
						if (this.value == '') this.value = this.title;
					}
					if (el.captureEvents) el.captureEvents(Event.BLUR);
				}
			}

			// if we got a textarea
			if (el.type == "textarea") {
				// only populate if we want it to
				// note: might want title attribute but no pre-population of inputs
				var ourClassName = el.className;
				if (ourClassName.match('auto-select') || ourClassName.match('auto-clear') || ourClassName.match('populate')) {
					// only populate if empty
					if (el.value == '') el.value = el.title;
				}

				// add auto select if class contains auto-select
				if (el.className.match('auto-select')) {
					el.onfocus = function () {
						if (this.value == this.title) this.select();
					}
					if (el.captureEvents) el.captureEvents(Event.FOCUS);
				}

				// add auto clear if class contains auto-clear
				else if (el.className.match('auto-clear')) {
					el.onfocus = function () {
						if (this.value == this.title) this.value = '';
					}
					if (el.captureEvents) el.captureEvents(Event.FOCUS);

					el.onblur = function () {
						if (this.value == '') this.value = this.title;
					}
					if (el.captureEvents) el.captureEvents(Event.BLUR);
				}
			}

		}

	}

}
