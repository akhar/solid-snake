import startGame from './service.js';
import { HEIGHT, WIDTH } from './cfg.js';
const run = () => {
    const canvas = document.getElementById('stage');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    startGame();
};
window.onload = run;
