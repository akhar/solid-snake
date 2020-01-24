import { AnimationClock } from './animation'
import { GRID_COLOR, PANEL_FONT, SNAKE_COLOR, WIDTH } from './cfg'
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
    * {
      margin: 0;
      padding: 0;
    }
    #info {
      height: 3rem;
      width: calc(${WIDTH}px - ${padding});
      color: ${SNAKE_COLOR};
      font: ${PANEL_FONT};
      background-color: ${GRID_COLOR};
      padding-left: ${padding};
      display: table-cell;
      vertical-align: middle;
    }

    .canvas {
      background-color: transparent;
      position: absolute;
    }
  `
  css.appendChild(document.createTextNode(styles))
  document.getElementsByTagName('head')[0].appendChild(css)
}
