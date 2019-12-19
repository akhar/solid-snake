import { fromEvent, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { Coordinates, Direction, Model, State } from './state'

enum Keys {
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  ArrowDown,
}

export class Controller {
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
      value: { ...this.model.input.activeKeys, [key]: true },
    })
  }

  private handleKeyUp = (key: KeyboardEvent['code']) => {
    this.state.changeState({
      name: 'activeKeys',
      value: { ...this.model.input.activeKeys, [key]: false },
    })
  }

  private filterKeys(code: string): boolean {
    return Object.keys(Keys).includes(code) ? true : false
  }

  private moveHorizontal = (direction: Direction): void => {
    const snake: Coordinates[] = this.model.output.snake.map(t => {
      return {
        row: t.row,
        column: direction === Direction.RIGHT ? t.column + 1 : t.column - 1,
        color: t.color,
      }
    })

    this.state.changeState({
      name: 'snake',
      value: snake,
    })
  }
}
