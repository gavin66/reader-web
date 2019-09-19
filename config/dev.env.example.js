'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 你的本地开发环境 baseURL
  READER_BASE_API: '"http://127.0.0.1:8001/api"'
})
