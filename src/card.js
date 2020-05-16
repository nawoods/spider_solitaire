class Card {
  constructor(rank, suit, gameConfig) {
    this.rank = rank;
    this.suit = suit;
    this.gameConfig = gameConfig;
  }

  render(dx, dy) {
    console.log(this.gameConfig.ctx);
    this.gameConfig.ctx.drawImage(
      this.gameConfig.cardImgs[this.suit][this.rank],
      dx,
      dy,
      this.gameConfig.cardWidth,
      this.gameConfig.cardHeight
    );
  }
}

export { Card };