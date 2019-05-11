'use strict'

import { cfg } from './config.js'
import { main } from './main.js'
import { getModel, resetModel, updateModel } from './model.js'
import _ from './utils.js'
import { clearPanel, print } from './view.js'

function restart() {
  resetModel()
  clearPanel()
  main()
  // TODO: reset tiker
}

function makeStep() {
  const model = getModel()
  const newSnake = model.hasAte
    ? growHead(model.snake, model.direction)
    : dropTail(growHead(model.snake, model.direction))

  model.hasAte && updateModel('hasAte', false)
  updateModel('snake', newSnake)
}

function checkConditions(tiker) {
  const model = getModel()
  const head = model.snake[0]

  if (_.isCoodrsEqual(head, model.food)) {
    eating(model.count)
  }

  // border hit
  if (
    head.x <= 0 ||
    head.y <= 0 ||
    head.x >= cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE ||
    head.y >= cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE
  ) {
    print('Game Over')
    clearInterval(tiker)
    console.debug('<<< STOP TICKER >>>')
  }
}

function eating(count) {
  updateModel('hasAte', true)
  updateModel('count', ++count)
  palceFood()
  // TODO: eating on edge; eating without shrink
}

function palceFood() {
  updateModel('food', _.getRandomCoords(cfg.SATGE_SIZE * cfg.GRID_SIZE))
}

function growHead(snake, direction) {
  const head = snake[0]
  switch (direction) {
    case 'x--':
      return [{ x: head.x - cfg.TILE_SIZE, y: head.y }, ...snake]
    case 'y--':
      return [{ x: head.x, y: head.y - cfg.TILE_SIZE }, ...snake]
    case 'x++':
      return [{ x: head.x + cfg.TILE_SIZE, y: head.y }, ...snake]
    case 'y++':
      return [{ x: head.x, y: head.y + cfg.TILE_SIZE }, ...snake]
  }
}

function dropTail(snake) {
  return snake.slice(0, -1)
}

function initModel() {
  const direction = _.getRandomDirection()
  const startPoint = [_.getRandomSafeCoords(cfg.SATGE_SIZE * cfg.GRID_SIZE)]
  const snake = growHead(growHead(startPoint, direction), direction) // TODO: refactor this shit

  return {
    count: 0,
    snake,
    direction,
    food: _.getRandomSafeCoords(cfg.SATGE_SIZE * cfg.GRID_SIZE),
    hasAte: false
  }
}

function changeDirection(newDirection) {
  const direction = getModel().direction
  // condition prevents reverse and duplicating of movments
  direction[0] !== newDirection[0] && updateModel('direction', newDirection)
}

export { makeStep, checkConditions, initModel, changeDirection, restart }
