import { initGame } from './service.js';
import { HEIGHT, WIDTH } from './cfg.js';
window.onload = () => {
    const canvas = document.getElementById('stage');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    initGame();
};
