<template>
  <div id="result">
    <div id="force" class="force" ref="force"></div>
    <div id="coordinate" class="coordinate" ref="coordinate"></div>
    <div id="venn" class="venn" ref="venn"></div>
  </div>
</template>

<script>
import axios from "axios";
import Venn from "@/components/js/venn";
import Coordinate from "@/components/js/coordinate";
export default {
  name: "result",
  components: {},
  data() {
    return {};
  },
  created: function () {
  },
  mounted: function(){
    new Venn(this.$refs.venn);
    new Coordinate(this.$refs.coordinate);
  },
  methods: {},
};
</script>
<style lang="stylus" scoped>
#result {
  width: 50%;
  height: 100%;
  border: 1px solid black;
}

#force {
  width: 100%;
  height: 70%;
  float: left;
  border: 1px solid black;
}

#coordinate {
  width: 50%;
  height: 30%;
  float: left;
  border: 1px solid black;
}

#venn {
  width: 49%;
  height: 30%;
  float: left;
  border: 1px solid black;
}
</style>