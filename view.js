'use strict'

import { getModel } from './model.js'

var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

svg.setAttribute('id', 'stage')
document.body.appendChild(svg)

function updateView() {
  document.body.removeChild('.snake')
  const model = getModel()
  model.snake.forEach((segment, index) => {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('id', 'segment' + index)
    svg.setAttribute('class', 'snake')
    document.body.appendChild(svg)
  })
}

export { updateView }
