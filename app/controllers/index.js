(function init() {
	addEventListeners();
	
	$.mainMenuWin.open();
})();

function addEventListeners() {
	$.normalModeView.addEventListener("click", function(e){
		alert("Start Normal mode");
	});
	
	$.unlimitedModeView.addEventListener("click", function(e){
		alert("Start Unlimited mode");
	});
	
	$.highscoresView.addEventListener("click", function(e){
		alert("Open Highscores screen");
	});
	
	$.howToPlayView.addEventListener("click", function(e){
		alert("Open How to Play screen");
	});
}