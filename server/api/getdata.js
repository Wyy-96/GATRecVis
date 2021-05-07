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
console.log("test",Info.userInfo[0][0])

let KGAT = new Array()
let HetGNN = new Array()
const movieInfo = new Array()

var KGAT_f = fs.readFileSync('./data/KGATrec_result.txt', 'utf-8').split('\n');
var HetGNN_f = fs.readFileSync('./data/HetGNN_rec_result.txt', 'utf-8').split('\n');
var movieInfo_f = fs.readFileSync('./data/raw_movieinfo.txt', 'utf-8').split('\n');

AnalyzeDdata(KGAT_f, KGAT)
AnalyzeDdata(HetGNN_f, HetGNN)
loadMovieInfo(movieInfo_f, movieInfo)

function loadMovieInfo(data, array) {
  data.forEach(element => {
    try {
      let line = element.split(',')
      if (line[0] == '') {
        throw new Error('不能为空！')
      }
      let object = new Object
      object.movieId = 'movie' + line[0]
      object.movieName = line[1]
      object.movieDirector = line[2].split('|')
      object.movieActor = line[3].split('|')
      object.movieGenre = line[4].split('|')
      object.movieTime = line[5]
      object.movieTags = line[6].split('|')
      object.movieStar = line[7]
      object.movieRate = parseFloat(line[8])
      object.movieSim = line[9].split(' ').map(Number)
      object.movieDoubanID = line[10]
      object.moviePhoto = line[11]
      array.push(object)
    } catch (err) {

    }
  });
}

function AnalyzeDdata(data, array) {
  for (i = 0; i < data.length - 1; i++) {
    let line = data[i].split(',')
    let object = new Object()

    object.userId = 'user' + line[0]
    object.rec_result = line[1].replace("[", "").replace("]", "").split(' ').map(Number)
    object.recall = parseFloat(line[2])
    object.pre = parseFloat(line[3])
    object.auc = parseFloat(line[4])
    object.personal = 1 - parseFloat(line[5])

    array.push(object)
  }
}

function GetVennResult(arr1, arr2, arr3) {
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
  ALL_part.He = GetMovieName(Part1)
  ALL_part.KG = GetMovieName(Part2)
  ALL_part.NI = GetMovieName(Part3)
  ALL_part.HeKG = GetMovieName(Part12)
  ALL_part.HeNI = GetMovieName(Part13)
  ALL_part.KGNI = GetMovieName(Part23)
  ALL_part.HeKGNI = GetMovieName(Part123)

  return ALL_part
}

function GetMovieName(data) {
  let temp_array = new Array()
  data.forEach((element) => {
    let temp_object = {}
    temp_object.movieId = element
    temp_object.movieName = Info.movieInfo[element].movieName
    temp_array.push(temp_object)
  })
  return temp_array
}

function KGATRecResult(userId, movieId) {
  let jsonData = new Object()
  if (Object.keys(Info.KGAT_att[userId]).includes(movieId + '') == true) {
    console.log('存在')
    let data = Info.KGAT_att[userId][movieId + '']
    let movieName = Info.movieInfo[movieId].movieName
    var nodes = []
    var tempNodes = []
    var links = []

    nodes.push({ id: 'user' + userId, group: 6 })
    nodes.push({ id: movieName, group: 7 })
    tempNodes.push('user' + userId)
    tempNodes.push(movieName)

    data.forEach((element) => {
      let key = Object.keys(element)
      let name1 = ''
      let name2 = ''
      for (i in key) {
        if (key[i] == 'm') {
          name1 = Info.movieInfo[element[key[i]]].movieName
          links.push({ source: name1, target: 'user' + userId, value: 1 })
          if (tempNodes.includes(name1) == false) {
            nodes.push({ id: name1, group: 2 })
            tempNodes.push(name1)
          }

        }
        else if (key[i] == 'u') {
          name2 = 'user' + element[key[i]]
          links.push({ source: name2, target: name1, value: 1 })
          links.push({ source: movieName, target: name2, value: 1 })
          if (tempNodes.includes(name2) == false) {
            nodes.push({ id: name2, group: 1 })
            tempNodes.push(name2)
          }

        }
        else if (key[i] == 'a') {
          name2 = Info.actorInfo[element[key[i]]]
          links.push({ source: name2, target: name1, value: 1 })
          links.push({ source: movieName, target: name2, value: 1 })
          if (tempNodes.includes(name2) == false) {
            nodes.push({ id: name2, group: 3 })
            tempNodes.push(name2)
          }
        }
        else if (key[i] == 'd') {
          name2 = Info.directorInfo[element[key[i]]]
          links.push({ source: name2, target: name1, value: 1 })
          links.push({ source: movieName, target: name2, value: 1 })
          if (tempNodes.includes(name2) == false) {
            nodes.push({ id: name2, group: 4 })
            tempNodes.push(name2)
          }
        }
        else if (key[i] == 'g') {
          name2 = Info.genreInfo[element[key[i]]]
          links.push({ source: name2, target: name1, value: 1 })
          links.push({ source: movieName, target: name2, value: 1 })
          if (tempNodes.includes(name2) == false) {
            nodes.push({ id: name2, group: 5 })
            tempNodes.push(name2)
          }
        }
      }
    })
  }
  jsonData['nodes'] = nodes
  jsonData['links'] = links
  return jsonData
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

function remove(arr,item){
  console.log(arr)
  let index = arr.indexOf(item)
  if( index >-1)
    arr.splice(index,1)
  return arr
}

function counts_num(arr,value){
  return arr.reduce((a, v) => v === value ? a + 1 : a + 0, 0)
}
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
        jsonforce['nodes'].push({ id: 'm' + element, value: 6, type: 'movie' })
        jsonforce['links'].push({ source: 'm'+element, target: 'a'+el, value: 1 })
        jsonforce['links'].push({ source: 'a' +el, target: 'm' + movieId, value: 1 })
        jsonforce['nodes'].push({ id: 'a' + el, value: 6, type: 'actor' })
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
        jsonforce['nodes'].push({ id: 'u' + el, value: 6, type: 'user' })
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
function getUserInfo(userId){

}
var NIRecShow = false
var KGATShow = true
var HetGNNShow = true
// 查询用户
router.post('/selectUser', (req, res) => {
  let userId = parseInt(req.body.data.replace("u", ""))
  var jsonData = new Object()

  var Coodinare = new Array()
  var Venn = new Array()

  let arr1 = []
  let arr2 = []
  let arr3 = [210, 325, 1486, 1582, 808, 1578, 1589, 991, 561, 627, 502, 580, 1309, 1067, 787, 804, 1163, 1163, 1011, 1145]

  if (KGATShow == true) arr2 = KGAT[userId].rec_result;
  if (HetGNNShow == true) arr1 = HetGNN[userId].rec_result;

  let Vennresult = GetVennResult(arr1, arr2, arr3)
  Coodinare.push(HetGNN[userId])
  Coodinare.push(KGAT[userId])
  Coodinare.push({
    "userId": "user23",
    "rec_result": [
      1197,
      1120,
      1164,
      1052,
      1148,
      1201,
      874,
      924,
      1182,
      1071,
      1068,
      1104,
      1044,
      1113,
      1112,
      1238,
      1122,
      906,
      1210,
      1142
    ],
    "recall": 0.0222,
    "precision": 0.1,
    "auc": 0.766,
    "personal": 0.42379999999999995
  })

  jsonData.Coodinare = Coodinare
  jsonData.Vennresult = Vennresult

  res.json(jsonData)
});

router.post('/selectedMovie', (req, res) => {
  let userId = parseInt(req.body.data[0].replace("u", ""))
  let movieId = parseInt(req.body.data[1].split('_')[0])
  let movie_or = req.body.data[1].split('_')[1]
  var jsonData = new Object()

  console.log(userId, movieId, movie_or)
  switch (movie_or) {
    case 'H':
      x = "今天是星期一"; //调用HetGNN推荐原因
      break;
    case 'K':
      jsonData = getKGATatt(userId, movieId); //调用KGAT推荐原因
      break;
    case 'HK':
      x = "今天是星期三"; //调用HetGNN 和 KGAT 重合的推荐原因
      break;
    default:
      x = "今天是星期日";
  }




  res.json(jsonData)
});
module.exports = router;


//操作对象