<template>
  <div id="force"></div>
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
    this.force();
  },
  watch: {
    "$store.getters.movieId"() {
      // console.log(this.$store.getters.movieId);
      axios
        .post("api/getdata/selectedMovie", {
          data: [this.$store.getters.userId, this.$store.getters.movieId],
        })
        .then((res) => {
          //   let svgbox = document.getElementsByClassName("force");
          //   if (svgbox.length == 1) svgbox[svgbox.length - 1].remove();
          //   this.force(res.data)
        });
    },
  },
  methods: {
    force(data) {
      let testdata = {
        nodes: [
          {
            id: "user35",
            group: 6,
          },
          {
            id: "九降风",
            group: 7,
          },
          {
            id: "转山",
            group: 2,
          },
          {
            id: "剧情\r",
            group: 5,
          },
          {
            id: "除暴",
            group: 2,
          },
          {
            id: "忍者神龟",
            group: 2,
          },
          {
            id: "微光城市",
            group: 2,
          },
          {
            id: "悲伤的贝拉多娜",
            group: 2,
          },
          {
            id: "魔发精灵",
            group: 2,
          },
          {
            id: "user39",
            group: 1,
          },
          {
            id: "user781",
            group: 1,
          },
          {
            id: "user7537",
            group: 1,
          },
          {
            id: "user9177",
            group: 1,
          },
          {
            id: "篱笆墙外",
            group: 2,
          },
          {
            id: "user9577",
            group: 1,
          },
          {
            id: "黑钱胜地",
            group: 2,
          },
          {
            id: "最长的一天",
            group: 2,
          },
          {
            id: "一个国家的诞生",
            group: 2,
          },
          {
            id: "user4648",
            group: 1,
          },
          {
            id: "user4733",
            group: 1,
          },
          {
            id: "user8468",
            group: 1,
          },
          {
            id: "user8622",
            group: 1,
          },
          {
            id: "世界旦夕之间",
            group: 2,
          },
          {
            id: "灭绝",
            group: 2,
          },
          {
            id: "user845",
            group: 1,
          },
          {
            id: "盲侠大律师",
            group: 2,
          },
          {
            id: "不死鸟",
            group: 2,
          },
          {
            id: "user3690",
            group: 1,
          },
          {
            id: "深渊",
            group: 2,
          },
          {
            id: "歪小子斯科特对抗全世界",
            group: 2,
          },
          {
            id: "user8902",
            group: 1,
          },
          {
            id: "茉莉花开",
            group: 2,
          },
          {
            id: "唯爱永生",
            group: 2,
          },
          {
            id: "天伦之旅",
            group: 2,
          },
          {
            id: "user5071",
            group: 1,
          },
          {
            id: "算死草",
            group: 2,
          },
          {
            id: "我11",
            group: 2,
          },
          {
            id: "我自己的爱达荷",
            group: 2,
          },
          {
            id: "菊豆",
            group: 2,
          },
          {
            id: "诗",
            group: 2,
          },
          {
            id: "金枝欲孽",
            group: 2,
          },
          {
            id: "回忆三部曲",
            group: 2,
          },
          {
            id: "user9218",
            group: 1,
          },
        ],
        links: [
          {
            source: "转山",
            target: "user35",
            value: 0.00642,
          },
          {
            source: "剧情\r",
            target: "转山",
            value: 0.00027,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 0.00272,
          },
          {
            source: "除暴",
            target: "user35",
            value: 0.00201,
          },
          {
            source: "剧情\r",
            target: "除暴",
            value: 0.00223,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 0.00307,
          },
          {
            source: "忍者神龟",
            target: "user35",
            value: .00137,
          },
          {
            source: "剧情\r",
            target: "忍者神龟",
            value: 0.00209,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 0.00294,
          },
          {
            source: "微光城市",
            target: "user35",
            value: 0.00173,
          },
          {
            source: "剧情\r",
            target: "微光城市",
            value: 0.00255,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 0.00178,
          },
          {
            source: "悲伤的贝拉多娜",
            target: "user35",
            value: 0.00134,
          },
          {
            source: "剧情\r",
            target: "悲伤的贝拉多娜",
            value: 0.00229,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 0.00156,
          },
          {
            source: "魔发精灵",
            target: "user35",
            value: 0.00132,
          },
          {
            source: "user39",
            target: "魔发精灵",
            value: 0.00203,
          },
          {
            source: "九降风",
            target: "user39",
            value: 0.00179,
          },
          {
            source: "魔发精灵",
            target: "user35",
            value: 0.00181,
          },
          {
            source: "user781",
            target: "魔发精灵",
            value: 0.00163,
          },
          {
            source: "九降风",
            target: "user781",
            value: 0.00124,
          },
          {
            source: "魔发精灵",
            target: "user35",
            value: 1,
          },
          {
            source: "user7537",
            target: "魔发精灵",
            value: 1,
          },
          {
            source: "九降风",
            target: "user7537",
            value: 1,
          },
          {
            source: "魔发精灵",
            target: "user35",
            value: 1,
          },
          {
            source: "user9177",
            target: "魔发精灵",
            value: 1,
          },
          {
            source: "九降风",
            target: "user9177",
            value: 1,
          },
          {
            source: "篱笆墙外",
            target: "user35",
            value: 1,
          },
          {
            source: "user9577",
            target: "篱笆墙外",
            value: 1,
          },
          {
            source: "九降风",
            target: "user9577",
            value: 1,
          },
          {
            source: "黑钱胜地",
            target: "user35",
            value: 1,
          },
          {
            source: "user9577",
            target: "黑钱胜地",
            value: 1,
          },
          {
            source: "九降风",
            target: "user9577",
            value: 1,
          },
          {
            source: "黑钱胜地",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "黑钱胜地",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "最长的一天",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "最长的一天",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "一个国家的诞生",
            target: "user35",
            value: 1,
          },
          {
            source: "user4648",
            target: "一个国家的诞生",
            value: 1,
          },
          {
            source: "九降风",
            target: "user4648",
            value: 1,
          },
          {
            source: "一个国家的诞生",
            target: "user35",
            value: 1,
          },
          {
            source: "user4733",
            target: "一个国家的诞生",
            value: 1,
          },
          {
            source: "九降风",
            target: "user4733",
            value: 1,
          },
          {
            source: "一个国家的诞生",
            target: "user35",
            value: 1,
          },
          {
            source: "user8468",
            target: "一个国家的诞生",
            value: 1,
          },
          {
            source: "九降风",
            target: "user8468",
            value: 1,
          },
          {
            source: "一个国家的诞生",
            target: "user35",
            value: 1,
          },
          {
            source: "user8622",
            target: "一个国家的诞生",
            value: 1,
          },
          {
            source: "九降风",
            target: "user8622",
            value: 1,
          },
          {
            source: "一个国家的诞生",
            target: "user35",
            value: 1,
          },
          {
            source: "user9577",
            target: "一个国家的诞生",
            value: 1,
          },
          {
            source: "九降风",
            target: "user9577",
            value: 1,
          },
          {
            source: "一个国家的诞生",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "一个国家的诞生",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "世界旦夕之间",
            target: "user35",
            value: 1,
          },
          {
            source: "user4733",
            target: "世界旦夕之间",
            value: 1,
          },
          {
            source: "九降风",
            target: "user4733",
            value: 1,
          },
          {
            source: "灭绝",
            target: "user35",
            value: 1,
          },
          {
            source: "user845",
            target: "灭绝",
            value: 1,
          },
          {
            source: "九降风",
            target: "user845",
            value: 1,
          },
          {
            source: "盲侠大律师",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "盲侠大律师",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "不死鸟",
            target: "user35",
            value: 1,
          },
          {
            source: "user3690",
            target: "不死鸟",
            value: 1,
          },
          {
            source: "九降风",
            target: "user3690",
            value: 1,
          },
          {
            source: "不死鸟",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "不死鸟",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "深渊",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "深渊",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "歪小子斯科特对抗全世界",
            target: "user35",
            value: 1,
          },
          {
            source: "user8902",
            target: "歪小子斯科特对抗全世界",
            value: 1,
          },
          {
            source: "九降风",
            target: "user8902",
            value: 1,
          },
          {
            source: "茉莉花开",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "茉莉花开",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "唯爱永生",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "唯爱永生",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "天伦之旅",
            target: "user35",
            value: 1,
          },
          {
            source: "user5071",
            target: "天伦之旅",
            value: 1,
          },
          {
            source: "九降风",
            target: "user5071",
            value: 1,
          },
          {
            source: "天伦之旅",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "天伦之旅",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "算死草",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "算死草",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "我11",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "我11",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "我自己的爱达荷",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "我自己的爱达荷",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "菊豆",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "菊豆",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "诗",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "诗",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "金枝欲孽",
            target: "user35",
            value: 1,
          },
          {
            source: "剧情\r",
            target: "金枝欲孽",
            value: 1,
          },
          {
            source: "九降风",
            target: "剧情\r",
            value: 1,
          },
          {
            source: "回忆三部曲",
            target: "user35",
            value: 1,
          },
          {
            source: "user9218",
            target: "回忆三部曲",
            value: 1,
          },
          {
            source: "九降风",
            target: "user9218",
            value: 1,
          },
        ],
      };
      //   testdata = data
      const links = testdata.links.map((d) => Object.create(d));
      const nodes = testdata.nodes.map((d) => Object.create(d));
      const SVG = d3
        .select("#force")
        .append("svg")
        .attr("class", "force")
        .attr("viewBox", [0, 0, 600, 600]);

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
        .force("charge", d3.forceManyBody().strength(-500).distanceMax(500))
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
        .attr("r", (d) => {
          if (d.group == 6 || d.group == 7) return 50;
          else return 5;
        })
        .attr('id', (d,i)=> i)
        .attr("fill", (d) => colors[d.group])
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