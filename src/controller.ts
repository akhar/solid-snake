import { fromEvent, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Controller {
  eventSourct: Observable<KeyboardEvent>
  start(handler: Function): void
}

export class Controller implements Controller {
  private eventSource: Observable<KeyboardEvent>

  constructor() {
    this.eventSource = fromEvent(document, 'keydown') as Observable<KeyboardEvent>
  }

  public start(handler): void {
    this.eventSource.pipe(map((event: KeyboardEvent) => event.code)).subscribe(handler)
  }
}
