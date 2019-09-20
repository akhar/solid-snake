import { HEIGHT, WIDTH, H, B, GRID_COLOR } from '../cfg.js'
// TODO: calculate number of grid lines
export function drowGrid(): void {
  drowRight()
  drowLeft()
  drowHorizont()

  stage.strokeStyle = GRID_COLOR
  stage.stroke(grid)
}

const canvas = document.getElementById('stage') as HTMLCanvasElement
const stage = canvas.getContext('2d') as CanvasRenderingContext2D
const grid = new Path2D()

function drowRight(): void {
  for (let i = -30; i < 50; i++) {
    grid.moveTo(B * i, 0)
    grid.lineTo(HEIGHT / Math.sqrt(3) + B * i, HEIGHT)
  }
}

function drowLeft() {
  for (let i = 1; i < 80; i++) {
    grid.moveTo(B * i, 0)
    grid.lineTo(-HEIGHT / Math.sqrt(3) + B * i, HEIGHT)
  }
}

function drowHorizont() {
  for (let i = 0; i < 59; i++) {
    const isOdd: boolean = i % 2 === 0
    isOdd ? grid.moveTo(0, H * i) : grid.moveTo(B / 2, H * i)
    isOdd ? grid.lineTo(WIDTH, H * i) : grid.lineTo(WIDTH - B / 2, H * i)
  }
}
