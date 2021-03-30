import * as d3 from 'd3';
import { event } from 'jquery';


export default class RadialArea {
  constructor(selector, data) {
    let mapW = 500
    //parseInt(d3.select(selector).style('width'))
    let mapH = 500
    //parseInt(d3.select(selector).style('height'))

    this.defaultWH = {
      width: mapW,
      height: mapH,
    }
    this.config = {
      cellColor1: 'white',
      cellColor2: 'green',
      scaleExtent: [0.5, 5],    // 缩放的比例尺
      isScale: true,              // 是否启用缩放平移zoom功能
    };
    // 画布
    this.map = d3.select(selector);



    this.data = data


    this.innerRadius = 0
    this.outerRadius = 200

    this.drawRadial_Stacked_Bar_Chart()


  }
  drawRadial_Stacked_Bar_Chart() {
    function sortRate1(a, b) {
      return a.rate1 - b.rate1;
    }
    function sortRate2(a, b) {
      return a.rate2 - b.rate2;
    }
    this.SVG = this.map.append("svg")
      .attr("viewBox", `${- this.defaultWH.width / 2} ${- this.defaultWH.height / 2} ${this.defaultWH.width} ${this.defaultWH.height}`)
      .style("width", "100%")
      .style("height", "auto")
      .style("font", "10px sans-serif")
    // .on('click', (event, d) => { console.log(d3.select(this)) })
    // .call(d3.zoom()
    //     .extent([[0, 0], [this.defaultWH.width, this.defaultWH.height]])
    //     .scaleExtent([1, 8])
    //     .on("zoom", function ({ transform }) {
    //         relMap_g.attr("transform", transform)
    //         interMap_g.attr("transform", transform)
    //     }));


    // 放图的容器
    const relMap_g = this.SVG.append("g")
      .attr("class", "relMap_g")
      .attr("width", this.defaultWH.width)
      .attr("height", this.defaultWH.height);


    //颜色范围
    const color = d3.scaleOrdinal()
      .domain(this.data.columns.slice(1))
      .range(["#98abc5", "#6b486b", "#ff8c00"])

    //曲形柱状堆叠图
    const arc = d3.arc()
      .innerRadius(d => y(d[0]))
      .outerRadius(d => y(d[1]))
      .startAngle(d => x(d.data.State))
      .endAngle(d => x(d.data.State) + x.bandwidth())
      .padRadius(this.innerRadius)

    const x = d3.scaleBand()
      .domain(this.data.map(d => d.State))
      .range([0, 2 * Math.PI])
      .align(0)


    const y = d3.scaleRadial()
      .domain([0, d3.max(this.data, d => d.total)]) //d3.max(this.data, d => d.total)
      .range([100, 250])

    relMap_g.append("g")
      .selectAll("g")
      .data(d3.stack().keys(this.data.columns.slice(1))(this.data))
      .join("g")
      .attr("fill", d => color(d.key))
      .selectAll("path")
      .data(d => d)
      .join("path")
      .attr("d", arc);

    
    relMap_g.append("circle")
      .attr("cx", "0px")
      .attr("cy", "0px")
      .attr("r", '8')
      .attr("fill", "#8a89a6")
      .attr("opacity", "0.7");

    this.xAxis = g => g
      .attr("text-anchor", "middle")
      .call(g => g.selectAll("g")
        .data(this.data)
        .join("g")
        .attr("transform", d => `
                      rotate(${((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 93.5)})
                      translate(${this.innerRadius},0)
                    `)
        .call(g => g.append("line")
          .attr("x2", -5)
          .attr("stroke", "#000"))
        .call(g => g.append("text")
          .attr("transform", d => (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
            ? "rotate(90)translate(0,16)"
            : "rotate(-90)translate(0,-9)")
          .text(d => d.State)))

    this.yAxis = g => g
      .attr("text-anchor", "middle")
      .call(g => g.append("text")
        .attr("y", d => -y(y.ticks(5).pop()))
        .attr("dy", "-1em"))
      // .text("Population"))
      .call(g => g.selectAll("g")
        .data(y.ticks(5).slice(1))
        .join("g")
        .attr("fill", "none")
        .call(g => g.append("circle")
          .attr("stroke", "#000")
          .attr("stroke-opacity", 0.5)
          .attr("r", y))
        .call(g => g.append("text")
          .attr("y", d => -y(d))
          .attr("dy", "0.35em")
          .attr("stroke", "#fff")
          .attr("stroke-width", 5)
          // .text(y.tickFormat(5, "s"))
          .clone(true)
          .attr("fill", "#000")
          .attr("stroke", "none")))

    this.legend = g => g.append("g")
      .selectAll("g")
      .data(this.data.columns.slice(1).reverse())
      .join("g")
      .attr("transform", (d, i) => `translate(${-this.defaultWH.height/2 +20},${(i - (this.data.columns.length + 8)) * 20})`)
      .call(g => g.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", color))
      .call(g => g.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text(d => d))

    // relMap_g.append("g")
    //     .call(this.xAxis);
    // relMap_g.append("g")
    //     .call(this.yAxis);

    relMap_g.append("g")
      .call(this.legend);

    var time_s = true
    const drag_x = function (data, width, height) {
      function dragstarted(event, d) {
      }
      function dragCircle(event, d) {
        // 延时刷新
        if (time_s == true) {
          time_s = false
          setTimeout(() => {
            time_s = true
          }, 100);
        } else {
          return
        }
        var Angle = 0
        var A = { 'x': width, 'y': height }
        var B = { 'x': width, 'y': 0 }
        var lengthAB = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2))
        var lengthAC = Math.sqrt(Math.pow(A.x - event.sourceEvent.layerX, 2) + Math.pow(A.y - event.sourceEvent.layerY, 2))
        var lengthBC = Math.sqrt(Math.pow(B.x - event.sourceEvent.layerX, 2) + Math.pow(B.y - event.sourceEvent.layerY, 2))
        var cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) / (2 * lengthAB * lengthAC);
        Angle = Math.acos(cosA)

        if (event.sourceEvent.layerX < width)
          Angle = 2 * Math.PI - Angle

        d3.select(this)
          .attr("transform", `rotate(${Angle * 180 / Math.PI}, ${0} ${0})`)
          .attr('text', Angle)

        if (d3.select(this).attr('class') == 'Selec_cri') {
          var a = parseFloat(d3.selectAll('.Selec_cri')._groups[0][0].attributes.text.value) + 0.04
          var b = parseFloat(d3.selectAll('.Selec_cri')._groups[0][1].attributes.text.value) + 0.045
          if (a > b)
            a = - 2 * Math.PI + a

          // 绘制指针间扇形面积
          d3.select('.Selec_area').selectAll('path')
            .data([{ "startAngle": a, "endAngle": b, "padAngle": 0 }
            ])
            .join("path")
            .attr('d', arc_brush)
            .attr('fill', '#7b6888')
            .attr('class', 'Selec_area')
            .attr("transform", `rotate(${0}, ${0} ${0})`)
            .attr("opacity", "0.2");

          // 根据指针角度 筛选数据
          var selectData = new Array()
          data.forEach(function (item, i) {
            var data_rotate = x(item.State) + x.bandwidth() / 2
            if (a < 0)
              if (data_rotate < b && data_rotate > 0)
                selectData.push(item)
            if (data_rotate < 2 * Math.PI && data_rotate > a + 2 * Math.PI)
              selectData.unshift(item)
            if (a > 0)
              if (data_rotate < b && data_rotate > a)
                selectData.push(item)
          })
          // 绘制所选区域数据
          DrawSelectData(selectData,width,height)
        }
      }
      function endDragging(event, d) {

      }
      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragCircle)
        .on("end", endDragging);
    }



    function DrawSelectData(testdata, width, height) {
      
      const x = d3.scaleBand()
        .domain(testdata.map(d => d.State))
        .range([-width, width])
        .padding(0.1)
      const y = d3.scaleLinear()
        .domain([0, d3.max(testdata, d => d.total)])
        .rangeRound([width, width-90])

      testdata.columns = Object.keys(testdata[0]).slice(0, 3)

      scaleMap_g
        .selectAll("g")
        .data(d3.stack().keys(testdata.columns.slice(1))(testdata))
        .join("g")
        .attr("fill", d => color(d.key))
        .selectAll("rect")
        .data(d => d)
        .join('rect')
        .attr("x", (d, i) => x(d.data.State))
        .attr("y", function (d) {
          return y(d[1])
        })
        .on('click',(event,d)=>{
          //小矩形的id  例，u217
          console.log(d.data.State)
        })
        .attr('id',d=>'rect_'+d.data.State)
        .attr("transform", `translate(0, 0)`)
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth());


    }
    // 交互的容器
    const interMap_g = this.SVG.append("g")
      .attr("class", "interMap_g")
      .attr("width", this.defaultWH.width)
      .attr("height", this.defaultWH.height);

    // 交互区域构建
    var arc_brush = d3.arc()
      .outerRadius(this.outerRadius)
      .innerRadius(this.innerRadius);

    interMap_g.selectAll('path')
      .data([{ "startAngle": 0, "endAngle": 2 * Math.PI, "padAngle": 0 }])
      .join("path")
      .attr('d', arc_brush)
      .attr('fill', '#7b6888')
      .attr("opacity", "0");

    //选择器
    const inter = interMap_g.append('g')

    inter.selectAll('path')
      .data([{ "startAngle": 0, "endAngle": 0.04, "padAngle": 0 },
      { "startAngle": 0.045, "endAngle": 0.085, "padAngle": 0 }
      ])
      .join("path")
      .attr('d', arc_brush)
      .attr('fill', '#7b6888')
      .call(drag_x(this.data, this.defaultWH.width / 2, this.defaultWH.height / 2))
      .attr('class', 'Selec_cri')
      .attr('text', 0)
      .attr('z-index', 99)
      .attr("transform", `rotate(${0}, ${0} ${0})`)
      .attr("opacity", "0.7");

    inter.append('g')
      .attr('class', 'Selec_area')



    const scaleMap_g = this.SVG.append("g")
      .attr('class', 'scaleMap_g')

  }
}

// export default class RadialArea {
//   constructor(selector, data, configs = {}) {
//     var width = 900
//     var height = 900
//     var innerRadius = 0.35 * width / 2
//     var outerRadius = 0.9 * width / 2

//     this.map = d3.select(selector);

//     function colorDomain() {
//       const extent = d3.extent(data, d => d.avg),
//         interpolated = d3.interpolate(...extent)

//       return d3.quantize(interpolated, 7)
//     }
//     const color = d3.scaleLinear(
//       colorDomain,
//       d3.quantize(d3.interpolateSpectral, 7).reverse()
//     )

//     const xScale = d3.scaleBand(
//       data.map(d => d.date),
//       [0, 2 * Math.PI]
//     )

//     function yDomain() {
//       const min = d3.min(data, d => d.min),
//         max = d3.max(data, d => d.max)

//       return [min, max]
//     }

//     const yScale = d3.scaleLinear()
//       .domain([0, d3.max(data, d => d.max)])
//       .range([innerRadius, outerRadius])

//     const arc = d3.arc()
//       .innerRadius(d => yScale(d.min))
//       .outerRadius(d => yScale(d.max))
//       .startAngle(d => xScale(d.date))
//       .endAngle(d => xScale(d.date) + xScale.bandwidth())
//       .padAngle(0.01)
//       .padRadius(innerRadius)

//     const svg = this.map.append('svg')
//       .attr('width', width)
//       .attr('height', height)

//     const container = svg.append('g')
//       .attr('class', 'container')
//       .attr('transform', `translate(${width / 2},${height / 2})`)
//       .style('font-size', 10)
//       .style('font-family', 'sans-serif')

//     container
//       .selectAll('path')
//       .data(data)
//       .join('path')
//       .style('fill', d => color(d.avg))
//       .style('stroke', d => color(d.avg))
//       .attr('d', arc)

//     // container.append('g')
//     //   .call(xAxis)

//     // container.append('g')
//     //   .call(yAxis)

//     return svg.node()
//   }

// }