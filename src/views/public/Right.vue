<template>
  <div class="right">
    <div class="View-title"></div>
    <RadialAreaView></RadialAreaView>
  </div>
</template>

<script>
import RadialAreaView from '../draw/RadialArea'
export default {
  name: "Right",
  components: {
    RadialAreaView,
  },
  data() {
    return {
     
    };
  },
  methods: {
  }
};
</script>
<style lang="stylus" scoped>
.right {
    width:85%;
    height:100%;
    float:left;
}
</style>