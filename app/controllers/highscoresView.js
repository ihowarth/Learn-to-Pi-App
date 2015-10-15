var args = arguments[0] || {};

function closeView() {
	$.closeLabel.removeEventListener("click", closeView);
	args.closeView();
}

function addEventListeners() {
	$.closeLabel.addEventListener("click", closeView);	
}

(function init() {
	addEventListeners();	
})();