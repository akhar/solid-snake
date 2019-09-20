import { H, B } from '../cfg.js';
export var Orient;
(function (Orient) {
    Orient[Orient["DOWN"] = 0] = "DOWN";
    Orient[Orient["UP"] = 1] = "UP";
})(Orient || (Orient = {}));
export function drowTriangle(row, column, color) {
    const isRowOdd = row % 2 === 0;
    const isColumnOdd = column % 2 === 0;
    const orientation = (isRowOdd && isColumnOdd) || (!isRowOdd && !isColumnOdd) ? Orient.DOWN : Orient.UP;
    const x = ((column - 1) / 2) * B;
    const y = orientation === Orient.DOWN ? (row - 1) * H : row * H;
    drowTriangleAtPoint(x, y, orientation, color);
}
function drowTriangleAtPoint(x, y, orientation, color) {
    const canvas = document.getElementById('stage');
    const stage = canvas.getContext('2d');
    const orientedCoordinate = orientation === Orient.DOWN ? y + H : y - H;
    const triangle = new Path2D();
    triangle.moveTo(x, y);
    triangle.lineTo(B / 2 + x, orientedCoordinate);
    triangle.lineTo(B + x, y);
    triangle.closePath();
    stage.fillStyle = color;
    stage.fill(triangle);
}
