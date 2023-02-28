/*******************************************************************************
Hook up EventHandlers functions for on-screen movement buttons
*******************************************************************************/
let buttonLeft = document.getElementById('left');
buttonLeft.onclick = pressMoveLeftButton;
let buttonRight = document.getElementById('right');
buttonRight.onclick = pressMoveRightButton;
let buttonDown = document.getElementById('down');
buttonDown.onclick = pressMoveDownButton;
let buttonUp = document.getElementById('up');
buttonUp.onclick = pressMoveUpButton;

/*******************************************************************************
Hook up EventHandlers functions for on-screen jumping movement buttons
*******************************************************************************/
let buttonJumpUp = document.getElementById('jumpUp');
buttonJumpUp.onclick = pressJumpUpButton;
let buttonJumpDown = document.getElementById('jumpDown');
buttonJumpDown.onclick = pressJumpDownButton;
let buttonJumpRight = document.getElementById('jumpRight');
buttonJumpRight.onclick = pressJumpRightButton;
let buttonJumpLeft = document.getElementById('jumpLeft');
buttonJumpLeft.onclick = pressJumpLeftButton;

/*******************************************************************************
Hook up EventHandlers functions for other buttons
*******************************************************************************/
let buttonAttack = document.getElementById('attack');
buttonAttack.onclick = pressAttackButton;
let buttonJump = document.getElementById('jump');
buttonJump.onclick = pressJumpButton;

/*******************************************************************************
Hook up anonymous EventHandler function for keyboard key presses
*******************************************************************************/
window.onkeydown = function(event) {
  switch(event.key) {
    case "ArrowDown":
    case "s":
      pressMoveDownButton();
      break;
    case "ArrowUp":
    case "w":
      pressMoveUpButton();
      break;
    case "ArrowRight":
    case "d":
      pressMoveRightButton();
      break;
    case "ArrowLeft":
    case "a":
      pressMoveLeftButton();
      break;
    case "S":
      pressJumpDownButton();
      break;
    case "W":
      pressJumpUpButton();
      break;
    case "D":
      pressJumpRightButton();
      break;
    case "A":
      pressJumpLeftButton();
      break;
    case " ":
      pressAttackButton();
      break;
  }
}
