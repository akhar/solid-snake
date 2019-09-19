import { H, B } from '../cfg.js';
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
