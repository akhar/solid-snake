import { drowTriangle } from './render/stage.js';
import { drowGrid } from './render/grid.js';
import { startClock } from './time/clock.js';
import { WIDTH, HEIGHT, TRIANGLES } from './cfg.js';
import { drowPanel } from './render/panel.js';
export function getTick(canvas) {
    return () => {
        clearStage(canvas);
        showBackgroundArt(canvas);
    };
}
function clearStage(canvas) {
    const stage = canvas.getContext('2d');
    stage.clearRect(0, 0, WIDTH, HEIGHT);
}
export function initGame() {
    const backstage = document.getElementById('backstage');
    backstage.width = WIDTH;
    backstage.height = HEIGHT;
    drowGrid(backstage);
    const panel = document.getElementById('panel');
    panel.width = WIDTH;
    panel.height = HEIGHT;
    drowPanel(panel, 'Press X to win');
    const stage = document.getElementById('stage');
    stage.width = WIDTH;
    stage.height = HEIGHT;
    startClock(stage);
}
function showBackgroundArt(canvas) {
    for (let index = 0; index < 500; index++) {
        requestAnimationFrame(() => drowTriangle(canvas, makeRundomUpTo(TRIANGLES), makeRundomUpTo(TRIANGLES * 2 - 1), 'PeachPuff'));
    }
}
function makeRundomUpTo(limit) {
    return Math.floor(Math.random() * limit + 1);
}
