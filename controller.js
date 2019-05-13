'use strict'

import { getModel } from './model.js'
import { changeDirection, pauseGame, restartGame, resumeGame } from './service.js'

function handleKeyDown(event) {
  switch (event.keyCode) {
    case 37: //left
      changeDirection('x--')
      break
    case 38: //up
      changeDirection('y--')
      break
    case 39: //right
      changeDirection('x++')
      break
    case 40: //down
      changeDirection('y++')
      break
    case 13: //enter
      restartGame()
      break
    case 32: //space
      getModel().pause ? resumeGame() : pauseGame()
      break
  }
}

export { handleKeyDown }
