import { fromEvent, Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { State } from '../state'
import { Controller } from './controller'

enum Keys {
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Space,
  Enter,
}

export class Keyboard {
  private keysDowns: Observable<KeyboardEvent>
  private keysUps: Observable<KeyboardEvent>
  private controller: Controller

  constructor(state: State) {
    this.controller = new Controller(state)
    this.keysUps = fromEvent(document, 'keyup') as Observable<KeyboardEvent>
    this.keysUps
      .pipe(
        map((event: KeyboardEvent) => event.code),
        filter(this.filterKeys)
      )
      .subscribe(this.controller.handleKeyUp)

    this.keysDowns = fromEvent(document, 'keydown') as Observable<KeyboardEvent>
    this.keysDowns
      .pipe(
        map((event: KeyboardEvent) => event.code),
        filter(this.filterKeys)
      )
      .subscribe(this.controller.handleKeyDown)
  }

  private filterKeys(code: string): boolean {
    return Object.keys(Keys).includes(code) ? true : false
  }
}
