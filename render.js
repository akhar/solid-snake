'use strict'

import { cfg } from './config.js'
import { getModel } from './model.js'

function renderFrame() {
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

function clearPanel() {
  clearScore()
  clearTitle()
}
function clearScore() {
  panel.clearRect(0, 0, cfg.PANEL_SIZE_Y, cfg.PANEL_SIZE_Y)
}

function clearTitle() {
  panel.clearRect(cfg.PANEL_SIZE_Y, 0, cfg.PANEL_SIZE_X, cfg.PANEL_SIZE_Y)
}

function paint() {
  const model = getModel()
  paintFood(model)
  paintSnake(model)
}

function paintSnake(model) {
  model.snake.map((segment, index) => {
    stage.fillStyle = cfg.SHADOW_COLOR
    stage.fillRect(segment.x, segment.y, cfg.TILE_SIZE, cfg.TILE_SIZE)
    stage.fillStyle = cfg.SNAKE_COLOR
    stage.fillRect(segment.x - 1, segment.y - 1, cfg.TILE_SIZE - 1, cfg.TILE_SIZE - 1)
    if (index === 0) {
      stage.fillStyle = cfg.SHADOW_COLOR
      stage.fillRect(segment.x + 2, segment.y + 2, cfg.TILE_SIZE - 7, cfg.TILE_SIZE - 7)
    }
  })
}

function paintFood(model) {
  stage.fillStyle = cfg.SHADOW_COLOR
  stage.fillRect(model.food.x, model.food.y, cfg.TILE_SIZE, cfg.TILE_SIZE)
  stage.fillStyle = cfg.FOOD_COLOR
  stage.fillRect(model.food.x - 1, model.food.y - 1, cfg.TILE_SIZE - 1, cfg.TILE_SIZE - 1)
}

function print(text) {
  panel.font = 'bold 24px monospace'
  panel.fillStyle = cfg.FOOD_COLOR
  panel.textBaseline = 'middle'
  panel.textAlign = 'center'
  panel.fillText(text, cfg.PANEL_SIZE_X / 2, cfg.PANEL_SIZE_Y / 2)
}

function printScore(score) {
  panel.font = '24px monospace'
  panel.fillStyle = cfg.SNAKE_COLOR
  panel.textBaseline = 'middle'
  panel.textAlign = 'center'
  panel.fillText(score, cfg.PANEL_SIZE_Y / 2, cfg.PANEL_SIZE_Y / 2)
}

export { renderFrame, print, clearPanel, clearTitle }
