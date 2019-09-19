import { H, B } from '../cfg.js'

export enum Orient {
  DOWN,
  UP,
}

export interface Triangle {
  x: number
  y: number
  orientation: Orient
}

export function drowTriangle(x: number, y: number, orientation: Orient): void {
  const canvas = document.getElementById('stage') as HTMLCanvasElement
  const stage = canvas.getContext('2d') as CanvasRenderingContext2D

  const orientedCoordinate: number = orientation === Orient.DOWN ? y + H : y - H

  const triangle = new Path2D()
  triangle.moveTo(x, y)
  triangle.lineTo(B / 2 + x, orientedCoordinate)
  triangle.lineTo(B + x, y)
  triangle.closePath()

  stage.fillStyle = 'lightblue'
  stage.fill(triangle)
}
