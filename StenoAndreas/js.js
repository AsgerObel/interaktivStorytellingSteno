
const itemsContainer = document.getElementById('itemsContainer');
const message = document.getElementById('message');
const startOverBtn = document.getElementById('startOverBtn');
const infoOverlay = document.getElementById('infoOverlay');
const infoTitle = document.getElementById('infoTitle');
const infoImage = document.getElementById('infoImage');
const infoText = document.getElementById('infoText');
const endGameSound = document.getElementById('endGameSound');
const astronaut = document.getElementById('astronaut');
const rocket = document.getElementById('rocket');

let correctGuesses = 0;
let totalGuesses = 0;

const itemInfo = {
    1: { title: "Rumdragt", info: "Rumdragten beskytter astronauten mod kulde, varme og giver ilt, så de kan trække vejret i rummet", image: "images/spacesuit.png" },
    2: { title: "Mad", info: "Speciel mad, der holder længe og ikke svæver rundt i vægtløshed", image: "images/mad.png" },
    3: { title: "Ble", info: "Astronauter bruger bleer under rumvandringer, fordi der ikke er tid til toiletpauser i rummet", image: "images/ble.png" },
    4: { title: "Fodbold" },
    5: { title: "Guitar"},
    6: { title: "Mars" },
    7: { title: "Pas" },
    8: { title: "Tandbørste" },
    9: { title: "Teleskop" },
    10: { title: "Kaffe" }
};

function shuffleItems() {
    for (let i = itemsContainer.children.length; i >= 0; i--) {
        itemsContainer.appendChild(itemsContainer.children[Math.random() * i | 0]);
    }
}

function guessItem(item) {
    if (item.classList.contains('correct') || item.classList.contains('incorrect')) {
        return;
    }
    totalGuesses++;
    if (item.dataset.correct === "true") {
        item.classList.add('correct');
        correctGuesses++;
        showInfoBox(itemInfo[item.dataset.id]);
        animateAstronaut();
        if (correctGuesses === 3) {
            endGame(true);
        }
    } else {
        item.classList.add('incorrect');
    }
    updateMessage();
}

function updateMessage() {
    if (correctGuesses < 3) {
        message.textContent = `Du har fundet ${correctGuesses} ud af 3 rigtige ting`;
    }
}

function showInfoBox(info) {
    infoTitle.textContent = info.title;
    infoText.textContent = info.info;
    if (info.image) {
        infoImage.src = info.image;
        infoImage.style.display = 'block';
    } else {
        infoImage.style.display = 'none';
    }
    infoOverlay.style.display = 'flex';
}

function closeInfoBox() {
    infoOverlay.style.display = 'none';
}

function animateAstronaut() {
    astronaut.style.animation = 'none';
    astronaut.offsetHeight; // Trigger reflow
    astronaut.style.animation = 'float 3s ease-in-out infinite';
}

function launchRocket() {
    rocket.classList.add('launch');
}

function endGame(success) {
    if (success) {
        message.textContent = 'Godt gået! Andreas har nu sin rumdragt, rum-mad og bler, alt hvad han behøver til rejsen!';
        setTimeout(() => {
            endGameSound.play().catch(error => console.log('Audio playback failed:', error));
        }, 2000);
        setTimeout(launchRocket, 3000);
    } else {
        message.textContent = `Spillet er slut! Du fandt ${correctGuesses} ud af 3 rigtige ting.`;
    }
    disableAllItems();
}

function disableAllItems() {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.style.pointerEvents = 'none';
        if (!item.classList.contains('correct')) {
            item.classList.add('incorrect');
        }
    });
}

function initializeGame() {
    correctGuesses = 0;
    totalGuesses = 0;
    message.textContent = '';
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.classList.remove('correct', 'incorrect');
        item.style.pointerEvents = 'auto';
    });
    shuffleItems();
    rocket.classList.remove('launch');
    endGameSound.load();
}

itemsContainer.addEventListener('click', function(e) {
    if (e.target.closest('.item')) {
        guessItem(e.target.closest('.item'));
    }
});

startOverBtn.addEventListener('click', initializeGame);

initializeGame();