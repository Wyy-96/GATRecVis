<template>
  <div class="right">
    <div class="View-title"><p>Forceview</p></div>
    <directedForceView></directedForceView>
  </div>
</template>

<script>
import directedForceView from '../draw/Directedforce'
export default {
  name: "Right",
  components: {
    directedForceView,
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