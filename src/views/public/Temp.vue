<template>
  <div class="home">
    <leftView></leftView>
    <rightView></rightView>
  </div>
</template>

<script>
import leftView from './Left.vue'
import rightView from './Right.vue'
export default {
  name: "Temp",
  components: {
    leftView,
    rightView
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
.home {
  width:1900px;
  height: 995px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
}
</style>