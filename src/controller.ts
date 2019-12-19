import { fromEvent, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { Coordinates, Model, State } from './state'

export interface Controller<T> {}

enum Direction {
  LEFT,
  L_UP,
  R_UP,
  RIGHT,
  R_DOWN,
  L_DOWN,
}

enum Keys {
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  ArrowDown,
}

export class Controller<T> implements Controller<T> {
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

  private filterKeys(code: string): boolean {
    return Object.keys(Keys).includes(code) ? true : false
  }

  private handleKeyDown = (key: KeyboardEvent['code']) => {
    const keys = this.model.activeKeys

    console.debug(`${key} has pressed`)
    switch (key) {
      case 'ArrowUp':
        break
      case 'ArrowDown':
        break
      case 'ArrowLeft':
        this.moveHorizontal(Direction.LEFT)
        break
      case 'ArrowRight':
        this.moveHorizontal(Direction.RIGHT)
        break
      case 'KeyX':
        break
      case 'Escape':
        break
    }
  }

  private handleKeyUp = (key: KeyboardEvent['code']) => {
    console.debug(`${key} has relised`)
  }

  private moveHorizontal = (direction: Direction): void => {
    const snake: Coordinates[] = this.model.snake.map(t => {
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
