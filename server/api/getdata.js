const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const async = require('async');
const _ = require('lodash');
const GetInfo = require('../utils/getInfo');
const { info } = require('console');
// Asynchronous read

let Info = new GetInfo()
Info.initialize()

function GetVennResult(arr1, arr2, arr3,u_id) {
  //数组交集，或得两个数组重复的元素
  let Part12 = arr1.filter(item => arr2.includes(item))
  let Part13 = arr1.filter(item => arr3.includes(item))
  let Part23 = arr2.filter(item => arr3.includes(item))
  let Part123 = Part12.filter(item => Part23.includes(item))
  let test = Part123


  let Part1 = (arr1.filter((x) => !Part12.some((item) => x === item))).filter((x) => !Part13.some((item) => x === item)) //HetGNN  90  350
  let Part2 = (arr2.filter((x) => !Part12.some((item) => x === item))).filter((x) => !Part23.some((item) => x === item)) //KGAT
  let Part3 = (arr3.filter((x) => !Part13.some((item) => x === item))).filter((x) => !Part23.some((item) => x === item)) //NIRec

  Part12 = Part12.filter((x) => !test.some((item) => x === item))
  Part13 = Part13.filter((x) => !test.some((item) => x === item))
  Part23 = Part23.filter((x) => !test.some((item) => x === item))

  let ALL_part = new Object()
  ALL_part.He = GetMovieName(Part1,u_id,'H')
  ALL_part.KG = GetMovieName(Part2,u_id,'K')
  ALL_part.NI = GetMovieName(Part3,u_id,'N')
  ALL_part.HeKG = GetMovieName(Part12,u_id,'HK')
  ALL_part.HeNI = GetMovieName(Part13,u_id,'HN')
  ALL_part.KGNI = GetMovieName(Part23,u_id,'KN')
  ALL_part.HeKGNI = GetMovieName(Part123,u_id,'HKN')

  return ALL_part
}

function GetMovieName(data,u_id,model) {
  let temp_array = new Array()
  data.forEach((element) => {
    let temp_object = {}
    temp_object.movieId = element
    temp_object.movieName = Info.movieInfo[element].movieName
    if(model == 'H'){
      if(Info.HIT["HetGNN"][u_id].includes(element) == true)
        temp_object.hit = 1
      else temp_object.hit = 0
    }
    else if(model == 'K'){
      if(Info.HIT["KGAT"][u_id].includes(element) == true)
        temp_object.hit = 1
      else temp_object.hit = 0
    }else if(model == 'N'){
      if(Info.HIT["NIRec"][u_id].includes(element) == true)
        temp_object.hit = 1
      else temp_object.hit = 0
    }else if(model == 'HK'){
      if(Info.HIT["KGAT"][u_id].includes(element) == true || Info.HIT["HetGNN"][u_id].includes(element) == true)
        temp_object.hit = 1
      else temp_object.hit = 0
    }else if(model == 'HN'){
      if(Info.HIT["NIRec"][u_id].includes(element) == true || Info.HIT["HetGNN"][u_id].includes(element) == true)
        temp_object.hit = 1
      else temp_object.hit = 0
    }else if(model == 'KN'){
      if(Info.HIT["KGAT"][u_id].includes(element) == true || Info.HIT["NIRec"][u_id].includes(element) == true)
        temp_object.hit = 1
      else temp_object.hit = 0
    }else{
      if(Info.HIT["KGAT"][u_id].includes(element) == true || Info.HIT["NIRec"][u_id].includes(element) == true || Info.HIT["HetGNN"][u_id].includes(element) == true) 
        temp_object.hit = 1
      else temp_object.hit = 0
    }
    temp_array.push(temp_object)
  })
  return temp_array
}

var Ainfo_f = fs.readFileSync('./data/att_actor.csv', 'utf-8').split('\n');
var DInfo_f = fs.readFileSync('./data/att_director.csv', 'utf-8').split('\n');
var Minfo_f = fs.readFileSync('./data/att_movie.csv', 'utf-8').split('\n');
var Uinfo_f = fs.readFileSync('./data/att_user.csv', 'utf-8').split('\n');

var UM = ConstructArray(9625)
var AM = ConstructArray(9598)
var DM = ConstructArray(6287)

var MU = ConstructArray(12386)
var MA = ConstructArray(12386)
var MD = ConstructArray(12386)
var MG = ConstructArray(12386)

loadMovie(Uinfo_f, UM)
loadMovie(Ainfo_f, AM)
loadMovie(DInfo_f, DM)
loadMovie(Minfo_f, MU)

// 加载KGAT电影路径信息
function loadMovie(data, array) {
  data.forEach(element => {
    try {
      let target_id = parseInt(element.split(',')[0])
      let source_id = element.split(',')[1].replace('[', '').replace(']', '').split(' ').map(Number)
      let s_t_att = element.split(',')[2].replace('[', '').replace(']', '').split(' ').map(Number)
      array[target_id][0] = source_id
      array[target_id][1] = s_t_att

      if (element.split(',').length > 3) {
        if (element.split(',')[3].replace('[', '').replace(']', '').split(' ').length > 0) {
          source_id = element.split(',')[3].replace('[', '').replace(']', '').split(' ').map(Number)
          s_t_att = element.split(',')[4].replace('[', '').replace(']', '').split(' ').map(Number)
          MA[target_id][0] = source_id
          MA[target_id][1] = s_t_att
        }

        if (element.split(',')[5].replace('[', '').replace(']', '').split(' ').length> 0) {
          source_id = element.split(',')[5].replace('[', '').replace(']', '').split(' ').map(Number)
          s_t_att = element.split(',')[6].replace('[', '').replace(']', '').split(' ').map(Number)
          MD[target_id][0] = source_id
          MD[target_id][1] = s_t_att
        }
        
        if (element.split(',')[7].replace('[', '').replace(']', '').split(' ').length > 0) {
          source_id = element.split(',')[7].replace('[', '').replace(']', '').split(' ').map(Number)
          s_t_att = element.split(',')[8].replace('[', '').replace(']', '').split(' ').map(Number)
          MG[target_id][0] = source_id
          MG[target_id][1] = s_t_att
        }

      }
    } catch (e) {
      
    }
  });

  // console.log(MG)
}
// 构造n*2的二维数组
function ConstructArray(length) {
  let arr = new Array();
  for (var i = 0; i < length; i++) {          //一维长度为5
    arr[i] = new Array();    //在声明二维
    for (var j = 0; j < 2; j++) {      //二维长度为5
      arr[i][j] = [];
    }
  }
  return arr
}
// 删除力导引数据中重复数据
function deteleObject(obj) {
  var uniques = [];
  var stringify = {};
  for (var i = 0; i < obj.length; i++) {
    var keys = Object.keys(obj[i]);
    keys.sort(function (a, b) {
      return (Number(a) - Number(b));
    });
    var str = '';
    for (var j = 0; j < keys.length; j++) {
      str += JSON.stringify(keys[j]);
      str += JSON.stringify(obj[i][keys[j]]);
    }
    if (!stringify.hasOwnProperty(str)) {
      uniques.push(obj[i]);
      stringify[str] = true;
    }
  }
  uniques = uniques;
  return uniques;
}
// 计算重复数量
function counts_num(arr,value){
  return arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
}
// 构造KGAT力导引数据
function getKGATatt(userId, movieId) {
  let jsonforce = {}
  jsonforce['links'] = []
  jsonforce['nodes'] = []
  jsonforce['nodes'].push({id:'u'+userId, value:20, type:'targetUser'})
  jsonforce['nodes'].push({ id: 'm' + movieId, value: 20, type: 'targetMovie' })

  UM[userId][0].forEach(element =>{
    let att_s = UM[userId][1][UM[userId][0].indexOf(element)]
    MA[element][0].forEach(el =>{
      if (AM[el] == undefined) return
      if (AM[el][0].includes(movieId)) {
        jsonforce['links'].push({ source: 'u' + userId, target: 'm' +element, value: 1})
        jsonforce['nodes'].push({ id: 'm' + element, value: 8, type: 'movie' })
        jsonforce['links'].push({ source: 'm'+element, target: 'a'+el, value: 1 })
        jsonforce['links'].push({ source: 'a' +el, target: 'm' + movieId, value: 1 })
        jsonforce['nodes'].push({ id: 'a' + el, value: 8, type: 'actor' })
      }
    })
    MD[element][0].forEach(el => {
      if (DM[el] == undefined) return 
      if (DM[el][0].includes(movieId)) {
        jsonforce['links'].push({ source: 'u' + userId, target: 'm' +element, value: 1 })
        jsonforce['nodes'].push({ id: 'm' + element, value: 10, type: 'movie' })
        jsonforce['links'].push({ source: 'm' +element, target: 'd' +el, value: 1 })
        jsonforce['links'].push({ source: 'd' + el, target: 'm' +movieId, value: 1 })
        jsonforce['nodes'].push({ id: 'd' + el, value: 10, type: 'director' })
      }
    })

    if (att_s < 0.000001)
      return

    MG[element][0].forEach(el => {
      if (MG[movieId][0].includes(el)) {
        jsonforce['links'].push({ source: 'u' + userId, target: 'm' +element, value: 1})
        jsonforce['nodes'].push({ id: 'm' + element, value: 10, type: 'movie' })
        jsonforce['links'].push({ source: 'm' +element, target: 'g' + el, value: 1 })
        jsonforce['links'].push({ source: 'g' + el, target: 'm' +movieId, value: 1 })
        jsonforce['nodes'].push({ id: 'g' + el, value: 10, type: 'genre' })
      }
    })
    
    MU[element][0].forEach(el=>{
      if(UM[el][0].includes(movieId)){  // 要判断的是el 
        jsonforce['links'].push({ source: 'u' + userId, target: 'm' + element, value: 1 })
        jsonforce['nodes'].push({ id: 'm' + element, value: 10, type: 'movie' })
        jsonforce['links'].push({ source: 'm' + element, target: 'u' + el, value: 1 })
        jsonforce['links'].push({ source: 'u' + el, target: 'm' +movieId, value: 1 })
        jsonforce['nodes'].push({ id: 'u' + el, value: 8, type: 'user' })
      }
    })

  })
  jsonforce['links'] = deteleObject(jsonforce['links'])
  jsonforce['nodes'] = deteleObject(jsonforce['nodes'])

  let test = {}
  let rev_test = {}
  jsonforce['links'].forEach(element=>{
    if (element.target.includes('u')){
      if (Object.keys(rev_test).includes(element.target) == false) {  // u=[m]
        rev_test[element.target] = []
        rev_test[element.target].push(element.source)
      }else{
        delete rev_test[element.target]
      }
      

      if (Object.keys(test).includes(element.source) == false){  // m = [u]
        test[element.source] =[]
        
      }
      test[element.source].push(element.target)
    }
  })
  let key = Object.keys(rev_test)
  let k = Object.keys(test)
  let xiugai = {}
  for(var i = 0;i<key.length;i++){
    if(test[ rev_test[key[i]]].length > 1){
      let index = 'ugroup' + k.indexOf(rev_test[key[i]][0])
      xiugai[key[i]] = index
    }
  }

  jsonforce['nodes'].forEach(element=>{
    if(Object.keys(xiugai).includes(element.id) == true){
      element.value = 4 + counts_num(Object.values(xiugai), xiugai[element.id])
      element.id = xiugai[element.id]
    }
  })

  jsonforce['nodes'] = deteleObject(jsonforce['nodes'])
  jsonforce['nodes'].forEach(element=>{
    let names = element.id.slice(1);
    if (element.id[0] == 'u') element.name = element.id;
    else if (element.id[0] == 'g') element.name = Info.genreInfo[parseInt(names)]
    else if (element.id[0] == 'a') element.name = Info.actorInfo[parseInt(names)]
    else if (element.id[0] == 'd') element.name = Info.directorInfo[parseInt(names)]
    else if (element.id[0] == 'm') element.name = Info.movieInfo[parseInt(names)].movieName
  })
  jsonforce['nodes'] = deteleObject(jsonforce['nodes'])
  jsonforce['links'].forEach(element=>{
    if (Object.keys(xiugai).includes(element.source)){
      element.source = xiugai[element.source]
    }
    if ( Object.keys(xiugai).includes(element.target)){
      element.target = xiugai[element.target]
    }
  })
  jsonforce['links'] = deteleObject(jsonforce['links'])

  return jsonforce
}
// 构造NIRec力导引数据
function getNIRecatt(userId, movieId){
  let jsonforce = {}
  jsonforce['links'] = []
  jsonforce['nodes'] = []
  jsonforce['nodes'].push({ id: 'u' + userId, value: 20, type: 'targetUser' ,name:'u' + userId})
  jsonforce['nodes'].push({ id: 'm' + movieId, value: 20, type: 'targetMovie', name: Info.movieInfo[movieId].movieName })

  
  if (Info.NIRecPath[userId] == undefined){
  }
  else if (Object.keys(Info.NIRecPath[userId]).includes('m' + movieId) == true){
    let Pathes = Info.NIRecPath[userId]['m' + movieId]
    
    Pathes.forEach((element)=>{
      if(element == ''){
        jsonforce['links'].push({ source: 'u' + userId, target: 'm' + movieId, value: 1})
      }else{
        let m_id = parseInt(element.split(",")[0].replace("m",""))
        jsonforce['nodes'].push({ id: 'm' + m_id, value: 8, type: 'movie', name: Info.movieInfo[m_id].movieName})
        jsonforce['links'].push({ source: 'u' + userId, target: 'm' + m_id, value: 1 })

        let tag = element.split(",")[1]
        let tag_id = parseInt(element.split(",")[1].slice(1))
        if(tag[0] == 'a'){
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'actor', name: Info.actorInfo[parseInt(tag_id)]})
        } else if (tag[0] == 'd'){
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'director', name: Info.directorInfo[parseInt(tag_id)]})
        } else if (tag[0] == 'g') {
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'genre', name: Info.genreInfo[parseInt(tag_id)]})
        } else if (tag[0] == 'u') {
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'user', name: tag})
        }

        jsonforce['links'].push({ source: 'm' + m_id, target: tag, value: 1 })
        jsonforce['links'].push({ source: tag, target: 'm' + movieId, value: 1 })
      }
    })
  }
  else{
  }

  jsonforce['nodes'] = deteleObject(jsonforce['nodes'])
  return jsonforce
}
function getHetGNNatt(userId, movieId){
  let jsonforce = {}
  jsonforce['links'] = []
  jsonforce['nodes'] = []
  jsonforce['nodes'].push({ id: 'u' + userId, value: 20, type: 'targetUser', name:'u' + userId})
  jsonforce['nodes'].push({ id: 'm' + movieId, value: 20, type: 'targetMovie', name: Info.movieInfo[movieId].movieName})

  // 目标用户与推荐结果之间 没有路径
  if (Info.HetGNNPath[userId] == undefined) {
  }
  else if (Object.keys(Info.HetGNNPath[userId]).includes('m' + movieId) == true) {
    let Pathes = Info.HetGNNPath[userId]['m' + movieId]
    Pathes.forEach((element) => {
      let pathItems = element.split(",")
      if (pathItems.length == 1){
        var tag = pathItems[0]
        var tag_id = parseInt(pathItems[0].slice(1))
        if (tag[0] == 'a') {
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'actor', name: Info.actorInfo[parseInt(tag_id)] })
        } else if (tag[0] == 'd') {
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'director', name: Info.directorInfo[parseInt(tag_id)] })
        } else if (tag[0] == 'g') {
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'genre', name: Info.genreInfo[parseInt(tag_id)] })
        } else if (tag[0] == 'u') {
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'user', name: tag })
        }else{
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'movie', name: Info.movieInfo[parseInt(tag_id)].movieName })
        }
        
        jsonforce['links'].push({ source: 'u' + userId, target: tag, value: 1 })
        jsonforce['links'].push({ source: tag, target: 'm' + movieId, value: 1 })
      }
      else{
        let m_id = parseInt(pathItems[0].replace("m", ""))
        jsonforce['nodes'].push({ id: 'm' + m_id, value: 8, type: 'movie', name: Info.movieInfo[m_id].movieName })
        jsonforce['links'].push({ source: 'u' + userId, target: 'm' + m_id, value: 1 })
        
        let tag = pathItems[1]
        let tag_id = parseInt(pathItems[1].slice(1))

        if (tag[0] == 'a') {
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'actor', name: Info.actorInfo[parseInt(tag_id)] })
        } else if (tag[0] == 'd') {
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'director', name: Info.directorInfo[parseInt(tag_id)] })
        } else if (tag[0] == 'g') {
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'genre', name: Info.genreInfo[parseInt(tag_id)] })
        } else if (tag[0] == 'u') {
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'user', name: tag })
        }else{
          jsonforce['nodes'].push({ id: tag, value: 8, type: 'movie', name: Info.movieInfo[parseInt(tag_id)].movieName })
        }

        jsonforce['links'].push({ source: 'm' + m_id, target: tag, value: 1 })
        jsonforce['links'].push({ source: tag, target: 'm' + movieId, value: 1 })
      }
    })
  }
  else {
  }

  jsonforce['nodes'] = deteleObject(jsonforce['nodes'])
  return jsonforce


}
function getUserInfo(userId){
  let values = Info.userInfo[userId][0].split(";")
  let rate = Info.userInfo[userId][1].split(";")
  for(var i =0;i<values.length;i++){
    values[i] = values[i].split(",").map(Number)
    rate[i] = rate[i].split(",").map(Number)
    let n = 35 - values[i].length
    for(var j =0;j< n;j++){
      values[i].push(0)
      rate[i].push(0)
    }
    
  }
  return {"values":values, "rate":rate}
}
function getRecMovieStatic(userId,movieId){
  let genre = Info.movieInfo[movieId].movieGenre.split("|")
  let actor = Info.movieInfo[movieId].movieActor.split("|")
  let director = Info.movieInfo[movieId].movieDirector.split("|")
  let tags = Info.movieInfo[movieId].movieTags.split("|")
  let user_static = Info.user_rec_static[userId]
  let num =[]
  let attr = ["actor","director","genre","tags"]
  for (let i = 0; i < attr.length; i++) {

    if (Object.keys(user_static).includes(attr[i]) == false) {
      user_static[attr[i]] = ''
    }
  }
  let key = Object.keys(user_static["genre"])
  let total = 0
  let test = 0
  for(let i=0;i< genre.length;i++){
    if (key.includes(genre[i])){
      test += user_static["genre"][genre[i]]
    }
  }
  for( i = 0;i<key.length;i++){
    total += user_static["genre"][key[i]]
  }
  num.push(test/total)

  total = 0
  test = 0
  key = Object.keys(user_static["actor"])
  for (let i = 0; i < actor.length; i++) {
    if (key.includes(actor[i])) {
      test += user_static["actor"][actor[i]]
    }
  }
  for (i = 0; i < key.length; i++) {
    total += user_static["actor"][key[i]]
  }
  num.push(test / total)

  total = 0
  test = 0
  key = Object.keys(user_static["director"])
  
  for (let i = 0; i < director.length; i++) {
    if (key.includes(director[i])) {
      test += user_static["director"][director[i]]
    }
  } 
  for (i = 0; i < key.length; i++) {
    total += user_static["director"][key[i]]
  }
  num.push(test / total)

  total = 0
  test = 0
  key = Object.keys(user_static["tags"])
  for (let i = 0; i < tags.length; i++) {
    if (key.includes(tags[i])) {
      test += user_static["tags"][tags[i]]
    }
  } 
  for (i = 0; i < key.length; i++) {
    total += user_static["tags"][key[i]]
  }
  num.push(test / total)
  num.push(Info.movieInfo[movieId]["movieUser"])

  return num
}
var NIRecShow = true
var KGATShow = true
var HetGNNShow = true
// 查询用户
router.post('/selectUser', (req, res) => {
  let userId = parseInt(req.body.data["id"].replace("u", ""))
  let state = req.body.data["state"]
  
  // 修改状态
  HetGNNShow = state[0]
  KGATShow = state[1]
  NIRecShow = state[2]

  let jsonData = new Object()

  console.log(userId)
  let arr1 = []
  let arr2 = []
  let arr3 = []
  let Coodinare = new Array()

  if (HetGNNShow == true){
    arr1 = Info.HetGNN[userId].rec_result;
    Coodinare.push(Info.HetGNN[userId]);
  } else Coodinare.push([]);

  if (KGATShow == true){
    arr2 = Info.KGAT[userId].rec_result;
    Coodinare.push(Info.KGAT[userId])
  } else Coodinare.push([]);

  if (NIRecShow == true){
    arr3 = Info.NIRec[userId].rec_result;
    Coodinare.push(Info.NIRec[userId])
  } else Coodinare.push([]);


  jsonData.Coodinare = Coodinare
  jsonData.Vennresult = GetVennResult(arr1, arr2, arr3,userId)
  jsonData.Word = getUserInfo(userId)

  //回传数据
  res.json(jsonData)
});

router.post('/selectedMovie', (req, res) => {
  let userId = parseInt(req.body.data[0].replace("u", ""))
  let movieId = parseInt(req.body.data[1].split('_')[0])
  let movie_or = req.body.data[1].split('_')[1]
  var jsonData = new Object()
  let forceData;
  console.log(userId, movieId, movie_or)
  let static = getRecMovieStatic(userId,movieId)
  switch (movie_or) {
    case 'H':
      forceData = {HetGNN:getHetGNNatt(userId, movieId)}; //调用HetGNN推荐原因
      break;
    case 'K':
      forceData = {KGAT:getKGATatt(userId, movieId)}; //调用KGAT推荐原因
      break;
    case 'N':
      forceData = {NIRec:getNIRecatt(userId, movieId)}; //调用NIRec推荐原因
      break;
    case 'HK':
      forceData = {HetGNN:getHetGNNatt(userId, movieId),KGAT:getKGATatt(userId, movieId)}; //调用HetGNN KGAT推荐原因
      break;
    case 'HN':
      forceData = {HetGNN:getHetGNNatt(userId, movieId),NIRec:getNIRecatt(userId, movieId)}; //调用HetGNN NIRec推荐原因
      break;
    case 'KN':
      forceData = {KGAT:getKGATatt(userId, movieId),NIRec:getNIRecatt(userId, movieId)}; //调用KGAT NIRec推荐原因
      break;
    default:
      forceData = {HetGNN:getHetGNNatt(userId, movieId),KGAT:getKGATatt(userId, movieId),NIRec:getNIRecatt(userId, movieId)}; //调用HetGNN KGAT NIRec推荐原因
  }
  jsonData.forceData = forceData
  jsonData.movieInfo = Info.movieInfo[movieId]
  jsonData.static = static
  jsonData.model = movie_or


  res.json(jsonData)
});
module.exports = router;


//操作对象