import startGame from './service.js'
import { HEIGHT, WIDTH } from './cfg.js'

const run = (): void => {
  const canvas = document.getElementById('stage') as HTMLCanvasElement
  canvas.width = WIDTH
  canvas.height = HEIGHT
  // TODO: add loading... and refactor this onto init function
  startGame()
}

window.onload = run
