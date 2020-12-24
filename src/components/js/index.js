import * as d3 from 'd3';
import actor from '@/assets/actor.svg'
import user from '@/assets/user.svg'
import director from '@/assets/director.svg'
import genre from '@/assets/genre.svg'
import movie from '@/assets/movie.svg'

function getDis(s, t) {
    return Math.sqrt((s.x - t.x) * (s.x - t.x) + (s.y - t.y) * (s.y - t.y));
}

// 求元素移动到目标位置所需要的 transform 属性值
function getTransform(source, target, _dis) {
    var r;
    if (target.x > source.x) {
        if (target.y > source.y) {
            r = Math.asin((target.y - source.y) / _dis)
        } else {
            r = Math.asin((source.y - target.y) / _dis);
            r = -r;
        }
    } else {
        if (target.y > source.y) {
            r = Math.asin((target.y - source.y) / _dis);
            r = Math.PI - r;
        } else {
            r = Math.asin((source.y - target.y) / _dis);
            r -= Math.PI;
        }
    }
    r = r * (180 / Math.PI);
    return "translate(" + source.x + "," + source.y + ")rotate(" + r + ")";
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
            
            scaleExtent: [0.5, 5],    // 缩放的比例尺
            chargeStrength: -300,        // 万有引力
            collide: 10,                 // 碰撞力的大小 （节点之间的间距）
            nodeWidth: 100,             // 每个node节点所占的宽度，正方形
            margin: 20,                 // node节点距离父亲div的margin
            alphaDecay: 0.0228,          // 控制力学模拟衰减率
            r: 15,                      // 头像的半径 [30 - 45]
            relFontSize: 12,           // 关系文字字体大小
            linkSrc: 18,                // 划线时候的弧度
            linkColor: '#bad4ed',        // 链接线默认的颜色
            strokeColor: '#fff',     // 头像外围包裹的颜色
            strokeWidth: 1,             // 头像外围包裹的宽度
        };
        let types = ['movie_user','movie_actor','movie_director','user_movie']
        this.color = d3.scaleOrdinal(types, d3.schemeCategory10)

        //图标链接
        // this.iconSVG = {
        //     actor: require("../../assets/actor.svg"),
        // }
        // 需要高亮的node和link
        this.dependsNode = [];
        this.dependsLinkAndText = [];

        // 创建力学模拟器
        this.initSimulation()
    }
    // 创建力学模拟器
    initSimulation() {
        var that = this;

        this.simulation = d3.forceSimulation(this.nodes)
            .force("link", d3.forceLink(this.links).id(d => d.name))
            .force("charge", d3.forceManyBody().strength(-300))
            // .force("collide", d3.forceCollide(30).strength(0.2).iterations(5))
            // d3.forceCenter()用指定的x坐标和y坐标创建一个新的居中力。
            .force("center", d3.forceCenter(this.defaultWH.width / 2, this.defaultWH.height / 2))
            .force("x", d3.forceX())
            .force("y", d3.forceY())
            .alphaDecay(this.config.alphaDecay)
            // 监听事件 ，tick|end ，例如监听 tick 滴答事件
            .on("tick", () => this.ticked());
        
        
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

        // 3.1 添加箭头
        this.marker = this.defs
            .append("marker")
            .attr('id', "marker")
            .attr("markerWidth", 10)    //marker视窗的宽
            .attr("markerHeight", 10)   //marker视窗的高
            .attr("refX", this.config.r* 0.7 )       //refX和refY，指的是图形元素和marker连接的位置坐标
            .attr("refY", 2)
            .attr("orient","auto")     //orient="auto"设置箭头的方向为自动适应线条的方向
            .attr("markerUnits", "userSpaceOnUse")  //marker是否进行缩放 ,默认值是strokeWidth,会缩放
            .append("path")
            .attr("d", "M 0 0 4 2 0 4Z")    //箭头的路径 从 （0,0） 到 （8,4） 到（0,8）
            .attr("fill", "steelblue");     
    
        // 3.2 添加多个头像图片的 <pattern>
        this.patterns = this.defs
            .selectAll("pattern.patternclass")
            .data(this.nodes)
            .enter()
            .append("pattern")
            .attr("class", "patternclass")
            .attr("id", function (d, index) {
                    return 'avatar' + index;
            })
                // 两个取值userSpaceOnUse  objectBoundingBox
            .attr('patternUnits', 'objectBoundingBox')
                // <pattern>，x、y值的改变决定图案的位置，宽度、高度默认为pattern图案占填充图形的百分比。
            .attr("x", "0")
            .attr("y", "0")
            .attr("width", "1")
            .attr("height", "1");
        
        // 3.3 向<defs> - <pattern>添加 头像
        this.patterns.append("image")
            .attr("class", "circle")
            .attr("xlink:href", function (d) {
                if (d.type == "actor") return actor
                if (d.type == "user") return user
                if (d.type == "director") return director
                if (d.type == "genre") return genre
                if (d.type == "movie" || d.type == "recmovie") return movie
                return d.avatar; // 修改节点头像
            })
            .attr("src", function (d) {
                // console.log(d.type)
                if (d.type == "actor") return actor
                if (d.type == "user") return user
                if (d.type == "director") return director
                if (d.type == "genre") return genre
                if (d.type == "movie" || d.type == "recmovie") return movie
                return d.avatar; // 修改节点头像
            })
            .attr("height", this.config.r * 2)
            .attr("width", this.config.r * 2)
            .attr("preserveAspectRatio", "xMidYMin slice");       

        this.patterns.append("rect")
            .attr("x", "0")
            .attr("y", 4 / 3 * this.config.r)
            .attr("width", 2 * this.config.r)
            .attr("height", 2 / 3 * this.config.r)
            .attr("fill", "black")
            .attr("opacity", "0.5");

        this.patterns.append("text").attr("class", "nodetext")
            .attr("x", this.config.r).attr("y", (5 / 3 * this.config.r))
            .attr('text-anchor', 'middle')
            .attr("fill", "#fff")
            .style("font-size", this.config.r / 3)
            .text(function (d) {
                return d.name;
            });
        
        // 6.关系图添加用于显示头像的节点
        this.circles = this.relMap_g.selectAll("circle.circleclass")
            .data(this.nodes)
            .enter()
            .append("circle")
            .attr("class", "circleclass")
            .style("cursor", "pointer")
            // .attr("cx", function (d) {
            //     return d.x;
            // })
            // .attr("cy", function (d) {
            //     return d.y;
            // })
            .attr("fill", function (d,index) {
                return ("url(#avatar" + index + ")");
            })
            .attr("stroke", "#ccf1fc")
            .attr("stroke-width", this.config.strokeWidth)
            .attr("r", this.config.r)
            .on('mouseover', function (d) {
                d3.select(this).attr('stroke-width', '8');
                d3.select(this).attr('stroke', '#a3e5f9');
                if (that.config.isHighLight) {
                    that.highlightObject(d);
                }
            })
            .on('mouseout', function (d) {
                d3.select(this).attr('stroke-width', that.config.strokeWidth);
                d3.select(this).attr('stroke', '#c5dbf0');
                if (that.config.isHighLight) {
                    that.highlightObject(null);
                }
            })
            .on('click', function (d) {
                console.log('头像节点click')
                console.log(d.index)
                // 展示方式2 ：浮窗展示
                // event = d3.event || window.event;
                var pageX = event.pageX ? event.pageX : (event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft));
                var pageY = event.pageY ? event.pageY : (event.clientY + (document.body.scrollTop || document.documentElement.scrollTop));
                // console.log('pagex', pageX);
                // console.log('pageY', pageY);
                //阻止事件冒泡  阻止事件默认行为
                event.stopPropagation ? (event.stopPropagation()) : (event.cancelBubble = true);
                event.preventDefault ? (event.preventDefault()) : (event.returnValue = false);


            })


        
        // 5.关系图添加线
        // 5.1  每条线是个容器，有线 和一个装文字的容器
        this.edges = this.relMap_g
            .selectAll("g.edge")
            .data(this.links)
            .enter()
            .append("g")
            .attr("class", "edge")
            .attr('fill', function (d) {
                var str = '#bad4ed';
                if (d.color) {
                    str = "#" + d.color;
                }
                return str;
            })
            // .on('mouseover', function () {
            //     d3.select(this).selectAll('path.links').attr('stroke-width', 4);
            // })
            // .on('mouseout', function (d) {

            //     d3.select(this).selectAll('path.links').attr('stroke-width', 1);
            // })
            .on('click', function (d) {
                console.log(d)
                console.log('线click')
            })

        // 5.2 添加线
        this.link = this.edges.append("path")
            .attr("class", "links")
            .attr("d", d => {
                return "M" + this.config.linkSrc + "," + 0 + " L" + getDis(d.source, d.target) + ",0";
            })
            .style("marker-end", "url(#marker)")
            // .attr("refX",this.config.r)
            .attr("stroke", d => this.color(d.type))
            .attr("stroke-width",d => d.value * 1.5 )
            
            
    }

    ticked() {

        var instance =3;
        // 7.1 修改每条容器edge的位置
        this.edges.attr("transform", function (d) {
            
            return getTransform(d.source, d.target, getDis(d.source, d.target))
        });

        // 7.2 修改每条线link位置
        this.link.attr("d", (d,index) => {
            const r = Math.hypot(d.target.x/instance - d.source.x/instance, d.target.y/instance - d.source.y/instance);
            //         return `
            //             M${d.source.x/instance},${d.source.y/instance}
            //                A${r},${r} 0 0,1 ${d.target.x/instance},${d.target.y/instance}
            //             `;
            //getDis = return Math.sqrt((s.x - t.x) * (s.x - t.x) + (s.y - t.y) * (s.y - t.y));
            
            return "M" + this.config.linkSrc + ","+ 0 +" L" + (getDis(d.source, d.target)-Number(10)) + ",0";
        })


        // // 7.3 修改线中关系文字text的位置 及 文字的反正
        // this.texts
        //     .attr("x", function (d) {
        //         // 7.3.1 根据字的长度来更新兄弟元素 rect 的宽度
        //         var bbox = d3.select(this).node().getBBox();
        //         var width = bbox.width;
        //         // ########################
        //         // $(this).prev('rect').attr('width', width + 10);
        //         // d3.select(this).prev('rect').attr('width', width + 10);
        //         // 7.3.2 更新 text 的位置
        //         return getDis(d.source, d.target) / 2
        //     })
        //     .attr("transform", function (d) {
        //         // 7.3.3 更新文本反正
        //         if (d.target.x < d.source.x) {
        //             var x = getDis(d.source, d.target) / 2;
        //             return 'rotate(180 ' + x + ' ' + 0 + ')';
        //         } else {
        //             return 'rotate(0)';
        //         }
        //     });

        // // 7.4 修改线中装文本矩形rect的位置
        // this.rects
        //     .attr("x", function (d) {
        //         // ######################
        //         // return getDis(d.source, d.target) / 2 - $(this).attr('width') / 2
        //         return getDis(d.source, d.target) / 2 - d3.select(this).attr('width') / 2
        //     })    // x 坐标为两点中心距离减去自身长度一半

        // 5.修改节点的位置
        this.circles
            .attr("cx", function (d) {
                return d.x;
            })
            .attr("cy", function (d) {
                return d.y;
            })

    }


    // 高亮元素及其相关的元素
    highlightObject(obj) {
        if (obj) {
            var objIndex = obj.index;
            this.dependsNode = this.dependsNode.concat([objIndex]);
            this.dependsLinkAndText = this.dependsLinkAndText.concat([objIndex]);
            this.links.forEach((lkItem) => {
                if (objIndex == lkItem['source']['index']) {
                    this.dependsNode = this.dependsNode.concat([lkItem.target.index]);
                    this.dependsLinkAndText = this.dependsLinkAndText.concat([lkItem.target.index]);
                    this.dependsLinkAndText = this.dependsLinkAndText.concat([lkItem.source.index]);
                    this.links.forEach((nextItem) => {
                        if (lkItem.target.index == (nextItem['source']['index'])) {
                            this.dependsNode = this.dependsNode.concat([nextItem.target.index]);
                        }else if(lkItem.target.index == (nextItem['target']['index'])){
                            this.dependsNode = this.dependsNode.concat([nextItem.source.index]);
                        }
                    })
                } 
                else if (objIndex == lkItem['target']['index']) {
                    this.dependsNode = this.dependsNode.concat([lkItem.source.index]);
                    this.dependsLinkAndText = this.dependsLinkAndText.concat([lkItem.source.index]);
                    this.dependsLinkAndText = this.dependsLinkAndText.concat([lkItem.target.index]);
                    this.links.forEach((nextItem) => {
                        if (lkItem.source.index == (nextItem['source']['index'])) {
                            this.dependsNode = this.dependsNode.concat([nextItem.target.index]);
                        }else if(lkItem.source.index == (nextItem['target']['index'])){
                            this.dependsNode = this.dependsNode.concat([nextItem.target.index]);
                        }
                    })
                }
            });

            // 隐藏节点
            this.SVG.selectAll('circle').filter((d) => {
                return (this.dependsNode.indexOf(d.index) == -1);
            }).transition().style('opacity', 0.1);
            // 隐藏线
            this.SVG.selectAll('.edge').filter((d) => {
                // return true;
                return ((this.dependsLinkAndText.indexOf(d.source.index) == -1) && (this.dependsLinkAndText.indexOf(d.target.index) == -1))
            }).transition().style('opacity', 0.1);

        } else {
            // 取消高亮
            // 恢复隐藏的线
            this.SVG.selectAll('circle').filter(() => {
                return true;
            }).transition().style('opacity', 1);
            // 恢复隐藏的线
            this.SVG.selectAll('.edge').filter((d) => {
                // return true;
                return ((this.dependsLinkAndText.indexOf(d.source.index) == -1) && (this.dependsLinkAndText.indexOf(d.target.index) == -1))
            }).transition().style('opacity', 1);
            this.dependsNode = [];
            this.dependsLinkAndText = [];
        }
    }
}