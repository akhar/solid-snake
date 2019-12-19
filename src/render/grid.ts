import { B, GRID_COLOR, H, HEIGHT, WIDTH } from '../cfg'

export function drowGridOnCanvas(canvas: HTMLCanvasElement): void {
  const backstage = canvas.getContext('2d') as CanvasRenderingContext2D
  const grid: Path2D = new Path2D()

  drowRight(grid)
  drowLeft(grid)
  drowHorizont(grid)

  backstage.strokeStyle = GRID_COLOR
  backstage.stroke(grid)
}

function drowRight(grid: Path2D): void {
  for (let i = -30; i < 50; i++) {
    grid.moveTo(B * i, 0)
    grid.lineTo(HEIGHT / Math.sqrt(3) + B * i, HEIGHT)
  }
}

function drowLeft(grid: Path2D) {
  for (let i = 1; i < 80; i++) {
    grid.moveTo(B * i, 0)
    grid.lineTo(-HEIGHT / Math.sqrt(3) + B * i, HEIGHT)
  }
}

function drowHorizont(grid: Path2D) {
  for (let i = 0; i < 59; i++) {
    const isOdd: boolean = i % 2 === 0
    isOdd ? grid.moveTo(0, H * i) : grid.moveTo(B / 2, H * i)
    isOdd ? grid.lineTo(WIDTH, H * i) : grid.lineTo(WIDTH - B / 2, H * i)
  }
}
