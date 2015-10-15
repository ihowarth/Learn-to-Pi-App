// 0 lives = infinite
function startGame(numberOfLives) {
    var gameView = Alloy.createController("gameView", {
        closeView : closeView,
        numberOfLives : numberOfLives
    }).getView();

    function closeView() {
        $.mainMenuWin.remove(gameView);
        APP.releaseAllMemoryOfView(gameView);
    }


    $.mainMenuWin.add(gameView);
}

function openHighscoresScreen() {
    var highscoresView = Alloy.createController("highscoresView", {
        closeView : closeView
    }).getView();

    function closeView() {
        $.mainMenuWin.remove(highscoresView);
        APP.releaseAllMemoryOfView(highscoresView);
    }


    $.mainMenuWin.add(highscoresView);
}

function openHowToPlayScreen() {
    var howToPlayView = Alloy.createController("howToPlayView", {
        closeView : closeView
    }).getView();

    function closeView() {
        $.mainMenuWin.remove(howToPlayView);
        APP.releaseAllMemoryOfView(howToPlayView);
    }


    $.mainMenuWin.add(howToPlayView);
}

function addEventListeners() {
    $.normalModeView.addEventListener("click", function(e) {
        startGame(3);
    });

    $.unlimitedModeView.addEventListener("click", function(e) {
        startGame(0);
    });

    $.highscoresView.addEventListener("click", function(e) {
        openHighscoresScreen();
    });

    $.howToPlayView.addEventListener("click", function(e) {
        openHowToPlayScreen();
    });
}

(function init() {
    addEventListeners();

    $.mainMenuWin.open();
})();