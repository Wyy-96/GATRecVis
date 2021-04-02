import * as d3 from 'd3';
import { event } from 'jquery';

export default class Coordinate {
    constructor(selector) {
        // 画布
        this.map = d3.select(selector);

        this.defaultWH = {
            width: parseInt(this.map.style('width')),
            height: parseInt(this.map.style('height')),
        }

        this.Coordinate()



    }
    Coordinate() {

        var sample_data = [
            {
                "pre": 0.0213,
                "rec": 0.1000,
                "auc": 0.8447,
                "personal": 0.0031,
            },
            {

                "pre": 0.0106,
                "rec": 0.05,
                "auc": 0.8951,
                "personal": 0.6098,
            }
        ]

        let keys = ["pre", "rec", "auc", "personal"]
        let y = new Map(Array.from(keys, key => [key, d3.scaleLinear([0, 1], [450, 0])]))
        //new Map(Array.from(keys, key => [key, d3.scaleLinear(d3.extent(sample_data, d => d[key]), [450, 0])]))  
        let x = d3.scalePoint(keys, [0, 550])

        let line = d3.line()
            .defined(([, value]) => value != null)
            .x(([key]) => x(key))
            .y(([key, value]) => y.get(key)(value))

        this.SVG = this.map.append("svg")
            .attr("viewBox", `${-this.defaultWH.width / 6} ${-this.defaultWH.height / 7} ${this.defaultWH.width * 1.8} ${this.defaultWH.height * 1.8}`)
            .style("width", "100%")
            .style("height", "auto")
            .call(d3.zoom()
                .extent([[0, 0], [this.defaultWH.width, this.defaultWH.height]])
                .scaleExtent([1, 8])
                .on("zoom", function ({ transform }) {
                    Coordinate.attr("transform", transform)
                }));
        const color = ["#98abc5", "#6b486b", "#ff8c00"]
        
        const Coordinate = this.SVG.append("g")
        Coordinate.append("g")
            .attr("fill", "none")
            .attr("stroke-width", 3)
            .attr("stroke-opacity", 1)
            .selectAll("path")
            .data(sample_data)  //sample_data.slice().sort((a, b) => d3.ascending(a[keyz], b[keyz]))
            .join("path")
            .attr("stroke", (d, i) => {
                return color[i]
            })
            .attr("d", d => line(d3.cross(keys, [d], (key, d) => [key, d[key]])))
            .append("title")
            .text(d => d.name);

        Coordinate.append("g")
            .selectAll("g")
            .data(keys)
            .join("g")
            .attr("transform", d => `translate(${x(d)},0)`)
            .each(function (d) { d3.select(this).call(d3.axisLeft(y.get(d))); })
            .call(g => g.append("text")
                .attr("x", -30)
                .attr("y", 470)
                .attr("text-anchor", "start")
                .attr("fill", "currentColor")
                .attr("font-size", 22)
                .text(d => d))
            .call(g => g.selectAll("text")
                .clone(true).lower()
                .attr("fill", "none")
                .attr("stroke-width", 5)
                .attr("stroke-linejoin", "round")
                .attr("stroke", "white"));



    }
}