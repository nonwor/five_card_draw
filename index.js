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
    constructor(computerHand, playerHand, extraCards){
        this.computerHand = computerHand;
        this.playerHand = playerHand;
        this.extraCards = extraCards;
        this.pot = 0;
        this.turn = 0; //0 = player, 1 = computer
        this.computerPurse = 1000;
        this.playerPurse = 1000;
        this.round = 0;
        this.series = 0;
        /*
        0 = pre-switch bet
        1 = switch option
        2 = post-switch bet
        3 = Conclusion
        */
        this.start = 0; //0 = player start, 1 = computer start
    }
    get all(){
        console.log("Current turn: ", this.turn);
        console.log("Series: ", this.series);
    }
    get getcomputerHand(){
        return this.computerHand;
    }
    get getplayerHand(){
        return this.playerHand;
    }
    checkMoney(){
        let total = 2000;
        if((this.pot + this.computerPurse + this.playerPurse) != total){
            console.error("Total mone");
            console.error("Pot: ", this.pot);
            console.error("comp purse: ", this.computerPurse);
            console.error("player purse: ", this.playerPurse);
        }
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
    
    //Check game money
    game.checkMoney();
}

const ante = ()=>{
    let anteAmount = 10;

    if(player.money < anteAmount){
        // all in
        game.pot += player.money;
        player.money = 0;
        game.playerPurse = 0;
    }else{
        game.pot += anteAmount
        player.money -= anteAmount;
        game.playerPurse -= anteAmount;
    }

    if(computer.money < anteAmount){
        // all in
        game.pot += computer.money;
        computer.money = 0;
        game.computerPurse;
    }else{
        game.pot += anteAmount
        player.money -= anteAmount;
        game.computerPurse -=anteAmount;
    }
}

const hideComputerFunction = () =>{
    for(let element of comp_func){
        // console.log({element});
        element.disabled = true;
    }
    for(let element of player_func){
        element.disabled = false;
    }
    //
    game.turn = 0;
}

const hidePlayerFunction = () =>{
    for(let element of player_func){
        element.disabled = true;
    }
    for(let element of comp_func){
        // console.log({element});
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
    // console.log(computerhand);
    // console.log(playerHand);
    // console.log(newDeck.cards.length);
    game = new gamestate(computerhand, playerHand, newDeck);
    render();
    computer = new computerstate(computerhand, game.computerPurse);
    player = new playerstate(playerHand, game.playerPurse);
    
    //Game logic starts here
    ante();
    render();
    let whoStart = Math.floor(Math.random() * 2); //0 = person starts, 1 = computer starts
    // console.log("0 = player start", "1 = comp start ", whoStart);
    if(whoStart === 0){
        hideComputerFunction();
        game.turn = 0;
        game.start = 0;
    } else{
        hidePlayerFunction();
        game.turn = 1;
        game.start = 1;
    }
    //

}

const getData=()=>{
    game.all;
}

const bet=()=>{
    console.log("bet");
    //Bet action
    game.pot +=  betAmount;
    console.log(game.turn);
    
    if(game.turn == 0){
        player.money -= betAmount;
        game.playerPurse -= betAmount;
    } else {
        computer.money -= betAmount;
        game.computerPurse -= betAmount;
    }

    switchTurn();
    render();

    //Call action -> switch state
    //Update pot, and purse, -> get the game to next state

}

const call=()=>{    
    console.log("call");

    //Match bet, what sieries are we in?
    if(game.series===0){
        //Match bet & update money
        if(game.turn == 0){
            game.pot += betAmount;
            player.money -= betAmount;
            game.playerPurse -= betAmount;
        } else {
            game.pot += betAmount;
            computer.money -= betAmount;
            game.computerPurse -= betAmount;
        }
        render();
    }
    //Disable all buttons functions

    //popup switch functions for both player
    //click pop up icons to switch
    //pop up icon to be done

    //player call -> computer starts bet 

    //If we are at the end -> reveal cards -> look up hands. 
}

//After won or lose we deal a new hand
//New deck, shuffle, deal, 
const newHand =() =>{
    let newDeck = new Deck();
    newDeck.shuffle();

    let computerhand = [];
    let playerHand = [];
    for (let i = 0; i < 5; i++){
        computerhand.push(newDeck.deal());
        playerHand.push(newDeck.deal());
    }
    //Reset hands
    game.extraCards = newDeck;
    game.computerHand = computerhand;
    game.playerHand = playerHand;

    player.hand = playerHand;
    computer.hand = computerhand;

    //Switch who starts
    switchStart();
}

const switchStart = () =>{
    //This is player starts
    if(game.start == 0){
        hidePlayerFunction();
        game.turn = 1;
        game.start = 1;
    } else {
        hideComputerFunction();
        game.turn = 0;
        game.start = 0;
    }

}
const switchTurn=()=>{
    //player turn
    if(game.turn == 0){
        game.turn = 1;
        hidePlayerFunction();
    } else {
        game.turn = 0;
        hideComputerFunction();
    }
}

//When a fold happens we reset the pot and update the bank.
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
    // New hands
    // game.
    newHand();
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