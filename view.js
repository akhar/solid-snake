'use strict'

import { cfg } from './config.js'
import { getModel } from './model.js'

function render() {
  clear()
  paint()
}

const canvas = document.getElementById('stage')
const stage = canvas.getContext('2d')

function clear() {
  stage.clearRect(
    0,
    0,
    cfg.SATGE_SIZE * cfg.GRID_SIZE,
    cfg.SATGE_SIZE * cfg.GRID_SIZE
  )
}

function paint() {
  const model = getModel()
  paintFood()
  model.snake.map(segment => {
    stage.fillStyle = 'darkolivegreen'
    stage.fillRect(segment.x, segment.y, cfg.TILE_SIZE, cfg.TILE_SIZE)
  })
}

function paintFood() {
  const model = getModel()
  stage.fillStyle = 'firebrick'
  stage.fillRect(model.food.x, model.food.y, cfg.TILE_SIZE, cfg.TILE_SIZE)
}

export { render }
