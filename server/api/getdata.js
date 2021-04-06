const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const DBHelper = require('../utils/DBHelper');
const async = require('async')
const _ = require('lodash');
// Asynchronous read


// 查询用户
var KGAT = new Array()
var HetGNN = new Array()

var KGAT_f = fs.readFileSync('./data/KGAT_rec_result2.txt', 'utf-8').split('\n');
var HetGNN_f = fs.readFileSync('./data/HetGNN_rec_result.txt', 'utf-8').split('\n');

AnalyzeDdata(KGAT_f, KGAT)
AnalyzeDdata(HetGNN_f, HetGNN)
function AnalyzeDdata(data, object) {
  for (i = 0; i < data.length - 1; i++) {
    let line = data[i].split(',')
    let test = new Object()

    test.userId = 'user' + line[0]
    test.rec_result = line[1].replace("[", "").replace("]", "").split(' ').map(Number)
    test.recall = parseFloat(line[2])
    test.precision = parseFloat(line[3])
    test.auc = parseFloat(line[4])
    test.personal = 1 - parseFloat(line[5])

    object.push(test)
  }
}
router.post('/selectUser', (req, res) => {
  let userId = parseInt(req.body.data.replace("u", ""))
  var test1 = new Array()
  
  test1.push(KGAT[userId])
  test1.push(HetGNN[userId])
  res.json(test1)
});

module.exports = router;


//操作对象