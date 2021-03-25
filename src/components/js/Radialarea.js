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
    constructor(selector, data) {
        let mapW = 600
        //parseInt(d3.select(selector).style('width'))
        let mapH = 600
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
        this.innerRadius = 0
        this.outerRadius = 200

        this.drawRadial_Stacked_Bar_Chart()


    }
    drawRadial_Stacked_Bar_Chart() {
        this.SVG = this.map.append("svg")
            .attr("viewBox", `${- this.defaultWH.width / 2} ${- this.defaultWH.height / 2} ${this.defaultWH.width} ${this.defaultWH.height}`)
            .style("width", "100%")
            .style("height", "auto")
            .style("font", "10px sans-serif")
        // .on('click', (event,d) => {console.log(event)})
        // .call(d3.zoom()
        //     .extent([[0, 0], [this.defaultWH.width, this.defaultWH.height]])
        //     .scaleExtent([1, 8])
        //     .on("zoom", function ({ transform }) {
        //         relMap_g.attr("transform", transform)
        //         interMap_g.attr("transform", transform)
        //     }));


        // 放图的容器
        const relMap_g = this.SVG.append("g")
            .attr("class", "relMap_g")
            .attr("width", this.defaultWH.width)
            .attr("height", this.defaultWH.height);


        //颜色范围
        const color = d3.scaleOrdinal()
            .domain(this.data.columns.slice(1))
            .range(["#98abc5", "#6b486b", "#ff8c00", "#7b6888", "#a05d56", "#d0743c", "#8a89a6"])

        //曲形柱状堆叠图
        this.arc = d3.arc()
            .innerRadius(d => y(d[0]))
            .outerRadius(d => y(d[1]))
            .startAngle(d => x(d.data.State))
            .endAngle(d => x(d.data.State) + x.bandwidth())
            .padRadius(this.innerRadius)

        const x = d3.scaleBand()
            .domain(this.data.map(d => d.State))
            .range([0, 2 * Math.PI])
            .align(0)
        
        
        const y = d3.scaleRadial()
            .domain([0, d3.max(this.data, d => d.total) - 0.2])
            .range([this.outerRadius, this.innerRadius])

        relMap_g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(this.data.columns.slice(1))(this.data))
            .join("g")
            .attr("fill", d => color(d.key))
            .selectAll("path")
            .data(d => d)
            .join("path")
            .attr("d", this.arc);

        // console.log(this.data.columns.slice(1))
        relMap_g.append("circle")
            .attr("cx", "0px")
            .attr("cy", "0px")
            .attr("r", '8')
            .attr("fill", "#8a89a6")
            .attr("opacity", "0.7");

        this.xAxis = g => g
            .attr("text-anchor", "middle")
            .call(g => g.selectAll("g")
                .data(this.data)
                .join("g")
                .attr("transform", d => `
                      rotate(${((x(d.State) + x.bandwidth() / 2) * 180 / Math.PI - 93.5)})
                      translate(${this.innerRadius},0)
                    `)
                .call(g => g.append("line")
                    .attr("x2", -5)
                    .attr("stroke", "#000"))
                .call(g => g.append("text")
                    .attr("transform", d => (x(d.State) + x.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
                        ? "rotate(90)translate(0,16)"
                        : "rotate(-90)translate(0,-9)")
                    .text(d => d.State)))

        this.yAxis = g => g
            .attr("text-anchor", "middle")
            .call(g => g.append("text")
                .attr("y", d => -y(y.ticks(5).pop()))
                .attr("dy", "-1em"))
            // .text("Population"))
            .call(g => g.selectAll("g")
                .data(y.ticks(5).slice(1))
                .join("g")
                .attr("fill", "none")
                .call(g => g.append("circle")
                    .attr("stroke", "#000")
                    .attr("stroke-opacity", 0.5)
                    .attr("r", y))
                .call(g => g.append("text")
                    .attr("y", d => -y(d))
                    .attr("dy", "0.35em")
                    .attr("stroke", "#fff")
                    .attr("stroke-width", 5)
                    // .text(y.tickFormat(5, "s"))
                    .clone(true)
                    .attr("fill", "#000")
                    .attr("stroke", "none")))

        this.legend = g => g.append("g")
            .selectAll("g")
            .data(this.data.columns.slice(1).reverse())
            .join("g")
            .attr("transform", (d, i) => `translate(-450,${(i - (this.data.columns.length + 20)) * 20})`)
            .call(g => g.append("rect")
                .attr("width", 18)
                .attr("height", 18)
                .attr("fill", color))
            .call(g => g.append("text")
                .attr("x", 24)
                .attr("y", 9)
                .attr("dy", "0.35em")
                .text(d => d))

        // relMap_g.append("g")
        //     .call(this.xAxis);
        // relMap_g.append("g")
        //     .call(this.yAxis);

        relMap_g.append("g")
            .call(this.legend);

        var Ini_angle = 0
        var Ini_angleEND = 0
        const drag_x = function (data) {
            var Angle = 0
            var startX = 0
            var startY = 0
            function dragstarted(event, d) {
                startX = event.sourceEvent.layerX
                startY = event.sourceEvent.layerY
            }
            function dragCircle(event, d) {
                var A = { 'x': 400, 'y': 400 }
                var B = { 'x': startX, 'y': startY }
                var lengthAB = Math.sqrt(Math.pow(A.x - B.x, 2) + Math.pow(A.y - B.y, 2))
                var lengthAC = Math.sqrt(Math.pow(A.x - event.sourceEvent.layerX, 2) + Math.pow(A.y - event.sourceEvent.layerY, 2))
                var lengthBC = Math.sqrt(Math.pow(B.x - event.sourceEvent.layerX, 2) + Math.pow(B.y - event.sourceEvent.layerY, 2))
                var cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) / (2 * lengthAB * lengthAC);
                Angle = Math.acos(cosA)

                var rotate = parseFloat(d3.select(this).attr('transform').split(',')[0].replace('rotate(', ''))
                d3.select(this)
                    .attr("transform", `rotate(${Angle * 180 / Math.PI + rotate}, ${0} ${0})`)
                    .attr('text', rotate * Math.PI / 180 + Angle)

                startX = event.sourceEvent.layerX
                startY = event.sourceEvent.layerY
                if (d3.select(this).attr('class') == 'Selec_cri') {
                    var a = parseFloat(d3.selectAll('.Selec_cri')._groups[0][0].attributes.text.value) + 0.04
                    var b = parseFloat(d3.selectAll('.Selec_cri')._groups[0][1].attributes.text.value) + 0.045

                    d3.select('.Selec_area').selectAll('path')
                        .data([{ "startAngle": a, "endAngle": b, "padAngle": 0 }
                        ])
                        .join("path")
                        .attr('d', arc_brush)
                        .attr('fill', '#7b6888')
                        .attr('class', 'Selec_area')
                        .attr('z-index', 1)
                        .attr("transform", `rotate(${0}, ${0} ${0})`)
                        .attr("opacity", "0.2");
                    var aa = parseFloat(d3.selectAll('.Selec_cri')._groups[0][0].attributes.transform.value.split(',')[0].replace('rotate(', ''))
                    var ba = parseFloat(d3.selectAll('.Selec_cri')._groups[0][1].attributes.transform.value.split(',')[0].replace('rotate(', ''))
                    var selectData = new Array()
                    data.forEach(function (item, i) {
                        if ((x(item.State) + x.bandwidth() / 2) * 180 / Math.PI < d3.max([aa, ba]) && (x(item.State) + x.bandwidth() / 2) * 180 / Math.PI > d3.min([aa, ba]))
                            selectData.push(item)
                    })
                    test(selectData)
                }
            }
            function endDragging(event, d) {
                // var a = parseFloat(d3.selectAll('.Selec_cri')._groups[0][0].attributes.transform.value.split(',')[0].replace('rotate(', ''))
                // var b = parseFloat(d3.selectAll('.Selec_cri')._groups[0][1].attributes.transform.value.split(',')[0].replace('rotate(', ''))
                // var selectData = new Array()
                // data.forEach(function (item, i) {
                //     if ((x(item.State) + x.bandwidth() / 2) * 180 / Math.PI < d3.max([a, b]) && (x(item.State) + x.bandwidth() / 2) * 180 / Math.PI > d3.min([a, b]))
                //         selectData.push(item)
                // })
                // test(selectData)
            }
            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragCircle)
                .on("end", endDragging);
        }


        function test(testdata) {

            const x = d3.scaleBand()
                .domain(testdata.map(d => d.State))
                .range([-500, 500])
                .padding(0.1)
            const y = d3.scaleLinear()
                .domain([0, d3.max(testdata, d => d.total)])
                .rangeRound([300, 100])

            scaleMap_g
                .selectAll("g")
                .data(d3.stack().keys(["rate1", "rate2"])(testdata))
                .join("g")
                .attr("fill", d => color(d.key))
                .selectAll("rect")
                .data(d => d)
                .join('rect')
                .attr("x", (d, i) => x(d.data.State))
                .attr("y", function (d) {
                    return y(d[1])
                })
                .attr("transform", `translate(0, 0)`)
                .attr("height", d => y(d[0]) - y(d[1]))
                .attr("width", x.bandwidth());


        }
        // 交互的容器
        const interMap_g = this.SVG.append("g")
            .attr("class", "interMap_g")
            .attr("width", this.defaultWH.width)
            .attr("height", this.defaultWH.height);

        // 交互区域构建
        var arc_brush = d3.arc()
            .outerRadius(this.outerRadius)
            .innerRadius(this.innerRadius);

        interMap_g.selectAll('path')
            .data([{ "startAngle": 0, "endAngle": 2 * Math.PI, "padAngle": 0 }])
            .join("path")
            .attr('d', arc_brush)
            .attr('fill', '#7b6888')
            .attr("opacity", "0");

        //选择器
        const inter = interMap_g.append('g')

        inter.selectAll('path')
            .data([{ "startAngle": 0, "endAngle": 0.04, "padAngle": 0 },
            { "startAngle": 0.045, "endAngle": 0.085, "padAngle": 0 }
            ])
            .join("path")
            .attr('d', arc_brush)
            .attr('fill', '#7b6888')
            .call(drag_x(this.data))
            .attr('class', 'Selec_cri')
            .attr('text', 0)
            .attr('z-index', 99)
            .attr("transform", `rotate(${0}, ${0} ${0})`)
            .attr("opacity", "0.7");

        inter.append('g')
            .attr('class', 'Selec_area')
            .selectAll('path')
            .data([{ "startAngle": 0.025, "endAngle": 0.03, "padAngle": 0 }
            ])
            .join("path")
            .attr('d', arc_brush)
            .attr('fill', '#7b6888')
            .attr("transform", `rotate(${0}, ${0} ${0})`)
            .attr("opacity", "0.2");


        const scaleMap_g = this.SVG.append("g")
            .attr('class', 'scaleMap_g')

    }
}