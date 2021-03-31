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
      .attr("viewBox", `${-this.defaultWH.width / 6} ${-this.defaultWH.height/7} ${this.defaultWH.width*1.8} ${this.defaultWH.height*1.8}`)
      .style("width", "100%")
      .style("height", "auto")
    
    var blend_data = [
      {
        "index": 0,
        "d": "M245.48,163.65c49.68-28.41,112.87-30.15,165-.5,0-145.46-182.86-218-283.31-114.37A166.2,166.2,0,0,0,80.7,163C132.79,133.5,195.87,135.28,245.48,163.65Z",
        "colors": [
          "#AE9BAE"
        ],
        "blend": "#AE9BAE",
        "parents": [
          "A"
        ]
      },
      {
        "index": 1,
        "d": "M245.48,163.65a162,162,0,0,1,51.86,47,165,165,0,0,1,30.19,95.81c49.8-29,82.79-83.59,83-143.3C358.35,133.5,295.16,135.24,245.48,163.65Z",
        "colors": [
          "#AE9BAE",
          "#FFC57F"
        ],
        "blend": "#AE8174",
        "parents": [
          "A",
          "B"
        ]
      },
      {
        "index": 2,
        "d": "M297.34,210.64a162,162,0,0,0-51.86-47,162,162,0,0,0-51.86,47,165,165,0,0,0-30.19,95.52,166.18,166.18,0,0,0,108.91,20.09,160.34,160.34,0,0,0,55.19-19.8A165,165,0,0,0,297.34,210.64Z",
        "colors": [
          "#AE9BAE",
          "#FFC57F",
          "#B7C4D6"
        ],
        "blend": "#9E746B",
        "parents": [
          "A",
          "B",
          "C"
        ]
      },
      {
        "index": 3,
        "d": "M93.17,227a164.23,164.23,0,0,0,70.26,79.13,165,165,0,0,1,30.19-95.52,162,162,0,0,1,51.86-47C195.87,135.28,132.79,133.5,80.7,163A163.1,163.1,0,0,0,93.17,227Z",
        "colors": [
          "#AE9BAE",
          "#B7C4D6"
        ],
        "blend": "#8E809C",
        "parents": [
          "A",
          "C"
        ]
      },
      {
        "index": 4,
        "d": "M410.48,163.15c-.16,59.71-33.15,114.28-83,143.3A165.08,165.08,0,0,1,289,412.51a161.52,161.52,0,0,1-43.52,36.21c40.48,23.15,90.22,28.94,135.43,13.66C514.69,417.19,528.84,233.94,410.48,163.15Z",
        "colors": [
          "#FFC57F"
        ],
        "blend": "#FFC57F",
        "parents": [
          "B"
        ]
      },
      {
        "index": 5,
        "d": "M202,412.51a165.08,165.08,0,0,1-38.52-106.35A162.5,162.5,0,0,1,80.7,163l-.22.12c-118.36,70.79-104.21,254,29.57,299.23,45.21,15.28,95,9.49,135.43-13.66A161.71,161.71,0,0,1,202,412.51Z",
        "colors": [
          "#B7C4D6"
        ],
        "blend": "#B7C4D6",
        "parents": [
          "C"
        ]
      },
      {
        "index": 6,
        "d": "M289,412.51a165.08,165.08,0,0,0,38.53-106.06,160.34,160.34,0,0,1-55.19,19.8,166.18,166.18,0,0,1-108.91-20.09A165.08,165.08,0,0,0,202,412.51a161.71,161.71,0,0,0,43.53,36.21A161.52,161.52,0,0,0,289,412.51Z",
        "colors": [
          "#FFC57F",
          "#B7C4D6"
        ],
        "blend": "#DBA86B",
        "parents": [
          "B",
          "C"
        ]
      }
    ]

    const venn = this.SVG.append('g')
      .selectAll("path")
      .data(blend_data)
      .join("path")
      .classed("active", false)
      .attr("d", d => d.d)
      .attr("opacity", 1)
      .attr("fill", d => (d.blend ? d.blend : "transparent"));
    
    venn.append("title").text(d => "Present in group " + d.parents.join(" and "));

    // 判断dom元素的状态
    // venn.on("mouseover", function () {
    //   d3.select(this).classed("active", true);
    //   d3.selectAll("path:not(.active)")
    //     .transition()
    //     .duration(250)
    //     .attr("fill-opacity", 0.25);
    // });
  }
}