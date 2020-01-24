import { FOOD_COLOR, HEIGHT, SNAKE_COLOR, WIDTH } from '../cfg'
import { Coordinates, Model } from '../state'
import { drowGridOnCanvas } from './grid'
import { clearPanelOnCanvas, drowPanelOnCanvas } from './panel'
import { clearStageOnCanvas, drowTriangleOnCanvas } from './stage'

export interface Render {
  renderModel(model: Model): void
}

export class Render implements Render {
  private panel: HTMLCanvasElement
  private stage: HTMLCanvasElement
  private backstage: HTMLCanvasElement
  private info: HTMLElement

  constructor() {
    this.panel = document.getElementById('panel') as HTMLCanvasElement
    this.panel.width = WIDTH
    this.panel.height = HEIGHT

    this.stage = document.getElementById('stage') as HTMLCanvasElement
    this.stage.width = WIDTH
    this.stage.height = HEIGHT

    this.backstage = document.getElementById('backstage') as HTMLCanvasElement
    this.backstage.width = WIDTH
    this.backstage.height = HEIGHT

    this.info = document.getElementById('info')

    this.drowGrid()
  }

  public renderModel(model: Model): void {
    const { food, snake } = model
    this.clearStage()

    this.drowTriangle({ ...food, color: FOOD_COLOR })

    snake.forEach((tile: Coordinates, index: number) => {
      if (index === 0) {
        this.drowTriangle({ ...tile, color: SNAKE_COLOR, hasDot: true })
      } else {
        this.drowTriangle({ ...tile, color: SNAKE_COLOR })
      }
    })

    this.info.innerHTML = `${model.snake.length - 1} pts. ${model.seconds} sec.`

    model.isGameOver && this.drowPanel('Game over')
  }

  private drowPanel(text: string): void {
    drowPanelOnCanvas(this.panel, text)
  }

  private clearPanel(): void {
    clearPanelOnCanvas(this.panel)
  }

  private drowGrid(): void {
    drowGridOnCanvas(this.backstage)
  }

  private drowTriangle(tile: {
    row: number
    column: number
    color?: string
    hasDot?: boolean
  }): void {
    const { row, column, color, hasDot } = tile
    drowTriangleOnCanvas(this.stage, row, column, color, hasDot)
  }

  private clearStage(): void {
    clearStageOnCanvas(this.stage)
  }
}
