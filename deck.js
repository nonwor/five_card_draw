export class Card{
  constructor(suit, rank){
      this.suit = suit;
      this.rank = rank;


      //Convert suit and rank to image string
      let endStr;
      if(parseInt(rank) > 0){
          endStr = "r"+ rank;
      } else{
          endStr = rank;
      }
      let imageURL = suit + "-" + endStr +'.svg'; 
      this.imageLink = imageURL;
  }

  get name(){
      return `${this.rank} of ${this.suit} :${this.imageLink}`;
  }
  //This is for tie breaker
  get value(){
      if (this.rank == "Jack"){
          return 10;
      }
      if (this.rank == "Queen"){
          return 11;
      }
      if (this.rank == "King"){
          return 13;
      }
      if (this.rank == "Ace"){
          return 14;
      }
      return this.rank;
  }
}

export class Deck {
  constructor() {
    this.cards = [];
    const suits = ["hearts", "diamonds", "clubs", "spades"];
    const ranks = [
      "A",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "J",
      "Q",
      "K",
    ];
    for (let suit of suits) {
      for (let rank of ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  deal() {
    return this.cards.pop();
  }
}


