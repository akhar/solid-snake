import _ from './utils.js'

const SATGE_SIZE = 50

let model = {}

const initModel = () => {
  model = {
    count: 0,
    head: _.getRandomSafeCoords(SATGE_SIZE),
    tail: [],
    direction: _.getRandomDirection(),
    food: _.getRandomSafeCoords(SATGE_SIZE)
  }
}

const updateModel = (key, value) => {
  model[key] = value
}

export { model, initModel, updateModel }
