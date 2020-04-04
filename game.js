const CARD_WIDTH = 225;
const CARD_HEIGHT = 315;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const img = new Image();
img.src = './assets/cardsprites.jpg';
img.onload = () => { init() };

const renderCard = (rank, suit, dx, dy) => {

  const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const suitIndex = suits.indexOf(suit);
  const rankIndex = ranks.indexOf(rank);

  console.log(`${rank} of ${suit}`);

  ctx.drawImage(
    image = img,
    sx = rankIndex * CARD_WIDTH,
    sy = suitIndex * CARD_HEIGHT,
    sWidth = CARD_WIDTH,
    sHeight = CARD_HEIGHT,
    dx = dx,
    dy = dy,
    dWidth = CARD_WIDTH,
    dHeight = CARD_HEIGHT
  );
};

const init = () => {
  renderCard('Q', 'diamonds', 200, 40);
  renderCard('A', 'spades', 60, 100);
  renderCard('7', 'hearts', 250, 200);
}