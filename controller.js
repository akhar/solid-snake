'use strict'

import { changeDirection, restartGame } from './service.js'

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
    case 32: //space
      restartGame()
      break
  }
}

export { handleKeyDown }
