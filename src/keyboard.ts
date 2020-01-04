import { fromEvent, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { Model, State } from './state'

enum Keys {
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Space,
}

export class Keyboard {
  private keysDowns: Observable<KeyboardEvent>
  private keysUps: Observable<KeyboardEvent>
  private model: Model
  private state: State

  constructor(state: State) {
    this.keysDowns = fromEvent(document, 'keydown') as Observable<KeyboardEvent>
    this.keysUps = fromEvent(document, 'keyup') as Observable<KeyboardEvent>

    this.state = state
    this.state.observe((model: Model): void => {
      this.model = model
    })

    this.keysUps
      .pipe(
        map((event: KeyboardEvent) => event.code),
        filter(this.filterKeys)
      )
      .subscribe(this.handleKeyUp)

    this.keysDowns
      .pipe(
        map((event: KeyboardEvent) => event.code),
        filter(this.filterKeys)
      )
      .subscribe(this.handleKeyDown)
  }

  private handleKeyDown = (key: KeyboardEvent['code']) => {
    this.state.changeState({
      name: 'activeKeys',
      value: { ...this.model.activeKeys, [key]: true },
    })
  }

  private handleKeyUp = (key: KeyboardEvent['code']) => {
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

  private filterKeys(code: string): boolean {
    return Object.keys(Keys).includes(code) ? true : false
  }
}
