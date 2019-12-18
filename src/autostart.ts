import { Controller } from './controller'
import { Game } from './game'
import { AnimationClock } from './render/animation'
import { Render } from './render/render'
import { State } from './state'

window.onload = (): void => {
  const render = new Render()
  const state = new State()
  const animation = new AnimationClock()
  const controller = new Controller()
  
  new Game(render, state, animation, controller)
}
