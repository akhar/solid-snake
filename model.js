'use strict'

import { initModel } from './service.js'

let model = initModel()

function resetModel() {
  model = initModel()
}

function getModel() {
  return model
}

function updateModel(key, value) {
  model[key] = value
  console.debug(JSON.stringify(model))
}

export { getModel, updateModel, resetModel }
