const playbutton = document.getElementById("playbutton");
const rulesbutton = document.getElementById('rulesbutton');
const gameContainer = document.getElementById("gamecontainer");
var gameButtons;
var dealerCards = [];
var playerCards = [];
var cardsChecked;

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

function extractPath(url) {
    const pathStart = url.lastIndexOf('/');
    return url.substring(pathStart - 6);
}

function makebuttons(classname) {
    gameButtons = document.getElementsByClassName(classname);
    attachButtonClickEvent();
};

function attachButtonClickEvent() {
    if (gameButtons.length > 0) {
        gameButtons[0].addEventListener("click", () => {
            var playerHand = document.getElementById('playerHand');
            let cardIsInArray;
            do {
                const card = getCard();
                const cardSrc = cardPath(card);
                cardIsInArray = false;
                for (let index = 0; index < playerCards.length; index++) {
                    if (extractPath(playerCards[index].src) === cardSrc) {
                        console.log(extractPath(playerCards[index].src))
                        cardIsInArray = true;
                        break;
                    }
                };
                
                if (!cardIsInArray) {
                    let img = document.createElement('img');
                    img.src = cardSrc;
                    img.alt = cardValues[card];
                    img.classList.add('player-card');
                    playerHand.appendChild(img);
                }
            } while (cardIsInArray);
            playerCardElements = document.querySelectorAll('.player-card');
            pushPlayerCard(playerCardElements);
            Check(dealerCards, playerCards);
        });

        gameButtons[1].addEventListener("click", () => {
            var dealerHand = document.getElementById('dealerHand');
            let dealerCardsValue = 0;
            dealerCards.forEach(card => {
                dealerCardsValue += Number(card.alt);
            })
            while (dealerCardsValue<17) {
                const card = getCard();
                const cardSrc = cardPath(card);
                cardIsInArray = false;
                for (let index = 0; index < dealerCards.length; index++) {
                    if (extractPath(dealerCards[index].src) === cardSrc) {
                        console.log(extractPath(dealerCards[index].src))
                        cardIsInArray = true;
                        break;
                    }
                };
                
                if (!cardIsInArray) {
                    let img = document.createElement('img');
                    img.src = cardSrc;
                    img.alt = cardValues[card];
                    img.classList.add('dealer-card');
                    dealerHand.appendChild(img);

                    dealerCardElements = document.querySelectorAll('.dealer-card');
                    pushDealerCard(dealerCardElements);

                    dealerCards.forEach(card => {
                        dealerCardsValue += Number(card.alt);
                    })
                }
            }

            gameButtons[0].disabled = true;
            gameButtons[1].disabled = true;

            dc2.src = cardValues[dc2_val];

            Check(dealerCards, playerCards);
            if (!cardsChecked) {
                Check_stand(dealerCards, playerCards);
            }
           
        });
    }
}

function ace(cardStack) {
        cardStack.forEach(card => {
            if (card.alt == '11') {
                card.alt = '1'
                console.log(card.alt)
            };
        });
}

function Check(dealerCards, playerCards) {
    let playerCardsValue = 0;
    let dealerCardsValue = 0;
    cardsChecked = false;
    gameButtons[0].disabled = true;
    gameButtons[1].disabled = true;
    dealerCards.forEach(card => {
        dealerCardsValue += Number(card.alt);
    });
    playerCards.forEach(card => {
        playerCardsValue += Number(card.alt);
    });

    if (dealerCardsValue>21) {
        ace(dealerCards);
        dealerCardsValue = 0;
        dealerCards.forEach(card => {
            dealerCardsValue += Number(card.alt);
        });
    }
    if (playerCardsValue>21) {
        ace(playerCards);
        playerCardsValue = 0;
        playerCards.forEach(card => {
            playerCardsValue += Number(card.alt);
        });
    }

    console.log(dealerCardsValue, playerCardsValue)
    if (playerCardsValue == 21 && dealerCardsValue == 21) {
        dc2.src = cardPath(dc2_val);
        cardsChecked = true;
        setTimeout(function() {
            window.alert("GAME DRAW!! Split the gamble");
            location.reload();
        }, 5000);
    } else if (playerCardsValue == 21) {
        dc2.src = cardPath(dc2_val);
        cardsChecked = true;
        setTimeout(function() {
            window.alert("YOU WIN!! It's a BLACKJACK");
            location.reload();
        }, 5000);
    } else if (dealerCardsValue == 21) {
        dc2.src = cardPath(dc2_val);
        cardsChecked = true;
        setTimeout(function() {
            window.alert("YOU LOSE!! Blackjack for the dealer");
            location.reload();
        }, 5000);
    } else if (playerCardsValue > 21) {
        dc2.src = cardPath(dc2_val);
        cardsChecked = true;
        console.log(playerCards);
        setTimeout(function() {
            window.alert("YOU LOSE!! BUSTED your hand!");
            location.reload();
        }, 5000);
    } else if (dealerCardsValue > 21) {
        dc2.src = cardPath(dc2_val);
        cardsChecked = true;
        setTimeout(function() {
            window.alert("YOU WIN!! The DEALER BUSTED");
            location.reload();
        }, 5000);
    } else {
        gameButtons[0].disabled = false;
        gameButtons[1].disabled = false;
        cardsChecked = false;
    }

}

function Check_stand(dealerCards, playerCards) {
    let playerCardsValue = 0;
    let dealerCardsValue = 0;
    dc2.src = cardPath(dc2_val);

    dealerCards.forEach(card => {
        dealerCardsValue += Number(card.alt);
    });
    playerCards.forEach(card => {
        playerCardsValue += Number(card.alt);
    });

    console.log(dealerCardsValue, playerCardsValue)

    if (21-dealerCardsValue<21-playerCardsValue){
        setTimeout(function() {
            window.alert("YOU LOSE!! The DEALER beats you");
            location.reload();
        }, 5000);
    } else if (21-dealerCardsValue>21-playerCardsValue) {
        setTimeout(function() {
            window.alert("YOU WIN!! You beat the DEALER");
            location.reload();
        }, 5000);
    } else {
        setTimeout(function() {
            window.alert("ITS A DRAW!!!");
            location.reload();
        }, 5000); 
    }


}

function pushDealerCard(dealerCardElements) {
    dealerCardElements.forEach(cardElement => {
        const isUnique = !dealerCards.some(card => card.src === cardElement.src);

        if (isUnique) {
            dealerCards.push({
                element: cardElement,
                src: cardElement.src,
                alt: cardElement.alt
            })
        }
    });
}

function pushPlayerCard(playerCardElements) {
    playerCardElements.forEach(cardElement => {
        const isUnique = !playerCards.some(card => card.src === cardElement.src);

        if (isUnique) {
            playerCards.push({
                element: cardElement,
                class: cardElement.class,
                src: cardElement.src,
                alt: cardElement.alt
            })
        }
    });
}

rulesbutton.addEventListener("click", () => {
    window.location.href = "https://bicyclecards.com/how-to-play/blackjack/"
})

playbutton.addEventListener("click", () => {
    body  = document.body;
    body.style.height = (body.style.height === 'auto') ? '200px' : 'auto';
    playbutton.remove();
    document.getElementById('pbdiv').remove();
    gameContainer.innerHTML = `
    <div class="card">
        <h1>Dealer's Hand</h1>
        <div id='dealerHand' class="dealer_hand">
            <img class='dealer-card' id ='dc1' src="" alt="Dealer's card 1">
            <img class='dealer-card' id ='dc2' src="Images/card_back.png" width="224" height="312" alt="Dealer's card 2">
        </div>
        <h1>Player's Hand</h1>
        <div id='playerHand' class="player_hand">
            <img class='player-card' id ='pc1' src="" alt="Player's card 1">
            <img class='player-card' id ='pc2' src="" alt="Player's card 2">
        </div>
    </div>
    <div class="gamebuttons">
        <button class='button-78' role='button'>HIT</button>
        <button class='button-78' role='button'>STAND</button>
    </div>
    `;

    const dc1 = document.getElementById('dc1')
    var dc2 = document.getElementById('dc2')
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

    pc1.src = cardPath(pc1_val);
    pc2.src = cardPath(pc2_val);

    makebuttons('button-78');

    dealerCardElements = document.querySelectorAll('.dealer-card');
    pushDealerCard(dealerCardElements);

    playerCardElements = document.querySelectorAll('.player-card');
    pushPlayerCard(playerCardElements);

    Check(dealerCards, playerCards);
});
