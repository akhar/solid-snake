import { SPEED } from '../cfg.js'

let clockId: number

const intrval = 1000 / SPEED // from Hz to intrval of milliseconds

export function startClock(tick: Function): number {
  const clockId = setInterval(tick, intrval)
  return clockId
}

export function stopClock() {
  clearInterval(clockId)
}
