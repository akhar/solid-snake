import { AnimationClock } from './animation'
import { Game } from './game'
import { Keyboard } from './keyboard'
import { Render } from './render/render'
import { State } from './state'

window.onload = (): void => {
  const render = new Render()
  const state = new State()
  const animation = new AnimationClock()

  new Game(render, state, animation)
  new Keyboard(state)
}
