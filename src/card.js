class Card {
  constructor(rank, suit, gameConfig) {
    this.rank = rank;
    this.suit = suit;
    this.gameConfig = gameConfig;

    this.suitIndex = gameConfig.suits.indexOf(suit);
    this.rankIndex = gameConfig.ranks.indexOf(rank);
  }

  render(dx, dy) {
    console.log(this.gameConfig.ctx);
    this.gameConfig.ctx.drawImage(
      this.gameConfig.img,
      this.rankIndex * this.gameConfig.cardWidth,
      this.suitIndex * this.gameConfig.cardHeight,
      this.gameConfig.cardWidth,
      this.gameConfig.cardHeight,
      dx,
      dy,
      this.gameConfig.cardWidth,
      this.gameConfig.cardHeight
    );
  }
}

export { Card };