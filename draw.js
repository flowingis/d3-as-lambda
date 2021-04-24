const jsdom = require('jsdom')
const { JSDOM } = jsdom

const d3 = require('d3')

function svgDOM (width, height) {
  const dom = new JSDOM('<!DOCTYPE html>')
  const document = dom.window.document
  const body = d3.select(document.body)

  return body.append('svg')
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    .attr('width', width)
    .attr('height', height)
}

function d3Draw () {
  const π = Math.PI
  const τ = 2 * π
  const n = 500

  const width = 960
  const height = 960
  const outerRadius = width / 2 - 20
  const innerRadius = outerRadius - 80

  const svg = svgDOM(width, height)
  svg
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
    .selectAll('path')
    .data(d3.range(0, τ, τ / n))
    .enter().append('path')
    .attr('d', d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius)
      .startAngle(function (d) { return d })
      .endAngle(function (d) { return d + τ / n * 1.1 }))
    .style('fill', function (d) { return d3.hsl(d * 360 / τ, 1, 0.5) })

  return svg.node().outerHTML
}

module.exports = d3Draw

console.log(d3Draw())
