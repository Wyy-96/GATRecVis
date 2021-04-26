<template>
  <div id="force" ref="force"></div>
</template>

<script>
import axios from "axios";
import * as d3 from "d3";
export default {
  name: "force",
  components: {},
  data() {
    return {};
  },
  created: function () {},
  mounted: function () {
    let data = {
      links: [
        {
          source: "u49",
          target: "m3255",
          value: 1,
        },
        {
          source: "m3255",
          target: "ugroup0",
          value: 1,
        },
        {
          source: "ugroup0",
          target: "m793",
          value: 1,
        },
        {
          source: "u49",
          target: "m4568",
          value: 1,
        },
        {
          source: "m4568",
          target: "a46",
          value: 1,
        },
        {
          source: "a46",
          target: "m793",
          value: 1,
        },
        {
          source: "u49",
          target: "m4721",
          value: 1,
        },
        {
          source: "m4721",
          target: "ugroup1",
          value: 1,
        },
        {
          source: "ugroup1",
          target: "m793",
          value: 1,
        },
        {
          source: "u49",
          target: "m5061",
          value: 1,
        },
        {
          source: "m5061",
          target: "u171",
          value: 1,
        },
        {
          source: "u171",
          target: "m793",
          value: 1,
        },
        {
          source: "m5061",
          target: "ugroup2",
          value: 1,
        },
        {
          source: "ugroup2",
          target: "m793",
          value: 1,
        },
        {
          source: "u49",
          target: "m6093",
          value: 1,
        },
        {
          source: "m6093",
          target: "ugroup3",
          value: 1,
        },
        {
          source: "ugroup3",
          target: "m793",
          value: 1,
        },
        {
          source: "u49",
          target: "m6094",
          value: 1,
        },
        {
          source: "m6094",
          target: "ugroup4",
          value: 1,
        },
        {
          source: "ugroup4",
          target: "m793",
          value: 1,
        },
        {
          source: "u49",
          target: "m8125",
          value: 1,
        },
        {
          source: "m8125",
          target: "u1283",
          value: 1,
        },
        {
          source: "u1283",
          target: "m793",
          value: 1,
        },
        {
          source: "u49",
          target: "m8320",
          value: 1,
        },
        {
          source: "m8320",
          target: "ugroup6",
          value: 1,
        },
        {
          source: "ugroup6",
          target: "m793",
          value: 1,
        },
        {
          source: "u49",
          target: "m9034",
          value: 1,
        },
        {
          source: "m9034",
          target: "ugroup7",
          value: 1,
        },
        {
          source: "ugroup7",
          target: "m793",
          value: 1,
        },
        {
          source: "u49",
          target: "m9652",
          value: 1,
        },
        {
          source: "m9652",
          target: "u171",
          value: 1,
        },
        {
          source: "m9652",
          target: "ugroup8",
          value: 1,
        },
        {
          source: "ugroup8",
          target: "m793",
          value: 1,
        },
        {
          source: "u49",
          target: "m9934",
          value: 1,
        },
        {
          source: "m9934",
          target: "ugroup9",
          value: 1,
        },
        {
          source: "ugroup9",
          target: "m793",
          value: 1,
        },
        {
          source: "u49",
          target: "m11248",
          value: 1,
        },
        {
          source: "m11248",
          target: "a46",
          value: 1,
        },
        {
          source: "u49",
          target: "m12213",
          value: 1,
        },
        {
          source: "m12213",
          target: "a1211",
          value: 1,
        },
        {
          source: "a1211",
          target: "m793",
          value: 1,
        },
      ],
      nodes: [
        {
          id: "u49",
          value: 10,
          type: "targetUser",
        },
        {
          id: "m793",
          value: 10,
          type: "targetMovie",
        },
        {
          id: "m3255",
          value: 6,
          type: "movie",
        },
        {
          id: "ugroup0",
          value: 7,
          type: "user",
        },
        {
          id: "m4568",
          value: 6,
          type: "movie",
        },
        {
          id: "a46",
          value: 6,
          type: "actor",
        },
        {
          id: "m4721",
          value: 6,
          type: "movie",
        },
        {
          id: "ugroup1",
          value: 9,
          type: "user",
        },
        {
          id: "m5061",
          value: 6,
          type: "movie",
        },
        {
          id: "u171",
          value: 6,
          type: "user",
        },
        {
          id: "ugroup2",
          value: 9,
          type: "user",
        },
        {
          id: "m6093",
          value: 6,
          type: "movie",
        },
        {
          id: "ugroup3",
          value: 7,
          type: "user",
        },
        {
          id: "m6094",
          value: 6,
          type: "movie",
        },
        {
          id: "ugroup4",
          value: 7,
          type: "user",
        },
        {
          id: "m8125",
          value: 6,
          type: "movie",
        },
        {
          id: "u1283",
          value: 6,
          type: "user",
        },
        {
          id: "m8320",
          value: 6,
          type: "movie",
        },
        {
          id: "ugroup6",
          value: 6,
          type: "user",
        },
        {
          id: "m9034",
          value: 6,
          type: "movie",
        },
        {
          id: "ugroup7",
          value: 7,
          type: "user",
        },
        {
          id: "m9652",
          value: 6,
          type: "movie",
        },
        {
          id: "ugroup8",
          value: 6,
          type: "user",
        },
        {
          id: "m9934",
          value: 6,
          type: "movie",
        },
        {
          id: "ugroup9",
          value: 7,
          type: "user",
        },
        {
          id: "m11248",
          value: 6,
          type: "movie",
        },
        {
          id: "m12213",
          value: 6,
          type: "movie",
        },
        {
          id: "a1211",
          value: 6,
          type: "actor",
        },
      ],
    };
    this.force(this.$refs.force, data);
  },
  watch: {
    // "$store.getters.movieId"() {
    //   // console.log(this.$store.getters.movieId);
    //   axios
    //     .post("api/getdata/selectedMovie", {
    //       data: [this.$store.getters.userId, this.$store.getters.movieId],
    //     })
    //     .then((res) => {
    //         let svgbox = document.getElementsByClassName("force");
    //         if (svgbox.length == 1) svgbox[svgbox.length - 1].remove();
    //         console.log(res.data)
    //         this.force(this.$refs.force, res.data)
    //     });
    // },
  },
  methods: {
    force(map, data) {
      var net,
        expand = {};
      const config = {
        width: parseInt(d3.select(map).style("width")),
        height: parseInt(d3.select(map).style("height")),
      };
      const links = data.links.map((d) => Object.create(d));
      const nodes = data.nodes.map((d) => Object.create(d));
      
      const types = [
        "targetUser",
        "targetMovie",
        "movie",
        "actor",
        "director",
        "genre",
        "user",
      ];
      const colors = [
        "#797FA1",
        "#708EC4",
        "#DD8998",
        "#FEC6B9",
        "#F1DCDB",
        "#ACC2E2",
        "#F5A555",
        "#ECE18C",
        "#D9B3FF",
        "#65D5A0",
        "#C2384F",
      ];
      function getGroup(n) {
        return n.ugroup;
      }
      function network(data, prev, index, expand) {
        expand = expand || {};
      }
      // 绘图
      const SVG = d3
        .select(map)
        .append("svg")
        .attr("class", "force")
        .attr(
          "viewBox",
          `${-config.width / 4} ${-config.height / 7} ${config.width} ${
            config.height
          }`
        );

      init()

      function init() {
        // net = network(data, net, getGroup, expand);

        const simulation = d3
          .forceSimulation(nodes)
          .force(
            "link",
            d3.forceLink(links).id((d) => d.id)
          )
          .force("x", d3.forceX())
          .force("y", d3.forceY())
          .force("charge", d3.forceManyBody().strength(-500))
          .force("center", d3.forceCenter(600 / 2, 600 / 2));

        const drag = (simulation) => {
          function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          }

          function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          }

          function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          }

          return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
        };

        const link = SVG.append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line")
          .attr("stroke-width", (d) => Math.sqrt(d.value));

        const node = SVG.append("g")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .selectAll("circle")
          .data(nodes)
          .join("circle")
          .attr("r", (d) => d.value)
          .attr("id", (d, i) => i)
          .attr("fill", (d) => colors[types.indexOf(d.type)])
          .on("click", (event, d) => {
                if(d.type != 'targetUser' || d.type != 'targetMovie') {
                  console.log("node clink",d , arguments, this, expand[d.id])
                  expand[d.id] = !expand[d.id];  //取反
                  console.log(expand)
                  // init();
                }
              })
          .call(drag(simulation));

        node.append("title").text((d) => d.id);

        simulation.on("tick", () => {
          link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

          node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
        });
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
#force {
  width: 100%;
  height: 70%;
  float: left;
  border: 1px solid #A6A6A6;
}
</style>


