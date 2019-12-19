import { AnimationClock } from './animation'
import { Controller } from './controller'
import { Game } from './game'
import { Render } from './render/render'
import { State } from './state'

window.onload = (): void => {
  const render = new Render()
  const state = new State()
  const animation = new AnimationClock()

  new Game(render, state, animation)
  new Controller(state)
}
