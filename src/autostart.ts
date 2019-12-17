import { Game } from './game'
import { Controller } from './controller'

window.onload = (): void => {
  const game = new Game()
  const controller = new Controller()
  game.init()
  controller.init()
}
