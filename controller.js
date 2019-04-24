'use strict'

import { updateModel } from './model.js'

function handleKeyDown(event) {
  switch (event.keyCode) {
    case 37: //left
      updateModel('direction', 'x--')
      break
    case 38: //up
      updateModel('direction', 'y--')
      break
    case 39: //right
      updateModel('direction', 'x++')
      break
    case 40: //down
      updateModel('direction', 'y++')
      break
  }
}

window.addEventListener('keydown', handleKeyDown)
