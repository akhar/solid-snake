'use strict'

import { getModel } from './model.js'
import {
  changeDirectionL,
  changeDirectionR,
  pauseGame,
  restartGame,
  resumeGame
} from './service.js'

function handleKeyDown(event) {
  switch (event.keyCode) {
    case 13: //enter
      restartGame()
      break
    case 32: //space
      if (!getModel().isGameOver) getModel().pause ? resumeGame() : pauseGame()
      break

    //right player
    case 37: //left
      changeDirectionR('x--')
      break
    case 38: //up
      changeDirectionR('y--')
      break
    case 39: //right
      changeDirectionR('x++')
      break
    case 40: //down
      changeDirectionR('y++')
      break

    // left player
    case 69: //e
      changeDirectionL('y--')
      break
    case 83: //s
      changeDirectionL('x--')
      break
    case 68: //d
      changeDirectionL('y++')
      break
    case 70: //f
      changeDirectionL('x++')
      break
  }
}

export { handleKeyDown }
