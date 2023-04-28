import Hand from'./node_modules/pokersolver/pokersolver.js';

// global.window.Hand = Hand;
console.log(Object.getOwnPropertyNames(Hand));
var hand1 = Hand.Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', '3c', 'Kd']);
var hand2 = Hand.Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Qs', 'Qd']);
var winner = Hand.Hand.winners([hand1, hand2]); // hand2

console.log(winner);