const canvas = document.getElementById('art-canvas');
const ctx = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

const step = 10;
const colorDataSize = 6; // #000000
const expectedColor = '#888888';
const crackdownColor = '#000000';
const colorValueRange = 16; // 0 to F
const randomRange = 16; // Arbitrary

const displaySizeX = Math.ceil(height / step);
const displaySizeY = Math.ceil(width / step);

const colorMem = [];
let blockPointer = 0;
const totalBlocks = displaySizeX * displaySizeY;

const numToColor = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: 'A',
  11: 'B',
  12: 'C',
  13: 'D',
  14: 'E',
  15: 'F',
  16: 'G',
};

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
  for (let i = pointer, j = 0; j < colorDataSize; i += 1, j += 1) {
    string += `${colorMem[i]}`;
  }
  return string;
}

function setColor(pointer, colorString) {
  let array = colorString.split('');
  array.shift(); // remove hash
  for (let i = 0; i < array.length; i += 1) {
    console.log(parseInt(array[i]));
    console.log(colorMem[pointer + i]);
    colorMem[pointer + i] = array[i];
    console.log(colorMem[pointer + i]);
  }
  console.log(getColorForBlock(pointer));
}

function drawBlock(pointer) {
  const location = pointer / colorDataSize;
  const row = Math.floor(location / displaySizeX);
  const collumn = location - (row * displaySizeX);
  ctx.fillStyle = getColorForBlock(pointer);
  ctx.fillRect(row * step, collumn * step, step, step);
}

function corruptColorMem() {
  const data = [];
  const pointer = Math.floor(Math.random() * (totalBlocks * colorDataSize));
  let randAmount = Math.floor(Math.random() * randomRange);
  
  if (getColorForBlock(pointer) === crackdownColor) {
    return;
  }

  for (let i = 0; i < randAmount; i += 1) {
    data[i] = Math.floor(Math.random() * colorValueRange);
  }

  for (let i = pointer * colorDataSize, j = 0; j < data.length; i += 1, j += 1) {
    colorMem[i] = numToColor[data[j]];
  }

  const blocksToDraw = Math.ceil(randAmount / colorDataSize);
  const startingPointer = colorDataSize * Math.floor(pointer / colorDataSize)
  for (let i = 0; i < blocksToDraw; i += 1) {
    drawBlock(startingPointer + (i * colorDataSize));
  }
}

function police(pointer) {
  const val = colorMem[pointer];
  if (getColorForBlock(pointer) === crackdownColor) {
    setColor(pointer, expectedColor);
    return;
  }
  for (let i = 1; i < colorDataSize; i += 1) {
    if (colorMem[pointer + i] !== val) {
      setColor(pointer, crackdownColor);
      break;
    }
  }
}

function people() {
  const pointer = Math.floor(Math.random() * totalBlocks) * colorDataSize;
  const colorVal = colorMem[pointer];
  for (let i = 1; i < colorDataSize; i += 1) {
    if (colorVal !== colorMem[pointer + i]) return;
  }

  const newColorVal = Math.floor(Math.random() * colorValueRange / 2) + colorValueRange /4;
  for (let i = 0; i < colorDataSize; i += 1) {
    colorMem[pointer + i] = newColorVal;
  }
  drawBlock(pointer);
}

function drawDisplay() {
  police(blockPointer, expectedColor);
  drawBlock(blockPointer);
  people();
  if (blockPointer < (totalBlocks * colorDataSize - 1)) {
    blockPointer += colorDataSize;
    corruptProbablity = Math.random();
  }
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
  setTimeout(game, 0);
  if (corruptProbablity > Math.random()) {
    corruptColorMem();
  }
}

init();
game();
