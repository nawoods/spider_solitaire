import { Card } from './card.js';

class Deck {

  constructor(x, y, gameConfig) { 
    this.x = x;
    this.y = y;
    this.gameConfig = gameConfig;

    this.suits = gameConfig.suits;
    this.ranks = gameConfig.ranks;

    this.cards = this.createDeck();
    this.shuffle();
  }

  createDeck() {
    let newCards = [];
    this.suits.forEach(suit => {
      this.ranks.forEach(rank => {
        newCards.push(new Card(rank, suit, false, this.gameConfig));
      })
    })
    return newCards;
  }

  render() {
    const cardImg = this.cards.length > 0 ? "back" : "empty";
    this.gameConfig.ctx.drawImage(
      this.gameConfig.cardImgs[cardImg],
      this.x,
      this.y,
      this.gameConfig.cardWidth,
      this.gameConfig.cardHeight
    );
  }

  shuffle() {
    let newCards = [];
    while (this.cards.length > 0) {
      let randomIndex = Math.floor(Math.random() * this.cards.length);
      let randomCard = this.cards.splice(randomIndex, 1)[0];
      newCards.push(randomCard);
    }
    this.cards = newCards;
  }

  dealCard() {
    return this.cards.pop();
  }
}

export { Deck };