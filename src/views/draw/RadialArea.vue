<template>
  <div id="RadialArea" class="RadialArea" ref="RadialArea">
    <!-- @click="" -->
  </div>
</template>
<script>
import axios from "axios";
import * as d3 from 'd3'
import store from '@/store'
export default {
  name: "RadialArea",
  data() {
    return {};
  },
  created: function () {},
  mounted() {
    axios.get("/test_data_9625_no0.csv").then((res) => {
      //test_data_9625_no0
      var data = d3.csvParse(res.data, (d, _, columns) => {
        let total = 0;
        for (let i = 1; i < columns.length; ++i)
          total += d[columns[i]] = +d[columns[i]];
        d.total = total;
        return d;
      });
      const config = {
        width: 500,
        height: 500,
        innerRadius: 0,
        outerRadius: 200,
      };
      this.drawRadialStackedBarChart(this.$refs.RadialArea, config, data);
    });
  },
  methods: {
    drawRadialStackedBarChart(map, config, data) {
      const SVG = d3
        .select(map)
        .append("svg")
        .attr(
          "viewBox",
          `${-config.width / 2} ${-config.height / 2} ${config.width} ${
            config.height
          }`
        )
        .style("width", "100%")
        .style("height", "auto")
        .style("font", "10px sans-serif");

      // 放图的容器
      const relMap_g = SVG.append("g")
        .attr("class", "relMap_g")
        .attr("width", config.width)
        .attr("height", config.height);

      //颜色范围
      const color = d3
        .scaleOrdinal()
        .domain(data.columns.slice(1))
        .range(["#98abc5", "#6b486b", "#ff8c00"]);

      //曲形柱状堆叠图
      const arc = d3
        .arc()
        .innerRadius((d) => y(d[0]))
        .outerRadius((d) => y(d[1]))
        .startAngle((d) => x(d.data.State))
        .endAngle((d) => x(d.data.State) + x.bandwidth())
        .padRadius(config.innerRadius);

      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.State))
        .range([0, 2 * Math.PI])
        .align(0);

      const y = d3
        .scaleRadial()
        .domain([0, d3.max(data, (d) => d.total)]) //d3.max(this.data, d => d.total)
        .range([100, 250]);

      relMap_g
        .append("g")
        .selectAll("g")
        .data(d3.stack().keys(data.columns.slice(1))(data))
        .join("g")
        .attr("fill", (d) => color(d.key))
        .selectAll("path")
        .data((d) => d)
        .join("path")
        .attr("d", arc);

      relMap_g
        .append("circle")
        .attr("cx", "0px")
        .attr("cy", "0px")
        .attr("r", "8")
        .attr("fill", "#8a89a6")
        .attr("opacity", "0.7");

      const legend = (g) =>
        g
          .append("g")
          .selectAll("g")
          .data(data.columns.slice(1).reverse())
          .join("g")
          .attr(
            "transform",
            (d, i) =>
              `translate(${-config.height / 2 + 20},${
                (i - (data.columns.length + 8)) * 20
              })`
          )
          .call((g) =>
            g
              .append("rect")
              .attr("width", 18)
              .attr("height", 18)
              .attr("fill", color)
          )
          .call((g) =>
            g
              .append("text")
              .attr("x", 24)
              .attr("y", 9)
              .attr("dy", "0.35em")
              .text((d) => d)
          );

      relMap_g.append("g").call(legend);

      var time_s = true;
      const drag_x =  (data, width, height)=> {
        function dragstarted(event, d) {}
        function dragCircle(event, d) {
          // 延时刷新
          if (time_s == true) {
            time_s = false;
            setTimeout(() => {
              time_s = true;
            }, 100);
          } else {
            return;
          }
          var Angle = 0;
          var A = { x: width, y: height };
          var B = { x: width, y: 0 };
          var lengthAB = Math.sqrt(
            Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2)
          );
          var lengthAC = Math.sqrt(
            Math.pow(A.x - event.sourceEvent.layerX, 2) +
              Math.pow(A.y - event.sourceEvent.layerY, 2)
          );
          var lengthBC = Math.sqrt(
            Math.pow(B.x - event.sourceEvent.layerX, 2) +
              Math.pow(B.y - event.sourceEvent.layerY, 2)
          );
          var cosA =
            (Math.pow(lengthAB, 2) +
              Math.pow(lengthAC, 2) -
              Math.pow(lengthBC, 2)) /
            (2 * lengthAB * lengthAC);
          Angle = Math.acos(cosA);

          if (event.sourceEvent.layerX < width) Angle = 2 * Math.PI - Angle;

          d3.select(this)
            .attr("transform", `rotate(${(Angle * 180) / Math.PI}, ${0} ${0})`)
            .attr("text", Angle);

          if (d3.select(this).attr("class") == "Selec_cri") {
            var a =
              parseFloat(
                d3.selectAll(".Selec_cri")._groups[0][0].attributes.text.value
              ) - 0.0001;
            var b =
              parseFloat(
                d3.selectAll(".Selec_cri")._groups[0][1].attributes.text.value
              ) + 0.01;
            if (a > b) a = -2 * Math.PI + a;

            // 绘制指针间扇形面积
            d3.select(".Selec_area")
              .selectAll("path")
              .data([{ startAngle: a, endAngle: b, padAngle: 0 }])
              .join("path")
              .attr("d", arc_brush)
              .attr("fill", "#7b6888")
              .attr("class", "Selec_area")
              .attr("transform", `rotate(${0}, ${0} ${0})`)
              .attr("opacity", "0.2");

            // 根据指针角度 筛选数据
            var selectData = new Array();
            var selectData_rev = new Array();
            data.forEach(function (item, i) {
              var data_rotate = x(item.State) + x.bandwidth() / 2;
              if (a < 0) {
                if (data_rotate < b && data_rotate > 0) selectData.push(item);
                if (data_rotate < 2 * Math.PI && data_rotate > a + 2 * Math.PI)
                  selectData_rev.push(item);
              }
              if (a > 0)
                if (data_rotate < b && data_rotate > a) selectData.push(item);
            });
            // 绘制所选区域数据
            let c = selectData_rev.concat(selectData);
            DrawSelectData(c, width, height);
          }
        }
        function endDragging(event, d) {}

        return d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragCircle)
          .on("end", endDragging);
      };

      function DrawSelectData(testdata, width, height) {
        const x = d3
          .scaleBand()
          .domain(testdata.map((d) => d.State))
          .range([-width, width])
          .padding(0.1);
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(testdata, (d) => d.total)])
          .rangeRound([width, width - 90]);

        testdata.columns = Object.keys(testdata[0]).slice(0, 3);

        scaleMap_g
          .selectAll("g")
          .data(d3.stack().keys(testdata.columns.slice(1))(testdata))
          .join("g")
          .attr("fill", (d) => color(d.key))
          .selectAll("rect")
          .data((d) => d)
          .join("rect")
          .attr("x", (d, i) => x(d.data.State))
          .attr("y", function (d) {
            return y(d[1]);
          })
          .on("click", (event, d) => {
            //小矩形的id  例，u217
            store.commit("global/SET_USER_ID", d.data.State);
          })
          .attr("id", (d) => "rect_" + d.data.State)
          .attr("transform", `translate(0, 0)`)
          .attr("height", (d) => y(d[0]) - y(d[1]))
          .attr("width", x.bandwidth());
      }
      // 交互的容器
      const interMap_g = SVG.append("g")
        .attr("class", "interMap_g")
        .attr("width", config.width)
        .attr("height", config.height);

      // 交互区域构建
      var arc_brush = d3
        .arc()
        .outerRadius(config.outerRadius)
        .innerRadius(config.innerRadius);

      interMap_g
        .selectAll("path")
        .data([{ startAngle: 0, endAngle: 2 * Math.PI, padAngle: 0 }])
        .join("path")
        .attr("d", arc_brush)
        .attr("fill", "#7b6888")
        .attr("opacity", "0");

      //选择器
      const inter = interMap_g.append("g");

      inter
        .selectAll("path")
        .data([
          { startAngle: -0.04, endAngle: 0, padAngle: 0 },
          { startAngle: 0.01, endAngle: 0.05, padAngle: 0 },
        ])
        .join("path")
        .attr("d", arc_brush)
        .attr("fill", "#7b6888")
        .call(
          drag_x(data, config.width / 2, config.height / 2)
        )
        .attr("class", "Selec_cri")
        .attr("text", 0)
        .attr("z-index", 99)
        .attr("transform", `rotate(${0}, ${0} ${0})`)
        .attr("opacity", "0.7");

      inter.append("g").attr("class", "Selec_area");

      const scaleMap_g = SVG.append("g").attr("class", "scaleMap_g");
    },
  },
};
</script>
<style lang="stylus" scoped>
#RadialArea {
  height: 50%;
  width: 100%;
  border: solid 1px black;
}
</style>