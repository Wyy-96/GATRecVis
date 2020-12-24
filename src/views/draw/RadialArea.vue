<template>
    <div>
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <button @click="getTest()" > test</button>
        <div  id="RadialArea" class="RadialArea" ref="RadialArea">
       <!-- @click="" -->
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import * as d3 from 'd3';

import RadialArea from '@/components/js/Radialarea'
export default {
  name: "RadialArea",
  data() {
    return {
        input: ''
    };
  },
  created: function() {

  },
  mounted() {
    
  },
  methods: {
    getTest() {
      console.log(this.input)
      axios.post('api/getrec/getRec',{data:this.input}
        ).then(res=>{
          console.log(res.data)
          this.$refs.RadialArea.innerHTML =  '' ;
          new RadialArea(this.$refs.RadialArea, res.data)
        })
        .catch(err=>{
        console.log(err)
      })
    },
    // test(){
    //     var angle = 2*Math.PI
    //     var data = [[100,80,60,90,90,100]]
    //     var areaRadial = d3.areaRadial()
    //                     .innerRadius(d => d/2)
    //                     .outerRadius(d => d)
    //                     .angle((d,i) => {
    //                         if(i == 5)  return 0
    //                         return (i/5)*angle
    //                     })
    //     var svg = d3.selectAll("#RadialArea").append("svg")
    //     var areaRadialChart = svg.selectAll('path').data(data)
    //     areaRadialChart.enter().append('path')
    //         .attr('transform','translate(100,100)')
    //         .attr('d',function(d){return areaRadial(d)})
    //         .style('fill','#eef')
    // }
  }
};
</script>
<style lang="stylus" scoped>
#RadialArea {
   width:1450px;
    height:1010px;
    background:black;
}
.relMap_g{
    background:blue;
}
</style>