import { HEIGHT, WIDTH, H, B } from '../cfg.js'

export function drowGrid(): void {
  drowRight()
  drowLeft()
  drowHorizont()
}

function drowRight(): void {
  const canvas = document.getElementById('stage') as HTMLCanvasElement
  const stage = canvas.getContext('2d') as CanvasRenderingContext2D

  const grid = new Path2D()

  for (let i = -30; i < 50; i++) {
    grid.moveTo(B * i, 0)
    grid.lineTo(HEIGHT / Math.sqrt(3) + B * i, HEIGHT)
  }

  stage.strokeStyle = 'darkgreen'
  stage.stroke(grid)
}

function drowLeft() {
  const canvas = document.getElementById('stage') as HTMLCanvasElement
  const stage = canvas.getContext('2d') as CanvasRenderingContext2D

  const grid = new Path2D()

  for (let i = 1; i < 80; i++) {
    grid.moveTo(B * i, 0)
    grid.lineTo(-HEIGHT / Math.sqrt(3) + B * i, HEIGHT)
  }

  stage.strokeStyle = 'firebrick'
  stage.stroke(grid)
}

function drowHorizont() {
  const canvas = document.getElementById('stage') as HTMLCanvasElement
  const stage = canvas.getContext('2d') as CanvasRenderingContext2D

  const grid = new Path2D()

  for (let i = 0; i < 58; i++) {
    grid.moveTo(0, H * i)
    grid.lineTo(WIDTH, H * i)
  }

  stage.strokeStyle = 'white'
  stage.stroke(grid)
}
