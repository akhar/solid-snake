'use strict'

import { cfg } from './config.js'
import { tick } from './service.js'

let clockId

function startClock() {
  clockId = setInterval(tick, cfg.SPEED)
}

function stopClock() {
  clearInterval(clockId)
  console.debug('<<< STOP CLOCK >>>')
}

export { startClock, stopClock }
