// Variables to track the game
let tacoCount = 0;
let hasDoubleClick = false;
let hasTripleClick = false;
let hasAutoMaker = false;
let autoMakerRunning = false;
let autoMakerInterval;

// Get HTML elements
let tacoCountDisplay = document.getElementById("taco-count");
let tacoButton = document.getElementById("taco-button");
let doubleClickButton = document.getElementById("double-click-button");
let tripleClickButton = document.getElementById("triple-click-button");
let autoMakerButton = document.getElementById("auto-maker-button");

// Function to update what shows on screen
function updateTacoDisplay() {
    tacoCountDisplay.innerText = tacoCount;
}

// function of the plus one numbers floating in screen
function showFloatingNumber(tacosEarned) {
    let floatingDiv = document.createElement("div");
    floatingDiv.classList.add("floating-number");
    floatingDiv.innerText = "+" + tacosEarned + " 🌮";
    
    let tacoRect = tacoButton.getBoundingClientRect();
    let randomX = Math.random() * 200 - 100;
    let randomY = Math.random() * 200 - 100;
    
    floatingDiv.style.left = (tacoRect.left + tacoRect.width/2 + randomX) + "px";
    floatingDiv.style.top = (tacoRect.top + tacoRect.height/2 + randomY) + "px";
    
    document.body.appendChild(floatingDiv);
    
    setTimeout(function() {
        document.body.removeChild(floatingDiv);
    }, 500);
}

// Function that runs when taco is clicked
function clickTaco() {
    let tacosToAdd = 1;
    
    if (hasDoubleClick === true) {
        tacosToAdd = tacosToAdd + 1;
    }
    
    if (hasTripleClick === true) {
        tacosToAdd = tacosToAdd + 3;
    }
    
    tacoCount = tacoCount + tacosToAdd;
    updateTacoDisplay();
    showFloatingNumber(tacosToAdd);
}

function buyDoubleClick() {
    if (tacoCount >= 50 && hasDoubleClick === false) {
        tacoCount = tacoCount - 50;
        hasDoubleClick = true;
        updateTacoDisplay();
        
        doubleClickButton.style.display = "none";
        tripleClickButton.style.display = "inline-block";
    }
}

function buyTripleClick() {
    if (tacoCount >= 750 && hasTripleClick === false) {
        tacoCount = tacoCount - 750;
        hasTripleClick = true;
        updateTacoDisplay();
        
        tripleClickButton.style.display = "none";
    }
}

// FIXED: Added the missing closing brace
function startAutoMaker() {
    if (hasAutoMaker === true && autoMakerRunning === true) {
        autoMakerInterval = setInterval(function() {
            tacoCount = tacoCount + 3;
            updateTacoDisplay();
            showFloatingNumber(3);
        }, 500);
    }
} // <-- This closing brace was missing!

function stopAutoMaker() {
    clearInterval(autoMakerInterval);
}

// FIXED: This function now handles both buying AND toggling
function toggleAutoMaker() {
    // If they don't have it yet, try to buy it
    if (hasAutoMaker === false) {
        if (tacoCount >= 1000) {
            tacoCount = tacoCount - 1000;
            hasAutoMaker = true;
            autoMakerRunning = true;
            updateTacoDisplay();
            startAutoMaker();
            autoMakerButton.innerText = "Turn Auto Maker OFF";
        }
    } else {
        // They already have it, so toggle on/off
        if (autoMakerRunning === true) {
            autoMakerRunning = false;
            stopAutoMaker();
            autoMakerButton.innerText = "Turn Auto Maker ON";
        } else {
            autoMakerRunning = true;
            startAutoMaker();
            autoMakerButton.innerText = "Turn Auto Maker OFF";
        }
    }
}

// Event listeners
tacoButton.addEventListener("click", clickTaco);
doubleClickButton.addEventListener("click", buyDoubleClick);
tripleClickButton.addEventListener("click", buyTripleClick);
autoMakerButton.addEventListener("click", toggleAutoMaker); // <-- FIXED: Now calls toggleAutoMaker

