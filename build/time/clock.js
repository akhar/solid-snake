import { GAME_FREQ } from '../cfg.js';
import { getTick } from '../game.js';
let clockId;
const intrval = 1000 / GAME_FREQ;
export function startClock(canvas) {
    clockId = setInterval(getTick(canvas), intrval);
}
export function stopClock() {
    clearInterval(clockId);
}
