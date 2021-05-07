<template>
  <div id="result">
    <forceView></forceView>
    <div id="coordinate" class="coordinate" ref="coordinate"></div>
    <div id="venn" class="venn" ref="venn"></div>
    <div id="Word" class="Word" ref="Word"></div>
  </div>
</template>

<script>
import axios from "axios";
import * as d3 from "d3";
import forceView from "../draw/forceView.vue";
import store from "@/store";

export default {
  name: "result",
  components: {
    forceView,
  },
  data() {
    return {};
  },
  created: function () {},
  mounted: function () {
    this.Venn(this.$refs.venn);
    this.Coordinate(this.$refs.coordinate, []);
    this.word({"values":[],"rate":[]});
  },
  watch: {
    "$store.getters.userId"() {
      // console.log(this.$store.getters.userId);
      axios
        .post("api/getdata/selectUser", { data: this.$store.getters.userId })
        .then((res) => {
          document.getElementById("coordinate").innerHTML = "";
          this.Coordinate(this.$refs.coordinate, res.data.Coodinare);
          let box = document.getElementsByClassName("none");
          // 已经存在VennResult散点图  则删除
          if (box.length == 1) box[box.length - 1].remove();
          this.VennResult(this.$refs.venn, res.data.Vennresult);
          d3.select(".Word").selectAll("svg").remove()
          this.word(res.data.Word)
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
      let keys = ["pre", "recall", "auc", "personal"];
      let y = new Map(
        Array.from(keys, (key) => [key, d3.scaleLinear([0, 1], [450, -30])])
      );
      let x = d3.scalePoint(keys, [20, 570]);

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
          `${-config.width / 8} ${-config.height / 5} ${config.width * 1.9} ${
            config.height * 1.9
          }`
        )
        .style("width", "100%")
        .style("height", "auto")
        // .call(
        //   d3
        //     .zoom()
        //     .extent([
        //       [0, 0],
        //       [config.width, config.height],
        //     ])
        //     .scaleExtent([1, 8])
        //     .on("zoom", function ({ transform }) {
        //       Coordinate.attr("transform", transform);
        //     })
        // );

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
            .attr("y", 480)
            .attr("text-anchor", "start")
            .attr("fill", "currentColor")
            .attr("font-size", 24)
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
          `${-config.width / 4} ${-config.height / 5} ${config.width * 1.9} ${
            config.height * 1.9
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
        .attr("opacity", 0.6)
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
    VennResult(map, data) {
      let keys = Object.keys(data);
      for (var i = 0; i < keys.length; i++) {
        let area = data[keys[i]];
        for (var j = 0; j < area.length; j++) {
          var asi = [0, 0];
          switch (
            i //["He", "KG", "IN", "HeKG", "HeNI", "KGNI", "HeKGNI"]
          ) {
            case 0:
              asi = recInHetGNN();
              asi.push("H");
              break;
            case 1:
              asi = recInKGAT();
              asi.push("K");
              break;
            case 2:
              asi = recInNIRec();
              asi.push("N");
              break;
            case 3:
              asi = recInHK();
              asi.push("HK");
              break;
            case 4:
              asi = recInHN();
              asi.push("HN");
              break;
            case 5:
              asi = recInKN();
              asi.push("KN");
              break;
            case 6:
              asi = recInHKN();
              asi.push("HKN");
              break;
            default:
              break;
          }
          area[j].x = asi[0];
          area[j].y = asi[1];
          area[j].or = asi[2];
        }
      }
      const config = {
        width: parseInt(d3.select(map).style("width")),
        height: parseInt(d3.select(map).style("height")),
      };
      const SVG = d3.select(map).select("svg");

      const drwacircle = SVG.append("g").attr("class", "none");

      function random(m, n) {
        return Math.floor(Math.random() * (n - m)) + m;
      }

      function recInHetGNN() {
        // .attr("transform", `rotate(${60}, ${0} ${0})`);
        let x = random(230, 470);
        let _y = Math.floor(
          Math.sqrt(
            (1 - Math.pow(x - 350, 2) / Math.pow(120, 2)) * Math.pow(70, 2)
          ) + 100
        );
        let y = random(200 - _y, _y);
        return [x, y];
      }

      function recInKGAT() {
        let x = random(125, 365);
        let _y = Math.floor(
          Math.sqrt(
            (1 - Math.pow(x - 245, 2) / Math.pow(120, 2)) * Math.pow(70, 2)
          ) + 80
        );
        let y = random(160 - _y, _y);
        return [x, y];
      }

      function recInNIRec() {
        //.attr("transform", `rotate(${-60}, ${0} ${0})`);
        let x = random(-220, 20);
        let _y = Math.floor(
          Math.sqrt(
            (1 - Math.pow(x + 100, 2) / Math.pow(120, 2)) * Math.pow(70, 2)
          ) + 525
        );
        let y = random(1050 - _y, _y);
        return [x, y];
      }

      function recInHK() {
        let x = random(95, 185);
        let _y = Math.floor(
          Math.sqrt(Math.pow(45, 2) - Math.pow(x - 140, 2)) + 200
        );
        let y = random(400 - _y, _y);
        return [x, y];
      }

      function recInHN() {
        let x = random(205, 285);
        let _y = Math.floor(
          Math.sqrt(Math.pow(45, 2) - Math.pow(x - 245, 2)) + 380
        );
        let y = random(760 - _y, _y);
        return [x, y];
      }

      function recInKN() {
        let x = random(305, 395);
        let _y = Math.floor(
          Math.sqrt(Math.pow(45, 2) - Math.pow(x - 350, 2)) + 200
        );
        let y = random(400 - _y, _y);
        return [x, y];
      }

      function recInHKN() {
        let x = random(175, 315);
        let _y = Math.sqrt(Math.pow(60, 2) - Math.pow(x - 245, 2)) + 260;
        let y = _y; // random(_y - 80, _y);
        return [x, y];
      }
      // HetGNN
      drwacircle
        .append("g")
        .attr("fill", "#627FA6")
        // .attr("stroke", "red")
        // .attr("stroke-width", 4)
        .style("fill-opacity", 1)
        .selectAll("g")
        .data(data[keys[0]])
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .on("click", (event, d) => {
          //小矩形的id  例，u217
          store.commit("global/SET_MOVIE_ID", d.movieId + "_" + d.or);
        })
        .attr("transform", `rotate(${60}, ${0} ${0})`)
        .attr("r", 6)
        .append("title")
        .text((d) => d.movieName);

      // KGAT
      drwacircle
        .append("g")
        .attr("fill", "#6b486b")
        // .attr("stroke", "red")
        // .attr("stroke-width", 4)
        .style("fill-opacity", 1)
        .selectAll("g")
        .data(data[keys[1]])
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 6)
        .on("click", (event, d) => {
          //小矩形的id  例，u217
          store.commit("global/SET_MOVIE_ID", d.movieId + "_" + d.or);
        })
        .append("title")
        .text((d) => d.movieName);

      drwacircle
        .append("g")
        .attr("fill", "#FF9515")
        // .attr("stroke", "red")
        // .attr("stroke-width", 4)
        .style("fill-opacity", 1)
        .selectAll("g")
        .data(data[keys[2]])
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 6)
        .on("click", (event, d) => {
          //小矩形的id  例，u217
          store.commit("global/SET_MOVIE_ID", d.movieId + "_" + d.or);
        })
        .attr("transform", `rotate(${-60}, ${0} ${0})`)
        .append("title")
        .text((d) => d.movieName);

      drwacircle
        .append("g")
        .attr("fill", "#786A88")
        // .attr("stroke", "red")
        // .attr("stroke-width", 4)
        .style("fill-opacity", 1)
        .selectAll("g")
        .data(data[keys[3]])
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 6)
        .on("click", (event, d) => {
          //小矩形的id  例，u217
          store.commit("global/SET_MOVIE_ID", d.movieId + "_" + d.or);
        })
        .append("title")
        .text((d) => d.movieName);

      drwacircle
        .append("g")
        .attr("fill", "#786A88")
        // .attr("stroke", "red")
        // .attr("stroke-width", 4)
        .style("fill-opacity", 1)
        .selectAll("g")
        .data(data[keys[4]])
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 6)
        .on("click", (event, d) => {
          //小矩形的id  例，u217
          store.commit("global/SET_MOVIE_ID", d.movieId + "_" + d.or);
        })
        .append("title")
        .text((d) => d.movieName);

      drwacircle
        .append("g")
        .attr("fill", "#A77669")
        // .attr("stroke", "red")
        // .attr("stroke-width", 4)
        .style("fill-opacity", 1)
        .selectAll("g")
        .data(data[keys[5]])
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 6)
        .on("click", (event, d) => {
          //小矩形的id  例，u217
          store.commit("global/SET_MOVIE_ID", d.movieId + "_" + d.or);
        })
        .append("title")
        .text((d) => d.movieName);

      drwacircle
        .append("g")
        .attr("fill", "#786A88")
        // .attr("stroke", "red")
        // .attr("stroke-width", 4)
        .style("fill-opacity", 1)
        .selectAll("g")
        .data(data[keys[6]])
        .join("circle")
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .attr("r", 6)
        .on("click", (event, d) => {
          //小矩形的id  例，u217
          store.commit("global/SET_MOVIE_ID", d.movieId + "_" + d.or);
        })
        .append("title")
        .text((d) => d.movieName);
    },
    word(data1) {
      let data = {
        names: [
          "剧情",
          "犯罪",
          "情色",
          "喜剧",
          "爱情",
          "动作",
          "西部",
          "冒险",
          "音乐",
          "传记",
          "悬疑",
          "惊悚",
          "恐怖",
          "纪录片",
          "历史",
          "战争",
          "奇幻",
          "运动",
          "同性",
          "动画",
          "短片",
          "儿童",
          "歌舞",
          "科幻",
          "家庭",
          "武侠",
          "古装",
          "灾难",
          "真人秀",
          "黑色电影",
          "脱口秀",
          "戏曲",
          "舞台",
          "鬼怪",
          "荒诞",
        ],
        years: [1900, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020],
      };
      data.values = data1.values
      data.rate = data1.rate
      const config = {
        width: parseInt(d3.select("#Word").style("width")),
        height: parseInt(d3.select("#Word").style("height")),
      };

      const margin = {
        top: 20,
        right: 1,
        bottom: 40,
        left: 10,
      };

      const height = 11.5;
      const width = 350;
      const innerHeight = height * data.years.length;
      const color = d3.scaleSequentialSqrt([-1, 80], d3.interpolateInferno); //d3.max(data.values, d => d3.max(d)) 
      // const color = d3.scaleSequential([0, 80], ["#98abc5", "#6b486b", "#ff8c00"]); 
      const y = d3.scaleBand().domain(data.years).rangeRound([-22, 210]);

      const x = d3.scaleBand().domain(data.names).rangeRound([-150, 500]);

      const SVG = d3
        .select("#Word")
        .append("svg")
        .attr(
          "viewBox",
          `${-config.width / 4} ${-config.height / 5} ${config.width} ${
            config.height
          }`
        )
        .style("width", "100%")
        .style("height", "auto");

      SVG.append("g")
        .attr("transform", "translate(-140,205)")
        .append(() => legend({ color, width: 260 }));

      SVG.append("g")
        .attr("class", "axisX")
        .attr("transform", `translate(0,${-30})`)
        .attr("font-size", "6")
        .call(d3.axisTop(x).tickSize(1))
        .call((g) => g.select(".domain").remove());

      SVG.append("g")
        .attr("class", "axisY")
        .attr("transform", `translate(${-140},0)`)
        .call(d3.axisLeft(y).tickSize(0))
        .call((g) => g.select(".domain").remove());

      const row = SVG.append("g")
        .attr("class","Rect")
        .selectAll("g")
        .data(data.values)
        .join("g")
        .attr("transform", (d, i) => `translate(0,${y(data.years[i])})`);
        // .attr("class",(d, i) => data.years[i]);

      row
        .selectAll("rect")
        .data((d) => d)
        .join("rect")
        .attr("x", (d, i) => x(data.names[i]) + 1)
        .attr("width", 14)
        .attr("height", y.bandwidth() - 1)
        .attr("fill", (d) =>
          isNaN(d) ? "#eee" : d === 0 ? "white" : color(d)  //#e8e8e8
        )
        .append("title");

      SVG.select(".axisX")
        .selectAll("text")
        .attr("transform", `rotate(${90}, ${1} ${-9})`)
        .attr("font-size", "12");

      SVG.select(".axisY").selectAll("text").attr("font-size", "12");

      const rateView = SVG.append("g")
        .selectAll("g")
        .data(data.rate)
        .join("g")
        .attr("transform", (d, i) => `translate(0,${y(data.years[i])})`);

      rateView
        .selectAll("rect")
        .data((d) => d)
        .join("rect")
        .attr("x", (d, i) => x(data.names[i]) + 1)
        .attr("transform", (d, i) => `translate(0,${(21/7.0 * Math.abs(d - 3))})`)
        .attr("width", 14)
        .attr("height", 2)
        .attr("fill", "white");

      let rectView = d3.select(".Rect").selectAll("g").selectAll('rect').select('title')
      for(let i=0;i<rectView._groups.length;i++){
        for(let j =0;j<rectView._groups[i].length;j++){
          rectView._groups[i][j].append("时间：" + data.years[i] + "\n类型：" + data.names[j]+ "\nrate："+data.rate[i][j] + "\n数量："+data.values[i][j] )
        }
      }
      function legend({
        color,
        tickSize = 0,
        width = 120,
        height = 26 + tickSize,
        marginTop = 9,
        marginRight = 0,
        marginBottom = 8 + tickSize,
        marginLeft = 0,
        ticks = width / 64,
        tickFormat,
        tickValues,
      } = {}) {
        const svg = d3
          .create("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [0, 0, width, height])
          .style("overflow", "visible")
          .style("display", "block");

        let tickAdjust = (g) =>
          g
            .selectAll(".tick line")
            .attr("y1", marginTop + marginBottom - height)
            .attr("y2", 1);
        let x;

        // Continuous
        if (color.interpolate) {
          const n = Math.min(color.domain().length, color.range().length);

          x = color
            .copy()
            .rangeRound(
              d3.quantize(d3.interpolate(marginLeft, width - marginRight), n)
            );

          svg
            .append("image")
            .attr("x", marginLeft)
            .attr("y", marginTop)
            .attr("width", width - marginLeft - marginRight)
            .attr("height", height - marginTop - marginBottom)
            .attr("preserveAspectRatio", "none")
            .attr(
              "xlink:href",
              ramp(
                color.copy().domain(d3.quantize(d3.interpolate(0, 1), n))
              ).toDataURL()
            );
        }

        // Sequential
        else if (color.interpolator) {
          x = Object.assign(
            color
              .copy()
              .interpolator(
                d3.interpolateRound(marginLeft, width - marginRight)
              ),
            {
              range() {
                return [marginLeft, width - marginRight];
              },
            }
          );

          svg
            .append("image")
            .attr("x", marginLeft)
            .attr("y", marginTop)
            .attr("width", width - marginLeft - marginRight)
            .attr("height", height - marginTop - marginBottom)
            .attr("preserveAspectRatio", "none")
            .attr("xlink:href", ramp(color.interpolator()).toDataURL());

          // scaleSequentialQuantile doesn’t implement ticks or tickFormat.
          if (!x.ticks) {
            if (tickValues === undefined) {
              const n = Math.round(ticks + 1);
              tickValues = d3
                .range(n)
                .map((i) => d3.quantile(color.domain(), i / (n - 1)));
            }
            if (typeof tickFormat !== "function") {
              tickFormat = d3.format(
                tickFormat === undefined ? ",f" : tickFormat
              );
            }
          }
        }

        // Threshold
        else if (color.invertExtent) {
          const thresholds = color.thresholds
            ? color.thresholds() // scaleQuantize
            : color.quantiles
            ? color.quantiles() // scaleQuantile
            : color.domain(); // scaleThreshold

          const thresholdFormat =
            tickFormat === undefined
              ? (d) => d
              : typeof tickFormat === "string"
              ? d3.format(tickFormat)
              : tickFormat;

          x = d3
            .scaleLinear()
            .domain([-1, color.range().length - 1])
            .rangeRound([marginLeft, width - marginRight]);

          svg
            .append("g")
            .selectAll("rect")
            .data(color.range())
            .join("rect")
            .attr("x", (d, i) => x(i - 1))
            .attr("y", marginTop)
            .attr("width", (d, i) => x(i) - x(i - 1))
            .attr("height", height - marginTop - marginBottom)
            .attr("fill", (d) => d);

          tickValues = d3.range(thresholds.length);
          tickFormat = (i) => thresholdFormat(thresholds[i], i);
        }

        // Ordinal
        else {
          x = d3
            .scaleBand()
            .domain(color.domain())
            .rangeRound([marginLeft, width - marginRight]);

          svg
            .append("g")
            .selectAll("rect")
            .data(color.domain())
            .join("rect")
            .attr("x", x)
            .attr("y", marginTop)
            .attr("width", Math.max(0, x.bandwidth() - 1))
            .attr("height", height - marginTop - marginBottom)
            .attr("fill", color);

          tickAdjust = () => {};
        }

        svg
          .append("g")
          .attr("class", "asxi_C")
          .attr("transform", `translate(0,${height - marginBottom})`)
          .call(
            d3
              .axisBottom(x)
              .ticks(
                ticks,
                typeof tickFormat === "string" ? tickFormat : undefined
              )
              .tickFormat(
                typeof tickFormat === "function" ? tickFormat : undefined
              )
              .tickSize(tickSize)
              .tickValues(tickValues)
              .tickPadding(4)
          )
          .call(tickAdjust)
          .call((g) => g.select(".domain").remove());

        svg.select(".asxi_C").selectAll("text").attr("font-size", "9");
        return svg.node();
      }

      function ramp(color, n = 256) {
        var canvas = document.createElement("canvas");
        canvas.width = n;
        canvas.height = 1;
        const context = canvas.getContext("2d");
        for (let i = 0; i < n; ++i) {
          context.fillStyle = color(i / (n - 1));
          context.fillRect(i, 0, 1, 1);
        }
        return canvas;
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
#result {
  width: 100%;
  height: 100%;
  border: 1px solid #A6A6A6;
}

#coordinate {
  width: 25%;
  height: 30%;
  float: left;
  border-right: 1px solid #A6A6A6;
}

#venn {
  width: 25%;
  height: 30%;
  float: left;
  border-right: 1px solid #A6A6A6;
}

#Word {
  width: 49%;
  height: 30%;
  float: right;
}
</style>