import { drowTriangle } from './render/stage.js'
import { drowGrid } from './render/grid.js'
import { startClock } from './time/clock.js'
import { WIDTH, HEIGHT, TRIANGLES } from './cfg.js'
import { drowPanel } from './render/panel.js'

export function getTick(canvas: HTMLCanvasElement): Function {
  return () => {
    clearStage(canvas)
    showBackgroundArt(canvas)
  }
}

function clearStage(canvas: HTMLCanvasElement): void {
  const stage = canvas.getContext('2d') as CanvasRenderingContext2D
  stage.clearRect(0, 0, WIDTH, HEIGHT)
}

export function initGame(): void {
  const backstage = document.getElementById('backstage') as HTMLCanvasElement
  backstage.width = WIDTH
  backstage.height = HEIGHT
  drowGrid(backstage)

  const panel = document.getElementById('panel') as HTMLCanvasElement
  panel.width = WIDTH
  panel.height = HEIGHT
  drowPanel(panel, 'Press X to win')

  const stage = document.getElementById('stage') as HTMLCanvasElement
  stage.width = WIDTH
  stage.height = HEIGHT

  startClock(stage)
}

function showBackgroundArt(canvas: HTMLCanvasElement): void {
  for (let index = 0; index < 500; index++) {
    requestAnimationFrame(() =>
      drowTriangle(
        canvas,
        makeRundomUpTo(TRIANGLES),
        makeRundomUpTo(TRIANGLES * 2 - 1),
        'PeachPuff'
      )
    )
  }
}

function makeRundomUpTo(limit: number): number {
  return Math.floor(Math.random() * limit + 1)
}
