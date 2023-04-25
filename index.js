//Need to make a deck
import {Card, Deck} from './deck.js';

let newGame = document.getElementById("new game");
let debugGame = document.getElementById("debug game");
// let buttons = document.getElementsByClassName("c_control");
// console.log(buttons);
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

let comp_func = [document.getElementById("c_bet"),
                document.getElementById("c_call"),
                document.getElementById("c_fold")
                ];
let player_func = [document.getElementById("p_bet"),
                document.getElementById("p_call"),
                document.getElementById("p_fold")
                ];


//class gamestate
let game;
let computer;
let player;

let betAmount = 20;

class gamestate{
    constructor(computerHand, playerHand){
        this.computerHand = computerHand;
        this.playerHand = playerHand;
        this.pot = 0;
        this.turn = 0; //0 = player, 1 = computer
        this.computerPurse = 1000;
        this.playerPurse = 1000;
        this.round = 0;
        this.series = 0; 
        /*
        0 = deal
        1 = pre-switch bet
        2 = switch option
        3 = post-switch bet
        4 = done
        */
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

class playerstate{
    constructor(deltCards, money){
        this.hand = deltCards;
        this.money = money;
        this.action = 0; //0 = bet, 1 = call, 2 = fold
        this.won = 0; //0
    }
}

class computerstate{
    constructor(deltCards, money){
        this.hand = deltCards;
        this.money = money;
        this.action = 0;
        this.won = 0;
    }
}

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

const ante = ()=>{
    let anteAmount = 10;

    if(player.money < anteAmount){
        // all in
        game.pot += player.money;
        player.money = 0;
        game.playerPurse = 0;
    }else{
        game.pot += 10
        player.money -= anteAmount;
        game.playerPurse -= anteAmount;
    }

    if(computer.money < anteAmount){
        // all in
        game.pot += computer.money;
        computer.money = 0;
        game.computerPurse;
    }else{
        game.pot += 10
        player.money -= anteAmount;
        game.computerPurse -=anteAmount;
    }
}

const hideComputerFunction = () =>{
    for(let element of comp_func){
        console.log({element});
        element.disabled = true;
    }
    for(let element of player_func){
        element.disabled = false;
    }
    //
}

const hidePlayerFunction = () =>{
    for(let element of player_func){
        element.disabled = true;
    }
    for(let element of comp_func){
        console.log({element});
        element.disabled = false;
    }
    game.turn = 1;
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
    computer = new computerstate(computerhand, game.computerPurse);
    player = new computerstate(playerHand, game.playerPurse);
    
    //Game logic starts here
    ante();
    render();
    let whoStart = Math.floor(Math.random() * 2); //0 = person starts, 1 = computer starts
    console.log("0 = player start", "1 = comp start ", whoStart);
    if(whoStart === 0){
        hideComputerFunction();
        game.turn = 0;
    } else{
        hidePlayerFunction();
        game.turn = 1;
    }
    //

}

const getData=()=>{
    game.all;
}

const bet=()=>{
    console.log("bet");
    //
}

const call=()=>{    
    console.log("call");
}

const fold=()=>{
    console.log("fold");
    console.log(game.turn);
    //if the current player fold other player take the pot and add to their purse
    if(game.turn == 0){
        //player fold
        game.computerPurse += game.pot;
        computer.money += game.pot;
    } else {
        game.playerPurse += game.pot;
        player.money += game.pot;
    }
    //Reset pot to zero
    game.pot = 0;
    render();
    ante();
    ///
    render();


}

newGame.addEventListener("click", initNewGame);
debugGame.addEventListener("click", getData);

comp_func[0].addEventListener("click", bet);
comp_func[1].addEventListener("click", call);
comp_func[2].addEventListener("click", fold);

player_func[0].addEventListener("click", bet);
player_func[1].addEventListener("click", call);
player_func[2].addEventListener("click", fold);