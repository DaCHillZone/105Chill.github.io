/*******************************************************************************
Declaration of constant variables
*******************************************************************************/
const X = 'x';
const Y = 'y';
const BLOCK_SIZE = 100;
const GRID_WIDTH = Math.floor(window.innerWidth/BLOCK_SIZE);
const GRID_HEIGHT = Math.floor(window.innerHeight/BLOCK_SIZE/2);
const UP = 'UP';
const DOWN = 'DOWN';
const RIGHT = 'RIGHT';
const LEFT = 'LEFT';

/*******************************************************************************
Create gridBlocks and populate the gameGrid with them
*******************************************************************************/
let gameGrid = document.getElementById("gameGrid");
gameGrid.style.height = GRID_HEIGHT*BLOCK_SIZE + 'px';

for (let i = 0; i < GRID_HEIGHT; i++) {
  for (let j = 0; j < GRID_WIDTH; j++) {
    let classes = 'gridBlock';
    if (i == 0 && j == 0) {
      classes += ' grass';
    } else {
      let tileValue = Math.random();
      if (tileValue < 0.5) {
        classes += ' grass';
      } else if (tileValue < 0.9) {
        classes += ' rock'
      } else if (tileValue < 0.95) {
        classes += ' hole'
      } else {
        classes += ' gravel';
      }
    }
    gameGrid.innerHTML += `<div class="${classes}"></div>`;
  }
}

/*******************************************************************************
Create a 2D Array to store references to the gridBlocks in an organized way
*******************************************************************************/
let grid = [];
let gridBlocks = document.getElementsByClassName("gridBlock");
for (let i = 0; i < gridBlocks.length; i++) {
  let gridBlock = gridBlocks[i];
  gridBlock.style.height = BLOCK_SIZE + 'px';
  gridBlock.style.width = BLOCK_SIZE + 'px';

  let x = i % GRID_WIDTH;
  let y = Math.floor(i / GRID_WIDTH);
  gridBlock.style.top = y*BLOCK_SIZE + 'px';
  gridBlock.style.left = x*BLOCK_SIZE + 'px';
  gridBlock.id = `${x}_${y}`;
  console.log('x='+x+' y='+y);
  if (grid.length <= x) {
    grid.push([]);
  }
  grid[x][y] = gridBlock;
}

/*******************************************************************************
Initialize player coordinates, direction, size, img src's, etc.
*******************************************************************************/
let player = document.getElementById('player');
let playerX = 0;
let playerY = 0;
let playerDirection = DOWN;
player.style.height = BLOCK_SIZE + 'px';
player.style.width = BLOCK_SIZE + 'px';

player.onanimationend = function() {
  this.classList.remove('attackRight');
  this.classList.remove('attackLeft');
  this.classList.remove('attackUp');
  this.classList.remove('attackDown');
  this.classList.remove('nudgeRight');
  this.classList.remove('nudgeLeft');
  this.classList.remove('nudgeUp');
  this.classList.remove('nudgeDown');
  this.classList.remove('jump');
}

// This is the gameplay loop responsible for updating the player location
// and appearance based on the playerX, playerY, and playerDirection variables
function updatePlayer() {
  player.style.top = playerY*BLOCK_SIZE + 'px';
  player.style.left = playerX*BLOCK_SIZE + 'px';
  if (isPlayerAttacking()) {
    player.src = 'images/ronin_side_attack_v2.png';
  } else {
    switch(playerDirection) {
      case UP:
        player.src = 'images/ronin_back_v2.png';
        break;
      case DOWN:
        player.src = 'images/ronin_front_v2.png';
        player.classList.remove('faceLeft');
        break;
      case RIGHT:
        player.src = 'images/ronin_side_v2.png';
        player.classList.remove('faceLeft');
        break;
      case LEFT:
        player.src = 'images/ronin_side_v2.png';
        player.classList.add('faceLeft');
        break;
    }
  }
}
setInterval(updatePlayer, 50);
