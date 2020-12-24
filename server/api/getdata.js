const express = require('express');
const router = express.Router();
const fs=require('fs');
const path = require('path'); 
const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');
const async = require('async')
const  _  = require('lodash');
// 查询用户
router.post('/selectUser', (req, res) => {
    let sqlStr = sql.user.findName;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [1], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log("getUser")
            res.json(result)
        }
    });
    conn.end();
});
router.post('/getHeatmap',(req, res) =>{
    
    var jsonPath = path.join(__dirname,'..','data','data1.json');  //绝对路径
    var result=JSON.parse(fs.readFileSync( jsonPath));

    res.json(result);
});


router.post('/getUserTopology', async (req, res) =>{
    // id 比数据库里小1
    var id = '1'
    let jsondata={}
    jsondata['nodes']=[]
    jsondata['links'] = []
    let revlinks = {}
    let Nodes =[]
    let neighbors =await getneighborLink(Nodes,id,jsondata,revlinks)
    for(let nei of neighbors){
        await getneighborLink(Nodes,nei,jsondata,revlinks)
    }
    await getrecResult(Nodes,id,jsondata,revlinks)

    

    // 解决foreach异步的写法
    // let count = 0
    // await new Promise ( (resolve)=>{
    //     neighbors.forEach(async (value,index) => {
    //         try{
    //             dbinfo = getdbinfo(value)  //表类型，数据库的ID
    //             Name = await getName(dbinfo['id'],dbinfo['type'])
    //             oneLink = {'source':'user1', 'target':Name, 'value':att_weights[index]}
    //             jsondata['links'].push(oneLink)
    //             // if(dbinfo['type'] != 'genre')
    //             //     n_n_weights =  await getNeighbors_attWeights(dbinfo['id'],dbinfo['type']);
        
    //         } finally {
    //             count += 1
    //             if (count === neighbors.length)
    //                 resolve()
    //         }
    //     });
    // })
    handlerDatas(jsondata['links'],jsondata['nodes'])

    // jsondata['nodes'].forEach((item,index) => {
    //     if(item['name'].indexOf('user') != -1){
    //         if( item['name'] == 'user'+(Number(id)+1)){
    //             return false
    //         }   
    //         nodeGourp.some((nodeG,index2) =>{
    //             if(nodeG.indexOf(item['name']) != -1){
    //                 // jsondata['nodes'][index]['name'] = 'gourp'+index2.toString()
    //                 // jsondata['nodes'][index]['id'] = index2.toString()
    //                 // jsondata['nodes'][index]['size'] = (nodeG.split(',')).length
    //                 jsondata['nodes'].pop(index)
    //                 return true;
    //             }
    //         })
    //     }
    // })

    // 去重
    jsondata['nodes'] =  _ .uniqWith(jsondata['nodes'],  _ .isEqual);
    jsondata['nodes'] = _.reject(jsondata['nodes'], _.isEmpty);
    // let att = {}
    // jsondata['links'].forEach((item,index) => {
    //     if(item['target'].indexOf('user') != -1){
    //         if( item['target'] == 'user'+(Number(id)+1)){
    //             return false
    //         } 
    //         nodeGourp.some((nodeG,index2) =>{
    //             if(nodeG.indexOf(item['target']) != -1){
    //                 jsondata['links'][index]['target'] = 'gourp'+index2.toString()
                    

    //                 // if(Object.keys(att).indexOf('gourp'+index2.toString()) == -1){
    //                 //     att['gourp'+index2.toString()] = [0.0,(nodeG.split(',')).length]
    //                 // }else {
    //                 //     att['gourp'+index2.toString()][0] += parseFloat(jsondata['links'][index]['value'])
    //                 // }

    //                 // jsondata['links'][index]['value'] = index2.toString()
    //                 return true;
    //             }
    //         })
    //     };
    // });

    // 去重
    jsondata['links'] = _ .uniqWith(jsondata['links'],  _ .isEqual);
    jsondata['links'] = _.reject(jsondata['links'], _.isEmpty); 
    // jsondata['links'].forEach((item,index) => {
    //     if(item['target'].indexOf('gourp') != -1){
            
    //         jsondata['links'][index]['value'] = att[jsondata['links'][index]['target']][0] /att[jsondata['links'][index]['target']][1]
    //     }
    // });

    // 保存查询结果
    // fs.writeFileSync('test.json', JSON.stringify(jsondata));
    
    res.json(jsondata)
});
    
// 获取邻居节点id 、对应注意力权重值    
function getNeighbors_attWeights(id,type){
    id = Number(id)
    let conn = new DBHelper().getConn();
    let data;
    let sqlstr;
    return new Promise(( resolve, reject ) => { 
        switch(type){
            case 'user':
                sqlstr = sql.user.findNeighbors_attWeights;break;
            case 'movie':
                sqlstr = sql.movie.findNeighbors_attWeights;break;
            case 'actor':
                sqlstr = sql.actor.findNeighbors_attWeights;break;
            case 'director':
                sqlstr = sql.director.findNeighbors_attWeights;break;
        }
       
        conn.query(sqlstr, id, (err, result) => {
            if (err) {
                reject (err)
            } else {
                let neighbors = (result[0].neighbors).split('  ');
                let att_weights = (result[0].att_weights).split('  ');
                data ={'neighbors':neighbors, 'att_weights':att_weights };
                conn.end();
                resolve (data)
            }
        })
    })
    
}

let getrecResult = async function(Nodes,id,jsondata,revlinks){
    let dbinfo = getdbinfo(id)
    let targetrealID = dbinfo['id']
    let targetType = dbinfo['type']
    let targetName = await getName(targetrealID,targetType)

    Nodes.push(targetName)
    oneNode = {'id':id,'name':targetName,'type': targetType,'fx':725,'fy':505}
    jsondata['nodes'].push(oneNode)

    let getrec = async function(id){
        return new Promise(( resolve, reject ) => {
        let conn = new DBHelper().getConn();
        let data;
        conn.query(sql.user.findRecResult, id, (err, result) => {
            if (err) {
                reject (err)
            } else {
                let recResult = (result[0].recResult).split('  ');
                data ={'recResult':recResult}
                conn.end();
                resolve( data )
            }
        })
    })
    }

    let rec = await getrec(targetrealID)
    let x0 = 725
    let y0 = 505
    let r = 500
    let shuliang = rec.recResult.length
    let ang = 360 /shuliang
    let xuhao = 0
    for (let recR of rec.recResult){
        
        sourcerealID = recR
        sourceType = 'movie'

        sourceName = await getName(sourcerealID,sourceType)

        xuhao += 1
        x1   =   x0   +   r   *   Math.cos(ang*xuhao   *   Math.PI   /180   )
        y1   =   y0   +   r   *   Math.sin(ang*xuhao   *   Math.PI   /180   )
        Nodes.push(sourceName)
        oneNode = {'id':recR,'name':sourceName,'type': 'recmovie','size':1,'fx':x1,'fy':y1}
        jsondata['nodes'].push(oneNode)
        // console.log(recR,sourceName)
        await getneighborLink(Nodes,Number(recR)+5977,jsondata,revlinks)
        
    }
}

//对训练数据ID 进行类型和数据库ID隐射
function getdbinfo(id){
    id =  Number(id);
    if (id < 5978)
        return {'id':id+1,'type':'user'}
    if (id < 19098)
        return {'id':id - 5977,'type':'movie'}
    if (id < 45825)
        return {'id':id - 19097,'type':'actor'}
    if (id < 51171)
        return {'id':id - 45824,'type':'director'}
    else 
        return {'id':id - 51170,'type':'genre'}
}

//获取数据的Name 属性
function getName(id,type){
    id = Number(id)
    let conn = new DBHelper().getConn();
    let sqlstr;
    return new Promise(( resolve, reject ) => {       
        switch(type){
            case 'user':
                sqlstr = sql.user.findName;
                resolve('user'+id.toString() );
                break;
            case 'movie':
                sqlstr = sql.movie.findName;break;
            case 'actor':
                sqlstr = sql.actor.findName;break;
            case 'director':
                sqlstr = sql.director.findName;break;
            case 'genre':
                sqlstr = sql.genre.findName;break;
        }
        conn.query(sqlstr, id, (err, result) => {
            if (err) {
                reject (err,id)
            } else {
                let name = (result[0].Name);
                conn.end();
                resolve (name)
            }
        })
    })
}

// 构造连接边
let getneighborLink = async function(Nodes,id,jsondata,revlinks){
    let dbinfo = getdbinfo(id)
    let targetrealID = dbinfo['id']
    let targetType = dbinfo['type']
    
    let targetName = await getName(targetrealID,targetType)

    if (targetType == 'genre')
        return 0
    let neighbors_Weights = await getNeighbors_attWeights(targetrealID,targetType);
    let neighbors = neighbors_Weights['neighbors'];
    let weights = neighbors_Weights['att_weights'];

    let index = 0

    let x0 = 725
    let y0 = 505
    let r = 120
    let shuliang = 20
    let ang = 360 /shuliang
    let xuhao = 0
    let userxuhao = 0  
    let elxuhao = 0 

    let youxiaoneighbor = []
    for(let sourceID of neighbors){
        if (weights[index] > 0.005){
            youxiaoneighbor.push(sourceID)
            sourcedbinfo = getdbinfo(sourceID)
            sourcerealID = sourcedbinfo['id']
            sourceType = sourcedbinfo['type']

            sourceName = await getName(sourcerealID,sourceType)


            if (sourceID == '20014') 
                continue;

            Nodes.push(sourceName)
            if (id == '1'){
                xuhao += 1
                x1   =   x0   +   r   *   Math.cos(ang*xuhao   *   Math.PI   /180   )
                y1   =   y0   +   r   *   Math.sin(ang*xuhao   *   Math.PI   /180   )
                oneNode = {'id':sourceID,'name':sourceName,'type': sourceType,'size':1,'fx':x1,'fy': y1}
                jsondata['nodes'].push(oneNode)
                oneLink = {'source':targetName, 'target':sourceName, 'value':weights[index],'type':'user_movie'}
                jsondata['links'].push(oneLink)
            }
            else {
                oneNode = {'id':sourceID,'name':sourceName,'type': sourceType,'size':1}
                jsondata['nodes'].push(oneNode)
                oneLink = {'source':sourceName, 'target':targetName, 'value':weights[index],'type':sourceType+'_'+targetType}
                jsondata['links'].push(oneLink)
            }
        }

        index += 1
    }
    return youxiaoneighbor
}

let handlerDatas = function(arr,jsonnode){
    let userobj = {};
    let direobj = {};
    let actorobj = {};
    let genreobj = {};
    arr.forEach((item, index) => {
        let { target } = item;
        let { source } = item;
        let { value } = item;
        let { type } = item;
        if ( type.indexOf("user_movie") != -1){
            if (!userobj[source]) {
                userobj[source] = {
                    neighbor : [],
                    weights : []
                }
            }
            userobj[source]["neighbor"].push(target);
            userobj[source]["weights"].push(value);
        }  
        // if ( type.indexOf("director_movie") != -1){
        //     if (!direobj[source]) {
        //         direobj[source] = {
        //             neighbor : [],
        //             weights : []
        //         }
        //     }
        //     direobj[source]["neighbor"].push(target);
        //     direobj[source]["weights"].push(value);
        // }
        // if ( type.indexOf("actor_movie") != -1){
        //     if (!actorobj[source]) {
        //         actorobj[source] = {
        //             neighbor : [],
        //             weights : []
        //         }
        //     }
        //     actorobj[source]["neighbor"].push(target);
        //     actorobj[source]["weights"].push(value);
        // }     
    });
    
    test = []
    test.push(userobj)
    // console.log(userobj)
    // test.push(direobj)
    // test.push(actorobj)
    delDatas(arr,test,jsonnode)
    return userobj
}
let delDatas = function(arr,test,jsonnode){
    for( let x in test){
        let M_to_X = {}
        obj = test[x]
        let keys = Object.keys(obj)
        keys.forEach((item,index) => {
            if ((obj[item]["neighbor"]).length < 2)
                {
                    let neighbors = obj[item]["neighbor"].toString()
        
                    if ( !M_to_X[neighbors]){
                        M_to_X[neighbors] =[]
                    }
                    M_to_X[neighbors].push(item)
                }
        })

        let testkeys = Object.keys(M_to_X)
        let testvalues = Object.values(M_to_X)
        arr.forEach((item, index) => {
            let { target } = item;
            let { source } = item;
            let { value } = item;
        
            if ( testkeys.includes(target)){
                if( M_to_X[target].includes(source) ){
                    delete arr[index]
                }
            }
        })

        jsonnode.forEach((item,index)=> {
            let { name } = item;
            testkeys.forEach((item) =>{
                if(M_to_X[item].includes(name)) 
                    delete jsonnode[index]
            })
        })
    }
}
module.exports = router;


//操作对象