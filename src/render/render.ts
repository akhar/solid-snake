import { clearPanelOnCanvas, drowPanelOnCanvas } from './panel'
import { drowGridOnCanvas } from './grid'
import { drowTriangleOnCanvas, clearStageOnCanvas } from './stage'
import { WIDTH, HEIGHT } from '../cfg'
import { Animation } from './animation'
import { StateType, StateInterface } from '../state'

export class Render {
  private panel: HTMLCanvasElement
  private stage: HTMLCanvasElement
  private backstage: HTMLCanvasElement
  private animation: Animation
  private state: StateInterface

  constructor(state: StateInterface) {
    this.panel = document.getElementById('panel') as HTMLCanvasElement
    this.stage = document.getElementById('stage') as HTMLCanvasElement
    this.backstage = document.getElementById('backstage') as HTMLCanvasElement
    this.panel.width = WIDTH
    this.panel.height = HEIGHT
    this.stage.width = WIDTH
    this.stage.height = HEIGHT
    this.backstage.width = WIDTH
    this.backstage.height = HEIGHT

    this.state = state
    this.state.observe(this.bar)
    this.animation = new Animation()
    this.animation.start(this.foo)
  }

  private foo = (frame: number): void => {
    frame % 120 === 0
      ? this.state.changeState({
          name: 'score',
          value: frame,
        })
      : null
  }

  private bar = (nextState: StateType): void => {
    console.log(nextState)
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
