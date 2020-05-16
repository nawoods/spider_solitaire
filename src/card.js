class Card {
  constructor(rank, suit, faceUp, gameConfig) {
    this.rank = rank;
    this.suit = suit;
    this.faceUp = faceUp;
    this.gameConfig = gameConfig;
  }

  render(dx, dy) {
    const cardImg = this.faceUp ? this.gameConfig.cardImgs[this.suit][this.rank] : this.gameConfig.cardImgs.back;

    this.gameConfig.ctx.drawImage(
      cardImg,
      dx,
      dy,
      this.gameConfig.cardWidth,
      this.gameConfig.cardHeight
    );
  }
}

export { Card };