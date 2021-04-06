const express = require('express');
const router = express.Router();
const fs=require('fs');
const path = require('path'); 
const DBHelper = require('../utils/DBHelper');
const async = require('async')
const  _  = require('lodash');
// Asynchronous read


// 查询用户
var KGAT = new Array()
var KGAT_f = fs.readFileSync('./data/KGAT_rec_result2.txt', 'utf-8').split('\n');

AnalyzeDdata(KGAT_f, KGAT)

function AnalyzeDdata(data,object){
    for (i = 0; i < data.length - 1 ; i++) {
        let line = data[i].split(',')
        let uId = line[0]
        let rec_result = line[1].replace("[", "").replace("]", "").split(' ').map(Number)
        let recall = parseFloat(line[2])
        let precision = parseFloat(line[3])
        let auc = parseFloat(line[4])
        let personal = parseFloat(line[5])
        let test = new Object()
        test.userId = 'user' + uId
        test.rec_result = rec_result
        test.recall = recall
        test.precision = precision
        test.auc = auc
        test.personal = personal

        object.push(test)
    }
}
router.post('/selectUser', (req, res) => {
    let userId = parseInt(req.body.data.replace("u",""))
    console.log(userId)
    res.json(KGAT)
});

module.exports = router;


//操作对象