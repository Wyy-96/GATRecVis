const express = require('express');
const router = express.Router();
const fs=require('fs');
const path = require('path'); 
const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');
const async = require('async')
const  _  = require('lodash');

router.post('/getRec', async (req, res) => {
    console.log(req.body.data)
    // 比数据库里的ID小1
    var id = (Number(req.body.data)-1).toString()
    let j = await getRecinfo(id)
    let records = await getRercodsinfo(id)
    let jsondata = Object.values(j).concat(Object.values(records))
    res.json(jsondata)
});

// 获取邻居节点id 、对应注意力权重值    
let getneighbors = async function(id){
    let dbinfo = getdbinfo(id)
    let realID = dbinfo['id']
    let type = dbinfo['type']

    let conn = new DBHelper().getConn();
    let sqlstr;
    
    return new Promise(( resolve, reject ) => { 
        switch(type){
            case 'user':
                sqlstr = sql.user.findNeighbors;break;
            case 'movie':
                sqlstr = sql.movie.findNeighbors;break;
            case 'actor':
                sqlstr = sql.actor.findNeighbors;break;
            case 'director':
                sqlstr = sql.director.findNeighbors;break;
        }
        conn.query(sqlstr, realID, (err, result) => {
            if (err) {
                reject(err) 
            } else {
                let neighbors = (result[0].neighbors).split('  ');
                conn.end();
                resolve(neighbors)
            }
        })
    })
    
}

let getrecResult = async function(id){
    let dbinfo = getdbinfo(id)
    let realID = dbinfo['id']

    let conn = new DBHelper().getConn();

    return new Promise(( resolve, reject ) => { 
        conn.query(sql.user.findRecResult, realID, (err, result) => {
            if (err) {
                reject(err) 
            } else {
                let recResult = (result[0].recResult).split('  ');
                conn.end();
                resolve(recResult)
            }
        })
    })
}

function getMovieRecords(id,type){
    let dbinfo = getdbinfo(id)
    let realID = dbinfo['id']

    let conn = new DBHelper().getConn();
    let sqlstr = sql.user.findMovieRecords;
    return new Promise(( resolve, reject ) => {       
        conn.query(sqlstr, realID, (err, result) => {
            if (err) {
                reject (err)
            } else {
                let MovieRecords = (result[0].movieRecords);
                conn.end();
                resolve (MovieRecords)
            }
        })
    })
}

//对训练数据ID 进行类型和数据库ID隐射
function getdbinfo(id){
    id =  Number(id);
    if (id < 3155)
        return {'id':id+1,'type':'user'}
    if (id < 6679)
        return {'id':id - 3154,'type':'movie'}
    if (id < 20053)
        return {'id':id - 6678,'type':'actor'}
    if (id < 21864)
        return {'id':id - 20052,'type':'director'}
    else 
        return {'id':id - 21863,'type':'genre'}
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

function getPosition(id,type){
    id = Number(id)
    let conn = new DBHelper().getConn();
    let sqlstr;
    return new Promise(( resolve, reject ) => {       
        switch(type){
            case 'user':
                sqlstr = sql.user.findPosition;break;
                
            case 'movie':
                sqlstr = sql.movie.findPosition;break;
        }
        conn.query(sqlstr, id, (err, result) => {
            if (err) {
                reject (err,id)
            } else {
                let position = (result[0].position);
                conn.end();
                resolve (position)
            }
        })
    })
}



let getRecinfo = async function(id){

    let neighbors = await getneighbors(id)
    let recResult =  await getrecResult(id)
    let movieRecords = (await getMovieRecords(id)).split(",")

    let userp = (await getPosition(Number(id)+1,'user')).split(",")
    let s = {x:userp[0], y:userp[1]}

    let json ={}
    let oneinfo ={}
    for(let item of neighbors){
        let nei = await getneighbors(item)
        for(let n of nei){
            if(!json[n]){
                json[n]=[]
            }
            json[n].push(item)
        }
    }

    oneinfo['user'+ id] = {
            "id":id,
            "name":'user'+ id,
            "user": 20,
            "Tuser": 20,
            "actor":{},
            "director":{},
            "genre":{},
            "position":s,
            "type":'targetuser',
            "hit":false,
        }

   for(let one of recResult){
        let jsondata ={}
        let flag = false
        if( movieRecords.includes(one) ) flag = true
        one = (Number(one) + 3154).toString()

        oneinfo[one] = {
            "id":one,
            "name":"",
            "user": 0,
            "Tuser": 0,
            "actor":{},
            "director":{},
            "genre":{},
            "position":{},
            "type":'recmovie',
            "hit":false,
        }
        let getinfo = getdbinfo(one)
        let Name = await getName(getinfo['id'],'movie')

        let position = (await getPosition(getinfo['id'],'movie')).split(",")
        let t = {x:position[0], y:position[1]}


        oneinfo[one]["name"] = Name
        oneinfo[one]["hit"] = flag
        oneinfo[one]["position"] = t
        let nei = await getneighbors(one)
        for(let n of nei){
            if(!jsondata[n]){
                jsondata[n]=[]
            }
            jsondata[n].push(one)
        }
        
        
        for( let item of Object.keys(jsondata)){
            let info = getdbinfo(item)
            switch(info['type']){
                case 'user':
                    oneinfo[one]['user'] += 1;
                    if( Object.keys(json).includes(item)){
                        oneinfo[one]['Tuser'] += json[item].length;
                    }   
                    break;
                case 'movie':
                    let movieName = await getName(info['id'],'movie')
                    oneinfo[one]['movie'][movieName] = 0
                    if( Object.keys(json).includes(item)){
                        oneinfo[one]['movie'][movieName] += json[item].length;
                    }
                    break;
                case 'actor':
                    let actorName = await getName(info['id'],'actor')
                    if (actorName == "空") continue
                    oneinfo[one]['actor'][actorName] = 0
                    if( Object.keys(json).includes(item)){
                        oneinfo[one]['actor'][actorName] += json[item].length;
                    }
                    break;
                case 'director':
                    let directorName = await getName(info['id'],'director')
                    oneinfo[one]['director'][directorName] = 0
                    if( Object.keys(json).includes(item)){
                        oneinfo[one]['director'][directorName] += json[item].length;
                    }
                    break;
                case 'genre':
                    let genreName = await getName(info['id'],'genre')
                    if(genreName == "空") continue
                    oneinfo[one]['genre'][genreName] = 0
                    if( Object.keys(json).includes(item)){
                        oneinfo[one]['genre'][genreName] += json[item].length;
                    }
                    
                    break;
            }
        
        }
   }
   return oneinfo
}

let getRercodsinfo = async function (id) {
    let neighbors = await getneighbors(id)
    let recResult =  await getrecResult(id)
    let movieRecords = (await getMovieRecords(id)).split(",")

    let oneinfo ={}


   for(let one of movieRecords){
        one = (Number(one) + 3154).toString()

        oneinfo[one] = {
            "id":one,
            "name":"",
            "user": 0,
            "Tuser": 0,
            "actor":{},
            "director":{},
            "genre":{},
            "position":{},
            "type":'recordsmovie',
            "hit":false,
        }
        let info = getdbinfo(one)
        oneinfo[one]["name"] = await getName(info['id'],'movie')
        oneinfo[one]["user"] = 20
        let position = (await getPosition(info['id'],'movie')).split(",")
        oneinfo[one]["position"] = {x:position[0], y:position[1]}
        
   }
   return oneinfo
}

module.exports = router;
