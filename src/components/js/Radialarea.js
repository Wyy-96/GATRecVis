import * as d3 from 'd3';
import { event } from 'jquery';

// export default class RadialArea {
//     constructor(selector, data, configs = {}) {

//         let mapW = parseInt(d3.select(selector).style('width'))
//         let mapH = parseInt(d3.select(selector).style('height'))
//         this.defaultWH = {
//             width: mapW,
//             height: mapH,
//         }

//         // 画布
//         this.map = d3.select(selector);
//         this.data = data

//         // 合并配置
//         this.config = {
//             cellColor1: 'white',
//             cellColor2: 'green',
//             scaleExtent: [0.5, 5],    // 缩放的比例尺
//             isScale: true,              // 是否启用缩放平移zoom功能
//         };
//         function datamax(data){
//             let shuzu = []
//             for(let u of data)
//                 shuzu.push(u.Tuser)
//             return shuzu
//         }
//         let types = ['movie_user','movie_actor','movie_director','user_movie']
//         this.color = d3.scaleOrdinal(types, d3.schemeCategory10)
        
//          /* ----------------------------颜色转换------------------------  */
//         this.nodeColor = d3.scaleLinear()
//             .domain([0, d3.max(datamax(data))])
//             .range([this.config.cellColor1, this.config.cellColor2]);

        
//         // 需要高亮的node和link
//         this.dependsNode = [];
//         this.dependsLinkAndText = [];

//         this.drawRadialarea()
//     }
//     drawRadialarea(){
//         this.SVG = this.map.append("svg")
//             .attr("class", "Radialsvg")
//             .attr("width", this.defaultWH.width)
//             .attr("height", this.defaultWH.height)
//             // .transition().duration(750).call(d3.zoom().transform, d3.zoomIdentity);
//             .call(d3.zoom().scaleExtent(this.config.scaleExtent).on("zoom", () => {
//                 if (this.config.isScale) {
//                     this.relMap_g.attr("transform", d3.event.transform);
//                 }
//             }))
//             //
//             // .on("dblclick.zoom", null);
        
//          // 4.放图的容器
//         this.relMap_g = this.SVG.append("g")
//             .attr("class", "relMap_g")
//             .attr("width", this.defaultWH.width)
//             .attr("height", this.defaultWH.height);

//         // 3.defs  <defs>标签的内容不会显示，只有调用的时候才显示
//         this.defs = this.SVG.append('defs');
 
//         // 3.2 添加多个 <pattern>
//         this.patterns = this.defs
//             .append("pattern")
//             .attr("class", "patternclass")
//             .selectAll("pattern")
//             .data(this.data)
//             .join("pattern")
//             .attr("id", function (d,index) {                                  
//                     return 'movie' + index;
//             })
//             .attr("x", "0")
//             .attr("y", "0")
//             .attr("width", "1")
//             .attr("height", "1");


//         this.patterns.append("circle")
//            .attr("cx","20px")
//            .attr("cy","20px")
//            .attr("r",d => d.user/2)
//            .attr("fill",d =>{
//                if(d.name.indexOf('user') != -1) return 'red';
//                if (d.type == 'recordsmovie') return 'blue'
//                return this.nodeColor(d.Tuser)
//            })
//         this.patterns.append("circle")
//            .attr("cx","20px")
//            .attr("cy","20px")
//            .attr("r",d => {
//                console.log(d.hit)
//                if(d.hit == true) return 2
//                else return 0
//            })
//            .attr("fill","red")
//         //    .attr("opacity", "0.5");

        

//         this.node = this.relMap_g
//             .selectAll("g")
//             .data(this.data)
//             .join("g")
//             // .style("cursor", "pointer")
//             .attr("fill", function (d,index) {
//                 return ("url(#movie" + index + ")");
//             })
        
//         let center_width = Number(this.defaultWH.width) /1.5
//         let center_height = Number(this.defaultWH.height)/4
//         this.node.append("circle")
//                 .attr("r", 20)
//                 .attr("cx", function(d,index){
//                     return  center_width + Number(d.position.x) *8
//                 })
//                 .attr("cy", function(d,index){
//                     return  center_height + Number(d.position.y) *8

//                 })
//                 .attr("id", d=> d.id)
//                 .on('click', function (d) {
//                     console.log(d.name)
//                 });

//         this.node.append("path")
//                 .attr("fill", "steelblue")
//                 .attr("stroke-width", 1)
//                 .attr("d", function(d){

//                     var radia = d3.scaleLinear()
//                             .domain([0,Object.values(d.actor).length + Object.values(d.director).length + + Object.values(d.genre).length])
//                             .range([0, 2 * Math.PI])
//                     let data = Object.values(d.actor)
//                     var data1 = data.concat(Object.values(d.director),Object.values(d.genre));                                 
//                     var area = d3.areaRadial()
//                         .curve(d3.curveLinearClosed)
//                         .innerRadius(d => 25+d*1.5)
//                         .outerRadius(d => 26+d*1.5)
//                         .angle((d,i) => {
//                             return radia(i)
//                         })
//                     return area(data1);
                                   
//                 })
//                 .attr('transform', (d,index)=> {
//                         return 'translate('+ (center_width + Number(d.position.x) *8) +"," +(center_height + Number(d.position.y) *8)+")"
//                 })

        
//         this.node.append("path")
//                 .attr("fill", "red")
//                 .attr("stroke-width", 1)
//                 .attr("d", function(d){

//                     var radia = d3.scaleLinear()
//                             .domain([0,Object.values(d.actor).length + Object.values(d.director).length + + Object.values(d.genre).length])
//                             .range([0, 2 * Math.PI])
//                     let data = Object.values(d.actor)
//                     var data1 = data.concat(Object.values(d.director));                                 
//                     var area = d3.areaRadial()
//                         // .curve(d3.curveLinearClosed)
//                         .innerRadius(d => 25+d*1.5)
//                         .outerRadius(d => 26+d*1.5)
//                         .angle((d,i) => {
//                             return radia(i)
//                         })
//                     return area(data1);
                                   
//                 })
//                 .attr('transform', (d,index)=> {
//                         return 'translate('+ (center_width + Number(d.position.x) *8) +"," +(center_height + Number(d.position.y) *8)+")"
//                 })

//         this.node.append("path")
//                 .attr("fill", "white")
//                 .attr("stroke-width", 1)
//                 .attr("d", function(d){
//                     var radia = d3.scaleLinear()
//                             .domain([0,Object.values(d.actor).length + Object.values(d.director).length + + Object.values(d.genre).length])
//                             .range([0, 2 * Math.PI])

//                     let data1 = Object.values(d.actor)
//                     var area = d3.areaRadial()
//                         // .curve(d3.curveLinearClosed)
//                         .innerRadius(d => 25+d*1.5)
//                         .outerRadius(d => 26+d*1.5)
//                         .angle((d,i) => {
//                             return radia(i)
//                         })
//                     return area(data1);
                                   
//                 })
//                 .attr('transform', (d,index)=> {
//                         return 'translate('+ (center_width + Number(d.position.x) *8) +"," +(center_height + Number(d.position.y) *8)+")"
//                 })
//                 .on('mouseover', function (d) {
//                     // d3.select(this).attr('stroke-width', '8');
//                     // d3.select(this).attr('stroke', '#a3e5f9');
//                     // if (that.config.isHighLight) {
//                     // that.highlightObject(d);
//                     // }
//                 });


        
        
//     }
// }

export default class RadialArea {
    constructor(selector,data) {
        let mapW = 1000
        //parseInt(d3.select(selector).style('width'))
        let mapH = 1000
        //parseInt(d3.select(selector).style('height'))

        this.defaultWH = {
            width: mapW,
            height: mapH,
        }
        this.config = {
                        cellColor1: 'white',
                        cellColor2: 'green',
                        scaleExtent: [0.5, 5],    // 缩放的比例尺
                        isScale: true,              // 是否启用缩放平移zoom功能
        };
        // 画布
        this.map = d3.select(selector);
        this.data = data
        this.innerRadius = 180
        this.outerRadius = 400

        this.drawRadial_Stacked_Bar_Chart()

        
    }
    drawRadial_Stacked_Bar_Chart(){
        const drag_x = d3.drag()
            .on("start", dragstarted)
            .on("drag", dragCircle)
            .on("end", endDragging);
        this.SVG = this.map.append("svg")
        .attr("viewBox", `${- this.defaultWH.width / 2} ${- this.defaultWH.height / 2} ${ this.defaultWH.width} ${ this.defaultWH.height}`)
        .style("width", "100%")
        .style("height", "auto")
        .style("font", "10px sans-serif")
        
        // .on('click', (event,d) => {console.log(event)})
        // .call(d3.zoom()
        //     .extent([[0, 0], [ this.defaultWH.width, this.defaultWH.height]])
        //     .scaleExtent([1, 8])
        //     .on("zoom", function({transform}){
        //             relMap_g.attr("transform", transform);
        // }));

        function dragstarted(event, d) {
            console.log(event.x)
        }
        function dragCircle(event, d) {
            console.log(event.x)
        }
        function endDragging(event, d) {
            console.log(event.x)
        }

       
            // .on("drag", dragged)
            // .on("end", dragended);
        // 4.放图的容器
        const relMap_g = this.SVG.append("g")
            .attr("class", "relMap_g")
            .call(drag_x)
            .attr("width", this.defaultWH.width)
            .attr("height", this.defaultWH.height);

        

        this.color = d3.scaleOrdinal()
            .domain(this.data.columns.slice(1))
            .range(["#98abc5", "#6b486b", "#ff8c00", "#7b6888", "#a05d56", "#d0743c", "#8a89a6"])

        this.arc = d3.arc()
            .innerRadius(d => this.y(d[0]))
            .outerRadius(d => this.y(d[1]))
            .startAngle(d => this.x(d.data.State))
            .endAngle(d => this.x(d.data.State) + this.x.bandwidth())
            .padRadius(this.innerRadius)

        this.x = d3.scaleBand()
            .domain(this.data.map(d => d.State))
            .range([0, 2 * Math.PI])
            .align(0)

        this.y = d3.scaleRadial()
            .domain([0, d3.max(this.data, d => d.total)])
            .range([this.innerRadius, this.outerRadius])

        var arc_brush = d3.arc()
            .outerRadius(this.outerRadius)
            .innerRadius(this.innerRadius);

        var pie = d3.pie()
            .value(function(d) { return d.count; })
            .sort(null);

        var dataset = [{ "startAngle": 0, "endAngle": 2 * Math.PI, "padAngle": 0}
        ]


        relMap_g.selectAll('path')
        .data(dataset)
        .join("path")
        .attr('d',arc_brush)
        .attr('fill','#7b6888')
        .attr("opacity", "0");


        relMap_g.append("g")
                .selectAll("g")
                .data(d3.stack().keys(this.data.columns.slice(1))(this.data))
                .join("g")
                .attr("fill", d => this.color(d.key))
                .selectAll("path")
                .data(d => d)
                .join("path")
                .attr("d", this.arc);
    
    
        relMap_g.append("circle")
                .attr("cx","0px")
                .attr("cy","0px")
                .attr("r",'8')
                .attr("fill", "#8a89a6")
                .attr("opacity", "0.7");

        this.xAxis = g => g
                .attr("text-anchor", "middle")
                .call(g => g.selectAll("g")
                .data(this.data)
                .join("g")
                    .attr("transform", d => `
                      rotate(${((this.x(d.State) + this.x.bandwidth() / 2) * 180 / Math.PI - 90)})
                      translate(${this.innerRadius},0)
                    `)
                .call(g => g.append("line")
                    .attr("x2", -5)
                    .attr("stroke", "#000"))
                .call(g => g.append("text")
                    .attr("transform", d => (this.x(d.State) + this.x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                            ? "rotate(90)translate(0,16)"
                            : "rotate(-90)translate(0,-9)")
                    .text(d => d.State)))

        this.yAxis = g => g
            .attr("text-anchor", "middle")
            .call(g => g.append("text")
                .attr("y", d => -this.y(this.y.ticks(5).pop()))
                .attr("dy", "-1em"))
                // .text("Population"))
            .call(g => g.selectAll("g")
                .data(this.y.ticks(5).slice(1))
                .join("g")
                    .attr("fill", "none")
                    .call(g => g.append("circle")
                        .attr("stroke", "#000")
                        .attr("stroke-opacity", 0.5)
                        .attr("r",this. y))
                    .call(g => g.append("text")
                        .attr("y", d => -this.y(d))
                        .attr("dy", "0.35em")
                        .attr("stroke", "#fff")
                        .attr("stroke-width", 5)
                        // .text(this.y.tickFormat(5, "s"))
                    .clone(true)
                        .attr("fill", "#000")
                        .attr("stroke", "none")))

        this.legend = g => g.append("g")
            .selectAll("g")
            .data(this.data.columns.slice(1).reverse())
            .join("g")
                .attr("transform", (d, i) => `translate(-450,${(i - (this.data.columns.length + 20) ) * 20})`)
                .call(g => g.append("rect")
                    .attr("width", 18)
                    .attr("height", 18)
                    .attr("fill", this.color))
                .call(g => g.append("text")
                    .attr("x", 24)
                    .attr("y", 9)
                    .attr("dy", "0.35em")
                    .text(d => d))

        // this.SVG.append("g")
        //         .call(this.xAxis);
        relMap_g.append("g")
                .call(this.yAxis);
          
        relMap_g.append("g")
                .call(this.legend);

        

        
    }
}