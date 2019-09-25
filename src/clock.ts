import { GAME_FREQ, SYSTEM_FREQ } from './cfg'
import { getTick } from './game'

let clockId: number

const intrval = 1000 / GAME_FREQ // from Hz to intrval of milliseconds

export function startClock(): void {
  clockId = setInterval(getTick(), intrval)
}

export function stopClock() {
  clearInterval(clockId)
}
