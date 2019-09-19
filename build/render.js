import { HEIGHT, WIDTH, H, B } from './cfg.js';
export var Orient;
(function (Orient) {
    Orient[Orient["DOWN"] = 0] = "DOWN";
    Orient[Orient["UP"] = 1] = "UP";
})(Orient || (Orient = {}));
export function drowTriangle(x, y, orientation) {
    const canvas = document.getElementById('stage');
    const stage = canvas.getContext('2d');
    const orientedCoordinate = orientation === Orient.DOWN ? y + H : y - H;
    const triangle = new Path2D();
    triangle.moveTo(x, y);
    triangle.lineTo(B / 2 + x, orientedCoordinate);
    triangle.lineTo(B + x, y);
    triangle.closePath();
    stage.fillStyle = 'lightblue';
    stage.fill(triangle);
}
function drowRight() {
    const canvas = document.getElementById('stage');
    const stage = canvas.getContext('2d');
    const grid = new Path2D();
    for (let i = -30; i < 50; i++) {
        grid.moveTo(B * i, 0);
        grid.lineTo(HEIGHT / Math.sqrt(3) + B * i, HEIGHT);
    }
    stage.strokeStyle = 'darkgreen';
    stage.stroke(grid);
}
function drowLeft() {
    const canvas = document.getElementById('stage');
    const stage = canvas.getContext('2d');
    const grid = new Path2D();
    for (let i = 1; i < 80; i++) {
        grid.moveTo(B * i, 0);
        grid.lineTo(-HEIGHT / Math.sqrt(3) + B * i, HEIGHT);
    }
    stage.strokeStyle = 'firebrick';
    stage.stroke(grid);
}
function drowHorizon() {
    const canvas = document.getElementById('stage');
    const stage = canvas.getContext('2d');
    const grid = new Path2D();
    for (let i = 0; i < 58; i++) {
        grid.moveTo(0, H * i);
        grid.lineTo(WIDTH, H * i);
    }
    stage.strokeStyle = 'white';
    stage.stroke(grid);
}
export function drowGrid() {
    drowRight();
    drowLeft();
    drowHorizon();
}
