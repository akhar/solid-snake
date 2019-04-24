'use strict'

import _ from './utils.js'

const SATGE_SIZE = 50

let model

function initModel() {
  model = {
    count: 0,
    snake: [_.getRandomSafeCoords(SATGE_SIZE)],
    direction: _.getRandomDirection(),
    food: _.getRandomSafeCoords(SATGE_SIZE),
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
