import * as d3 from 'd3';

function getDis(s, t) {
    return Math.sqrt((s.x - t.x) * (s.x - t.x) + (s.y - t.y) * (s.y - t.y));
}

export default class RelationForce {

    constructor(selector, data, configs = {}) {

        let mapW = parseInt(d3.select(selector).style('width'))
        let mapH = parseInt(d3.select(selector).style('height'))

        this.defaultWH = {
            width: mapW,
            height: mapH,
        }

        // 画布
        this.map = d3.select(selector);
        
        this.links = data.links.map(d => Object.create(d));
        this.nodes = data.nodes.map(d => Object.create(d));
        // 合并配置
        this.config = {
            isHighLight: true,        // 是否启动 鼠标 hover 到节点上高亮与节点有关的节点，其他无关节点透明的功能
            isScale: true,              // 是否启用缩放平移zoom功能
            scaleExtent: [0.5, 1.5],    // 缩放的比例尺
            chargeStrength: -300,        // 万有引力
            collide: 100,                 // 碰撞力的大小 （节点之间的间距）
            nodeWidth: 160,             // 每个node节点所占的宽度，正方形
            margin: 20,                 // node节点距离父亲div的margin
            alphaDecay: 0.0228,          // 控制力学模拟衰减率
            r: 45,                      // 头像的半径 [30 - 45]
            relFontSize: 12,           // 关系文字字体大小
            linkSrc: 30,                // 划线时候的弧度
            linkColor: '#bad4ed',        // 链接线默认的颜色
            strokeColor: '#7ecef4',     // 头像外围包裹的颜色
            strokeWidth: 3,             // 头像外围包裹的宽度
        };
        // console.log(this.config)

        // 需要高亮的node和link
        this.dependsNode = [];
        this.dependsLinkAndText = [];

        // 创建力学模拟器
        this.initSimulation()
    }
    // 创建力学模拟器
    initSimulation() {
        var that = this;

        // this.simulation = d3.forceSimulation(this.nodes)
        //     .force("link", d3.forceLink(this.links).id(d => d.name))
        //     .force("charge", d3.forceManyBody().strength(-400))
        //     // .force("collide", d3.forceCollide(50).strength(0.2).iterations(5))
        //     // d3.forceCenter()用指定的x坐标和y坐标创建一个新的居中力。
        //     .force("center", d3.forceCenter(this.defaultWH.width / 2, this.defaultWH.height / 2))
        //     .force("x", d3.forceX())
        //     .force("y", d3.forceY())
        //     .alphaDecay(this.config.alphaDecay)
        //     // 监听事件 ，tick|end ，例如监听 tick 滴答事件
        //     .on("tick", () => this.ticked());
        
        
        // 2.创建svg标签
        this.SVG = this.map.append("svg")
            .attr("class", "svgclass")
            .attr("width", this.defaultWH.width)
            .attr("height", this.defaultWH.height)
            // .transition().duration(750).call(d3.zoom().transform, d3.zoomIdentity);
            .call(d3.zoom().scaleExtent(this.config.scaleExtent).on("zoom", () => {
                if (this.config.isScale) {
                    this.relMap_g.attr("transform", d3.event.transform);
                }
            }))
            .on('click', () => console.log('画布 click'))
            .on("dblclick.zoom", null);
        
         // 4.放关系图的容器
        this.relMap_g = this.SVG.append("g")
            .attr("class", "relMap_g")
            .attr("width", this.defaultWH.width)
            .attr("height", this.defaultWH.height);
        
        // 3.defs  <defs>标签的内容不会显示，只有调用的时候才显示
        this.defs = this.SVG.append('defs');


    }
}