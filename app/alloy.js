Alloy.Globals.Pi = require("Pi");

Alloy.Globals.colors = {
    mainMenuButtonBackground : "#0f0",
    mainMenuButtonText : "#000",
    mainMenuButtonBorder : "#000",
    mainMenuInfoText : "#f00",

    gameViewButtonBackground : "#0ff",
    gameViewButtonText : "#ff0",
    gameViewButtonFailBackground : "#f00",
    gameViewButtonSuccessBackground : "#0f0"
};

var APP = {
    // Custom recursive function to remove all children of a view and null everything one at a time
    releaseAllMemoryOfView : function(view) {
        // Getting the chilldren to null, then removing them from the view
        var childrenArray = view.getChildren();
        view.removeAllChildren();

        // Checking if each child has it's own children, recursing the function if they do and nulling them if not
        for (var i = 0,
            iLength = childrenArray.length; i < iLength; i++) {
            var secondChildrenArray = childrenArray[i].getChildren();

            // If the view contains children put it back into the function, else; kill the the view
            if (secondChildrenArray.length > 0) {
                APP.releaseAllMemoryOfView(childrenArray[i]);

            } else {
                childrenArray[i] = null;
            }
        }

        // Finally, null out the view that was passed into the function
        view = null;
    }
}; 