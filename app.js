const ApiBuilder = require('claudia-api-builder')
const api = new ApiBuilder()
const draw = require('./draw')

module.exports = api

api.get('/', function () {
  try {
    const svg = draw()
    return new ApiBuilder.ApiResponse(svg, { 'Content-Type': 'image/svg+xml' }, 200)
  } catch (e) {
    return e.message
  }
})
