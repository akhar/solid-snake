import { Game } from './game'
import { initController } from './controller'

window.onload = (): void => {
  const game = new Game()
  game.init()
  initController()
}
