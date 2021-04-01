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
                "aiScore": 0.5021412166132017,
                "aRatio": 0.3879336349924586,
                "iRatio": 0.7795081967213115,
                "num_of_elements": 1
            },
            // {
            //     "aiScore": 0.5053774019666223,
            //     "aRatio": 0.9803921568627451,
            //     "iRatio": 0.9595286885245902,
            //     "num_of_elements": 1
            // },
            // {
            //     "aiScore": 0.5056444635557789,
            //     "aRatio": 0.9803921568627451,
            //     "iRatio": 0.9585040983606558,
            //     "num_of_elements": 2
            // }
        ]
        this.SVG = this.map.append("svg")
            .attr("viewBox", `${-this.defaultWH.width / 6} ${-this.defaultWH.height / 7} ${this.defaultWH.width * 1.8} ${this.defaultWH.height * 1.8}`)
            .style("width", "100%")
            .style("height", "auto")
        
        const width = 550;
        const height = 400;

        const x = d3.scalePoint()
            .range([0, width]);

        const y = {};
        const line = d3.line();
        const axis = d3.axisLeft();
        let background;
        let foreground;

        const dimensions_preset = {
            support: [0, 1],
            aiScore: [0.2, 0.9],
            aRatio: [0, 1],
            iRatio: [0, 1],
            num_of_elements: [1, 7],
        };

        

        let dimensions = Object.keys(sample_data[0])
        x.domain(dimensions)
        dimensions.forEach(d => {
            y[d] = d3.scaleLinear()
                .domain(dimensions_preset[d] || d3.extent(sample_data, element => +element[d]))
                .range([height, 0]);
        });

        const colorDomain = [0.3, 0.6]; // y[colorDimention].domain() // we should make this the same with network view
        const colorDimention = "aiScore";
        const lineColor = d => d3.scaleSequential(colorDomain, d3.interpolateRdYlGn)(d[colorDimention]);

        // background = this.SVG.append("g")
        //     .attr("class", "background")
        //     .selectAll("path")
        //     .data(sample_data)
        //     .join("path")
        //     .attr("d", path);

        foreground = this.SVG.append("g")
            .attr("class", "foreground")
            .selectAll("path")
            .data(sample_data)
            .join("path")
            .attr("d", path)
            .attr('fill', "#98abc5")
            .style("stroke", "#98abc5")
            .style("stroke-width", 1);

        // Add a group element for each dimension.
        const g = this.SVG.selectAll(".dimension")
            .data(dimensions)
            .join("g")
            .attr("class", "dimension")
            .attr("transform", function (d) { 
                return "translate(" + x(d) + ")"; });
        
        // Add an axis and title.
        g.append("g")
            .attr("class", "axis")
            .each(function (d) { d3.select(this).call(axis.scale(y[d])); })
            .append("text")
            .style("text-anchor", "middle")
            .attr("y", -9)
            .text(function (d) { return d; });

        function path(d) {
           
            let point = dimensions.map(function (p) {
                console.log(p)
                return [x(p), y[p](d[p])];
            })
            return line(point);
        }
    }
}