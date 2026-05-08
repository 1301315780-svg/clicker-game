// ============================================
// VARIABLES - Game State Tracking
// ============================================

// Taco count
let tacoCount = 0;

// Click upgrade variables
let hasDoubleClick = false;
let hasTripleClick = false;

// Auto Maker variables
let hasAutoMaker = false;
let autoMakerRunning = false;
let autoMakerInterval;

// Factory worker variables
let hasFactory = false;
let workerCount = 0;
let hasFastWorker = false;
let hasAlienWorker = false;
let workerInterval;
let nextWorkerCost = 1000;


// ============================================
// HTML ELEMENTS - Getting References
// ============================================

// Display elements
let tacoCountDisplay = document.getElementById("taco-count");
let tacoButton = document.getElementById("taco-button");

// Click upgrade buttons
let doubleClickButton = document.getElementById("double-click-button");
let tripleClickButton = document.getElementById("triple-click-button");

// Auto maker button
let autoMakerButton = document.getElementById("auto-maker-button");

// Factory buttons
let tacoFactoryButton = document.getElementById("taco-factory-button");
let hireWorkerButton = document.getElementById("hire-worker-button");
let fastWorkerButton = document.getElementById("fast-worker-button");
let alienWorkerButton = document.getElementById("alien-worker-button");


// ============================================
// DISPLAY FUNCTIONS - Update Screen
// ============================================

function updateTacoDisplay() {
    tacoCountDisplay.innerText = tacoCount;
}

function updateWorkerDisplay() {
    let workerCountDisplay = document.getElementById("worker-count");
    workerCountDisplay.innerText = workerCount;
    
    // Update hire worker button cost
    hireWorkerButton.innerText = "Hire Worker (Cost: " + nextWorkerCost + " tacos)";
}


// ============================================
// FLOATING NUMBER FUNCTIONS - Visual Effects
// ============================================

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

function showWorkerFloatingNumber(tacosEarned, isAlien) {
    let floatingDiv = document.createElement("div");
    floatingDiv.classList.add("floating-number");
    
    // Use alien emoji if alien worker, otherwise use worker emoji
    let emoji = "👷";
    if (isAlien === true) {
        emoji = "👽";
    }
    
    floatingDiv.innerText = "+" + tacosEarned + " " + emoji + "🌮";
    
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


// ============================================
// CLICKING FUNCTIONS - Manual Taco Generation
// ============================================

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


// ============================================
// AUTO MAKER FUNCTIONS - Automatic Generation
// ============================================

function startAutoMaker() {
    if (hasAutoMaker === true && autoMakerRunning === true) {
        autoMakerInterval = setInterval(function() {
            tacoCount = tacoCount + 3;
            updateTacoDisplay();
            showFloatingNumber(3);
        }, 500);
    }
}

function stopAutoMaker() {
    clearInterval(autoMakerInterval);
}

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


// ============================================
// FACTORY WORKER FUNCTIONS - Worker System
// ============================================

function startWorkers() {
    // Stop any existing worker timer
    if (workerInterval) {
        clearInterval(workerInterval);
    }
    
    // Calculate how much each worker batch produces
    let tacosPerBatch = 5;  // Default: 5 tacos
    let timeInterval = 1000;  // Default: every 1 second
    
    // Check for Fast Worker upgrade
    if (hasFastWorker === true) {
        tacosPerBatch = 4;
        timeInterval = 500;  // 0.5 seconds
    }
    
    // Check for Alien Worker upgrade
    if (hasAlienWorker === true) {
        tacosPerBatch = 20;
        timeInterval = 1000;  // 1 second
    }
    
    // If BOTH upgrades (Fast + Alien)
    if (hasFastWorker === true && hasAlienWorker === true) {
        tacosPerBatch = 20;
        timeInterval = 500;  // 20 tacos every 0.5 seconds
    }
    
    // Calculate total production (tacos per batch × number of workers)
    let totalProduction = tacosPerBatch * workerCount;
    
    // Start the worker timer
    workerInterval = setInterval(function() {
        tacoCount = tacoCount + totalProduction;
        updateTacoDisplay();
        showWorkerFloatingNumber(totalProduction, hasAlienWorker);
    }, timeInterval);
}

function buyTacoFactory() {
    // Check if player has enough tacos and hasn't bought factory yet
    if (tacoCount >= 5000 && hasFactory === false) {
        // Take away 5000 tacos
        tacoCount = tacoCount - 5000;
        hasFactory = true;
        workerCount = 1;  // Start with 1 worker
        updateTacoDisplay();
        
        // Hide factory button, show worker buttons
        tacoFactoryButton.style.display = "none";
        hireWorkerButton.style.display = "inline-block";
        fastWorkerButton.style.display = "inline-block";
        alienWorkerButton.style.display = "inline-block";
        
        // Show worker info display
        let workerInfo = document.getElementById("worker-info");
        workerInfo.style.display = "block";
        
        // Update worker count display
        updateWorkerDisplay();
        
        // Start workers making tacos
        startWorkers();
    }
}

function hireWorker() {
    // Check if they have enough tacos and haven't reached max workers (10)
    if (tacoCount >= nextWorkerCost && workerCount < 10) {
        // Take away the cost
        tacoCount = tacoCount - nextWorkerCost;
        
        // Add a worker
        workerCount = workerCount + 1;
        
        // Increase cost for next worker
        nextWorkerCost = nextWorkerCost + 1000;
        
        updateTacoDisplay();
        updateWorkerDisplay();
        
        // Restart workers with new count
        startWorkers();
        
        // Hide button if at max workers
        if (workerCount >= 10) {
            hireWorkerButton.style.display = "none";
        }
    }
}

function buyFastWorker() {
    // Check if they have enough tacos and haven't bought it yet
    if (tacoCount >= 4000 && hasFastWorker === false) {
        tacoCount = tacoCount - 4000;
        hasFastWorker = true;
        updateTacoDisplay();
        
        // Hide the button
        fastWorkerButton.style.display = "none";
        
        // Restart workers with new speed
        startWorkers();
    }
}

function buyAlienWorker() {
    // Check if they have enough tacos and haven't bought it yet
    if (tacoCount >= 20000 && hasAlienWorker === false) {
        tacoCount = tacoCount - 20000;
        hasAlienWorker = true;
        updateTacoDisplay();
        
        // Hide the button
        alienWorkerButton.style.display = "none";
        
        // Restart workers with new production
        startWorkers();
    }
}


// ============================================
// EVENT LISTENERS - Connect Buttons to Functions
// ============================================

// Taco clicking
tacoButton.addEventListener("click", clickTaco);

// Click upgrades
doubleClickButton.addEventListener("click", buyDoubleClick);
tripleClickButton.addEventListener("click", buyTripleClick);

// Auto maker
autoMakerButton.addEventListener("click", toggleAutoMaker);

// Factory system
tacoFactoryButton.addEventListener("click", buyTacoFactory);
hireWorkerButton.addEventListener("click", hireWorker);
fastWorkerButton.addEventListener("click", buyFastWorker);
alienWorkerButton.addEventListener("click", buyAlienWorker);
