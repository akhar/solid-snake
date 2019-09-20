import { WIDTH, HEIGHT } from '../cfg.js';
export function tick(render) {
    clearStage();
    console.log('clear');
    render();
}
function clearStage() {
    const canvas = document.getElementById('stage');
    const stage = canvas.getContext('2d');
    stage.clearRect(0, 0, WIDTH, HEIGHT);
}
