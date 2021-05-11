const fs = require('fs');



class doubanInfo {
    actorInfo = new Array()
    directorInfo = new Array();
    genreInfo = new Array();
    movieInfo = new Array();
    KGAT_att = new Array(9625);
    userInfo = new Array(9625);

    KGAT = new Array();
    HetGNN = new Array();
    NIRec = new Array();

    Ainfo_f = fs.readFileSync('./data/演员顺序.csv', 'utf-8').split('\n');
    DInfo_f = fs.readFileSync('./data/导演顺序.csv', 'utf-8').split('\n');
    Ginfo_f = fs.readFileSync('./data/类型顺序.csv', 'utf-8').split('\n');
    movieInfo_f = fs.readFileSync('./data/raw_movieinfo.txt', 'utf-8').split('\n');  //电影信息数据
    userInfo_f = fs.readFileSync('./data/userWacthed.txt', 'utf-8').split('\n');  //用户观影历史统计数据
    KGAT_f = fs.readFileSync('./data/KGAT_rec_result.txt', 'utf-8').split('\n');
    HetGNN_f = fs.readFileSync('./data/HetGNN_rec_result.txt', 'utf-8').split('\n');
    NIRec_f = fs.readFileSync('./data/NIRec_rec_result.txt', 'utf-8').split('\n');
    user_rec_static = JSON.parse(fs.readFileSync('./data/user_rec_static.json', 'utf-8'));

    initialize() {
        this.getQueueInfo(this.Ainfo_f, this.actorInfo)
        this.getQueueInfo(this.DInfo_f, this.directorInfo)
        this.getQueueInfo(this.Ginfo_f, this.genreInfo)
        this.loadMovieInfo(this.movieInfo_f, this.movieInfo)
        this.loadUserInfo(this.userInfo_f, this.userInfo)
        this.AnalyzeDdata(this.KGAT_f, this.KGAT)
        this.AnalyzeDdata(this.HetGNN_f, this.HetGNN)
        this.AnalyzeDdata(this.NIRec_f, this.NIRec)
    }
    getQueueInfo(data, arr) {
        data.forEach(element => {
            arr.push(element)
        });
    }
    loadMovieInfo(data, array) {
        data.forEach(element => {
            try {
                let line = element.split(',')
                if (line[0] == '') {
                    throw new Error('不能为空！')
                }
                let object = new Object
                object.movieId = 'movie' + line[0]
                object.movieName = line[1]
                object.movieDirector = line[2]
                object.movieActor = line[3]
                object.movieGenre = line[4]
                object.movieTime = line[5]
                object.movieTags = line[6]
                object.movieStar = line[7]
                object.movieRate = parseFloat(line[8])
                object.movieSim = line[9].split(' ').map(Number)
                object.movieDoubanID = line[10]
                object.moviePhoto = line[11].replace("https","http")
                object.movieUser = parseInt(line[12].replace("\r", ""))
                array.push(object)
            } catch (err) {
                console.log()
            }
        });
    }
    loadKGATAtt(data, array) {
        console.log('ok')
        data.forEach((element) => {
            try {
                if (element == '') {
                    throw new Error('不能为空！')
                }
                let path = element.split(':')[0].split('-')
                let node = (element.split(':')[1]).split('-').map(Number)

                let p = {}
                if (Object.keys(array[node[0]]).includes(node[3] + '') == false) {
                    array[node[0]][node[3]] = []
                }
                if (path[2] == 'user') {
                    p = { 'm': node[1], 'u': node[2] }
                }
                else if (path[2] == 'actor') {
                    p = { 'm': node[1], 'a': node[2] }
                }
                else if (path[2] == 'director') {
                    p = { 'm': node[1], 'd': node[2] }
                }
                else if (path[2] == 'genre') {
                    p = { 'm': node[1], 'g': node[2] }
                }
                array[node[0]][node[3]].push(p)
            } catch (err) {
                console.log()
            }
        })
        console.log('end')
    }
    loadUserInfo(data, array) {
        data.forEach((element, index) => {
            try {
                let line = element.split('|')
                array[index] = new Array(2)
                array[index][0] = line[0]
                array[index][1] = line[1]
            } catch (err) {
                console.log()
            }
        })
    }
    AnalyzeDdata(data, array) {
        data.forEach((element, index) => {
            try {
                let line = element.split(',')
                if (line[0] == '') {
                    throw new Error('不能为空！')
                }
                let object = new Object()
                object.userId = 'user' + (parseInt(line[0])-1)
                object.rec_result = line[1].split(' ').map(Number)
                object.recall = parseFloat(line[2])
                object.pre = parseFloat(line[3])
                object.auc = parseFloat(line[4])
                object.personal = 1 - parseFloat(line[5])

                array.push(object)
            } catch (err) {
                console.log()
            }
        })
    }
}
module.exports = doubanInfo;