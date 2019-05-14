'use strict'

import { initModel } from './init.service.js'

let model = initModel()

function resetModel() {
  model = initModel()
}

function getModel() {
  return model
}

function updateModel(key, value) {
  model[key] = value
}

export { getModel, updateModel, resetModel }
