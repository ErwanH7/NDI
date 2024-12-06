// Simulated status levels
let oxygenLevel = 50;
let oxygenCpt = 0;
let temperatureLevel = 190;
let temperatureCpt = 0;
let pollutionLevel = 190;
let pollutionCpt = 0;
let saturation = 15; // Saturation initiale
let pollutionItems = []; // Stock des tâches de pollution
let pollutionCount = 7; // Nombre initial de tâches

const maxOxygen = 190; // Maximum de 100%
const oxygenBar = document.getElementById("oxygen-bar");
const temperatureBar = document.getElementById("temperature-bar");
const pollutionBar = document.getElementById("pollution-bar");
const avatar = document.getElementById('avatar');
const image = document.querySelector('#avatar img');
const cloudArea = document.getElementById("cloud-area");
const pollutionOverlay = document.getElementById("pollution-overlay");


function updateBars() {
    oxygenBar.style.width = `${oxygenLevel}%`;
    temperatureBar.style.width = `${temperatureLevel}%`;
    pollutionBar.style.width = `${pollutionLevel}%`;
}

function generatePollution() {
    for (let i = 0; i < pollutionCount; i++) {
        const pollutionItem = document.createElement("div");
        pollutionItem.classList.add("pollution-item");

        // Position aléatoire sur l'avatar
        pollutionItem.style.top = `${Math.random() * 50 + 10}%`; // Entre 10% et 90% de hauteur
        pollutionItem.style.left = `${Math.random() * 20 + 40}%`; // Entre 10% et 90% de largeur

        pollutionOverlay.appendChild(pollutionItem);
        pollutionItems.push(pollutionItem);
    }
}

function cleanPollution() {
    if (pollutionItems.length > 0) {
        const pollutionItem = pollutionItems.pop(); // Prend la dernière tâche
        pollutionItem.classList.add("hidden"); // Applique une animation de disparition

        // Supprime complètement l'élément après l'animation
        setTimeout(() => pollutionItem.remove(), 300);
    }
}

generatePollution();

function showPopup(action) {
    let message;
    switch (action) {
        case "lungs":
            if (oxygenCpt >= 7) {
                break;
            }
            oxygenLevel += 20;

            let glowSize = oxygenLevel * 1.2    ;  // Plus l'oxygène, plus l'aura est grande
            let glowIntensity = oxygenLevel / 500;  // L'intensité de la lueur augmente

            avatar.style.boxShadow = `0 0 ${glowSize}px ${glowSize / 2}px rgba(255, 223, 0, ${glowIntensity})`;

            
            /* message = "Vous avez encouragé les énergies renouvelables. Les poumons de l'océan respirent mieux ! 🌬️"; */
            oxygenCpt += 1;
            break;

        case "stomach":
            if (pollutionCpt >= 7) {
                break;
            }

            cleanPollution()

            pollutionLevel -= 20;
            /* message = "Vous avez nettoyé l'estomac de l'océan. Moins de plastique, plus de vie marine ! 🦈"; */
            pollutionCpt += 1;
            break;

        case "heart":
            if (temperatureCpt >= 7) {
                break;
            }
            temperatureLevel -= 20;
            /* message = "Ion est autiste ! ❤️"; */
            temperatureCpt += 1;
            saturation = Math.max(saturation - 2, 0); // Empêcher saturation négative
            image.style.filter = `saturate(${saturation})`;
            break;

        default:
            message = "Action non reconnue.";
    }
    /* alert(message) */
    updateBars();
}

// Attach event listeners
document.getElementById("lungs-btn").addEventListener("click", () => showPopup("lungs"));
document.getElementById("stomach-btn").addEventListener("click", () => showPopup("stomach"));
document.getElementById("heart-btn").addEventListener("click", () => showPopup("heart"));

// Initialize bars
updateBars();
