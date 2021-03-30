import * as d3 from 'd3';
import { event } from 'jquery';

export default class RadialArea {
  constructor(selector) {
    // 画布
    this.map = d3.select(selector);
    this.drawVenn()


  }
  drawVenn() {
    this.SVG = this.map.append("svg")
      .style("width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif")


  }
}