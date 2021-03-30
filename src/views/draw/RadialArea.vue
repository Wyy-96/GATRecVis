<template>
  <div id="RadialArea" class="RadialArea" ref="RadialArea">
    <!-- @click="" -->
  </div>
</template>
<script>
import axios from "axios";
import * as d3 from "d3";

import RadialArea from "@/components/js/Radialarea";
export default {
  name: "RadialArea",
  data() {
    return {
    };
  },
  created: function () {
    axios.get("/test_data_9625_no0.csv").then((res) => {
      //test_data_9625_no0
      var data = d3.csvParse(res.data, (d, _, columns) => {
        let total = 0;
        for (let i = 1; i < columns.length; ++i)
          total += d[columns[i]] = +d[columns[i]];
        d.total = total;
        return d;
      });
      // console.log(res.data)
      new RadialArea(this.$refs.RadialArea, data);
    });
  },
  mounted() {},
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