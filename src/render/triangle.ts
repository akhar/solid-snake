import { H, B } from '../cfg.js'

export enum Orient {
  DOWN,
  UP,
}

export function drowTriangle(row: number, column: number, color: string): void {
  const isRowOdd: boolean = row % 2 === 0
  const isColumnOdd: boolean = column % 2 === 0
  const orientation: Orient =
    (isRowOdd && isColumnOdd) || (!isRowOdd && !isColumnOdd) ? Orient.DOWN : Orient.UP

  const x: number = ((column - 1) / 2) * B
  const y: number = orientation === Orient.DOWN ? (row - 1) * H : row * H

  drowTriangleAtPoint(x, y, orientation, color)
}

function drowTriangleAtPoint(x: number, y: number, orientation: Orient, color: string): void {
  const canvas = document.getElementById('stage') as HTMLCanvasElement
  const stage = canvas.getContext('2d') as CanvasRenderingContext2D

  const orientedCoordinate: number = orientation === Orient.DOWN ? y + H : y - H

  const triangle = new Path2D()
  triangle.moveTo(x, y)
  triangle.lineTo(B / 2 + x, orientedCoordinate)
  triangle.lineTo(B + x, y)
  triangle.closePath()

  stage.fillStyle = color
  stage.fill(triangle)
}
