import { HEIGHT, WIDTH } from '../cfg'
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

    this.drowGrid()
  }

  public renderModel(model: Model): void {
    this.clearStage()

    model.snake.forEach((tile: Coordinates) =>
      this.drowTriangle(tile.row, tile.column, tile.color)
    )
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

  private drowTriangle(row: number, column: number, color: string): void {
    drowTriangleOnCanvas(this.stage, row, column, color)
  }

  private clearStage(): void {
    clearStageOnCanvas(this.stage)
  }
}
