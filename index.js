//Need to make a deck
import {Card, Deck} from './deck.js';

let newGame = document.getElementById("new game");
let debugGame = document.getElementById("debug game");
// let C1 = document.getElementById("c1");
let c_hand = [document.getElementById("c1"), 
                document.getElementById("c2"),
                document.getElementById("c3"),
                document.getElementById("c4"),
                document.getElementById("c5"),
            ];
    
let P1 = document.getElementById("p1");
let p_hand = [document.getElementById("p1"), 
                document.getElementById("p2"),
                document.getElementById("p3"),
                document.getElementById("p4"),
                document.getElementById("p5"),
            ];

let computer_purse = document.getElementById("computer_purse");
let player_purse = document.getElementById("player_purse");
let game_pot = document.getElementById("pot");

//class gamestate
let game;
class gamestate{
    constructor(computerHand, playerHand){
        this.computerHand = computerHand;
        this.playerHand = playerHand;
        this.pot = 0;
        this.turn = 0; //0 = player, 1 = computer
        this.computerPurse = 1000;
        this.playerPurse = 1000;
        this.round = 0;
        this.hands = 0; //This will which hand the game is on, there's only 2 hands 1st, 2nd, 0, 1, then the game ends.
    }
    get all(){
        console.log("Computer Hand");
        console.log(this.computerHand);
        console.log("Player Hand");
        console.log(this.playerHand);
    }
    get getcomputerHand(){
        return this.computerHand;
    }
    get getplayerHand(){
        return this.playerHand;
    }
}

//class playerstate

//class computerstate

//DOM

const render = () =>{
    
    //Render computer hand
    for(let i = 0; i<5 ;i++){
        c_hand[i].innerHTML = '';
        let elem = document.createElement("img");
        let source1 = game.getcomputerHand[i].imageLink;
        elem.setAttribute("src","./images/" + source1);
        c_hand[i].appendChild(elem);
    }
    
    //Render palyer hand
    for(let i = 0; i<5 ;i++){
        p_hand[i].innerHTML = '';
        let elem = document.createElement("img");
        let source1 = game.getplayerHand[i].imageLink;
        elem.setAttribute("src","./images/" + source1);
        p_hand[i].appendChild(elem);
    }

    // Render Pot

    // Render Player Purse
    computer_purse.innerHTML = '';
    let elemCP = document.createElement("p");
    elemCP.textContent = "Computer Purse: " +game.computerPurse;
    computer_purse.appendChild(elemCP);

    // render Computer Purse
    player_purse.innerHTML = '';
    let elemPP = document.createElement("p");
    elemPP.textContent = "Computer Purse: " + game.playerPurse;
    player_purse.appendChild(elemPP);

    // render pot
    game_pot.innerHTML = '';
    let elemPot = document.createElement("p");
    elemPot.textContent = "Pot size: " + game.pot;
    game_pot.appendChild(elemPot);


}

// This is where we init a new game, by making a deck 
const initNewGame = () => {
    console.log("New Game Button Clicked");
    let newDeck = new Deck();
    newDeck.shuffle();

    let computerhand = [];
    let playerHand = [];
    for (let i = 0; i < 5; i++){
        computerhand.push(newDeck.deal());
        playerHand.push(newDeck.deal());
    }
    console.log(computerhand);
    console.log(playerHand);
    game = new gamestate(computerhand, playerHand);
    render();

}

const getData=()=>{
    game.all;
}

newGame.addEventListener("click", initNewGame);
debugGame.addEventListener("click", getData);