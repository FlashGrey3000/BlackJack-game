const playbutton = document.getElementById("playbutton");
const gameContainer = document.getElementById("gamecontainer");

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

function assignCard() {
    return cardNames[Math.floor(Math.random()*cardNames.length)];
};

function cardPath(cardName) {
    return "Images/"+cardName+".png";
};

playbutton.addEventListener("click", () => {
    playbutton.remove();
    gameContainer.innerHTML = `
    <div class="card">
        <h1>Dealer's Hand</h1>
        <div class="dealer_hand">
            <img id ='dc1' src="" alt="Dealer's card 1">
            <img id ='dc2' src="Images/card_back.png" width="224" height="312" alt="Dealer's card 2">
        </div>
        <h1>Player's Hand</h1>
        <div class="player_hand">
            <img id ='pc1' src="" alt="Player's card 1">
            <img id ='pc2' src="" alt="Player's card 2">
        </div>
    </div>
    <div class="gamebuttons">
        <button class='button-78' role='button'>HIT</button>
        <button class='button-78' role='button'>STAND</button>
    </div>
    `;

    document.getElementById('dc1').src = cardPath(assignCard());
    //document.getElementById('dc2').src = cardPath(assignCard());
    document.getElementById('pc1').src = cardPath(assignCard());
    document.getElementById('pc2').src = cardPath(assignCard());
});
