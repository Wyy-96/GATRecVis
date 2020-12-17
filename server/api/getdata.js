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
    var id = '0'
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
    let nodeGourp = handlerDatas(jsondata['links'])

    jsondata['nodes'].forEach((item,index) => {
        if(item['name'].indexOf('user') != -1){
            if( item['name'] == 'user'+(Number(id)+1)){
                return false
            }   
            nodeGourp.some((nodeG,index2) =>{
                if(nodeG.indexOf(item['name']) != -1){
                    jsondata['nodes'][index]['name'] = 'gourp'+index2.toString()
                    jsondata['nodes'][index]['id'] = index2.toString()
                    jsondata['nodes'][index]['size'] = (nodeG.split(',')).length
                    return true;
                }
            })
        }
    })
    var uniqHolderArr =  _ .uniqWith(jsondata['nodes'],  _ .isEqual);
    jsondata['nodes'] = uniqHolderArr
    
    let att = {}
    jsondata['links'].forEach((item,index) => {
        if(item['target'].indexOf('user') != -1){
            if( item['target'] == 'user'+(Number(id)+1)){
                return false
            } 
            nodeGourp.some((nodeG,index2) =>{
                if(nodeG.indexOf(item['target']) != -1){
                    jsondata['links'][index]['target'] = 'gourp'+index2.toString()
                    

                    if(Object.keys(att).indexOf('gourp'+index2.toString()) == -1){
                        att['gourp'+index2.toString()] = [0.0,(nodeG.split(',')).length]
                    }else {
                        att['gourp'+index2.toString()][0] += parseFloat(jsondata['links'][index]['value'])
                    }

                    jsondata['links'][index]['value'] = index2.toString()
                    return true;
                }
            })
        };
    });
    jsondata['links'] = _ .uniqWith(jsondata['links'],  _ .isEqual);
    jsondata['links'].forEach((item,index) => {
        if(item['target'].indexOf('gourp') != -1){
            
            jsondata['links'][index]['value'] = att[jsondata['links'][index]['target']][0] /att[jsondata['links'][index]['target']][1]
        }
    });
    let datatest = JSON.stringify(jsondata);
    fs.writeFileSync('student.json', datatest);
    res.json(jsondata)
});
    
    
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
                let neighbors = (result[0].neighbors).split(' ');
                let att_weights = (result[0].att_weights).split(' ');
                data ={'neighbors':neighbors, 'att_weights':att_weights };
                conn.end();
                resolve (data)
            }
        })
    })
    
}

let getrecResult = async function(Nodes,id,jsondata,revlinks){
    let dbinfo = getdbinfo(id)
    let sourcerealID = dbinfo['id']
    let sourceType = dbinfo['type']
    let sourceName = await getName(sourcerealID,sourceType)

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

    Nodes.push(sourceName)
    oneNode = {'id':id,'name':sourceName,'type': sourceType,'size':1}
    jsondata['nodes'].push(oneNode)


    let rec = await getrec(sourcerealID)
    for (let recR of rec.recResult){
        
        targetrealID = recR
        targetType = 'movie'

        targetName = await getName(targetrealID,targetType)

        if ( targetName in Object.keys(revlinks)){
            revlinks[targetName].push(sourceName)
        }else{
            revlinks[targetName]=[]
            revlinks[targetName].push(sourceName)
        }

        Nodes.push(targetName)
        oneNode = {'id':recR,'name':targetName,'type': 'recmovie','size':1}
        jsondata['nodes'].push(oneNode)

        oneLink = {'source':sourceName, 'target':targetName, 'value':1,'type':sourceType+'_recmovie'}
        jsondata['links'].push(oneLink)
        await getneighborLink(Nodes,Number(recR)+5977,jsondata,revlinks)
    }
}

function getdbinfo(id){
    id =  Number(id);
    if (id < 5978)
        return {'id':id+1,'type':'user'}
    if (id < 19098)
        return {'id':id - 5977,'type':'movie'}
    if (id < 45825)
        return {'id':id - 19098,'type':'actor'}
    if (id < 51171)
        return {'id':id - 45824,'type':'director'}
    else 
        return {'id':id - 51170,'type':'genre'}
}

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

let getneighborLink = async function(Nodes,id,jsondata,revlinks){
    let dbinfo = getdbinfo(id)
    let sourcerealID = dbinfo['id']
    let sourceType = dbinfo['type']

    let sourceName = await getName(sourcerealID,sourceType)
    if (sourceType == 'genre')
        return 0
    let neighbors_Weights = await getNeighbors_attWeights(sourcerealID,sourceType);
    let neighbors = neighbors_Weights['neighbors'];
    let weights = neighbors_Weights['att_weights'];


    let index = 0

    for(let targetID of neighbors){
        targetdbinfo = getdbinfo(targetID)
        targetrealID = targetdbinfo['id']
        targetType = targetdbinfo['type']

        targetName = await getName(targetrealID,targetType)
        if ( targetName in Object.keys(revlinks)){
            revlinks[targetName].push(sourceName)
        }else{
            revlinks[targetName]=[]
            revlinks[targetName].push(sourceName)
        }
        
        Nodes.push(targetName)
        oneNode = {'id':targetID,'name':targetName,'type': targetType,'size':1}
        jsondata['nodes'].push(oneNode)

        oneLink = {'source':sourceName, 'target':targetName, 'value':weights[index],'type':sourceType+'_'+targetType}
        jsondata['links'].push(oneLink)
    }
    return neighbors
}

let handlerDatas = function(arr){
      let obj = {};
      arr.forEach((item, index) => {
          let { target } = item;
          let { source } =item

          if(target.indexOf("user") != -1){
            if (!obj[target]) {
                obj[target] = []
            }
            obj[target].push(source);
          }
      });
      let data = Object.values(obj); // 最终输出

      indexR = {}
      data.forEach((item,index) => {
        one = item.toString()
        if (one.split(",").length < 2){
            if(!indexR[one]){
            indexR[one] = []
            }
            indexR[one].push(index)
        }
      });
      let R = Object.values(indexR)
      
      gourp = []
      let UR = Object.keys(obj)
      for(let rvalue of R ){
          let gourpIndex =[]
          for (let value of rvalue){
           gourpIndex.push(UR[value])
          }
          gourp.push(gourpIndex.toString())
      }
      return gourp
}

module.exports = router;


//操作对象