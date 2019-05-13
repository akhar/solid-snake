'use strict'

import { startClock, stopClock } from './clock.service.js'
import { cfg } from './config.js'
import { initController, initModel } from './init.service.js'
import { getModel, resetModel, updateModel } from './model.js'
import _ from './utils.js'
import { clearPanel, print, render } from './view.js'

function startGame() {
  initModel()
  initController()
  startClock()
}

function restartGame() {
  resetModel()
  clearPanel()
  stopClock()
  startGame()
}

function tick() {
  checkConditions()
  makeStep()
  checkConditions()
  render()
  console.debug('________________')
}

function makeStep() {
  const model = getModel()
  const newSnake = model.hasAte
    ? growHead(model.snake, model.direction)
    : dropTail(growHead(model.snake, model.direction))

  model.hasAte && updateModel('hasAte', false)
  updateModel('snake', newSnake)
}

function checkConditions() {
  const model = getModel()
  const head = model.snake[0]

  if (_.isCoodrsEqual(head, model.food)) {
    eating(model.count, model.snake, model.direction)
  }

  // border hit
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x > cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE ||
    head.y > cfg.SATGE_SIZE * cfg.GRID_SIZE - cfg.GRID_SIZE
  ) {
    print('Game Over')
    stopClock()
  }
}

function eating(count, snake, direction) {
  updateModel('hasAte', true)
  updateModel('count', ++count)
  growHead(snake, direction)
  palceFood()
  // TODO: eating without shrink
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

function changeDirection(newDirection) {
  const direction = getModel().direction
  // condition prevents reverse and duplicating of movments TODO: not enought
  direction[0] !== newDirection[0] && updateModel('direction', newDirection)
}

export { growHead, changeDirection, restartGame, startGame, tick }
