import * as d3 from 'd3';
import { event } from 'jquery';

export default class Venn {
    constructor(selector) {
        // 画布
        this.map = d3.select(selector);

        this.defaultWH = {
            width: parseInt(this.map.style('width')),
            height: parseInt(this.map.style('height')),
        }

        this.drawVenn()



    }
    drawVenn() {
        this.SVG = this.map.append("svg")
            .attr("viewBox", `${-this.defaultWH.width / 6} ${-this.defaultWH.height / 7} ${this.defaultWH.width * 1.8} ${this.defaultWH.height * 1.8}`)
            .style("width", "100%")
            .style("height", "auto")

        
    }
}