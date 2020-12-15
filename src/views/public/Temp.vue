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
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
  // background: url('~@/assets/login/login-background.png');
  background-size: 100% 80%;
  background-repeat: no-repeat;
  background-position:50% 50%;
}
</style>