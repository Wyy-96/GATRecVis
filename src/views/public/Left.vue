<template>
  <div class="left">
    <div class="header View-title"><p>HINcomparetor</p></div>
    <div class="datainfo">
      <div class="modelSelect">
        <div class="" style="float: left; margin: 8px 20px 0px 20px">
          <el-switch
            v-model="HetGNNIsShow"
            active-color="#98abc5"
            inactive-color="#D1D1D1"
          >
          </el-switch>
          <el-switch
            v-model="KGATIsShow"
            style="display: block; margin-top: 28px"
            active-color="#6b486b"
            inactive-color="#D1D1D1"
          >
          </el-switch>
          <el-switch
            v-model="NIRecIsShow"
            style="display: block; margin-top: 56px"
            active-color="#ff8c00"
            inactive-color="#D1D1D1"
          >
          </el-switch>
        </div>
        <template>
          <el-table
            :data="modeData"
            :show-header="false"
            :cell-style="{padding:'10px 0px'}"
            style="width: 80%; float: left"
          >
            <el-table-column prop="date" width="80"> </el-table-column>
            <el-table-column prop="name" width="315"> </el-table-column>
          </el-table>
        </template>
      </div>
      <div class="dataDescription">
        <template>
          <el-table
            :data="tableData"
            :header-cell-style="{
              backgroundColor: '#B4B4B4',
              color: '#fff',
              padding: '6px 0px',
            }"
            :cell-style="{padding:'9px 0px'}"
            style="width: 95%; margin: 10px;"
          >
            <el-table-column prop="date" label="类型" width="80">
            </el-table-column>
            <el-table-column prop="name" label="数量" width="80">
            </el-table-column>
            <el-table-column prop="interact" label="交互" width="310">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <RadialAreaView></RadialAreaView>
  </div>
</template>

<script>
import RadialAreaView from '../draw/RadialArea'
export default {
  name: "Left",
  components: {
    RadialAreaView,
  },
  data() {
    return {
      tableData: [
        {
          date: "user",
          name: "9625",
          interact: "user-movie : 2195882",
        },
        {
          date: "movie",
          name: "12385",
        },
        {
          date: "director",
          name: "6287",
        },
        {
          date: "ator",
          name: "9598",
        },
        {
          date: "genre",
          name: "35",
          interact: "传记 犯罪 情色 喜剧 爱情 动作 纪录片...",
        },
      ],
      HetGNNIsShow: true,
      KGATIsShow: true,
      NIRecIsShow: true,
      modeData: [
        {
          date: "HetGNN",
          name: "Heterogeneous Graph Neural Network",
        },
        {
          date: "KGAT",
          name: "Knowledge Graph Attention Network for Recommendation",
        },
        {
          date: "NIRec",
          name:
            "An Efficient Neighborhood-based Interaction Model for recommendation on heterogeneous graph",
        },
      ],
    };
  },
  created: function () {},
  watch: {
     HetGNNIsShow:function(val){
        this.$store.commit("global/SET_HETGNN_SHOW", val);
     },
     KGATIsShow:function(val){
        this.$store.commit("global/SET_KGAT_SHOW", val);
     },
     NIRecIsShow:function(val){
        this.$store.commit("global/SET_NIRec_SHOW", val);
     },
  },
  methods: {},
};
</script>
<style lang="stylus" scoped>
.left {
  width: 30%;
  height: 100%;
  background: #fff;
  float: left;
}

.datainfo {
  height: 45%;
  width: 100%;
  border: 1px solid black;
}

.header {
  background-color: #786585;
}
</style>