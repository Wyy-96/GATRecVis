<template>
  <div class="forceView">
    <div id="force" ref="force">
      <div class="selectInfo">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size:20px;line-height:2;float:left">
          <el-breadcrumb-item
          v-for="item in selectInfo"
          :key="item"
        >{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-select v-model="value" size="mini" @change="force($refs.force, D3forceData[value])" style="float:right;top:5px;width:90px;height:50px">
        <el-option
          v-for="item in options"
          :key="item.value"
          :value="item.value"
        >
        </el-option>
      </el-select>
      </div>
    </div>
    <div class="movieInfo">
      <div class="txtInfo">
        <div class="m-name">{{ movieInfo.movieName }}</div>
        <div class="m-body">
          <div><img class="m-img" :src="movieInfo.moviePhoto" /></div>
          <div class="m-text">
            <div class="m-line">
              <div class="m-lable">导演</div>
              <div class="m-value" :title="movieInfo.movieId">
                {{ movieInfo.movieDirector }}
              </div>
            </div>
            <div class="m-line">
              <div class="m-lable">演员</div>
              <div class="m-value" :title="movieInfo.movieActor">
                {{ movieInfo.movieActor }}
              </div>
            </div>
            <div class="m-line">
              <div class="m-lable">类型</div>
              <div class="m-value" :title="movieInfo.movieGenre">
                {{ movieInfo.movieGenre }}
              </div>
            </div>
            <div class="m-line">
              <div class="m-lable">时间</div>
              <div class="m-value" :title="movieInfo.movieTime">
                {{ movieInfo.movieTime }}
              </div>
            </div>
            <div class="m-line">
              <div class="m-lable">评分</div>
              <div>{{ movieInfo.movieRate }}</div>
            </div>
            <div class="m-line">
              <div class="m-lable">TAG</div>
              <div
                class="m-value"
                style="
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  white-space: break-spaces;
                  word-break: break-all;
                "
                :title="movieInfo.movieTags"
              >
                {{ movieInfo.movieTags }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="DivergingBar" ref="DivergingBar"></div>
      <div class="snapshot">
        <div style="width: 280px">
          <i
            class="el-icon-camera-solid"
            @click="prtSc()"
            style="
              color: #6b486b;
              width: 60px;
              margin-top: 10px;
              margin-bottom: 10px;
              margin-left: 10px;
              display: inline-block;
            "
            >快照</i
          >
          <i
            class="el-icon-delete-solid"
            @click="empty()"
            style="
              color: #6b486b;
              width: 60px;
              margin-top: 10px;
              margin-bottom: 10px;
              margin-left: 15px;
              display: inline-block;
            "
            >清空</i
          >
          <i
            class="el-icon-refresh-right"
            @click="reset()"
            style="
              color: #6b486b;
              width: 100px;
              margin-top: 10px;
              margin-bottom: 10px;
              margin-left: 15px;
              display: inline-block;
            "
            >重置对比</i
          >
        </div>
        <div class="scrollbar">
          <div
            class="snapView"
            v-for="svgData of $store.getters.d3DataList"
            :key="svgData.imgBlob"
          >
            <img
              @click="addCopy(svgData)"
              :src="svgData.imgBlob"
              style="height: 150px; width: 150px"
            />
            <img
              :src="svgData.imgHB.moviePhoto"
              style="height: 150px; width: 100px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonUtils from "@/utils/commonUtils";
import html2canvas from "html2canvas";
import axios from "axios";
import * as d3 from "d3";
import store from "@/store";
export default {
  name: "force",
  components: {},
  data() {
    return {
      movieInfo: {
        movieId: "",
        movieName: "",
        moviePhoto: "",
        movieRate: "",
        movieTags: "",
        movieTime: "",
        movieActor: "",
        movieDirector: "",
        movieGenre: "",
      },
      DivergingBarData: [],
      or: "",
      selectInfo:[],
      options: [],
      value:"...",
      D3forceData:{}
    };
  },
  created: function () {},
  mounted: function () {},
  watch: {
    "$store.getters.movieId"() {
      let model = this.$store.getters.movieId.charAt(this.$store.getters.movieId.length - 1)
      this.selectInfo[1] = model
      this.value = "..."
      axios
        .post("api/getdata/selectedMovie", {
          data: [this.$store.getters.userId, this.$store.getters.movieId],
        })
        .then((res) => {
          this.selectInfo[2] = res.data.movieInfo.movieName
          this.movieInfo = res.data.movieInfo;
          this.DivergingBarData = [res.data.static];
          this.or = res.data.model;

          
          let option = Object.keys(res.data.forceData) 

          let options = []
          for(var i = 0;i<option.length;i++){
            options.push({value:option[i]})
          }
          this.options = options
          this.value = option[0]
          this.D3forceData = res.data.forceData
          this.force(this.$refs.force, res.data.forceData[option[0]]);
          this.DivergingBar([res.data.static], res.data.model,res.data.movieInfo.movieName);
        });
    },
    "$store.getters.userId"(){
      this.selectInfo = []
      this.selectInfo.push(this.$store.getters.userId)
      this.selectInfo.push('')
      this.selectInfo.push('')
    }
  },
  methods: {
    tempconsole(svgData) {
      console.log(svgData);
    },
    force(map, data) {
      let svgbox = d3.select("#force").selectAll("svg")._groups[0];
      if (svgbox.length > 1) {
            d3.select("#force").selectAll("svg")._groups[0][0].remove();
      }
      var net = {},
        expand = {
          targetUser: true,
          targetMovie: true,
          movie: false,
          actor: false,
          director: false,
          genre: false,
          user: false,
        };
      const config = {
        width: parseInt(d3.select(map).style("width")) ,
        height: parseInt(d3.select(map).style("height")),
      };

      const types = [
        "targetUser",
        "targetMovie",
        "movie",
        "actor",
        "director",
        "genre",
        "user",
      ];
      const colors = [
        "#797FA1",
        "#708EC4",
        "#DD8998",
        "#FEC6B9",
        "#F1DCDB",
        "#ACC2E2",
        "#F5A555",
        "#ECE18C",
        "#D9B3FF",
        "#65D5A0",
        "#C2384F",
      ];
      function getType(n) {
        return n.type;
      }
      function deteleObject(obj) {
        var uniques = [];
        var stringify = [];
        for (var i = 0; i < obj.length; i++) {
          if (stringify.includes(obj[i].id) == false) uniques.push(obj[i]);
        }
        return uniques;
      }
      function network(dataOrigin, prev, index, expand) {
        expand = expand || {};
        let data = commonUtils.deepCopy(dataOrigin);
        let links = data.links.map((d) => Object.create(d));
        let nodes = data.nodes.map((d) => Object.create(d));

        let newnodes = [];
        let newlinks = [];
        let linksValue = {};

        //拆分expand
        let expandTure = [];
        let expandFlase = [];
        let expandKey = Object.keys(expand);
        for (var i = 0; i < expandKey.length; i++) {
          if (expand[expandKey[i]] == true) expandTure.push(expandKey[i]);
          else expandFlase.push(expandKey[i]);
        }

        let group = {};
        let groupValue = {};
        nodes.forEach((element) => {
          let type = index(element);
          if (expandFlase.includes(type) == false) {
            //要展开的情况
            newnodes.push(element);
          } else {
            if (Object.keys(group).includes(type) == false) {
              group[type] = [];
              groupValue[type] = 0;
            }
            group[type].push(element.id);
            groupValue[type] += element.value;
          }
        });

        let key = Object.keys(group);
        for (i = 0; i < key.length; i++) {
          newnodes.push({
            id: key[i],
            type: key[i],
            value: groupValue[key[i]] > 30 ? 30 : groupValue[key[i]],
            name: key[i],
          });
        }

        let ids = getObjectValues(newnodes);
        links.forEach((element) => {
          if (ids.includes(element.source) == true) {
            if (ids.includes(element.target) == true) newlinks.push(element);
            else {
              let source = element.source;
              let target = getElementType(element.target, group);
              if (
                Object.keys(linksValue).includes(source + "," + target) == false
              ) {
                linksValue[source + "," + target] = 0;
              }
              linksValue[source + "," + target] += 1;
            }
          } else {
            if (ids.includes(element.target) == true) {
              let source = getElementType(element.source, group);
              let target = element.target;
              if (
                Object.keys(linksValue).includes(source + "," + target) == false
              ) {
                linksValue[source + "," + target] = 0;
              }
              linksValue[source + "," + target] += 1;
            } else {
              let source = getElementType(element.source, group);
              let target = getElementType(element.target, group);
              if (
                Object.keys(linksValue).includes(source + "," + target) == false
              ) {
                linksValue[source + "," + target] = 0;
              }
              linksValue[source + "," + target] += 1;
            }
          }
        });

        key = Object.keys(linksValue);
        for (i = 0; i < key.length; i++) {
          let source = key[i].split(",")[0];
          let target = key[i].split(",")[1];
          newlinks.push({
            source: source,
            target: target,
            value: linksValue[key[i]] > 20 ? 20 : linksValue[key[i]],
          });
        }
        newnodes = deteleObject(newnodes);
        return { links: newlinks, nodes: newnodes };
      }
      function getObjectValues(object) {
        var values = [];
        for (var property in object) values.push(object[property]["id"]);
        return values;
      }
      function getElementType(id, group) {
        if (id[0].includes("m") == true) {
          if (group["movie"].includes(id) == true) return "movie";
          else return "targetMovie";
        } else if (id[0].includes("a") == true) {
          return "actor";
        } else if (id[0].includes("d") == true) {
          return "director";
        } else if (id[0].includes("u") == true) {
          if (group["user"].includes(id) == true) return "user";
          else return "targetUser";
        } else {
          return "genre";
        }
      }
      // 绘图
      const SVG = d3
        .select(map)
        .append("svg")
        .attr("width", "1123px")
        .attr("height", "650px")
        .append("svg")
        .attr("class", "force")
        .attr(
          "viewBox",
          `${-config.width / 4} ${-config.height / 8} ${config.width} ${
            config.height
          }`
        )
        .call(
          d3
            .zoom()
            .extent([
              [0, 0],
              [config.width, config.height],
            ])
            .scaleExtent([-5, 8])
            .on("zoom", function ({ transform }) {
              g.attr("transform", transform);
            })
        );

      const g = SVG.append("g");

      init();

      g.attr("opacity", 1e-6).transition().duration(1000).attr("opacity", 1);

      function init() {
        net = network(data, net, getType, expand);
        store.commit("svgData/SET_NOW_DATA", data);

        const simulation = d3
          .forceSimulation(net.nodes)
          .force(
            "link",
            d3.forceLink(net.links).id((d) => d.id)
          )
          .force("x", d3.forceX())
          .force("y", d3.forceY())
          .force(
            "charge",
            d3.forceManyBody().strength(-(100 / net.nodes.length) * 500)
          )
          .force("center", d3.forceCenter(600 / 2, 600 / 2));

        const drag = (simulation) => {
          function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          }

          function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          }

          function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          }

          return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
        };

        const link = g
          .append("g")
          .attr("stroke", "#D1D1D1")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(net.links)
          .join("line")
          .attr("class", "link")
          .attr("stroke-width", (d) => d.value);

        const node = g
          .append("g")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .selectAll("circle")
          .data(net.nodes)
          .join("circle")
          .attr("r", (d) => d.value)
          .attr("id", (d, i) => i)
          .attr("class", (d) => d.type)
          .attr("fill", (d) => colors[types.indexOf(d.type)])
          .on("click", (event, d) => {
            if (d.type.includes("target") == false) {
              // console.log("node clink",d , arguments, this, expand[d.id])
              expand[d.type] = !expand[d.type]; //取反
              g.selectAll("g").remove();
              init();
            }
          })
          .on("mouseover", function (event, d) {
            let r = parseInt(d3.select(this).attr("r"));
            d3.select(this).attr("r", r + 4);
            highlightObject(d);
          })
          .on("mouseout", function (d) {
            let type = d3.select(this).attr("class");
            let r = parseInt(d3.select(this).attr("r"));
            d3.select(this).attr("r", r - 4);
            highlightObject(null);
          })
          .call(drag(simulation));

        node.append("title").text((d) => d.name);

        const text = g
          .append("g")
          .attr("fill", "white")
          .selectAll("text")
          .data(net.nodes)
          .join("text")
          .text((d) => d.id[0].toUpperCase())
          .style("text-anchor", "end") //样式对齐
          .style("text-align", "center")
          .on("click", (event, d) => {
            console.log("text.click");
          });

        text.append("title").text((d) => d.name);

        simulation.on("tick", () => {
          link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

          node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

          text
            .attr("x", (d) => d.x + d.value / 2.5)
            .attr("y", (d) => d.y + d.value / 3)
            .attr("font-size", (d) => d.value);
        });
        let dependsNode = [];
        let dependsLinkAndText = [];

        function highlightObject(obj) {
          if (obj) {
            var objIndex = obj.index;
            dependsNode = dependsNode.concat([objIndex]);
            dependsLinkAndText = dependsLinkAndText.concat([objIndex]);

            net.links.forEach((lkItem) => {
              if (objIndex == lkItem["source"]["index"]) {
                dependsNode = dependsNode.concat([lkItem.target.index]);
                dependsLinkAndText = dependsLinkAndText.concat([
                  lkItem.target.index,
                ]);
                dependsLinkAndText = dependsLinkAndText.concat([
                  lkItem.source.index,
                ]);
              } else if (objIndex == lkItem["target"]["index"]) {
                dependsNode = dependsNode.concat([lkItem.source.index]);
                dependsLinkAndText = dependsLinkAndText.concat([
                  lkItem.source.index,
                ]);
                dependsLinkAndText = dependsLinkAndText.concat([
                  lkItem.target.index,
                ]);
              }
            });
            // 隐藏节点
            g.selectAll("circle")
              .filter((d) => {
                return dependsNode.indexOf(d.index) == -1;
              })
              .transition()
              .style("opacity", 0.1);
            // 隐藏线
            g.selectAll(".link")
              .filter((d) => {
                return !(
                  dependsLinkAndText.indexOf(d.source.index) != -1 &&
                  dependsLinkAndText.indexOf(d.target.index) != -1
                );
              })
              .transition()
              .style("opacity", 0.1);
          } else {
            // 取消高亮
            // 恢复隐藏的线
            g.selectAll("circle")
              .filter(() => {
                return true;
              })
              .transition()
              .style("opacity", 1);
            // 恢复隐藏的线
            g.selectAll(".link")
              .filter((d) => {
                // return true;
                return !(
                  dependsLinkAndText.indexOf(d.source.index) != -1 &&
                  dependsLinkAndText.indexOf(d.target.index) != -1
                );
              })
              .transition()
              .style("opacity", 1);
            dependsNode = [];
            dependsLinkAndText = [];
          }
        }
      }
    },
    DivergingBar(data, or,name) {
      d3.select(".DivergingBar").select("svg").remove();
      const x0 = d3 //电影被多少用户看过
        .scaleRadial()
        .domain([0, 1]) //d3.max(this.data, d => d.total)
        .range([0, 110]);
      const x1 = d3
        .scaleRadial()
        .domain([0, 1]) //d3.max(this.data, d => d.total)
        .range([0, 110]);
      const x2 = d3
        .scaleRadial()
        .domain([0, 1]) //d3.max(this.data, d => d.total)
        .range([0, 110]);
      const x3 = d3
        .scaleRadial()
        .domain([0, 1]) //d3.max(this.data, d => d.total)
        .range([0, 110]);
      const x4 = d3 //电影评分
        .scaleRadial()
        .domain([0, 2332]) //d3.max(this.data, d => d.total)
        .range([0, 110]);
      const color = {
        H: "#B7C4D6",
        K: "#AE9BAE",
        N: "#FFC57F",
        KN: "#AE8174",
        HKN: "#9E746B",
        HK: "#8E809C",
        HN: "#DBA86B",
      };
      const titleName = ["genre", "actor", "director", "tags", "viewer"];
      function guiyi(data, index) {
        if (index == 0) return x0(data);
        else if (index == 1) return x1(data);
        else if (index == 2) return x2(data);
        else if (index == 3) return x3(data);
        else if (index == 4) return x4(data);
      }
      const config = {
        width: parseInt(d3.select(".DivergingBar").style("width")),
        height: parseInt(d3.select(".DivergingBar").style("height")),
      };
      const SVG = d3
        .select(".DivergingBar")
        .append("svg")
        .attr("class", "Bar")
        .attr(
          "viewBox",
          `${-config.width / 4} ${-config.height / 8} ${config.width} ${
            config.height
          }`
        );
      
      if(name.length > 5){
        name = name.substring(0,5) + "....";
      }

      SVG.append("g")
          .attr("fill", "black")
          .append("text")
          .text(name)
          .attr("x", name.length * -7)
          .attr("y",5)
      
      if (data.length > 0) {
        SVG.append("g")
          .attr("fill", color[or])
          .selectAll("rect")
          .data(data[0])
          .join("rect")
          .attr("x", (d, i) => 67 - guiyi(d, i))
          .attr("y", (d, i) => i* 25 + 15)
          .attr("width", (d, i) => guiyi(d, i))
          .attr("height", 20)
          .append("title")
          .text((d, i) => titleName[i]);
      }
    },
    prtSc() {
      // html2canvas(this.$refs.force,{
      //   useCORS: true, //（图片跨域相关）
      //   allowTaint: false, //允许跨域（图片跨域相关）
      // }).then(canvas => {
      //   this.imgBlob = canvas.toDataURL('image/jpeg', 1.0); //将图片转为base64, 0-1 表示清晰度
      // });
      let serializer = new XMLSerializer();
      var toExport = d3.select(".force")._groups[0][0].cloneNode(true); // 克隆
      var bb = d3.select(".force")._groups[0][0].getBBox(); // getBBox方法返回一个包含svg元素的最小矩形的坐标对象。 包含(x,y)、width、height 需要用来解决svg中的图超出边界时无法全部完整保存问题
      toExport.setAttribute(
        "viewBox",
        bb.x + " " + bb.y + " " + bb.width + " " + bb.height
      ); // 重新设置svg目前的视口
      toExport.setAttribute("width", bb.width); // 重新设置svg目前的宽度
      toExport.setAttribute("height", bb.height); // 重新设置svg目前的高度

      let imgBlob =
        "data:image/svg+xml;charset=utf-8," +
        encodeURIComponent(
          '<?xml version="1.0" standalone="no"?>\r\n' +
            serializer.serializeToString(toExport)
        );

      let svgData = {
        imgBlob: imgBlob,
        imgHB: this.movieInfo,
        DivergingBarData: this.DivergingBarData,
        or: this.or,
        d3Data: commonUtils.deepCopy(this.$store.getters.nowData),
      };
      this.$store.commit("svgData/ADD_D3_DATA_LIST", svgData);
    },
    addForce(data) {
      d3.select("#forceCopy").remove();
      var netCopy = {},
        expandCopy = {
          targetUser: true,
          targetMovie: true,
          movie: false,
          actor: false,
          director: false,
          genre: false,
          user: false,
        };
      const configCopy = {
        width: parseInt(d3.select("#force").style("width")),
        height: parseInt(d3.select("#force").style("height")),
      };
      const SVG = d3
        .select("#force")
        .select("svg")
        .append("svg")
        .attr("id", "forceCopy")
        .attr(
          "viewBox",
          `${-configCopy.width / 4} ${-configCopy.height / 8} ${
            configCopy.width
          } ${configCopy.height}`
        )
        .call(
          d3
            .zoom()
            .extent([
              [0, 0],
              [configCopy.width, configCopy.height],
            ])
            .scaleExtent([-5, 8])
            .on("zoom", function ({ transform }) {
              g.attr("transform", transform);
            })
        );

      const g = SVG.append("g");

      init();

      function init() {
        netCopy = network(data, netCopy, getType, expandCopy);
        const typesCopy = [
          "targetUser",
          "targetMovie",
          "movie",
          "actor",
          "director",
          "genre",
          "user",
        ];
        const colorsCopy = [
          "#797FA1",
          "#708EC4",
          "#DD8998",
          "#FEC6B9",
          "#F1DCDB",
          "#ACC2E2",
          "#F5A555",
          "#ECE18C",
          "#D9B3FF",
          "#65D5A0",
          "#C2384F",
        ];
        const simulation = d3
          .forceSimulation(netCopy.nodes)
          .force(
            "link",
            d3.forceLink(netCopy.links).id((d) => d.id)
          )
          .force("x", d3.forceX())
          .force("y", d3.forceY())
          .force(
            "charge",
            d3.forceManyBody().strength(-(100 / netCopy.nodes.length) * 500)
          )
          .force("center", d3.forceCenter(600 / 2, 600 / 2));

        const drag = (simulation) => {
          function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
          }

          function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
          }

          function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
          }

          return d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
        };

        const link = g
          .append("g")
          .attr("stroke", "#D1D1D1")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(netCopy.links)
          .join("line")
          .attr("class", "link")
          .attr("stroke-width", (d) => d.value);

        const node = g
          .append("g")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .selectAll("circle")
          .data(netCopy.nodes)
          .join("circle")
          .attr("r", (d) => d.value)
          .attr("id", (d, i) => i)
          .attr("class", (d) => d.type)
          .attr("fill", (d) => colorsCopy[typesCopy.indexOf(d.type)])
          .on("click", (event, d) => {
            if (d.type.includes("target") == false) {
              // console.log("node clink",d , arguments, this, expand[d.id])
              expandCopy[d.type] = !expandCopy[d.type]; //取反
              g.selectAll("g").remove();
              init();
            }
          })
          .on("mouseover", function (event, d) {
            let r = parseInt(d3.select(this).attr("r"));
            d3.select(this).attr("r", r + 4);
            highlightObject(d);
          })
          .on("mouseout", function (d) {
            let type = d3.select(this).attr("class");
            let r = parseInt(d3.select(this).attr("r"));
            d3.select(this).attr("r", r - 4);
            highlightObject(null);
          })
          .call(drag(simulation));

        node.append("title").text((d) => d.name);

        const text = g
          .append("g")
          .attr("fill", "white")
          .selectAll("text")
          .data(netCopy.nodes)
          .join("text")
          .text((d) => d.id[0].toUpperCase())
          .style("text-anchor", "end") //样式对齐
          .style("text-align", "center")
          .on("click", (event, d) => {
            console.log("text.click");
          });

        text.append("title").text((d) => d.name);

        simulation.on("tick", () => {
          link
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);

          node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);

          text
            .attr("x", (d) => d.x + d.value / 2.5)
            .attr("y", (d) => d.y + d.value / 3)
            .attr("font-size", (d) => d.value);
        });
        let dependsNode = [];
        let dependsLinkAndText = [];

        function highlightObject(obj) {
          if (obj) {
            var objIndex = obj.index;
            dependsNode = dependsNode.concat([objIndex]);
            dependsLinkAndText = dependsLinkAndText.concat([objIndex]);

            netCopy.links.forEach((lkItem) => {
              if (objIndex == lkItem["source"]["index"]) {
                dependsNode = dependsNode.concat([lkItem.target.index]);
                dependsLinkAndText = dependsLinkAndText.concat([
                  lkItem.target.index,
                ]);
                dependsLinkAndText = dependsLinkAndText.concat([
                  lkItem.source.index,
                ]);
              } else if (objIndex == lkItem["target"]["index"]) {
                dependsNode = dependsNode.concat([lkItem.source.index]);
                dependsLinkAndText = dependsLinkAndText.concat([
                  lkItem.source.index,
                ]);
                dependsLinkAndText = dependsLinkAndText.concat([
                  lkItem.target.index,
                ]);
              }
            });
            // 隐藏节点
            g.selectAll("circle")
              .filter((d) => {
                return dependsNode.indexOf(d.index) == -1;
              })
              .transition()
              .style("opacity", 0.1);
            // 隐藏线
            g.selectAll(".link")
              .filter((d) => {
                return !(
                  dependsLinkAndText.indexOf(d.source.index) != -1 &&
                  dependsLinkAndText.indexOf(d.target.index) != -1
                );
              })
              .transition()
              .style("opacity", 0.1);
          } else {
            // 取消高亮
            // 恢复隐藏的线
            g.selectAll("circle")
              .filter(() => {
                return true;
              })
              .transition()
              .style("opacity", 1);
            // 恢复隐藏的线
            g.selectAll(".link")
              .filter((d) => {
                // return true;
                return !(
                  dependsLinkAndText.indexOf(d.source.index) != -1 &&
                  dependsLinkAndText.indexOf(d.target.index) != -1
                );
              })
              .transition()
              .style("opacity", 1);
            dependsNode = [];
            dependsLinkAndText = [];
          }
        }
      }

      function getType(n) {
        return n.type;
      }
      function deteleObject(obj) {
        var uniques = [];
        var stringify = [];
        for (var i = 0; i < obj.length; i++) {
          if (stringify.includes(obj[i].id) == false) uniques.push(obj[i]);
        }
        return uniques;
      }
      function network(dataOrigin, prev, index, expand) {
        expand = expand || {};
        let data = commonUtils.deepCopy(dataOrigin);
        let links = data.links.map((d) => Object.create(d));
        let nodes = data.nodes.map((d) => Object.create(d));

        let newnodes = [];
        let newlinks = [];
        let linksValue = {};

        //拆分expand
        let expandTure = [];
        let expandFlase = [];
        let expandKey = Object.keys(expand);
        for (var i = 0; i < expandKey.length; i++) {
          if (expand[expandKey[i]] == true) expandTure.push(expandKey[i]);
          else expandFlase.push(expandKey[i]);
        }

        let group = {};
        let groupValue = {};
        nodes.forEach((element) => {
          let type = index(element);
          if (expandFlase.includes(type) == false) {
            //要展开的情况
            newnodes.push(element);
          } else {
            if (Object.keys(group).includes(type) == false) {
              group[type] = [];
              groupValue[type] = 0;
            }
            group[type].push(element.id);
            groupValue[type] += element.value;
          }
        });

        let key = Object.keys(group);
        for (i = 0; i < key.length; i++) {
          newnodes.push({
            id: key[i],
            type: key[i],
            value: groupValue[key[i]] > 30 ? 30 : groupValue[key[i]],
            name: key[i],
          });
        }

        let ids = getObjectValues(newnodes);
        links.forEach((element) => {
          if (ids.includes(element.source) == true) {
            if (ids.includes(element.target) == true) newlinks.push(element);
            else {
              let source = element.source;
              let target = getElementType(element.target, group);
              if (
                Object.keys(linksValue).includes(source + "," + target) == false
              ) {
                linksValue[source + "," + target] = 0;
              }
              linksValue[source + "," + target] += 1;
            }
          } else {
            if (ids.includes(element.target) == true) {
              let source = getElementType(element.source, group);
              let target = element.target;
              if (
                Object.keys(linksValue).includes(source + "," + target) == false
              ) {
                linksValue[source + "," + target] = 0;
              }
              linksValue[source + "," + target] += 1;
            } else {
              let source = getElementType(element.source, group);
              let target = getElementType(element.target, group);
              if (
                Object.keys(linksValue).includes(source + "," + target) == false
              ) {
                linksValue[source + "," + target] = 0;
              }
              linksValue[source + "," + target] += 1;
            }
          }
        });

        key = Object.keys(linksValue);
        for (i = 0; i < key.length; i++) {
          let source = key[i].split(",")[0];
          let target = key[i].split(",")[1];
          newlinks.push({
            source: source,
            target: target,
            value: linksValue[key[i]] > 20 ? 20 : linksValue[key[i]],
          });
        }
        newnodes = deteleObject(newnodes);
        return { links: newlinks, nodes: newnodes };
      }
      function getObjectValues(object) {
        var values = [];
        for (var property in object) values.push(object[property]["id"]);
        return values;
      }
      function getElementType(id, group) {
        if (id[0].includes("m") == true) {
          if (group["movie"].includes(id) == true) return "movie";
          else return "targetMovie";
        } else if (id[0].includes("a") == true) {
          return "actor";
        } else if (id[0].includes("d") == true) {
          return "director";
        } else if (id[0].includes("u") == true) {
          if (group["user"].includes(id) == true) return "user";
          else return "targetUser";
        } else {
          return "genre";
        }
      }
    },
    addDivergingBar(data, or,name) {
      d3.select("#BarCopy").remove();
      const x0 = d3
        .scaleRadial()
        .domain([0, 1]) //d3.max(this.data, d => d.total)
        .range([0, 110]);
      const x1 = d3
        .scaleRadial()
        .domain([0, 1]) //d3.max(this.data, d => d.total)
        .range([0, 110]);
      const x2 = d3
        .scaleRadial()
        .domain([0, 1]) //d3.max(this.data, d => d.total)
        .range([0, 110]);
      const x3 = d3
        .scaleRadial()
        .domain([0, 1]) //d3.max(this.data, d => d.total)
        .range([0, 110]);
      const x4 = d3 //电影被多少用户看过
        .scaleRadial()
        .domain([0, 2332]) //d3.max(this.data, d => d.total)
        .range([0, 110]);
      const color = {
        H: "#B7C4D6",
        K: "#AE9BAE",
        N: "#FFC57F",
        KN: "#AE8174",
        HKN: "#9E746B",
        HK: "#8E809C",
        HN: "#DBA86B",
      };
      const titleName = ["genre", "actor", "director", "tags", "viewer"];
      function guiyi(data, index) {
        if (index == 0) return x0(data);
        else if (index == 1) return x1(data);
        else if (index == 2) return x2(data);
        else if (index == 3) return x3(data);
        else if (index == 4) return x4(data);
      }
      if(name.length > 5){
        name = name.substring(0,5) + "....";
      }

      d3.select(".Bar")
        .append("g")
          .attr("fill", "black")
          .append("text")
          .text(name)
          .attr("x", name.length * 11)
          .attr("y",5)

      d3.select(".Bar")
        .append("g")
        .attr("id", "BarCopy")
        .attr("fill", color[or])
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", 70)
        .attr("y", (d, i) => i * 25 + 15)
        .attr("width", (d, i) => guiyi(d, i))
        .attr("height", 20)
        .append("title")
        .text((d, i) => titleName[i]);
    },
    addCopy(svgdata) {
      this.addForce(svgdata.d3Data);
      this.addDivergingBar(svgdata.DivergingBarData[0], svgdata.or,svgdata.imgHB.movieName);
    },
    empty() {
      this.$store.commit("svgData/Empty_D3_DATA_LIST", "");
    },
    reset() {
      d3.select("#forceCopy").remove();
      d3.select("#BarCopy").remove();
    },
  },
};
</script>
<style lang="stylus" scoped>
#force {
  width: 80%;
  height: 699px;
  float: left;
  border-bottom: 1px solid #A6A6A6;
}

.selectInfo {
  width: 1090px;
  height: 40px;
  float: left;
  margin-left: 10px;
}

.movieInfo {
  width: 20%;
  height: 699px;
  float: left;
  border-bottom: 1px solid #A6A6A6;
}

.txtInfo {
  height: 35%;
  // background: black;
  display: flex;
  flex-direction: column;

  .m-name {
    font-size: 18px;
    padding-top: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
  }

  .m-body {
    flex: 1;
    display: flex;
    padding-top: 10px;

    .m-img {
      width: 120px;
    }

    .m-text {
      flex: 1;
      padding-top: 5px;
      padding-left: 10px;

      .m-line {
        display: flex;
        line-height: 28px;

        .m-lable {
          color: #666666;
          width: 40px;
        }

        .m-value {
          flex: 1;
          width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}

.DivergingBar {
  height: 25%;
}

.snapshot {
  height: 40%;
  // background: #F2F2F2;
  display: flex;
  flex-direction: column;

  &>div:nth-child(2) {
    flex: 1;
    height: 0;
    overflow: auto;
  }
}

.scrollbar::-webkit-scrollbar {
  /* 滚动条整体样式 */
  width: 10px; /* 高宽分别对应横竖滚动条的尺寸 */
  height: 1px;
}

.scrollbar::-webkit-scrollbar-thumb {
  /* 滚动条里面小方块 */
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #535353;
}

.scrollbar::-webkit-scrollbar-track {
  /* 滚动条里面轨道 */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

.snapView {
  background: white;
  border: 2px solid #F2F2F2;
  margin: 0 auto;
  border-radius: 10px;
  width: 255px;
  margin-bottom: 10px;
}
</style>


