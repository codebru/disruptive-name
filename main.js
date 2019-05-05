const canvas = document.getElementById('art-canvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

const step = 10;
const colorDataSize = 6; // #000000
const colorValueRange = 16; // 0 to F
const randomRange = 16; // Arbitrary

const displaySizeX = Math.ceil(width / step);
const displaySizeY = Math.ceil(height / step);

const colorMem = [];
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

function getColorForBlock(pointer) {
  let string = '#';
  for (let i = pointer * colorDataSize, j = 0; j < colorDataSize; i += 1, j += 1) {
    string += `${colorMem[i]}`;
  }
  return string;
}

function corruptColorMem() {
  const data = [];
  const pointer = Math.floor(Math.random() * totalBlocks);
  const randAmount = Math.floor(Math.random() * randomRange);

  for (let i = 0; i < randAmount; i += 1) {
    data[i] = Math.floor(Math.random() * colorValueRange);
  }

  for (let i = pointer * colorDataSize, j = 0; j < data.length; i += 1, j += 1) {
    colorMem[i] = data[j];
  }
}

function drawBlock(pointer) {
  const row = Math.floor(pointer / displaySizeX);
  const collumn = pointer - (row * displaySizeX);
  ctx.fillStyle = getColorForBlock(pointer);
  ctx.fillRect(row * step, collumn * step, step, step);
}

function drawDisplay() {
  drawBlock(blockPointer);
  if (blockPointer < totalBlocks - 1) blockPointer += 1;
  else blockPointer = 0;
}

function draw() {
  drawDisplay();
}

function init() {
  initColorMem();
}

function game() {
  draw();
  corruptColorMem();
  setTimeout(game, 5);
}

init();
game();
