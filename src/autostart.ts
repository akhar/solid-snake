import { initGame } from './game'
import { initController } from './controller'

window.onload = (): void => {
  initGame()
  initController()
}
