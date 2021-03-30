<template>
  <div class="right">
      <resultView></resultView>
  </div>
</template>

<script>
import resultView from "../draw/result.vue";
export default {
  name: "Right",
  components: {
    resultView,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style lang="stylus" scoped>
.right {
  width: 85%;
  height: 100%;
}
</style>