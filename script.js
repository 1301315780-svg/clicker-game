// Variables to track the game
let tacoCount = 0;
let hasDoubleClick = false;
let hasTripleClick = false;

// Get HTML elements
let tacoCountDisplay = document.getElementById("taco-count");
let tacoButton = document.getElementById("taco-button");
let doubleClickButton = document.getElementById("double-click-button");
let tripleClickButton = document.getElementById("triple-click-button");

// Function to update what shows on screen
function updateTacoDisplay() {
    tacoCountDisplay.innerText = tacoCount;
}

// Function that runs when taco is clicked
function clickTaco() {
    if (hasDoubleClick === true) {
        tacoCount = tacoCount + 2;
    } else {
        tacoCount = tacoCount + 1;
    }
    updateTacoDisplay();
}

function buyDoubleClick() {
    if (tacoCount >= 50 && hasDoubleClick === false) {
        tacoCount = tacoCount - 50;
        hasDoubleClick = true;
        updateTacoDisplay();
        
        // Hide double click button and show triple click button
        doubleClickButton.style.display = "none";
        tripleClickButton.style.display = "inline-block";
    }
}

function buyTripleClick() {
    if (tacoCount >= 750 && hasTripleClick === false) {
        tacoCount = tacoCount - 750;
        hasTripleClick = true;
        updateTacoDisplay();
        
        // Hide triple click button
        tripleClickButton.style.display = "none";
    }
}



// Make the taco clickable
tacoButton.addEventListener("click", clickTaco);
doubleClickButton.addEventListener("click", buyDoubleClick);
