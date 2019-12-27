import { B, BACKGROUND_COLOR, H, HEIGHT, WIDTH } from '../cfg'
import { getOrientation } from '../utils'

export enum Orient {
  DOWN,
  UP,
}

export function drowTriangleOnCanvas(
  canvas: HTMLCanvasElement,
  row: number,
  column: number,
  color: string,
  hasDot?: boolean
): void {
  const orientation: Orient = getOrientation(row, column)
  const x: number = ((column - 1) / 2) * B
  const y: number = orientation === Orient.DOWN ? (row - 1) * H : row * H

  drowTriangleAtPoint(canvas, x, y, orientation, color, hasDot)
}

function drowTriangleAtPoint(
  canvas: HTMLCanvasElement,
  x: number,
  y: number,
  orientation: Orient,
  color: string,
  hasDot?: boolean
): void {
  const stage = canvas.getContext('2d') as CanvasRenderingContext2D
  const orientedCoordinate: number = orientation === Orient.DOWN ? y + H : y - H
  const orientedCenterCoordinate: number =
    orientation === Orient.DOWN ? y + H / 3 : y - H / 3

  const triangle = new Path2D()
  triangle.moveTo(x, y)
  triangle.lineTo(B / 2 + x, orientedCoordinate)
  triangle.lineTo(B + x, y)
  triangle.closePath()

  stage.fillStyle = color
  stage.fill(triangle)

  if (hasDot) {
    const circle = new Path2D()
    circle.arc(x + B / 2, orientedCenterCoordinate, H / 9, 0, 2 * Math.PI)
    circle.closePath()

    stage.fillStyle = BACKGROUND_COLOR
    stage.fill(circle)
  }
}

export function clearStageOnCanvas(canvas: HTMLCanvasElement): void {
  const stage = canvas.getContext('2d') as CanvasRenderingContext2D
  stage.clearRect(0, 0, WIDTH, HEIGHT)
}
