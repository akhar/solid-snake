'use strict'

import { cfg } from './config.js'
import { checkConditions, makeStep } from './service.js'
import { render } from './view.js'

const main = () => {
  const ticker = setInterval(tick, cfg.SPEED)

  function tick() {
    makeStep()
    checkConditions(ticker)
    render()
    console.debug('________________')
  }
}

window.addEventListener('DOMContentLoaded', main)

export { main }
