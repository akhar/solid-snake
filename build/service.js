import { drowTriangle } from './render/triangle.js';
import { drowGrid } from './render/grid.js';
import { startClock } from './time/clock.js';
import { WIDTH, HEIGHT } from './cfg.js';
import { TRIANLES } from './cfg.js';
function tick() {
    clearStage();
    console.log('clear');
    drowGrid();
    showBackgroundArt();
}
function clearStage() {
    const canvas = document.getElementById('stage');
    const stage = canvas.getContext('2d');
    stage.clearRect(0, 0, WIDTH, HEIGHT);
}
export function initGame() {
    const foo = startClock(tick);
    console.debug(foo);
}
function startGame() { }
function showMenu() { }
function showBackgroundArt() {
    for (let index = 0; index < 500; index++) {
        drowTriangle(makeRundomUpTo(TRIANLES), makeRundomUpTo(TRIANLES * 2 - 1), 'PeachPuff');
    }
}
function makeRundomUpTo(limit) {
    return Math.floor(Math.random() * limit + 1);
}
