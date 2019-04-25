'use strict'

import { cfg } from './config.js'
import { initModel } from './model.js'
import { checkConditions, makeStep } from './service.js'
import { render } from './view.js'

const main = () => {
  initModel()
  const ticker = setInterval(tick, cfg.SPEED)

  function tick() {
    console.debug('----------------------')
    makeStep()
    checkConditions(ticker)
    render()
  }
}

window.addEventListener('DOMContentLoaded', main)
