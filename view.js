'use strict'

import { cfg } from './config.js'
import { getModel } from './model.js'

function render() {
  clearStage()
  clearScore()
  paint()
  printScore(String(getModel().count))
}

const panel = document.getElementById('panel').getContext('2d')
const stage = document.getElementById('stage').getContext('2d')

function clearStage() {
  stage.clearRect(0, 0, cfg.SATGE_SIZE * cfg.GRID_SIZE, cfg.SATGE_SIZE * cfg.GRID_SIZE)
}

function clearScore() {
  panel.clearRect(0, 0, 30, cfg.PANEL_SIZE_Y)
}

function clearPanel() {
  panel.clearRect(0, 0, cfg.PANEL_SIZE_X, cfg.PANEL_SIZE_Y)
}

function paint() {
  const model = getModel()
  paintSnake(model)
  paintFood(model)
}

function paintSnake(model) {
  model.snake.map((segment, index) => {
    const alpha = index > 6 ? 0.6 : 1 / (index + 1)
    stage.fillStyle = `rgba(85, 107,	47, ${alpha})`
    stage.fillRect(segment.x, segment.y, cfg.TILE_SIZE, cfg.TILE_SIZE)
  })
}

function paintFood(model) {
  stage.fillStyle = cfg.FOOD_COLOR
  stage.fillRect(model.food.x, model.food.y, cfg.TILE_SIZE, cfg.TILE_SIZE)
}

function print(text) {
  panel.font = 'bold 24px monospace'
  panel.fillStyle = cfg.FOOD_COLOR
  panel.textBaseline = 'top'
  panel.textAlign = 'left'
  panel.fillText(text, 90, 15)
}

function printScore(text) {
  panel.font = '24px monospace'
  panel.fillStyle = cfg.SNAKE_COLOR
  panel.textBaseline = 'top'
  panel.textAlign = 'left'
  panel.fillText(text, 10, 15)
}

export { render, print, clearPanel }
