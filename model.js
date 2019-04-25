'use strict'

import { cfg } from './config.js'
import _ from './utils.js'

let model

function initModel() {
  model = {
    count: 0,
    snake: [_.getRandomSafeCoords(cfg.SATGE_SIZE * cfg.GRID_SIZE)],
    direction: _.getRandomDirection(),
    food: _.getRandomSafeCoords(cfg.SATGE_SIZE * cfg.GRID_SIZE),
    hasEat: false
  }
}

function getModel() {
  return model
}

function updateModel(key, value) {
  model[key] = value
  console.debug(JSON.stringify(model))
}

export { getModel, initModel, updateModel }
