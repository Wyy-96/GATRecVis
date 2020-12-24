<template>
  <div class="right">
    <div class="View-title"><p>Forceview</p></div>
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
    width:1450px;
    height:99%;
    float:left;
}
</style>