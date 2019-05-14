'use strict'

import cfg from './config.js'
import { handleKeyDown } from './controller.js'
import _ from './utils.js'

function initModel() {
  const directionL = _.getRandomDirection()
  const directionR = _.getRandomDirection()
  const startPointL = [_.getRandomLeftCoords()]
  const startPointR = [_.getRandomRightCoords()]
  const snakeL = growTail(startPointL, directionL)
  const snakeR = growTail(startPointR, directionR)
  const food = _.getFoodCoords({ snakeL, snakeR })

  return {
    countL: 0,
    countR: 0,
    directionL,
    directionR,
    food,
    hasAteL: false,
    hasAteR: false,
    isGameOver: false,
    pause: false,
    snakeL,
    snakeR
  }
}

function initController() {
  window.addEventListener('keydown', handleKeyDown)
}

function growTail(head, direction) {
  switch (direction) {
    case 'x--':
      return [
        ...head,
        { x: head.x - cfg.TILE_SIZE, y: head.y },
        { x: head.x - cfg.TILE_SIZE * 2, y: head.y }
      ]
    case 'y--':
      return [
        ...head,
        { x: head.x, y: head.y - cfg.TILE_SIZE },
        { x: head.x, y: head.y - cfg.TILE_SIZE * 2 }
      ]
    case 'x++':
      return [
        ...head,
        { x: head.x + cfg.TILE_SIZE, y: head.y },
        { x: head.x + cfg.TILE_SIZE * 2, y: head.y }
      ]
    case 'y++':
      return [
        ...head,
        { x: head.x, y: head.y + cfg.TILE_SIZE },
        { x: head.x, y: head.y + cfg.TILE_SIZE * 2 }
      ]
  }
}

export { initModel, initController }
