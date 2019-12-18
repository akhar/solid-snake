import { Controller } from './controller'
import { AnimationClock } from './render/animation'
import { Render } from './render/render'
import { Model, State } from './state'

export class Game {
  private render: Render
  private state: State
  private animation: AnimationClock
  private controller: Controller
  private model: Model

  constructor(render: Render, state: State, animation: AnimationClock, controller: Controller) {
    this.state = state
    this.animation = animation
    this.controller = controller
    this.render = render

    state.observe(this.stateObserver)
    animation.start(this.animationClockObserver)
    controller.start(this.handleKeyDown)
  }

  private stateObserver = (model: Model): void => {
    this.model = model
  }

  private animationClockObserver = (frame: number): void => {
    this.render.renderModel(this.model)
  }
  
  private handleKeyDown = (key: KeyboardEvent['code']) => {
    console.debug(`${key} has pressed`)
    switch (key) {
      case 'ArrowUp':
        break
      case 'ArrowDown':
        break
      case 'ArrowLeft':
        break
      case 'ArrowRight':
        break
      case 'KeyX':
        this.state.changeState({
          name: 'snake',
          value: [{
            row: 13, column: 10, color: 'firebrick'
          }],
        })
        break
      case 'Escape':
        break
    }
  }
}
