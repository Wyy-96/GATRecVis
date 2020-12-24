<template>
    <div>
        <button @click="getTest()" > test</button>
        <div  id="Forcerelation" class="Forcerelation" ref="Forcerelation">
       <!-- @click="" -->
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import * as d3 from 'd3';
import RelationChart from 'relation-chart';

const Config = {
    width: 1000,                 // 总画布svg的宽,单位为px,默认为容器的宽
    height: 800,                // 高，默认为容器的高
    isHighLight: true,        // 是否启动 鼠标 hover 到节点上高亮与节点有关的节点，其他无关节点透明的功能
    isScale: true,              // 是否启用缩放平移zoom功能
    scaleExtent: [0.5, 1.5],    // 缩放的比例尺
    chargeStrength: -300,        // 万有引力
    collide: 100,                 // 碰撞力的大小 （节点之间的间距）
    nodeWidth: 30,             // 每个node节点所占的宽度，正方形
    margin: 20,                 // node节点距离父亲div的margin
    alphaDecay: 0.0228,          // 控制力学模拟衰减率
    r: 30,                      // 头像的半径 [30 - 45]
    relFontSize: 12,           // 关系文字字体大小
    linkSrc: 30,                // 划线时候的弧度
    linkColor: '#000',        // 链接线默认的颜色
    strokeColor: '#fff',     // 头像外围包裹的颜色
    strokeWidth: 1,             // 头像外围包裹的宽度
}
var appData = require('@/assets/student0.json');
import RelationForce from '@/components/js/index'
export default {
  name: "Forcerelation",
  data() {
    return {
     
    };
  },
  created: function() {

  },
  mounted() {
    
  },
  methods: {
    getTest() {
      axios.post('api/getrec/getRec'
        ).then(res=>{
          console.log(res.data)
          // this.$refs.Forcerelation.innerHTML =  '' ;
          // new RelationForce(this.$refs.Forcerelation, res.data,Config)
        })
        .catch(err=>{
        console.log(err)
      })
    }
  }
};
</script>
<style lang="stylus" scoped>
#Forcerelation {
   width:1450px;
    height:1010px;
    background:#eef;
}
</style>