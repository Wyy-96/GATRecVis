<template>
  <div class="left">
    <div class="header View-title"><p>title</p></div>
    <div class="datainfo"></div>
    <heatmapView></heatmapView>
  </div>
</template>

<script>
import heatmapView from '../draw/Heatmap'
export default {
  name: "Left",
  components: {
    heatmapView
  },
  data() {
    return {
     
    };
  },
  created: function() {
  },
  methods: {
  }
};
</script>
<style lang="stylus" scoped>
.left {
  width:15%;
  height:100%;
  background:#fff;
  float:left;
}
.datainfo{
  height: 50%;
  width:100%;
  background-color : red;
}
.header{
  background-color : #00ac00;
}
</style>