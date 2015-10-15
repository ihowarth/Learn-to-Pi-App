var args = arguments[0] || {};

var amountOfLives = args.numberOfLives,
    livesImages = [];

var turn = 0,
    currentDigit = 0,
    sequenceDigitsAmount = 0;
    
var currentScore = 0,
	longestChain = 0;

function removeLife() {
    amountOfLives--;

    livesImages[amountOfLives].backgroundColor = "blue";

	// Once a life has been removed show the user the sequence again, unless they are dead
    if (amountOfLives === 0) {
        //TODO - DIE
        alert("DEAD\n\nScore: " + currentScore + "\n\nLongest Chain: " + longestChain);
    } else {
    	showSequence();
    }
}

function showSequence() {
	$.sequenceDisplayLabel.text = Alloy.Globals.Pi.getPiDigit(sequenceDigitsAmount);
	
	sequenceDigitsAmount++;
	
	setTimeout(function(e) {
		if (sequenceDigitsAmount <= turn) {
			showSequence();
		} else {
			sequenceDigitsAmount = 0;
			$.sequenceDisplayLabel.text = "";
		}
	}, 500);
}

function handleFailure(clickedNumberView) {
    clickedNumberView.backgroundColor = Alloy.Globals.colors.gameViewButtonFailBackground;

    currentDigit = 0;
    
    // If game is not Infinite mode remove a life, otherwise just continue form the beginning
    if (amountOfLives > 0) {
        removeLife();
    } else {
    	showSequence();
    }
    
    clickedNumberView.backgroundColor = Alloy.Globals.colors.gameViewButtonBackground;
}

function handleSuccess(clickedNumberView) {
	// +1 on currentDigit because it starts at 0
	currentScore = currentScore + (currentDigit + 1);
	$.scoreLabel.text = currentScore;
	//Highscore check
	
    if (currentDigit === turn) {
        clickedNumberView.backgroundColor = Alloy.Globals.colors.gameViewButtonSuccessBackground;
        turn++;
        currentDigit = 0;
        showSequence();
        clickedNumberView.backgroundColor = Alloy.Globals.colors.gameViewButtonBackground;
        
        if (turn > longestChain) {
        	longestChain = turn;
        	//Highscore chain Check	
        }
    } else {
        currentDigit++;
        clickedNumberView.animate({
            backgroundColor : Alloy.Globals.colors.gameViewButtonSuccessBackground,
            autoreverse : true
        });
    }
}

function checkButtonClick(e) {
    if (e.source.number >= 0) {
        if (Alloy.Globals.Pi.getPiDigit(currentDigit) == e.source.number) {
            handleSuccess(e.source);
        } else {
            handleFailure(e.source);
        }
    }
}

function setLives() {
    if (amountOfLives > 0) {
        //TODO - Add imageView for infinite
        for (var i = 0; i < amountOfLives; i++) {
            var life = Ti.UI.createView({
                left : 10,
                height : 20,
                width : 20,
                backgroundColor : "red"
            });

            livesImages.push(life);
            $.livesContainerView.add(life);
        }

    } else {
        //TODO - Add imageView for infinite
        $.livesContainerView.add(Ti.UI.createView({
            height : 20,
            width : 20,
            backgroundColor : "green"
        }));
    }
}

function setButtons() {
    for (var i = 1; i < 10; i++) {
        $.buttonsContainerView.add(Alloy.createController("gameViewButtonViews", {
            number : i
        }).getView());
    }

    $.buttonsContainerView.add(Alloy.createController("gameViewButtonViews", {
        number : 0
    }).getView());
}

function closeView() {
    $.closeLabel.removeEventListener("click", closeView);
    $.buttonsContainerView.removeEventListener("click", checkButtonClick);
    args.closeView();
}

function addEventListeners() {
    $.closeLabel.addEventListener("click", closeView);
    $.buttonsContainerView.addEventListener("click", checkButtonClick);
}

(function init() {
    addEventListeners();

    setButtons();
    setLives();
})();