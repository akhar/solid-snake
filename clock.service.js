'use strict'

import cfg from './config.js'
import { tick } from './service.js'

let clockId

function startClock() {
  clockId = setInterval(tick, cfg.SPEED)
}

function stopClock() {
  clearInterval(clockId)
}

export { startClock, stopClock }
