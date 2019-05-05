const canvas = document.getElementById('art-canvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

const step = 10;

const displaySizeX = Math.ceil(width / step);
const displaySizeY = Math.ceil(height / step);

let display = null;

ctx.canvas.width = width;
ctx.canvas.height = height;

function initDisplay(x, y) {
  for (let i = 0; i < x; i += 1) {
    for (let ii = 0; ii < y; ii += 1) {
      display[i][ii] = "#000000";
    }
  }
}

function drawDisplay() {
  for (let i = 0; i < displaySizeX; i += 1) {
    for (let ii = 0; ii < displaySizeY; ii += 1) {
      ctx.fillStyle = "#FF0000";
      ctx.fillRect(i * step, ii * step, step, step);
    }
  }
}

function draw() {
  console.log(ctx.canvas.width);
  console.log(ctx.canvas.height);
  drawDisplay();
}

function init() {
  initDisplay();
}

function game() {
  draw();
}

init();
game();
