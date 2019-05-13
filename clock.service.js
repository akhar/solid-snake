'use strict'

import { cfg } from './config.js'
import { tick } from './service.js'

let clockId

function startClock() {
  clockId = setInterval(tick, cfg.SPEED)
  console.debug('Start')
}

function stopClock() {
  clearInterval(clockId)
  console.debug('Stop')
}

export { startClock, stopClock }
