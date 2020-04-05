import { Card } from './card.js';
import { Deck } from './deck.js';

class Game {
  CARD_WIDTH = 225;
  CARD_HEIGHT = 315;

  suits = ['hearts', 'spades', 'diamonds', 'clubs'];
  ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  img = new Image();


  constructor() {
    this.img.src = './assets/cardsprites.jpg';
    this.img.onload = () => this.renderCards();

    this.deck = new Deck(this.ranks, this.suits);

    this.dealtCards = [
      {
        card: this.deck.dealCard(),
        x: 200,
        y: 40
      },
      {
        card: this.deck.dealCard(),
        x: 60,
        y: 100
      },
      {
        card: this.deck.dealCard(),
        x: 250,
        y: 200
      }
    ];

    this.addDragListener();
  }

  renderCards() {
    if (!this.canvas) {
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.dealtCards.forEach(i => {
      i.card.render(i.x, i.y, this.ctx, this.img);
    })
  }

  addDragListener() {
    if (!this.canvas) {
      this.canvas = document.querySelector('canvas');
      this.ctx = this.canvas.getContext('2d');
    }
    this.canvas.onmousedown = (e) => {
      console.log(e);
      this.dealtCards.forEach(i => {
        if (e.x >= i.x && e.x < i.x + this.CARD_WIDTH &&
          e.y >= i.y && e.y < i.y + this.CARD_HEIGHT) {
          this.dragCard(i, e.x, e.y);
        }
      });
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
  console.log(game.ctx);
});