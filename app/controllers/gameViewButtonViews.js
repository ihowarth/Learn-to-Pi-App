var args = arguments[0] || {};

(function init() {
	// Custom number property so we can get it on clicks
	$.buttonView.number = args.number;
	$.numberLabel.text = args.number;
	
	// Check to make sure we align the 0 button like a numpad
	if (args.number === 0) {
		$.buttonView.left = "33.2%";
	}
})();