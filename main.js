'use strict'

import { initModel } from './model.js'
import { checkConditions, makeStep } from './service.js'
import { updateView } from './view.js'

const main = () => {
  initModel()
  const ticker = setInterval(tick, 2000)

  function tick() {
    makeStep()
    checkConditions(ticker)
    updateView()
  }
}

window.addEventListener('DOMContentLoaded', main)
