import * as d3 from 'd3';

export default class RadialArea {
    constructor(selector, data, configs = {}) {

        let mapW = parseInt(d3.select(selector).style('width'))
        let mapH = parseInt(d3.select(selector).style('height'))
        this.defaultWH = {
            width: mapW,
            height: mapH,
        }

        // 画布
        this.map = d3.select(selector);
        this.data = data

        // 合并配置
        this.config = {
            cellColor1: 'white',
            cellColor2: 'green',
            scaleExtent: [0.5, 5],    // 缩放的比例尺
            isScale: true,              // 是否启用缩放平移zoom功能
        };
        function datamax(data){
            let shuzu = []
            for(let u of data)
                shuzu.push(u.Tuser)
            return shuzu
        }
        let types = ['movie_user','movie_actor','movie_director','user_movie']
        this.color = d3.scaleOrdinal(types, d3.schemeCategory10)
        
         /* ----------------------------颜色转换------------------------  */
        this.nodeColor = d3.scaleLinear()
            .domain([0, d3.max(datamax(data))])
            .range([this.config.cellColor1, this.config.cellColor2]);

        
        // 需要高亮的node和link
        this.dependsNode = [];
        this.dependsLinkAndText = [];

        this.drawRadialarea()
    }
    drawRadialarea(){
        this.SVG = this.map.append("svg")
            .attr("class", "Radialsvg")
            .attr("width", this.defaultWH.width)
            .attr("height", this.defaultWH.height)
            // .transition().duration(750).call(d3.zoom().transform, d3.zoomIdentity);
            .call(d3.zoom().scaleExtent(this.config.scaleExtent).on("zoom", () => {
                if (this.config.isScale) {
                    this.relMap_g.attr("transform", d3.event.transform);
                }
            }))
            // .on('click', () => console.log('画布 click'))
            // .on("dblclick.zoom", null);
        
         // 4.放图的容器
        this.relMap_g = this.SVG.append("g")
            .attr("class", "relMap_g")
            .attr("width", this.defaultWH.width)
            .attr("height", this.defaultWH.height);

        // 3.defs  <defs>标签的内容不会显示，只有调用的时候才显示
        this.defs = this.SVG.append('defs');
 
        // 3.2 添加多个 <pattern>
        this.patterns = this.defs
            .append("pattern")
            .attr("class", "patternclass")
            .selectAll("pattern")
            .data(this.data)
            .join("pattern")
            .attr("id", function (d,index) {                                  
                    return 'movie' + index;
            })
            .attr("x", "0")
            .attr("y", "0")
            .attr("width", "1")
            .attr("height", "1");


        this.patterns.append("circle")
           .attr("cx","20px")
           .attr("cy","20px")
           .attr("r",d => d.user/2)
           .attr("fill",d =>{
               if(d.name.indexOf('user') != -1) return 'red';
               return this.nodeColor(d.Tuser)
           })
        this.patterns.append("circle")
           .attr("cx","20px")
           .attr("cy","20px")
           .attr("r",d => {
               console.log(d.hit)
               if(d.hit == true) return 2
               else return 0
           })
           .attr("fill","red")
        //    .attr("opacity", "0.5");

        

        this.node = this.relMap_g
            .selectAll("g")
            .data(this.data)
            .join("g")
            // .style("cursor", "pointer")
            .attr("fill", function (d,index) {
                return ("url(#movie" + index + ")");
            })
        
        let center_width = Number(this.defaultWH.width) /1.5
        let center_height = Number(this.defaultWH.height)/3.0
        this.node.append("circle")
                .attr("r", 20)
                .attr("cx", function(d,index){
                    return  center_width + Number(d.position.x) *8
                })
                .attr("cy", function(d,index){
                    return  center_height + Number(d.position.y) *8

                })
                .attr("id", d=> d.id)
                .on('click', function (d) {
                    console.log(d.name)
                });

        this.node.append("path")
                .attr("fill", "steelblue")
                .attr("stroke-width", 1)
                .attr("d", function(d){

                    var radia = d3.scaleLinear()
                            .domain([0,Object.values(d.actor).length + Object.values(d.director).length + + Object.values(d.genre).length])
                            .range([0, 2 * Math.PI])
                    let data = Object.values(d.actor)
                    var data1 = data.concat(Object.values(d.director),Object.values(d.genre));                                 
                    var area = d3.areaRadial()
                        .curve(d3.curveLinearClosed)
                        .innerRadius(d => 25+d*1.5)
                        .outerRadius(d => 26+d*1.5)
                        .angle((d,i) => {
                            return radia(i)
                        })
                    return area(data1);
                                   
                })
                .attr('transform', (d,index)=> {
                        return 'translate('+ (center_width + Number(d.position.x) *8) +"," +(center_height + Number(d.position.y) *8)+")"
                })

        
        this.node.append("path")
                .attr("fill", "red")
                .attr("stroke-width", 1)
                .attr("d", function(d){

                    var radia = d3.scaleLinear()
                            .domain([0,Object.values(d.actor).length + Object.values(d.director).length + + Object.values(d.genre).length])
                            .range([0, 2 * Math.PI])
                    let data = Object.values(d.actor)
                    var data1 = data.concat(Object.values(d.director));                                 
                    var area = d3.areaRadial()
                        // .curve(d3.curveLinearClosed)
                        .innerRadius(d => 25+d*1.5)
                        .outerRadius(d => 26+d*1.5)
                        .angle((d,i) => {
                            return radia(i)
                        })
                    return area(data1);
                                   
                })
                .attr('transform', (d,index)=> {
                        return 'translate('+ (center_width + Number(d.position.x) *8) +"," +(center_height + Number(d.position.y) *8)+")"
                })

        this.node.append("path")
                .attr("fill", "white")
                .attr("stroke-width", 1)
                .attr("d", function(d){
                    var radia = d3.scaleLinear()
                            .domain([0,Object.values(d.actor).length + Object.values(d.director).length + + Object.values(d.genre).length])
                            .range([0, 2 * Math.PI])

                    let data1 = Object.values(d.actor)
                    var area = d3.areaRadial()
                        // .curve(d3.curveLinearClosed)
                        .innerRadius(d => 25+d*1.5)
                        .outerRadius(d => 26+d*1.5)
                        .angle((d,i) => {
                            return radia(i)
                        })
                    return area(data1);
                                   
                })
                .attr('transform', (d,index)=> {
                        return 'translate('+ (center_width + Number(d.position.x) *8) +"," +(center_height + Number(d.position.y) *8)+")"
                })
                .on('mouseover', function (d) {
                    // d3.select(this).attr('stroke-width', '8');
                    // d3.select(this).attr('stroke', '#a3e5f9');
                    // if (that.config.isHighLight) {
                    // that.highlightObject(d);
                    // }
                });


        
        
    }
}