const canvas = document.getElementById('art-canvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

const step = 10;

const displaySizeX = Math.ceil(width / step);
const displaySizeY = Math.ceil(height / step);

let display = null;
let blockPointer = 0;
const totalBlocks = displaySizeX * displaySizeY;

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
  drawBlock(blockPointer);
  if (blockPointer < totalBlocks - 1) blockPointer += 1;
  else blockPointer = 0;
}

function drawBlock(pointer) {
  row = Math.floor(pointer/displaySizeX);
  collumn = pointer - (row * displaySizeX);
  ctx.fillStyle = "#FF0000";
  ctx.fillRect(row * step, collumn * step, step, step);
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
  setTimeout(game, 100);
}

init();
game();
