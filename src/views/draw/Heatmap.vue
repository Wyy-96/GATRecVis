<template>
    <div  id="Heatmap" class="Heatmap" ref="Heatmap">
    </div>
</template>

<script>
import axios from 'axios'
import * as d3 from 'd3';

export default {
  name: "Heatmap",
  data() {
    return {
     
    };
  },
  created: function() {

  },
  //   axios.post('api/getdata/getHeatmap'
  //     ).then(res=>{
  //       var data = res.data;
  //       const config = {
  //           margins: {top: 80, left: 50, bottom: 50, right: 50},
  //           textColor: 'black',
  //           title: '日历热力图',
  //           hoverColor: 'red',
  //           cellWidth: 6,
  //           cellHeight: 6,
  //           cellPadding: 1,
  //           cellColor1: 'white',
  //           cellColor2: 'green',
  //           lineColor: 'yellow',
  //           lineWidth: 2
  //       }
  //       /* ----------------------------初始化常量------------------------  */
  //       const widthOffset = config.cellWidth + config.cellPadding;
  //       const heightOffset = config.cellHeight + config.cellPadding;
  //       /* ----------------------------颜色转换------------------------  */
  //       let scaleColor = d3.scaleLinear()
  //           .domain([0, d3.max(Object.values(res.data[0])) * 20])
  //           .range([config.cellColor1, config.cellColor2]);
  //       /* ----------------------------渲染矩形------------------------  */
    
  //       let svg = d3.select("#Heatmap").append('svg')
  //           .attr("width", 320)
  //           .attr("height", 550)
  //       let databody = svg.append('g')
  //           .attr('class', 'heatdate')
  //           .attr('transform', 'translate(' + 10 + ',' + 10 + ')')
  //           .call(
  //               d3.zoom()
  //                   .scaleExtent([1, 3])
  //                   .on("zoom", function () {
  //                       databody.attr("transform", d3.event.transform);
  //                   })
  //           )
  //       console.log(svg)
  //       renderReact()
  //       function renderReact() {
  //           let Group
  //           let currentIndex = 0;
  //           const totalIndex = 3153;
    
  //           let currentDate = 0;
  //           while (currentIndex <= totalIndex) {
  //               let currentDsting = currentDate.toString();
    
  //               Group = databody
  //                   .append('g')
  //                   .attr('class', 'year ' + currentDsting);
    
  //               Group
  //                   .append('g')
  //                   .attr('class', 'g ')
  //                   .datum(currentDsting)
  //                   .append('rect')
  //                   .attr('width', config.cellWidth)
  //                   .attr('height', config.cellHeight)
  //                   .attr('x', Math.floor(currentIndex / 75) * widthOffset)
  //                   .attr('y', currentIndex % 75 * heightOffset);
    
  //               currentIndex++;
  //               currentDate++;
  //           }
  //       }
        
    
  //       d3.selectAll('.g')
  //           .on('mouseenter', function (d) {
  //                   const e = d3.event;
  //                   const position = d3.mouse(this);
    
  //                   d3.select(e.target)
  //                       .attr('fill', config.hoverColor);
    
  //                   d3.select("svg")
  //                       .append('text')
  //                       .classed('tip', true)
  //                       .attr('x', position[0] + 5)
  //                       .attr('y', position[1])
  //                       .attr('fill', config.textColor)
  //                       .text(d.time + ':' + d.value);
  //           })
  //           .on('mouseleave', function (d) {
  //                   const e = d3.event;
    
  //                   d3.select(e.target)
  //                       .attr('fill', scaleColor(d.value * 20));
    
  //                   d3.select('.tip').remove();
  //           })
  //           .each(function (d) {
  //                 d3.select(this)
  //                     .attr('fill', scaleColor(data[d]["recall"] * 20 || 0))
  //                     .datum({time: d, value: data[d]["recall"] || 0});
  //       });
  //     }).catch(err=>{
  //       console.log(err)
  //     })
        
         
  // },
  mounted() {
    // new RelationChart(this.$refs.Heatmap, data)
  },
  methods: {
    
  }
};
</script>
<style lang="stylus" scoped>
#Heatmap {
    width:380px;
    height:655px;
    background:#eee;
}
</style>