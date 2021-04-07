<template>
  <div id="result">
    <div id="force" class="force" ref="force"></div>
    <div id="coordinate" class="coordinate" ref="coordinate"></div>
    <div id="venn" class="venn" ref="venn"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as d3 from "d3";
export default {
  name: "result",
  components: {},
  data() {
    return {};
  },
  created: function () {},
  mounted: function () {
    this.Venn(this.$refs.venn);
    this.VennResult(this.$refs.venn);
    this.Coordinate(this.$refs.coordinate, []);
  },
  watch: {
    "$store.getters.userId"() {
      console.log(this.$store.getters.userId);
      axios
        .post("api/getdata/selectUser", { data: this.$store.getters.userId })
        .then((res) => {
          document.getElementById("coordinate").innerHTML = "";
          this.Coordinate(this.$refs.coordinate, res.data);
        });
    },
  },
  methods: {
    Coordinate(map, data) {
      const config = {
        width: parseInt(d3.select(map).style("width")),
        height: parseInt(d3.select(map).style("height")),
      };
      var sample_data = data;
      let keys = ["precision", "recall", "auc", "personal"];
      let y = new Map(
        Array.from(keys, (key) => [key, d3.scaleLinear([0, 1], [450, 0])])
      );
      //new Map(Array.from(keys, key => [key, d3.scaleLinear(d3.extent(sample_data, d => d[key]), [450, 0])]))
      let x = d3.scalePoint(keys, [0, 550]);

      let line = d3
        .line()
        .defined(([, value]) => value != null)
        .x(([key]) => x(key))
        .y(([key, value]) => y.get(key)(value));

      const SVG = d3
        .select(map)
        .append("svg")
        .attr(
          "viewBox",
          `${-config.width / 6} ${-config.height / 7} ${config.width * 1.8} ${
            config.height * 1.8
          }`
        )
        .style("width", "100%")
        .style("height", "auto")
        .call(
          d3
            .zoom()
            .extent([
              [0, 0],
              [config.width, config.height],
            ])
            .scaleExtent([1, 8])
            .on("zoom", function ({ transform }) {
              Coordinate.attr("transform", transform);
            })
        );
      const color = ["#98abc5", "#6b486b", "#ff8c00"];

      const Coordinate = SVG.append("g");
      Coordinate.append("g")
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("stroke-opacity", 1)
        .selectAll("path")
        .data(sample_data) //sample_data.slice().sort((a, b) => d3.ascending(a[keyz], b[keyz]))
        .join("path")
        .attr("stroke", (d, i) => {
          console.log(d);
          return color[i];
        })
        .attr("d", (d) => line(d3.cross(keys, [d], (key, d) => [key, d[key]])))
        .append("title")
        .text((d) => d.userId);

      Coordinate.append("g")
        .selectAll("g")
        .data(keys)
        .join("g")
        .attr("transform", (d) => `translate(${x(d)},0)`)
        .each(function (d) {
          d3.select(this).call(d3.axisLeft(y.get(d)));
        })
        .call((g) =>
          g
            .append("text")
            .attr("x", -30)
            .attr("y", 470)
            .attr("text-anchor", "start")
            .attr("fill", "currentColor")
            .attr("font-size", 22)
            .text((d) => d)
        )
        .call((g) =>
          g
            .selectAll("text")
            .clone(true)
            .lower()
            .attr("fill", "none")
            .attr("stroke-width", 5)
            .attr("stroke-linejoin", "round")
            .attr("stroke", "white")
        );
    },
    Venn(map) {
      const config = {
        width: parseInt(d3.select(map).style("width")),
        height: parseInt(d3.select(map).style("height")),
      };
      var blend_data = [
        {
          index: 0,
          d:
            "M245.48,163.65c49.68-28.41,112.87-30.15,165-.5,0-145.46-182.86-218-283.31-114.37A166.2,166.2,0,0,0,80.7,163C132.79,133.5,195.87,135.28,245.48,163.65Z",
          colors: ["#AE9BAE"],
          blend: "#AE9BAE",
          parents: ["KGAT"],
        },
        {
          index: 1,
          d:
            "M245.48,163.65a162,162,0,0,1,51.86,47,165,165,0,0,1,30.19,95.81c49.8-29,82.79-83.59,83-143.3C358.35,133.5,295.16,135.24,245.48,163.65Z",
          colors: ["#AE9BAE", "#FFC57F"],
          blend: "#AE8174",
          parents: ["KGAT", "NIRec"],
        },
        {
          index: 2,
          d:
            "M297.34,210.64a162,162,0,0,0-51.86-47,162,162,0,0,0-51.86,47,165,165,0,0,0-30.19,95.52,166.18,166.18,0,0,0,108.91,20.09,160.34,160.34,0,0,0,55.19-19.8A165,165,0,0,0,297.34,210.64Z",
          colors: ["#AE9BAE", "#FFC57F", "#B7C4D6"],
          blend: "#9E746B",
          parents: ["above three"],
        },
        {
          index: 3,
          d:
            "M93.17,227a164.23,164.23,0,0,0,70.26,79.13,165,165,0,0,1,30.19-95.52,162,162,0,0,1,51.86-47C195.87,135.28,132.79,133.5,80.7,163A163.1,163.1,0,0,0,93.17,227Z",
          colors: ["#AE9BAE", "#B7C4D6"],
          blend: "#8E809C",
          parents: ["KGAT", "HetGNN"],
        },
        {
          index: 4,
          d:
            "M410.48,163.15c-.16,59.71-33.15,114.28-83,143.3A165.08,165.08,0,0,1,289,412.51a161.52,161.52,0,0,1-43.52,36.21c40.48,23.15,90.22,28.94,135.43,13.66C514.69,417.19,528.84,233.94,410.48,163.15Z",
          colors: ["#FFC57F"],
          blend: "#FFC57F",
          parents: ["NIRec"],
        },
        {
          index: 5,
          d:
            "M202,412.51a165.08,165.08,0,0,1-38.52-106.35A162.5,162.5,0,0,1,80.7,163l-.22.12c-118.36,70.79-104.21,254,29.57,299.23,45.21,15.28,95,9.49,135.43-13.66A161.71,161.71,0,0,1,202,412.51Z",
          colors: ["#B7C4D6"],
          blend: "#B7C4D6",
          parents: ["HetGNN"],
        },
        {
          index: 6,
          d:
            "M289,412.51a165.08,165.08,0,0,0,38.53-106.06,160.34,160.34,0,0,1-55.19,19.8,166.18,166.18,0,0,1-108.91-20.09A165.08,165.08,0,0,0,202,412.51a161.71,161.71,0,0,0,43.53,36.21A161.52,161.52,0,0,0,289,412.51Z",
          colors: ["#FFC57F", "#B7C4D6"],
          blend: "#DBA86B",
          parents: ["HetGNN", "NIRec"],
        },
      ];

      const SVG = d3
        .select(map)
        .append("svg")
        .attr(
          "viewBox",
          `${-config.width / 6} ${-config.height / 7} ${config.width * 1.8} ${
            config.height * 1.8
          }`
        )
        .style("width", "100%")
        .style("height", "auto");

      const venn = SVG.append("g")
        .selectAll("path")
        .data(blend_data)
        .join("path")
        .classed("active", false)
        .attr("d", (d) => d.d)
        .attr("opacity", 1)
        .attr("fill", (d) => (d.blend ? d.blend : "transparent"));

      venn
        .append("title")
        .text((d) => "Recommended in " + d.parents.join(" and "));

      // 判断dom元素的状态
      // venn.on("mouseover", function () {
      //   d3.select(this).classed("active", true);
      //   d3.selectAll("path:not(.active)")
      //     .transition()
      //     .duration(250)
      //     .attr("fill-opacity", 0.25);
      // });
    },
    VennResult(map) {
      const config = {
        width: parseInt(d3.select(map).style("width")),
        height: parseInt(d3.select(map).style("height")),
      };
      const SVG = d3.select(map).select("svg");

      const drwacircle = SVG.append("g");
      drwacircle
        .append("ellipse")
        .attr("cx", 245)
        .attr("cy", 80)
        .attr("rx", 120)
        .attr("ry", 70);

      drwacircle
        .append("ellipse")
        .attr("cx", 245)
        .attr("cy", 260)
        .attr("rx", 65)
        .attr("ry", 65);

      drwacircle
        .append("ellipse")
        .attr("cx", 245)
        .attr("cy", 380)
        .attr("rx", 45)
        .attr("ry", 45);

      function random(m, n) {
        return Math.floor(Math.random() * (n - m)) + m;
      }
      let axis_x = random(125,365)
      let y = Math.sqrt((1 - (Math.pow(axis_x - 245,2)/Math.pow(120,2))) * Math.pow(70,2)) + 80 
      let axis_y = random(y-80,y)
      console.log(axis_x,axis_y,y-80,y)
      drwacircle
        .append("circle")
        .attr("cx", axis_x)
        .attr("cy", axis_y)
        .attr("r", 6)
        .attr("fill", "red");
      // const data = [
      //     {
      //         "": "HetGNN",
      //         "x": 90,
      //         "y": 350,
      //     },
      //     {
      //         "": "KGAT",
      //         "x": 350,
      //         "y": 100,

      //     },
      //     {
      //         "": "KGAT",
      //         "x": 120,
      //         "y": 100,

      //     },
      //     {
      //         "": "KGAT",
      //         "x": 300,
      //         "y": 110,

      //     },
      //     {
      //         "": "KGAT",
      //         "x": 245,
      //         "y": 30,

      //     },
      //     {
      //         "": "KGAT,NIRec,HetGNN",
      //         "x": 245,
      //         "y": 260,

      //     },
      //     {
      //         "": "NIRec,HetGNN",
      //         "x": 245,
      //         "y": 375,

      //     },
      //     {
      //         "": "KGAT,HetGNN",
      //         "x": 150,
      //         "y": 205,

      //     },
      //     {
      //         "": "KGAT,NIRec",
      //         "x": 345,
      //         "y": 205,

      //     },
      //     {
      //         "": "NIRec",
      //         "x": 400,
      //         "y": 350,

      //     },

      // ]
      // const dot = drwacircle.append("g")
      //     .attr("fill", "none")
      //     .attr("stroke", "red")
      //     .attr("stroke-width", 4)
      //     .style('fill-opacity', 1)
      //     .selectAll("g")
      //     .data(data)
      //     .join("circle")
      //     .attr("transform", d => `translate(${d.x},${d.y})`)
      //     .attr("r", d => 6)
    },
  },
};
</script>
<style lang="stylus" scoped>
#result {
  width: 50%;
  height: 100%;
  border: 1px solid black;
}

#force {
  width: 100%;
  height: 70%;
  float: left;
  border: 1px solid black;
}

#coordinate {
  width: 50%;
  height: 30%;
  float: left;
  border: 1px solid black;
}

#venn {
  width: 49%;
  height: 30%;
  float: left;
  border: 1px solid black;
}
</style>