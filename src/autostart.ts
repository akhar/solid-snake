import { initGame } from './service.js'
import { HEIGHT, WIDTH } from './cfg.js'

window.onload = (): void => {
  const canvas = document.getElementById('stage') as HTMLCanvasElement
  canvas.width = WIDTH
  canvas.height = HEIGHT

  initGame()
}
