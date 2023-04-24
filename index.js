//Need to make a deck
import {Card, Deck} from './deck.js';

let newGame = document.getElementById("new game");
let debugGame = document.getElementById("debug game");
let C1 = document.getElementById("div3");

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
}

//class playerstate

//class computerstate

//DOM

const render = () =>{
    let elem = document.createElement("img");
    let source1 = game.getcomputerHand[0].imageLink;
    console.log(source1);
    elem.setAttribute("src","./images/" + source1);

    console.log(C1);
    C1.appendChild(elem);
    //get image
    // let source1 = game.getcomputerHand[0].imageLink;
    // console.log(source1);
    // elem.attributes("src","./images" + source1);
    // C1.appendChild(elem);
    

}


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