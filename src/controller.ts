import { fromEvent, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export class Controller {
  public init() {
    const eventSource = fromEvent(document, 'keydown') as Observable<KeyboardEvent>

    eventSource.pipe(map((event: KeyboardEvent) => event.code)).subscribe(this.handleKeyDown)
  }

  private handleKeyDown(key: KeyboardEvent['code']) {
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
       
        break
      case 'Escape':
       
        break
    }
  }
}


