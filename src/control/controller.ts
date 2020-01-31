import { Model, State } from '../state';

export interface Controller {
  handleKeyUp(key: KeyboardEvent['code']): void
  handleKeyDown(key: KeyboardEvent['code']): void
}

export class Controller implements Controller {
  private model: Model
  private state: State

  constructor(state: State) {
    this.state = state
    this.state.observe((model: Model): void => {
      this.model = model
    })
  }

  public handleKeyDown = (key: KeyboardEvent['code']): void => {
    this.state.changeState({
      name: 'activeKeys',
      value: { ...this.model.activeKeys, [key]: true },
    })
  }

  public handleKeyUp = (key: KeyboardEvent['code']): void => {
    if (key === 'Enter') {
      this.state.initModel()
    }
    if (key === 'Space') {
      this.state.changeState({
        name: 'isRunning',
        value: !this.model.isRunning,
      })
    }
    this.state.changeState({
      name: 'activeKeys',
      value: { ...this.model.activeKeys, [key]: false },
    })
  }
}