// node后端服务器
const http = require('http');
const badyParser = require('body-parser');
const express = require('express');
const dataApi = require('./api/getdata');


let app = express();
let server = http.createServer(app);

app.use(badyParser.json());
app.use(badyParser.urlencoded({
    extended: false
}));

// 后端api路由
app.use('/api/getdata', dataApi);


// 启动监听
server.listen(8888, '127.0.0.1', () => {
    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
    console.log(' success!! port:9999')
})