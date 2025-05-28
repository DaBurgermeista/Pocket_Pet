
// Create our pet object
const pet = {
    hunger: 100,
    energy: 100,
    mood: 100,
};

// On document load...
document.addEventListener("DOMContentLoaded", () => {
    renderStats();

    const info = document.getElementById('info');
    const buttons = document.querySelectorAll('#interactions button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            info.textContent = button.dataset.info;
            info.style.opacity = 1;
        });

        button.addEventListener('mouseleave', () => {
            info.style.opacity = 0;
        });
    });

    // Starts stat decay
    setInterval(statDecay, 1000);
    // Welcome's the player
    startGame();
});

function startGame(){
    sendInfo("Hello, friend!");
}

function sendInfo(message) {
    const info = document.getElementById('info');
    
    info.textContent = message;
    info.style.opacity = 1;

    // Message will fade after 5 seconds.
    setTimeout(() => {
        info.style.opacity = 0;
    }, 5000);
}

function statDecay(){
    pet.hunger -= 1;
    if (pet.hunger < 0) {
        pet.hunger = 0;
    }

    pet.energy -= Math.random() < 0.33 ? 1 : 0;
    if (pet.energy < 0){
        pet.energy = 0;
    }

    if (Math.random() < 0.5){
        pet.mood -= 1;
    }
    // If hunger or energy are low, lose mood faster.
    if (pet.hunger < 25 || pet.energy < 25){
        pet.mood -= 1;
    }
    if (pet.mood < 0) {
        pet.mood = 0;
    }

    renderStats();
}

function renderStats() {
    // Assign HTML elements to variables
    const hungerStat = document.getElementById('hunger-value');
    const energyStat = document.getElementById('energy-value');
    const moodStat = document.getElementById('mood-value');

    //TODO: #1 Have values go red when they get low.
    hungerStat.textContent = pet.hunger;
    energyStat.textContent = pet.energy;
    moodStat.textContent = pet.mood;
}

// Feed Button Listener
document.getElementById('feed-btn').addEventListener('click', () => {
    console.log("Clicked Feed");
    pet.hunger += 10;
    if (pet.hunger > 100){
        pet.hunger = 100;
    }
    renderStats();
});

// Sleep Button Listener
document.getElementById('sleep-btn').addEventListener('click', () => {
    pet.energy += 15;
    if (pet.energy > 100) {
        pet.energy = 100;
    }

    pet.hunger -= 5;
    if (pet.hunger < 0) {
        pet.hunger = 0;
    }
    renderStats();
});

// Play Button Listener
document.getElementById('play-btn').addEventListener('click', () => {
    pet.mood += 10;
    if (pet.mood > 100) {
        pet.mood = 100;
    }

    pet.energy -= 10;
    if (pet.energy < 0) {
        pet.energy = 0;
    }
    renderStats();
});

// Clean Button Listener
document.getElementById('clean-btn').addEventListener('click', () => {
    pet.mood += 5;
    if (pet.mood > 100) {
        pet.mood = 100;
    }
    renderStats();
});