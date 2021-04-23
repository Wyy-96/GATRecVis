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
    // this.force();
  },
  watch: {
    "$store.getters.movieId"() {
      // console.log(this.$store.getters.movieId);
      axios
        .post("api/getdata/selectedMovie", {
          data: [this.$store.getters.userId, this.$store.getters.movieId],
        })
        .then((res) => {
          console.log(res.data)
            let svgbox = document.getElementsByClassName("force");
            if (svgbox.length == 1) svgbox[svgbox.length - 1].remove();
            this.force(this.$refs.force, res.data)
        });
    },
  },
  methods: {
    force(map,data) {
      const config = {
        width: parseInt(d3.select(map).style("width")),
        height: parseInt(d3.select(map).style("height")),
      };
      const links = data.links.map((d) => Object.create(d));
      const nodes = data.nodes.map((d) => Object.create(d));
      const SVG = d3
        .select(map)
        .append("svg")
        .attr("class", "force")
        .attr(
              "viewBox",
              `${-config.width / 4} ${-config.height / 7} ${config.width} ${
                config.height
              }`
            )
      const types = ["targetUser","targetMovie","movie","actor","director","genre","user"]
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

      const simulation = d3
        .forceSimulation(nodes)
        .force(
          "link",
          d3.forceLink(links).id((d) => d.id)
        )
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("charge", d3.forceManyBody().strength(-300))
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
        .attr('id', (d,i)=> i)
        .attr("fill", (d) => colors[types.indexOf(d.type)])
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


