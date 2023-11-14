const playbutton = document.getElementById("playbutton");
const gameContainer = document.getElementById("gamecontainer");
var gameButtons;

const cardNames = [
    "heart_2", "heart_3", "heart_4", "heart_5", "heart_6", "heart_7", "heart_8", "heart_9", "heart_10",
    "heart_jack", "heart_queen", "heart_king", "heart_ace",
    "diamond_2", "diamond_3", "diamond_4", "diamond_5", "diamond_6", "diamond_7", "diamond_8", "diamond_9", "diamond_10",
    "diamond_jack", "diamond_queen", "diamond_king", "diamond_ace",
    "club_2", "club_3", "club_4", "club_5", "club_6", "club_7", "club_8", "club_9", "club_10",
    "club_jack", "club_queen", "club_king", "club_ace",
    "spade_2", "spade_3", "spade_4", "spade_5", "spade_6", "spade_7", "spade_8", "spade_9", "spade_10",
    "spade_jack", "spade_queen", "spade_king", "spade_ace"
];

const cardValues = {
    "heart_2": 2,
    "heart_3": 3,
    "heart_4": 4,
    "heart_5": 5,
    "heart_6": 6,
    "heart_7": 7,
    "heart_8": 8,
    "heart_9": 9,
    "heart_10": 10,
    "heart_jack": 10,
    "heart_queen": 10,
    "heart_king": 10,
    "heart_ace": 11,
    "diamond_2": 2,
    "diamond_3": 3,
    "diamond_4": 4,
    "diamond_5": 5,
    "diamond_6": 6,
    "diamond_7": 7,
    "diamond_8": 8,
    "diamond_9": 9,
    "diamond_10": 10,
    "diamond_jack": 10,
    "diamond_queen": 10,
    "diamond_king": 10,
    "diamond_ace": 11,
    "club_2": 2,
    "club_3": 3,
    "club_4": 4,
    "club_5": 5,
    "club_6": 6,
    "club_7": 7,
    "club_8": 8,
    "club_9": 9,
    "club_10": 10,
    "club_jack": 10,
    "club_queen": 10,
    "club_king": 10,
    "club_ace": 11,
    "spade_2": 2,
    "spade_3": 3,
    "spade_4": 4,
    "spade_5": 5,
    "spade_6": 6,
    "spade_7": 7,
    "spade_8": 8,
    "spade_9": 9,
    "spade_10": 10,
    "spade_jack": 10,
    "spade_queen": 10,
    "spade_king": 10,
    "spade_ace": 11
};


function getCard() {
    return cardNames[Math.floor(Math.random()*cardNames.length)];
}

function cardPath(cardName) {
    return "Images/"+cardName+".png";
}

function makebuttons(classname) {
    gameButtons = document.getElementsByClassName(classname);
    console.log(gameButtons);
    attachButtonClickEvent();
};

function attachButtonClickEvent() {
    if (gameButtons.length > 0) {
        gameButtons[0].addEventListener("click", () => {
            var playerHand = document.getElementById('playerHand');
            var img = document.createElement('img');
            const card = getCard();
            img.src = cardPath(card);
            img.alt = cardValues[card];
            playerHand.appendChild(img);
            console.log("runs");
        });
    }
}

function Check() {
    if (cardValues[dc1_val]+cardValues[dc2_val] === 21 && cardValues[pc1_val]+cardValues[pc2_val] === 21) {
        dc2.src = cardPath(dc2_val);
        setTimeout(function() {
            window.alert("GAME DRAW!! Split the gamble");
            location.reload();
        }, 5000);
    } else if (cardValues[pc1_val]+cardValues[pc2_val] === 21) {
        dc2.src = cardPath(dc2_val);
        setTimeout(function() {
            window.alert("YOU WIN!! It's a BLACKJACK");
            location.reload();
        }, 5000);
    } else if (cardValues[dc1_val]+cardValues[dc2_val] === 21) {
        dc2.src = cardPath(dc2_val);
        setTimeout(function() {
            window.alert("YOU LOSE!! Blackjack for the dealer");
            location.reload();
        }, 5000);
    };
}

playbutton.addEventListener("click", () => {
    playbutton.remove();
    gameContainer.innerHTML = `
    <div class="card">
        <h1>Dealer's Hand</h1>
        <div id='dealerHand' class="dealer_hand">
            <img id ='dc1' src="" alt="Dealer's card 1">
            <img id ='dc2' src="Images/card_back.png" width="224" height="312" alt="Dealer's card 2">
        </div>
        <h1>Player's Hand</h1>
        <div id='playerHand' class="player_hand">
            <img id ='pc1' src="" alt="Player's card 1">
            <img id ='pc2' src="" alt="Player's card 2">
        </div>
    </div>
    <div class="gamebuttons">
        <button class='button-78' role='button'>HIT</button>
        <button class='button-78' role='button'>STAND</button>
    </div>
    `;

    const dc1 = document.getElementById('dc1')
    const dc2 = document.getElementById('dc2')
    const pc1 = document.getElementById('pc1')
    const pc2 = document.getElementById('pc2') 

    dc1_val = getCard();
    dc2_val = getCard();
    pc1_val = getCard();
    pc2_val = getCard();

    dc1.alt = cardValues[dc1_val];
    dc2.alt = cardValues[dc2_val];
    pc1.alt = cardValues[pc1_val];
    pc2.alt = cardValues[pc2_val];

    dc1.src = cardPath(dc1_val);

    Check();

    pc1.src = cardPath(pc1_val);
    pc2.src = cardPath(pc2_val);

    makebuttons('button-78');
});
