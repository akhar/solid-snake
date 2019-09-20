import { SPEED } from '../cfg.js';
let clockId;
const intrval = 1000 / SPEED;
export function startClock(tick) {
    const clockId = setInterval(tick, intrval);
    return clockId;
}
export function stopClock() {
    clearInterval(clockId);
}
