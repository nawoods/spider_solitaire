import { Deck } from './deck.js';
import { TableauColumn } from './tableauColumn.js';

class Game {
  constructor(gameConfig) {
    this.gameConfig = gameConfig;

    this.deck = new Deck(this.gameConfig);

    this.columns = [
      new TableauColumn(100, 100, this.gameConfig),
      new TableauColumn(400, 100, this.gameConfig),
      new TableauColumn(700, 100, this.gameConfig)
    ];
    for (let i = 0; i < 5; i++) {
      this.columns.forEach(column => column.addCard(this.deck.dealCard()));
    }

    // get rid of this
    // this.dealtCards = []
    this.cardsBeingMoved = [];
    this.addDragListener();

    this.renderCards();
  }

  renderCards() {
    this.gameConfig.ctx.clearRect(0, 0, this.gameConfig.canvas.width, this.gameConfig.canvas.height);
    this.columns.forEach(i => {
      i.render();
    })
    this.cardsBeingMoved.forEach(card => {
      card.card.render(card.x, card.y);
    });
  }

  addDragListener() {
    this.gameConfig.canvas.onmousedown = (e) => {
      this.columns.forEach(column => {
        if (e.x > column.dx && e.x < column.dx + this.gameConfig.cardWidth) {
          this.cardsBeingMoved = column.moveCardsFromStack(e.y);
          this.cardsBeingMoved.forEach(card => {
            this.dragCard(card, e.x, e.y);
          });
          // this.renderCards();
        }
      })
      // this.dealtCards.forEach(i => {
      //   if (e.x >= i.x && e.x < i.x + this.CARD_WIDTH &&
      //     e.y >= i.y && e.y < i.y + this.CARD_HEIGHT) {
      //     this.dragCard(i, e.x, e.y);
      //   }
      // });
    };
  }

  dragCard(card, mousex, mousey) {
    const offsetx = mousex - card.x;
    const offsety = mousey - card.y;

    const followWhileDragging = (e) => {
      card.x = e.x - offsetx;
      card.y = e.y - offsety;
      this.renderCards();
    }

    function stopFollowing(e) {
      document.removeEventListener('mousemove', followWhileDragging);
      document.removeEventListener('mouseup', stopFollowing);
    }

    document.addEventListener('mousemove', followWhileDragging);
    document.addEventListener('mouseup', stopFollowing);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const img = new Image();
  img.src = './assets/cardsprites.jpg';

  img.onload = () => new Game({
    canvas: document.querySelector('canvas'),
    ctx: document.querySelector('canvas').getContext('2d'),
    suits: ['hearts', 'spades', 'diamonds', 'clubs'],
    ranks: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    spritesheetUri: './assets/cardsprites.jpg',
    cardWidth: 225,
    cardHeight: 315,
    defaultDistanceBetweenCards: 60,
    img
  });
})