const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const DBHelper = require('../utils/DBHelper');
const async = require('async')
const _ = require('lodash');
// Asynchronous read



var KGAT = new Array()
var HetGNN = new Array()
var movieInfo = new Array()

var KGAT_f = fs.readFileSync('./data/KGAT_rec_result2.txt', 'utf-8').split('\n');
var HetGNN_f = fs.readFileSync('./data/HetGNN_rec_result.txt', 'utf-8').split('\n');
var movieInfo_f = fs.readFileSync('./data/raw_movieinfo.txt', 'utf-8').split('\n');

AnalyzeDdata(KGAT_f, KGAT)
AnalyzeDdata(HetGNN_f, HetGNN)
loadMovieInfo(movieInfo_f, movieInfo)

function loadMovieInfo(data, array) {
  data.forEach(element => {
    try {
      let line = element.split(',')
      if(line[0] == ''){
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
    object.precision = parseFloat(line[3])
    object.auc = parseFloat(line[4])
    object.personal = 1 - parseFloat(line[5])

    array.push(object)
  }
}

function GetVennResult(arr1,arr2,arr3){
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

  // console.log(Part1, Part2, Part3, Part12, Part13, Part23, Part123)
}
var KGATShow = true
var HetGNNShow = true
var NIRecShow = false
// 查询用户
router.post('/selectUser', (req, res) => {
  let userId = parseInt(req.body.data.replace("u", ""))
  var jsonData = new Object()

  var Coodinare = new Array()
  var Venn = new Array()

  if (KGATShow == true){
    let result = []
    KGAT[userId].rec_result.forEach(element => {
      result.push(movieInfo[element].movieName)
      
    })
    KGAT[userId].rec_result = result
  }

  if (HetGNNShow == true) {
    let result = []
    HetGNN[userId].rec_result.forEach(element => {
      result.push(movieInfo[element].movieName)
    })
    HetGNN[userId].rec_result = result
  }
  let arr1 = HetGNN[userId].rec_result
  let arr2 = KGAT[userId].rec_result
  let arr3 = []

  Coodinare.push(HetGNN[userId])
  Coodinare.push(KGAT[userId])

  jsonData.Coodinare = Coodinare

  res.json(jsonData)
});

module.exports = router;


//操作对象