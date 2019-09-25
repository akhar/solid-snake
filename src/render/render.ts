import { clearPanelOnCanvas, drowPanelOnCanvas } from './panel'
import { drowGridOnCanvas } from './grid'
import { drowTriangleOnCanvas, clearStageOnCanvas } from './stage'
import { WIDTH, HEIGHT } from '../cfg'

export class Render {
  public panel: HTMLCanvasElement
  public stage: HTMLCanvasElement
  public backstage: HTMLCanvasElement

  constructor() {
    this.panel = document.getElementById('panel') as HTMLCanvasElement
    this.stage = document.getElementById('stage') as HTMLCanvasElement
    this.backstage = document.getElementById('backstage') as HTMLCanvasElement
  }

  public init() {
    this.panel.width = WIDTH
    this.panel.height = HEIGHT
    this.stage.width = WIDTH
    this.stage.height = HEIGHT
    this.backstage.width = WIDTH
    this.backstage.height = HEIGHT
  }

  public drowPanel(text: string): void {
    drowPanelOnCanvas(this.panel, text)
  }

  public clearPanel(): void {
    clearPanelOnCanvas(this.panel)
  }

  public drowGrid(): void {
    drowGridOnCanvas(this.backstage)
  }

  public drowTriangle(row: number, column: number, color: string): void {
    drowTriangleOnCanvas(this.stage, row, column, color)
  }

  public clearStage(): void {
    clearStageOnCanvas(this.stage)
  }
}
