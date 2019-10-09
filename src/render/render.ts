import { clearPanelOnCanvas, drowPanelOnCanvas } from './panel'
import { drowGridOnCanvas } from './grid'
import { drowTriangleOnCanvas, clearStageOnCanvas } from './stage'
import { WIDTH, HEIGHT } from '../cfg'
import { Animation } from './animation'
import { Subscription } from 'rxjs'
import { StateInterface, State } from '../state'

export interface Render<StateInterface> {}

export class Render<StateInterface> implements Render<StateInterface> {
  private panel: HTMLCanvasElement
  private stage: HTMLCanvasElement
  private backstage: HTMLCanvasElement
  private animation: Animation<StateInterface>
  private animationStream: Subscription
  private state

  constructor(state: StateInterface) {
    this.panel = document.getElementById('panel') as HTMLCanvasElement
    this.stage = document.getElementById('stage') as HTMLCanvasElement
    this.backstage = document.getElementById('backstage') as HTMLCanvasElement
    this.animation = new Animation(this.render)
    this.state = state
  }

  private render(frame: number): void {
    frame % 60 === 0
      ? () => {
          console.log(frame)
        }
      : null
  }

  public init() {
    this.panel.width = WIDTH
    this.panel.height = HEIGHT
    this.stage.width = WIDTH
    this.stage.height = HEIGHT
    this.backstage.width = WIDTH
    this.backstage.height = HEIGHT
    this.animationStream = this.animation.animationStream
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
