'use strict'

import { cfg } from './config.js'
import { handleKeyDown } from './controller.js'
import { growHead } from './service.js'
import _ from './utils.js'

function initModel() {
  const direction = _.getRandomDirection()
  const startPoint = [_.getRandomSafeCoords(cfg.SATGE_SIZE * cfg.GRID_SIZE)]
  const snake = growHead(growHead(startPoint, direction), direction) // TODO: refactor this shit

  return {
    count: 0,
    snake,
    direction,
    food: _.getRandomSafeCoords(cfg.SATGE_SIZE * cfg.GRID_SIZE),
    hasAte: false
  }
}

function initController() {
  window.addEventListener('keydown', handleKeyDown)
}

export { initModel, initController }
