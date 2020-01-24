import { AnimationClock } from './animation'
import { GRID_COLOR, SNAKE_COLOR, WIDTH } from './cfg'
import { Directions } from './direction'
import { Game } from './game'
import { Keyboard } from './keyboard'
import { Render } from './render/render'
import { State } from './state'

window.onload = (): void => {
  const render = new Render()
  const state = new State()
  const animation = new AnimationClock()
  const directions = new Directions(state)

  new Keyboard(state)
  new Game(render, state, animation, directions)

  const css = document.createElement('style')
  css.type = 'text/css'

  const padding: string = '2rem'

  const styles = `
    #info {
      height: 3rem;
      width: calc(${WIDTH}px - ${padding});
      color: ${SNAKE_COLOR};
      font: italic 2rem 'Fira Sans', serif;
      background-color: ${GRID_COLOR};
      padding-left: ${padding};
      display: table-cell;
      vertical-align: bottom;
    }

    .canvas {
      background-color: transparent;
      position: absolute;
    }
  `
  css.appendChild(document.createTextNode(styles))
  document.getElementsByTagName('head')[0].appendChild(css)
}
