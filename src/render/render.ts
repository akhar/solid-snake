import { BACKGROUND_COLOR, FOOD_COLOR, HEIGHT, SNAKE_COLOR, WIDTH } from '../cfg'
import { Coordinates, Model } from '../state'
import { drowGridOnCanvas } from './grid'
import { clearPanelOnCanvas, drowPanelOnCanvas } from './panel'
import {
  clearStageOnCanvas,
  drowCircleInTriangleOnCanvas,
  drowTriangleBorderOnCanvas,
  drowTriangleOnCanvas,
} from './stage'

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
    const { food, snake, eaten } = model
    this.clearStage()
    this.clearPanel()

    this.drowTriangle({ ...food, color: FOOD_COLOR })
    this.renderSnake(snake, eaten)

    this.info.innerHTML = `${model.snake.length - 1} pts. ${model.seconds} sec.`

    model.isGameOver && this.drowPanel('Game over')
  }

  private renderSnake(snake: Coordinates[], eaten: Coordinates[]): void {
    snake.forEach((tile: Coordinates) => {
      this.drowTriangle({ ...tile, color: SNAKE_COLOR })
    })
    eaten.forEach((tile: Coordinates) => {
      this.drowTriangleBorder({ ...tile, color: SNAKE_COLOR })
    })
    this.drowDotInTriangle({ ...snake[0], color: BACKGROUND_COLOR })
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

  private drowTriangle(tile: { row: number; column: number; color: string }): void {
    const { row, column, color } = tile
    drowTriangleOnCanvas(this.stage, row, column, color)
  }

  private drowTriangleBorder(tile: { row: number; column: number; color: string }): void {
    const { row, column, color } = tile
    drowTriangleBorderOnCanvas(this.stage, row, column, color)
  }

  private drowDotInTriangle(tile: { row: number; column: number; color: string }) {
    const { row, column, color } = tile
    drowCircleInTriangleOnCanvas(this.stage, row, column, color)
  }

  private clearStage(): void {
    clearStageOnCanvas(this.stage)
  }
}
