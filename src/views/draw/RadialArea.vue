<template>
    <div>
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
    axios.get('/test_data_9625.csv').then(res => {
      var data = d3.csvParse(res.data,(d, _, columns) => {
        let total = 0;
        for (let i = 1; i < columns.length; ++i) total += d[columns[i]] = +d[columns[i]];
        d.total = total;
        return d;
      })
      new RadialArea(this.$refs.RadialArea,data)
    })
    
  },
  mounted() {
    
  },
  methods: {
    // getTest() {
    //   console.log(this.input)
    //   axios.post('api/getrec/getRec',{data:this.input}
    //     ).then(res=>{
    //       console.log(res.data)
    //       this.$refs.RadialArea.innerHTML =  '' ;
    //       new RadialArea(this.$refs.RadialArea, res.data)
    //     })
    //     .catch(err=>{
    //     console.log(err)
    //   })
    // },
  }
};
</script>
<style lang="stylus" scoped>
#RadialArea {
    height: 800px;
    width: 800px;
    border:solid 1px black;
}
</style>