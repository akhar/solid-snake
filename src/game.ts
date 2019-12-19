import { AnimationClock } from './animation'
import { Render } from './render/render'
import { Model, State } from './state'

export class Game {
  private render: Render
  private state: State
  private model: Model

  constructor(render: Render, state: State, animation: AnimationClock) {
    this.state = state
    this.render = render

    this.state.observe((model: Model): void => {
      this.model = model
    })

    animation.start((frame: number): void => {
      this.render.renderModel(this.model)
    })
  }
}
