<template>
  <div class="forceView">
    <div id="force" ref="force"></div>
    <div class="movieInfo">
      <div class="txtInfo">
        <div class="m-name">厨师、大盗、他的太太和她的情人</div>
        <div class="m-body">
          <div><img class="m-img" src="http://img9.doubanio.com/view/photo/s_ratio_poster/public/p2226311926.jpg"/></div>
          <div class="m-text">
            <div class="m-line"><div class="m-lable">导演 </div><div class="m-value" title="彼得·格林纳">彼得·格林纳威</div></div>
            <div  class="m-line"><div class="m-lable">演员 </div><div class="m-value">理查德·波林热|迈克尔·刚本|海伦·米伦|蒂姆·罗斯</div></div>
            <div  class="m-line"><div class="m-lable">类型 </div><div class="m-value">剧情|犯罪</div></div>
            <div  class="m-line"><div class="m-lable">时间 </div><div class="m-value">1989-10-13(英国)</div></div>
            <div  class="m-line"><div class="m-lable">评分 </div><div>7.5</div></div>
            <div  class="m-line"><div class="m-lable">TAG </div><div class="m-value"  style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;
overflow: hidden;white-space: break-spaces;    word-break: break-all;">情色|法国|PeterGreenaway|英国|法国电影|格林纳威|欧洲电影|Peter_Greenaway</div></div>
            
          </div>  
        </div>
        <!-- 厨师、大盗、他的太太和她的情人,
        彼得·格林纳威,
        理查德·波林热|迈克尔·刚本|海伦·米伦|蒂姆·罗斯,
        剧情|犯罪,
        1989-10-13(英国),
        情色|法国|PeterGreenaway|英国|法国电影|格林纳威|欧洲电影|Peter_Greenaway,
        7.5,
        https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2226311926.jpg -->
      </div>
      <div class="DivergingBar" ref="DivergingBar"></div>
      <div class="snapshot"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as d3 from "d3";
export default {
  name: "force",
  components: {},
  data() {
    return {};
  },
  created: function () {},
  mounted: function () {
    let data = {
      links: [
        {
          source: "u907",
          target: "m2246",
          value: 1,
        },
        {
          source: "m2246",
          target: "g0",
          value: 1,
        },
        {
          source: "g0",
          target: "m3713",
          value: 1,
        },
        {
          source: "m2246",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "ugroup23",
          target: "m3713",
          value: 1,
        },
        {
          source: "u907",
          target: "m3402",
          value: 1,
        },
        {
          source: "m3402",
          target: "g0",
          value: 1,
        },
        {
          source: "m3402",
          target: "u2176",
          value: 1,
        },
        {
          source: "u2176",
          target: "m3713",
          value: 1,
        },
        {
          source: "m3402",
          target: "u5614",
          value: 1,
        },
        {
          source: "u5614",
          target: "m3713",
          value: 1,
        },
        {
          source: "m3402",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "m3402",
          target: "u8350",
          value: 1,
        },
        {
          source: "u8350",
          target: "m3713",
          value: 1,
        },
        {
          source: "u907",
          target: "m3484",
          value: 1,
        },
        {
          source: "m3484",
          target: "g0",
          value: 1,
        },
        {
          source: "m3484",
          target: "ugroup2",
          value: 1,
        },
        {
          source: "ugroup2",
          target: "m3713",
          value: 1,
        },
        {
          source: "m3484",
          target: "ugroup21",
          value: 1,
        },
        {
          source: "ugroup21",
          target: "m3713",
          value: 1,
        },
        {
          source: "m3484",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "u907",
          target: "m3677",
          value: 1,
        },
        {
          source: "m3677",
          target: "g0",
          value: 1,
        },
        {
          source: "m3677",
          target: "u853",
          value: 1,
        },
        {
          source: "u853",
          target: "m3713",
          value: 1,
        },
        {
          source: "m3677",
          target: "ugroup9",
          value: 1,
        },
        {
          source: "ugroup9",
          target: "m3713",
          value: 1,
        },
        {
          source: "m3677",
          target: "u4736",
          value: 1,
        },
        {
          source: "u4736",
          target: "m3713",
          value: 1,
        },
        {
          source: "m3677",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "m3677",
          target: "u6749",
          value: 1,
        },
        {
          source: "u6749",
          target: "m3713",
          value: 1,
        },
        {
          source: "u907",
          target: "m4052",
          value: 1,
        },
        {
          source: "m4052",
          target: "g0",
          value: 1,
        },
        {
          source: "m4052",
          target: "ugroup9",
          value: 1,
        },
        {
          source: "m4052",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "u907",
          target: "m4382",
          value: 1,
        },
        {
          source: "m4382",
          target: "g0",
          value: 1,
        },
        {
          source: "m4382",
          target: "u4736",
          value: 1,
        },
        {
          source: "m4382",
          target: "u8350",
          value: 1,
        },
        {
          source: "m4382",
          target: "ugroup5",
          value: 1,
        },
        {
          source: "ugroup5",
          target: "m3713",
          value: 1,
        },
        {
          source: "u907",
          target: "m4514",
          value: 1,
        },
        {
          source: "m4514",
          target: "g0",
          value: 1,
        },
        {
          source: "m4514",
          target: "ugroup6",
          value: 1,
        },
        {
          source: "ugroup6",
          target: "m3713",
          value: 1,
        },
        {
          source: "m4514",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "u907",
          target: "m4715",
          value: 1,
        },
        {
          source: "m4715",
          target: "g0",
          value: 1,
        },
        {
          source: "m4715",
          target: "u853",
          value: 1,
        },
        {
          source: "u907",
          target: "m5096",
          value: 1,
        },
        {
          source: "m5096",
          target: "g0",
          value: 1,
        },
        {
          source: "m5096",
          target: "ugroup8",
          value: 1,
        },
        {
          source: "ugroup8",
          target: "m3713",
          value: 1,
        },
        {
          source: "m5096",
          target: "u4736",
          value: 1,
        },
        {
          source: "m5096",
          target: "ugroup22",
          value: 1,
        },
        {
          source: "ugroup22",
          target: "m3713",
          value: 1,
        },
        {
          source: "u907",
          target: "m5127",
          value: 1,
        },
        {
          source: "m5127",
          target: "g0",
          value: 1,
        },
        {
          source: "m5127",
          target: "ugroup9",
          value: 1,
        },
        {
          source: "m5127",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "u907",
          target: "m5221",
          value: 1,
        },
        {
          source: "m5221",
          target: "d2775",
          value: 1,
        },
        {
          source: "d2775",
          target: "m3713",
          value: 1,
        },
        {
          source: "u907",
          target: "m5596",
          value: 1,
        },
        {
          source: "m5596",
          target: "g0",
          value: 1,
        },
        {
          source: "m5596",
          target: "u2176",
          value: 1,
        },
        {
          source: "m5596",
          target: "u4736",
          value: 1,
        },
        {
          source: "m5596",
          target: "ugroup10",
          value: 1,
        },
        {
          source: "ugroup10",
          target: "m3713",
          value: 1,
        },
        {
          source: "m5596",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "u907",
          target: "m5901",
          value: 1,
        },
        {
          source: "m5901",
          target: "g0",
          value: 1,
        },
        {
          source: "u907",
          target: "m6036",
          value: 1,
        },
        {
          source: "m6036",
          target: "u4361",
          value: 1,
        },
        {
          source: "u4361",
          target: "m3713",
          value: 1,
        },
        {
          source: "u907",
          target: "m6329",
          value: 1,
        },
        {
          source: "m6329",
          target: "a5653",
          value: 1,
        },
        {
          source: "a5653",
          target: "m3713",
          value: 1,
        },
        {
          source: "m6329",
          target: "g0",
          value: 1,
        },
        {
          source: "m6329",
          target: "u443",
          value: 1,
        },
        {
          source: "u443",
          target: "m3713",
          value: 1,
        },
        {
          source: "m6329",
          target: "ugroup21",
          value: 1,
        },
        {
          source: "m6329",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "u907",
          target: "m7334",
          value: 1,
        },
        {
          source: "m7334",
          target: "g0",
          value: 1,
        },
        {
          source: "m7334",
          target: "ugroup22",
          value: 1,
        },
        {
          source: "u907",
          target: "m7354",
          value: 1,
        },
        {
          source: "m7354",
          target: "u2057",
          value: 1,
        },
        {
          source: "u2057",
          target: "m3713",
          value: 1,
        },
        {
          source: "u907",
          target: "m7982",
          value: 1,
        },
        {
          source: "m7982",
          target: "a1493",
          value: 1,
        },
        {
          source: "a1493",
          target: "m3713",
          value: 1,
        },
        {
          source: "m7982",
          target: "u853",
          value: 1,
        },
        {
          source: "u907",
          target: "m8251",
          value: 1,
        },
        {
          source: "m8251",
          target: "g0",
          value: 1,
        },
        {
          source: "m8251",
          target: "u5614",
          value: 1,
        },
        {
          source: "u907",
          target: "m8331",
          value: 1,
        },
        {
          source: "m8331",
          target: "g0",
          value: 1,
        },
        {
          source: "m8331",
          target: "u6749",
          value: 1,
        },
        {
          source: "u907",
          target: "m8376",
          value: 1,
        },
        {
          source: "m8376",
          target: "g0",
          value: 1,
        },
        {
          source: "m8376",
          target: "u6749",
          value: 1,
        },
        {
          source: "u907",
          target: "m8509",
          value: 1,
        },
        {
          source: "m8509",
          target: "g0",
          value: 1,
        },
        {
          source: "m8509",
          target: "u864",
          value: 1,
        },
        {
          source: "u864",
          target: "m3713",
          value: 1,
        },
        {
          source: "m8509",
          target: "ugroup22",
          value: 1,
        },
        {
          source: "m8509",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "u907",
          target: "m9390",
          value: 1,
        },
        {
          source: "m9390",
          target: "g0",
          value: 1,
        },
        {
          source: "m9390",
          target: "u3929",
          value: 1,
        },
        {
          source: "u3929",
          target: "m3713",
          value: 1,
        },
        {
          source: "u907",
          target: "m9415",
          value: 1,
        },
        {
          source: "m9415",
          target: "ugroup21",
          value: 1,
        },
        {
          source: "m9415",
          target: "u4673",
          value: 1,
        },
        {
          source: "u4673",
          target: "m3713",
          value: 1,
        },
        {
          source: "m9415",
          target: "ugroup22",
          value: 1,
        },
        {
          source: "m9415",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "m9415",
          target: "u8350",
          value: 1,
        },
        {
          source: "u907",
          target: "m10657",
          value: 1,
        },
        {
          source: "m10657",
          target: "ugroup22",
          value: 1,
        },
        {
          source: "m10657",
          target: "u4736",
          value: 1,
        },
        {
          source: "m10657",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "u907",
          target: "m11022",
          value: 1,
        },
        {
          source: "m11022",
          target: "g0",
          value: 1,
        },
        {
          source: "m11022",
          target: "u443",
          value: 1,
        },
        {
          source: "m11022",
          target: "u864",
          value: 1,
        },
        {
          source: "m11022",
          target: "u4673",
          value: 1,
        },
        {
          source: "m11022",
          target: "u4736",
          value: 1,
        },
        {
          source: "m11022",
          target: "ugroup23",
          value: 1,
        },
        {
          source: "m11022",
          target: "u8350",
          value: 1,
        },
        {
          source: "u907",
          target: "m11425",
          value: 1,
        },
        {
          source: "m11425",
          target: "a1493",
          value: 1,
        },
      ],
      nodes: [
        {
          id: "u907",
          value: 20,
          type: "targetUser",
          name: "u907",
        },
        {
          id: "m3713",
          value: 20,
          type: "targetMovie",
          name: "家族游戏",
        },
        {
          id: "m2246",
          value: 10,
          type: "movie",
          name: "海女",
        },
        {
          id: "g0",
          value: 10,
          type: "genre",
          name: "剧情\r",
        },
        {
          id: "ugroup23",
          value: 9,
          type: "user",
          name: "ugroup23",
        },
        {
          id: "m3402",
          value: 10,
          type: "movie",
          name: "今天不上班",
        },
        {
          id: "u2176",
          value: 6,
          type: "user",
          name: "u2176",
        },
        {
          id: "u5614",
          value: 6,
          type: "user",
          name: "u5614",
        },
        {
          id: "u8350",
          value: 6,
          type: "user",
          name: "u8350",
        },
        {
          id: "m3484",
          value: 10,
          type: "movie",
          name: "BORDER",
        },
        {
          id: "ugroup2",
          value: 6,
          type: "user",
          name: "ugroup2",
        },
        {
          id: "ugroup21",
          value: 5,
          type: "user",
          name: "ugroup21",
        },
        {
          id: "m3677",
          value: 10,
          type: "movie",
          name: "监狱的公主大人",
        },
        {
          id: "u853",
          value: 6,
          type: "user",
          name: "u853",
        },
        {
          id: "ugroup9",
          value: 5,
          type: "user",
          name: "ugroup9",
        },
        {
          id: "u4736",
          value: 6,
          type: "user",
          name: "u4736",
        },
        {
          id: "u6749",
          value: 6,
          type: "user",
          name: "u6749",
        },
        {
          id: "m4052",
          value: 10,
          type: "movie",
          name: "苍井优X4个谎言",
        },
        {
          id: "m4382",
          value: 10,
          type: "movie",
          name: "卖房子的女人的逆袭",
        },
        {
          id: "ugroup5",
          value: 5,
          type: "user",
          name: "ugroup5",
        },
        {
          id: "m4514",
          value: 10,
          type: "movie",
          name: "掟上今日子的备忘录",
        },
        {
          id: "ugroup6",
          value: 5,
          type: "user",
          name: "ugroup6",
        },
        {
          id: "m4715",
          value: 10,
          type: "movie",
          name: "剧场",
        },
        {
          id: "m5096",
          value: 10,
          type: "movie",
          name: "续倒数第二次恋爱",
        },
        {
          id: "ugroup8",
          value: 5,
          type: "user",
          name: "ugroup8",
        },
        {
          id: "ugroup22",
          value: 7,
          type: "user",
          name: "ugroup22",
        },
        {
          id: "m5127",
          value: 10,
          type: "movie",
          name: "绝叫",
        },
        {
          id: "m5221",
          value: 10,
          type: "movie",
          name: "世界奇妙物语",
        },
        {
          id: "d2775",
          value: 10,
          type: "director",
          name: "佐藤祐市\r",
        },
        {
          id: "m5596",
          value: 10,
          type: "movie",
          name: "敬启，父亲大人",
        },
        {
          id: "ugroup10",
          value: 5,
          type: "user",
          name: "ugroup10",
        },
        {
          id: "m5901",
          value: 10,
          type: "movie",
          name: "上野树里与5个包包",
        },
        {
          id: "m6036",
          value: 10,
          type: "movie",
          name: "世界奇妙物语",
        },
        {
          id: "u4361",
          value: 6,
          type: "user",
          name: "u4361",
        },
        {
          id: "m6329",
          value: 6,
          type: "movie",
          name: "不过是先出生的我",
        },
        {
          id: "a5653",
          value: 6,
          type: "actor",
          name: "樱井翔\r",
        },
        {
          id: "m6329",
          value: 10,
          type: "movie",
          name: "不过是先出生的我",
        },
        {
          id: "u443",
          value: 6,
          type: "user",
          name: "u443",
        },
        {
          id: "m7334",
          value: 10,
          type: "movie",
          name: "黄金神威",
        },
        {
          id: "m7354",
          value: 10,
          type: "movie",
          name: "世界奇妙物语",
        },
        {
          id: "u2057",
          value: 6,
          type: "user",
          name: "u2057",
        },
        {
          id: "m7982",
          value: 6,
          type: "movie",
          name: "刑警弓神",
        },
        {
          id: "a1493",
          value: 6,
          type: "actor",
          name: "神木隆之介\r",
        },
        {
          id: "m7982",
          value: 10,
          type: "movie",
          name: "刑警弓神",
        },
        {
          id: "m8251",
          value: 10,
          type: "movie",
          name: "月之恋人",
        },
        {
          id: "m8331",
          value: 10,
          type: "movie",
          name: "世界奇妙物语",
        },
        {
          id: "m8376",
          value: 10,
          type: "movie",
          name: "马赛克日本",
        },
        {
          id: "m8509",
          value: 10,
          type: "movie",
          name: "暗之伴走者",
        },
        {
          id: "u864",
          value: 6,
          type: "user",
          name: "u864",
        },
        {
          id: "m9390",
          value: 10,
          type: "movie",
          name: "BABY",
        },
        {
          id: "u3929",
          value: 6,
          type: "user",
          name: "u3929",
        },
        {
          id: "m9415",
          value: 10,
          type: "movie",
          name: "圈套2",
        },
        {
          id: "u4673",
          value: 6,
          type: "user",
          name: "u4673",
        },
        {
          id: "m10657",
          value: 10,
          type: "movie",
          name: "宽松世代又如何",
        },
        {
          id: "m11022",
          value: 10,
          type: "movie",
          name: "民王",
        },
        {
          id: "m11425",
          value: 6,
          type: "movie",
          name: "听说桐岛要退部",
        },
      ],
    };
    this.force(this.$refs.force, data);
    this.DivergingBar();
  },
  watch: {
    // "$store.getters.movieId"() {
    //   // console.log(this.$store.getters.movieId);
    //   axios
    //     .post("api/getdata/selectedMovie", {
    //       data: [this.$store.getters.userId, this.$store.getters.movieId],
    //     })
    //     .then((res) => {
    //       let svgbox = document.getElementsByClassName("force");
    //       if (svgbox.length == 1) svgbox[svgbox.length - 1].remove();
    //       console.log(res.data);
    //       // this.force(this.$refs.force, res.data);
    //     });
    // },
  },
  methods: {
    force(map, data) {
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
        width: parseInt(d3.select(map).style("width")),
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

      function network(data, prev, index, expand) {
        expand = expand || {};
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
        .attr("class", "force")
        .attr(
          "viewBox",
          `${-config.width / 4} ${-config.height / 8} ${config.width} ${
            config.height
          }`
        );

      init();

      SVG.attr("opacity", 1e-6).transition().duration(1000).attr("opacity", 1);

      function init() {
        d3.select(".force").selectAll("g").remove();

        net = network(data, net, getType, expand);
        console.log(net);
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

        const link = SVG.append("g")
          .attr("stroke", "#D1D1D1")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(net.links)
          .join("line")
          .attr("class", "link")
          .attr("stroke-width", (d) => d.value);

        const node = SVG.append("g")
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

        const text = SVG.append("g")
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
                // links.forEach((nextItem) => {
                //     if (lkItem.target.index == (nextItem['source']['index'])) {
                //         this.dependsNode = this.dependsNode.concat([nextItem.target.index]);
                //     }else if(lkItem.target.index == (nextItem['target']['index'])){
                //         this.dependsNode = this.dependsNode.concat([nextItem.source.index]);
                //     }
                // })
              } else if (objIndex == lkItem["target"]["index"]) {
                dependsNode = dependsNode.concat([lkItem.source.index]);
                dependsLinkAndText = dependsLinkAndText.concat([
                  lkItem.source.index,
                ]);
                dependsLinkAndText = dependsLinkAndText.concat([
                  lkItem.target.index,
                ]);
                // this.links.forEach((nextItem) => {
                //     if (lkItem.source.index == (nextItem['source']['index'])) {
                //         this.dependsNode = this.dependsNode.concat([nextItem.target.index]);
                //     }else if(lkItem.source.index == (nextItem['target']['index'])){
                //         this.dependsNode = this.dependsNode.concat([nextItem.target.index]);
                //     }
                // })
              }
            });
            // 隐藏节点
            SVG.selectAll("circle")
              .filter((d) => {
                return dependsNode.indexOf(d.index) == -1;
              })
              .transition()
              .style("opacity", 0.1);
            // 隐藏线
            SVG.selectAll(".link")
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
            SVG.selectAll("circle")
              .filter(() => {
                return true;
              })
              .transition()
              .style("opacity", 1);
            // 恢复隐藏的线
            SVG.selectAll(".link")
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
    DivergingBar() {
      let data = [
        [1200, 1, 5, 30, 7.3],
        [600, 4, 2, 64, 8.3],
      ];
      const x0 = d3  //电影被多少用户看过
        .scaleRadial()
        .domain([0, 2332]) //d3.max(this.data, d => d.total)
        .range([0, 100]);
      const x1 = d3
        .scaleRadial()
        .domain([0, 10]) //d3.max(this.data, d => d.total)
        .range([0, 100]);
      const x2 = d3
        .scaleRadial()
        .domain([0, 10]) //d3.max(this.data, d => d.total)
        .range([0, 100]);
      const x3 = d3
        .scaleRadial()
        .domain([0, 100]) //d3.max(this.data, d => d.total)
        .range([0, 100]);
      const x4 = d3  //电影评分
        .scaleRadial()
        .domain([0, 10]) //d3.max(this.data, d => d.total)
        .range([0, 100]);

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

      if (data.length > 0) {
        SVG.append("g")
          .attr("fill", "red")
          .selectAll("rect")
          .data(data[0])
          .join("rect")
          .attr("x", 70)
          .attr("y", (d, i) => i * 30 + 15)
          .attr("width", (d, i) => guiyi(d, i))
          .attr("height", 25);
      }

      if (data.length > 1) {
        SVG.append("g")
          .attr("fill", "yellow")
          .selectAll("rect")
          .data(data[1])
          .join("rect")
          .attr("x", (d, i) => 67 - guiyi(d, i))
          .attr("y", (d, i) => i * 30 + 15)
          .attr("width", (d, i) => guiyi(d, i))
          .attr("height", 25);
      }
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

.movieInfo {
  width: 20%;
  height: 699px;
  float: left;
  border-bottom: 1px solid #A6A6A6;
}

.txtInfo {
  height: 40%;
  // background: black;
  display flex
  flex-direction:column

  .m-name{
    font-size:18px
    padding-top 15px
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 600;
  }
  .m-body{
    flex:1
    display:flex
    padding-top:10px;

    .m-img{
      width:120px;
    }
    .m-text{
      flex:1
      padding-top:5px
      padding-left:10px;

      .m-line{
        display flex
        line-height:28px;
        .m-lable{
          color: #666666;
          width 40px
        }
        .m-value{
          flex 1
          width 0
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      
    }
  }
}

.DivergingBar {
  height: 30%;
}

.snapshot {
  height: 30%;
  background: yellow;
}
</style>


