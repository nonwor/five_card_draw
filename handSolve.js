import Hand from'./pokersolverLocal.js';

// global.window.Hand = Hand;
console.log(Object.getOwnPropertyNames(Hand));
var hand2 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Qs', 'Qd']);
var hand1 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', '3c', 'Kd']);
var winner = Hand.winners([hand1, hand2]); // hand2

console.log("winner", winner);

export const whoWon =(compH, playerH) =>{

    // console.log({h1},{h2});
    
    let newH1 = [];
    let newH2 = [];
    
    //reformat
    //{suit: 'hearts', rank: '02', imageLink: 'hearts-r02.svg'}
    for(let i = 0; i<5; i++){
        let transformedVal = "";
        let transformedVal2 = "";
        let ogRank = (compH[i].rank);
        let ogRank2 = (playerH[i].rank);
        
        if (ogRank[0]=='0'){
            transformedVal = ogRank[1];
        }else{
            transformedVal = ogRank[0];
        }

        if (ogRank2[0]=='0'){
            transformedVal2 = ogRank2[1];
        }else{
            transformedVal2 = ogRank2[0];
        }

        let suit = compH[i].suit[0];
        let suit2 = playerH[i].suit[0];

        newH1.push(transformedVal+suit);
        newH2.push(transformedVal2+suit2);
    }
    // let h1_v = Hand.solve(newH1)[0].cardPool[0].value;
    // let h1_s = Hand.solve(newH1)[0].cardPool[0].suit;

    
    console.log("Solved: ", Hand.solve(newH1));
    console.log("Solved: ", Hand.solve(newH2));
    console.log("Win:",Hand.winners([Hand.solve(newH1),  Hand.solve(newH2)]));
    console.log("Win:",Hand.winners([Hand.solve(newH1),  Hand.solve(newH2)])[0]);
    //
    let result={
        winner: "",
        message: ""
    }
    //Wining Hand
    let winHand = Hand.winners([Hand.solve(newH1),  Hand.solve(newH2)]);
    //message
    console.log("Win desc:", winHand[0].descr);
    let h1_v = Hand.solve(newH1).cardPool[0].value;
    let h1_s = Hand.solve(newH1).cardPool[0].suit;
    let done_v = winHand[0].cardPool[0].value;
    let done_s = winHand[0].cardPool[0].suit;
    //player won
    if((h1_v == done_v) && (h1_s == done_s)){
        //computer Won
        result.winner = "computer";
    } else{
        result.winner = "player";
    }
    result.message =  winHand[0].descr;
    return result
}