const canvas = document.getElementById('art-canvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

const step = 10;
const colorDataSize = 6;

const displaySizeX = Math.ceil(width / step);
const displaySizeY = Math.ceil(height / step);

let colorMem = [];
let blockPointer = 0;
const totalBlocks = displaySizeX * displaySizeY;

ctx.canvas.width = width;
ctx.canvas.height = height;

function initColorMem() {
  const memSize = displaySizeX * displaySizeY * colorDataSize;
  for (let i = 0; i < memSize; i += 1) {
    colorMem[i] = 8;
  }
}

function drawDisplay() {
  drawBlock(blockPointer);
  if (blockPointer < totalBlocks - 1) blockPointer += 1;
  else blockPointer = 0;
}

function getColorForBlock(pointer) {
  let string = '#';
  for (let i = pointer * colorDataSize, j = 0; j < colorDataSize; i += 1, j += 1) {
    string += `${colorMem[i]}`;
  }
  return string;
}

function drawBlock(pointer) {
  row = Math.floor(pointer/displaySizeX);
  collumn = pointer - (row * displaySizeX);
  ctx.fillStyle = getColorForBlock(pointer);
  ctx.fillRect(row * step, collumn * step, step, step);
}

function draw() {
  console.log(ctx.canvas.width);
  console.log(ctx.canvas.height);
  drawDisplay();
}

function init() {
  initColorMem();
}

function game() {
  draw();
  setTimeout(game, 100);
}

init();
game();
