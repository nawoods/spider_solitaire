class Card {
  CARD_WIDTH = 225;
  CARD_HEIGHT = 315;

  constructor(rank, suit) {
    const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    this.rank = rank;
    this.suit = suit;

    this.suitIndex = suits.indexOf(suit);
    this.rankIndex = ranks.indexOf(rank);
  }

  render(dx, dy, ctx, img) {
    ctx.drawImage(
      img,
      this.rankIndex * this.CARD_WIDTH,
      this.suitIndex * this.CARD_HEIGHT,
      this.CARD_WIDTH,
      this.CARD_HEIGHT,
      dx,
      dy,
      this.CARD_WIDTH,
      this.CARD_HEIGHT
    );
  }


}

export { Card };