/*******************************************************************************
Player Utility Functions
*******************************************************************************/
// Returns true if the player is in an "attacking" state
function isPlayerAttacking() {
  return player.classList.contains('attackLeft')
    || player.classList.contains('attackRight')
    || player.classList.contains('attackUp')
    || player.classList.contains('attackDown');
}

// Logs to the console the current player position (relative to gridBlocks)
function logPlayerPosition() {
  console.log('player (x='+playerX+' y='+playerY+')');
}

/*******************************************************************************
Block Utility Functions
*******************************************************************************/
// Returns a reference to the gridBlock at the coordinates of (targetX, targetY)
// (assuming it exists; if not, return the null value)
function getBlock(targetX, targetY) {
  if (targetX < grid.length && targetY < grid[targetX].length) {
    return grid[targetX][targetY];
  } else {
    return null;
  }
}

// Returns true if the gridBlock at (targetX, targetY) is considered "crossable"
// by the player through normal means (i.e. walking)
function isBlockCrossable(targetX, targetY) {
  let block = getBlock(targetX, targetY);
  if (block == null) {
    return false;
  }
  return !block.classList.contains('rock')
    && !block.classList.contains('hole');
}

// Returns true if the gridBlock at (targetX, targetY) is considered "attackable"
// by the player (meaning it can be destroyed with an attack)
function isBlockAttackable(targetX, targetY) {
  let block = getBlock(targetX, targetY);
  if (block == null) {
    return false;
  }
  return block.classList.contains('rock');
}

// Get the gridBlock found at (targetX, targetY), and if it is attackable,
// destroy it (meaning: change the gridBlock from rock to gravel)
// If other attackable blocks are implemented, this function will probably
// need to be expanded to account for them
function attackBlock(targetX, targetY) {
  if (isBlockAttackable(targetX, targetY)) {
    let block = getBlock(targetX, targetY);
    block.classList.remove('rock');
    block.classList.add('gravel');
  }
}

/*******************************************************************************
Path-finding Functions
*******************************************************************************/
// Given inputs of
//     axis - "X" or "Y", which indicates the direction of travel
//     startingIndex - the starting coordinate along the input axis (X or Y)
//     targetIndex - the coordinate of the desired destination, along the
//         input axis (X or Y)
// Return the index/coordinate between startingIndex and targetIndex that
//     the player is able to traverse until running into an "un-crossable" block
function getCrossablePathEnd(axis, startingIndex, targetIndex) {
  let pathEndIndex = startingIndex;
  if (startingIndex < targetIndex) {
    for (let i = startingIndex + 1; i <= targetIndex; i++) {
      if (
        axis == X && isBlockCrossable(i, playerY) ||
        axis == Y && isBlockCrossable(playerX, i)
      ) {
        pathEndIndex = i;
      } else {
        break;
      }
    }
  } else {
    for (let i = startingIndex - 1; i >= targetIndex; i--) {
      if (
        axis == X && isBlockCrossable(i, playerY) ||
        axis == Y && isBlockCrossable(playerX, i)
      ) {
        pathEndIndex = i;
      } else {
        break;
      }
    }
  }
  return pathEndIndex;
}

// Given inputs of
//     axis - "X" or "Y", which indicates the direction of travel
//     startingIndex - the starting coordinate along the input axis (X or Y)
//     targetIndex - the coordinate of the desired destination, along the
//         input axis (X or Y)
// Return the index/coordinate between startingIndex and targetIndex that
//     the player is able to traverse by jumping.  If targetIndex refers to a
//     block that is crossable, return that index; otherwise, step back one
//     block at a time to the startingIndex and return the first crossable block.
function getJumpablePathEnd(axis, startingIndex, targetIndex) {
  if (startingIndex < targetIndex) {
    for (let i = targetIndex; i > startingIndex; i--) {
      if (
        axis == X && isBlockCrossable(i, playerY) ||
        axis == Y && isBlockCrossable(playerX, i)
      ) {
        return i;
      }
    }
  } else {
    for (let i = targetIndex; i < startingIndex; i++) {
      if (
        axis == X && isBlockCrossable(i, playerY) ||
        axis == Y && isBlockCrossable(playerX, i)
      ) {
        return i;
      }
    }
  }
  return startingIndex;
}

/*******************************************************************************
Player Movement/Interaction Functions
*******************************************************************************/
// Given an input of:
//    distance - the number of blocks the player should travel (defaults to 1),
// Move the player left (i.e. along the negative X axis) the number of blocks
//     specified by 'distance' until an un-crossable block is encountered
function moveLeft(distance = 1) {
  let initX = playerX;
  let targetX = playerX;
  if (playerX - distance >= 0) {
    targetX -= distance;
  } else {
    targetX = 0;
  }
  playerX = getCrossablePathEnd(X, playerX, targetX);
  playerDirection = LEFT;
  if (playerX == initX) {
    nudge();
  }
}

// Given an input of:
//    distance - the number of blocks the player should travel (defaults to 1),
// Move the player right (i.e. along the positive X axis) the number of blocks
//     specified by 'distance' until an un-crossable block is encountered
function moveRight(distance = 1) {
  let initX = playerX;
  let targetX = playerX;
  if (playerX + distance < GRID_WIDTH) {
    targetX += distance;
  } else {
    targetX = GRID_WIDTH - 1;
  }
  playerX = getCrossablePathEnd(X, playerX, targetX);
  playerDirection = RIGHT;
  if (playerX == initX) {
    nudge();
  }
}

// Given an input of:
//    distance - the number of blocks the player should travel (defaults to 1),
// Move the player down (i.e. along the positive Y axis) the number of blocks
//     specified by 'distance' until an un-crossable block is encountered
function moveDown(distance = 1) {
  let initY = playerY;
  let targetY = playerY;
  if (targetY + distance < grid[0].length) {
    targetY += distance;
  } else {
    targetY = grid[0].length - 1;
  }
  playerY = getCrossablePathEnd(Y, playerY, targetY);
  playerDirection = DOWN;
  if (playerY == initY) {
    nudge();
  }
}

// Given an input of:
//    distance - the number of blocks the player should travel (defaults to 1),
// Move the player up (i.e. along the negative Y axis) the number of blocks
//     specified by 'distance' until an un-crossable block is encountered
function moveUp(distance = 1) {
  let initY = playerY;
  let targetY = playerY;
  if (targetY - distance >= 0) {
    targetY -= distance;
  } else {
    targetY = 0;
  }
  playerY = getCrossablePathEnd(Y, playerY, targetY);
  playerDirection = UP;
  if (playerY == initY) {
    nudge();
  }
}

// Given an input of:
//    distance - the number of blocks the player should travel (defaults to 1),
// Move the player left (i.e. along the negative X axis) the number of blocks
//     specified by 'distance', assuming the distance is jumpable
function jumpLeft(distance = 1) {
  let targetX = playerX;
  if (playerX - distance >= 0) {
    targetX -= distance;
  } else {
    targetX = 0;
  }
  playerX = getJumpablePathEnd(X, playerX, targetX);
  playerDirection = LEFT;
  jump();
}

// Given an input of:
//    distance - the number of blocks the player should travel (defaults to 1),
// Move the player right (i.e. along the positive X axis) the number of blocks
//     specified by 'distance', assuming the distance is jumpable
function jumpRight(distance = 1) {
  let targetX = playerX;
  if (playerX + distance < GRID_WIDTH) {
    targetX += distance;
  } else {
    targetX = GRID_WIDTH - 1;
  }
  playerX = getJumpablePathEnd(X, playerX, targetX);
  playerDirection = RIGHT;
  jump();
}

// Given an input of:
//    distance - the number of blocks the player should travel (defaults to 1),
// Move the player down (i.e. along the positive Y axis) the number of blocks
//     specified by 'distance', assuming the distance is jumpable
function jumpDown(distance = 1) {
  let targetY = playerY;
  if (targetY + distance < grid[0].length) {
    targetY += distance;
  } else {
    targetY = grid[0].length - 1;
  }
  playerY = getJumpablePathEnd(Y, playerY, targetY);
  playerDirection = DOWN;
  jump();
}

// Given an input of:
//    distance - the number of blocks the player should travel (defaults to 1),
// Move the player up (i.e. along the negative Y axis) the number of blocks
//     specified by 'distance', assuming the distance is jumpable
function jumpUp(distance = 1) {
  let targetY = playerY;
  if (targetY - distance >= 0) {
    targetY -= distance;
  } else {
    targetY = 0;
  }
  playerY = getJumpablePathEnd(Y, playerY, targetY);
  playerDirection = UP;
  jump();
}

// Causes the player to attack in the direction they're currently facing,
// triggering the animation for attacking as well as attacking block in front
function attack() {
  switch(playerDirection) {
    case DOWN:
      player.classList.add('attackDown');
      attackBlock(playerX, playerY+1);
      break;
    case UP:
      player.classList.add('attackUp');
      attackBlock(playerX, playerY-1);
      break;
    case LEFT:
      player.classList.add('attackLeft');
      attackBlock(playerX-1, playerY);
      break;
    case RIGHT:
      player.classList.add('attackRight');
      attackBlock(playerX+1, playerY);
      break;
  }
}

// Triggers the "nudge" animation in the player, which moves the player
// slightly forward and back in the direction they're facing
function nudge() {
  switch(playerDirection) {
    case DOWN:
      player.classList.add('nudgeDown');
      break;
    case UP:
      player.classList.add('nudgeUp');
      break;
    case LEFT:
      player.classList.add('nudgeLeft');
      break;
    case RIGHT:
      player.classList.add('nudgeRight');
      break;
  }
}

// Triggers the jump animation in the player, which on its own, causes the
// player to hop up and down without changing their position in the gameGrid
function jump() {
  player.classList.add('jump');
}
