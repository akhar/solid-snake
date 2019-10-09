import { fromEvent, Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export function initController() {
  const eventSource = fromEvent(document, 'keydown') as Observable<KeyboardEvent>
  eventSource.pipe(map((event: KeyboardEvent) => event.code)).subscribe(handleKeyDown)
}

function handleKeyDown(key: KeyboardEvent['code']) {
  switch (key) {
    case 'ArrowUp':
      alert(key)
      break
    case 'ArrowDown':
      alert(key)
      break
    case 'ArrowLeft':
      alert(key)
      break
    case 'ArrowRight':
      alert(key)
      break
    case 'KeyX':
      alert(key)
      break
    case 'Escape':
      alert(key)
      break
  }
}