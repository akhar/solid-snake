import { GAME_FREQ, SYSTEM_FREQ } from '../cfg.js'
import { getTick } from '../game.js'

let clockId: number

const intrval = 1000 / GAME_FREQ // from Hz to intrval of milliseconds

export function startClock(canvas: HTMLCanvasElement): void {
  clockId = setInterval(getTick(canvas), intrval)
}

export function stopClock() {
  clearInterval(clockId)
}
