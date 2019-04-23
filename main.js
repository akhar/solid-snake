'use strict'
import { initModel, model } from './model.js'

window.addEventListener('DOMContentLoaded', () => main(), false)

window.removeEventListener('DOMContentLoaded', () => main(), false)

const main = () => {
  initModel()
  console.debug(model)
}
