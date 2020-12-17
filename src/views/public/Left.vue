<template>
  <div class="left">
    <div class="navbar-header View-title"><p>GATRecVis</p></div>
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
  width:380px;
  height:99%;
  background:#fff;
  float:left;
}
.navbar-header {
  text-align: center;
  color:#fff;
  background:  rgb(172, 102, 102);
}
.datainfo {
    width:380px;
    height:350px;
    background:rgb(192, 191, 191);
}
</style>