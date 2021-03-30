<template>
  <div id="result">
    <div id="force" class="force" ref="force"></div>
    <div id="statistics" class="statistics" ref="statistics"></div>
    <div id="venn" class="venn" ref="venn"></div>
  </div>
</template>

<script>
import axios from "axios";
import Venn from "@/components/js/venn";
export default {
  name: "result",
  components: {},
  data() {
    return {};
  },
  created: function () {
    // axios.get("/test_data_9625_no0.csv").then((res) => {
    new Venn(this.$refs.venn);
    // });
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

#statistics {
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