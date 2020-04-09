import { Deck } from './deck.js';
import { TableauColumn } from './tableauColumn.js';

class Game {
  CARD_WIDTH = 225;
  CARD_HEIGHT = 315;

  suits = ['hearts', 'spades', 'diamonds', 'clubs'];
  ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  img = new Image();


  constructor() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.img.src = './assets/cardsprites.jpg';

    this.deck = new Deck(this.ranks, this.suits);

    this.columns = [
      new TableauColumn(100, 100, 60, this.ctx, this.img, this.CARD_HEIGHT),
      new TableauColumn(400, 100, 60, this.ctx, this.img, this.CARD_HEIGHT),
      new TableauColumn(700, 100, 60, this.ctx, this.img, this.CARD_HEIGHT)
    ];
    for (let i = 0; i < 5; i++) {
      this.columns.forEach(column => column.addCard(this.deck.dealCard()));
    }

    this.img.onload = () => this.renderCards();

    // get rid of this
    // this.dealtCards = []
    this.cardsBeingMoved = [];
    this.addDragListener();
  }

  renderCards() {
    if (!this.canvas) {
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.columns.forEach(i => {
      i.render();
    })
    this.cardsBeingMoved.forEach(card => {
      card.card.render(card.x, card.y, this.ctx, this.img);
    });
  }

  addDragListener() {
    if (!this.canvas) {
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
    }
    this.canvas.onmousedown = (e) => {
      console.log(e);
      this.columns.forEach(column => {
        if (e.x > column.dx && e.x < column.dx + this.CARD_WIDTH) {
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
      console.log(e);
      // card.render(e.x - offsetx, e.y - offsety, this.ctx);
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

document.addEventListener("DOMContentLoaded", function () {
  const game = new Game();
})