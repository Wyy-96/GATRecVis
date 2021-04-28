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
    // let data = {
    //   links: [
    //     {
    //       source: "u49",
    //       target: "m3255",
    //       value: 1,
    //     },
    //     {
    //       source: "m3255",
    //       target: "group0",
    //       value: 1,
    //     },
    //     {
    //       source: "group0",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m4568",
    //       value: 1,
    //     },
    //     {
    //       source: "m4568",
    //       target: "a46",
    //       value: 1,
    //     },
    //     {
    //       source: "a46",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m4721",
    //       value: 1,
    //     },
    //     {
    //       source: "m4721",
    //       target: "group1",
    //       value: 1,
    //     },
    //     {
    //       source: "group1",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m5061",
    //       value: 1,
    //     },
    //     {
    //       source: "m5061",
    //       target: "u171",
    //       value: 1,
    //     },
    //     {
    //       source: "u171",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "m5061",
    //       target: "group2",
    //       value: 1,
    //     },
    //     {
    //       source: "group2",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m6093",
    //       value: 1,
    //     },
    //     {
    //       source: "m6093",
    //       target: "group3",
    //       value: 1,
    //     },
    //     {
    //       source: "group3",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m6094",
    //       value: 1,
    //     },
    //     {
    //       source: "m6094",
    //       target: "group4",
    //       value: 1,
    //     },
    //     {
    //       source: "group4",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m8125",
    //       value: 1,
    //     },
    //     {
    //       source: "m8125",
    //       target: "u1283",
    //       value: 1,
    //     },
    //     {
    //       source: "u1283",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m8320",
    //       value: 1,
    //     },
    //     {
    //       source: "m8320",
    //       target: "group6",
    //       value: 1,
    //     },
    //     {
    //       source: "group6",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m9034",
    //       value: 1,
    //     },
    //     {
    //       source: "m9034",
    //       target: "group7",
    //       value: 1,
    //     },
    //     {
    //       source: "group7",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m9652",
    //       value: 1,
    //     },
    //     {
    //       source: "m9652",
    //       target: "u171",
    //       value: 1,
    //     },
    //     {
    //       source: "m9652",
    //       target: "group8",
    //       value: 1,
    //     },
    //     {
    //       source: "group8",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m9934",
    //       value: 1,
    //     },
    //     {
    //       source: "m9934",
    //       target: "group9",
    //       value: 1,
    //     },
    //     {
    //       source: "group9",
    //       target: "m793",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m11248",
    //       value: 1,
    //     },
    //     {
    //       source: "m11248",
    //       target: "a46",
    //       value: 1,
    //     },
    //     {
    //       source: "u49",
    //       target: "m12213",
    //       value: 1,
    //     },
    //     {
    //       source: "m12213",
    //       target: "a1211",
    //       value: 1,
    //     },
    //     {
    //       source: "a1211",
    //       target: "m793",
    //       value: 1,
    //     },
    //   ],
    //   nodes: [
    //     {
    //       id: "u49",
    //       value: 20,
    //       type: "targetUser",
    //     },
    //     {
    //       id: "m793",
    //       value: 20,
    //       type: "targetMovie",
    //     },
    //     {
    //       id: "m3255",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "group0",
    //       value: 7,
    //       type: "user",
    //     },
    //     {
    //       id: "m4568",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "a46",
    //       value: 6,
    //       type: "actor",
    //     },
    //     {
    //       id: "m4721",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "group1",
    //       value: 9,
    //       type: "user",
    //     },
    //     {
    //       id: "m5061",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "u171",
    //       value: 6,
    //       type: "user",
    //     },
    //     {
    //       id: "group2",
    //       value: 9,
    //       type: "user",
    //     },
    //     {
    //       id: "m6093",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "group3",
    //       value: 7,
    //       type: "user",
    //     },
    //     {
    //       id: "m6094",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "group4",
    //       value: 7,
    //       type: "user",
    //     },
    //     {
    //       id: "m8125",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "u1283",
    //       value: 6,
    //       type: "user",
    //     },
    //     {
    //       id: "m8320",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "group6",
    //       value: 6,
    //       type: "user",
    //     },
    //     {
    //       id: "m9034",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "group7",
    //       value: 7,
    //       type: "user",
    //     },
    //     {
    //       id: "m9652",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "group8",
    //       value: 6,
    //       type: "user",
    //     },
    //     {
    //       id: "m9934",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "group9",
    //       value: 7,
    //       type: "user",
    //     },
    //     {
    //       id: "m11248",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "m12213",
    //       value: 6,
    //       type: "movie",
    //     },
    //     {
    //       id: "a1211",
    //       value: 6,
    //       type: "actor",
    //     },
    //   ],
    // };
    // this.force(this.$refs.force, data);
  },
  watch: {
    "$store.getters.movieId"() {
      // console.log(this.$store.getters.movieId);
      axios
        .post("api/getdata/selectedMovie", {
          data: [this.$store.getters.userId, this.$store.getters.movieId],
        })
        .then((res) => {
          let svgbox = document.getElementsByClassName("force");
          if (svgbox.length == 1) svgbox[svgbox.length - 1].remove();
          console.log(res.data);
          this.force(this.$refs.force, res.data);
        });
    },
  },
  methods: {
    force(map, data) {
      var net = {},
        expand = {
          targetUser: true,
          targetMovie: true,
          movie: false,
          actor: false,
          director: false,
          genre: false,
          user: false,
        };
      const config = {
        width: parseInt(d3.select(map).style("width")),
        height: parseInt(d3.select(map).style("height")),
      };

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
      function getType(n) {
        return n.type;
      }
      function network(data, prev, index, expand) {
        expand = expand || {};
        let links = data.links.map((d) => Object.create(d));
        let nodes = data.nodes.map((d) => Object.create(d));

        let newnodes = [];
        let newlinks = [];
        let linksValue = {};

        //拆分expand
        let expandTure = [];
        let expandFlase = [];
        let expandKey = Object.keys(expand);
        for (var i = 0; i < expandKey.length; i++) {
          if (expand[expandKey[i]] == true) expandTure.push(expandKey[i]);
          else expandFlase.push(expandKey[i]);
        }

        let group = {};
        let groupValue = {};
        nodes.forEach((element) => {
          let type = index(element);
          if (expandFlase.includes(type) == false) {
            //要展开的情况
            newnodes.push(element);
          } else {
            if (Object.keys(group).includes(type) == false) {
              group[type] = [];
              groupValue[type] = 0;
            }
            group[type].push(element.id);
            groupValue[type] += element.value;
          }
        });

        let key = Object.keys(group);
        for (i = 0; i < key.length; i++) {
          newnodes.push({
            id: key[i],
            type: key[i],
            value: groupValue[key[i]] > 30 ? 30 : groupValue[key[i]],
          });
        }

        let ids = getObjectValues(newnodes);
        links.forEach((element) => {
          if (ids.includes(element.source) == true) {
            if (ids.includes(element.target) == true) newlinks.push(element);
            else {
              let source = element.source;
              let target = getElementType(element.target, group);
              if (
                Object.keys(linksValue).includes(source + "," + target) == false
              ) {
                linksValue[source + "," + target] = 0;
              }
              linksValue[source + "," + target] += 1;
            }
          } else {
            if (ids.includes(element.target) == true) {
              let source = getElementType(element.source, group);
              let target = element.target;
              if (
                Object.keys(linksValue).includes(source + "," + target) == false
              ) {
                linksValue[source + "," + target] = 0;
              }
              linksValue[source + "," + target] += 1;
            } else {
              let source = getElementType(element.source, group);
              let target = getElementType(element.target, group);
              if (
                Object.keys(linksValue).includes(source + "," + target) == false
              ) {
                linksValue[source + "," + target] = 0;
              }
              linksValue[source + "," + target] += 1;
            }
          }
        });

        key = Object.keys(linksValue);
        for (i = 0; i < key.length; i++) {
          let source = key[i].split(",")[0];
          let target = key[i].split(",")[1];
          newlinks.push({
            source: source,
            target: target,
            value: linksValue[key[i]]> 20?20:linksValue[key[i]],
          });
        }

        return { links: newlinks, nodes: newnodes };
      }
      function getObjectValues(object) {
        var values = [];
        for (var property in object) values.push(object[property]["id"]);
        return values;
      }
      function getElementType(id, group) {
        if (id[0].includes("m") == true) {
          if (group["movie"].includes(id) == true) return "movie";
          else return "targetMovie";
        } else if (id[0].includes("a") == true) {
          return "actor";
        } else if (id[0].includes("d") == true) {
          return "director";
        } else if (id[0].includes("u") == true) {
          if (group["user"].includes(id) == true) return "user";
          else return "targetUser";
        } else {
          return "genre";
        }
      }
      // 绘图
      const SVG = d3
        .select(map)
        .append("svg")
        .attr("class", "force")
        .attr(
          "viewBox",
          `${-config.width / 4} ${-config.height / 8} ${config.width} ${
            config.height
          }`
        );

      init();

      SVG.attr("opacity", 1e-6).transition().duration(1000).attr("opacity", 1);

      function init() {
        d3.select(".force").selectAll("g").remove();

        net = network(data, net, getType, expand);
        console.log(net);
        const simulation = d3
          .forceSimulation(net.nodes)
          .force(
            "link",
            d3.forceLink(net.links).id((d) => d.id)
          )
          .force("x", d3.forceX())
          .force("y", d3.forceY())
          .force(
            "charge",
            d3.forceManyBody().strength(-(100 / net.nodes.length) * 500)
          )
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
          .data(net.links)
          .join("line")
          .attr("stroke-width", (d) => d.value);

        const node = SVG.append("g")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .selectAll("circle")
          .data(net.nodes)
          .join("circle")
          .attr("r", (d) => d.value)
          .attr("id", (d, i) => i)
          .attr("fill", (d) => colors[types.indexOf(d.type)])
          .on("click", (event, d) => {
            if (d.type.includes("target") == false) {
              // console.log("node clink",d , arguments, this, expand[d.id])
              expand[d.type] = !expand[d.type]; //取反
              init();
            }
          })
          .call(drag(simulation));

        node.append("title").text((d) => d.id);

        const text = SVG.append("g")
          .attr("fill","white")
          .selectAll("text")
          .data(net.nodes)
          .join("text")
          .text((d) => d.id[0].toUpperCase())
          .style("text-anchor", "end") //样式对齐
          .style("text-align", "center")
          .on("click", (event, d) => {
            if (d.type.includes("target") == false) {
              // console.log("node clink",d , arguments, this, expand[d.id])
              expand[d.type] = !expand[d.type]; //取反
              init();
            }
          })

        simulation.on("tick", () => {
          link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

          node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

          text
          .attr("x", (d) => d.x + (d.value/2.5))
          .attr("y", (d) => d.y + (d.value/3))
          .attr("font-size", (d) => d.value)
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


