const fs = require('fs');



class doubanInfo {
    actorInfo = new Array();
    directorInfo = new Array();
    genreInfo = new Array();
    movieInfo = new Array();
    KGAT_att = new Array(9625);

    Ainfo_f = fs.readFileSync('./data/演员顺序.csv', 'utf-8').split('\n');
    DInfo_f = fs.readFileSync('./data/导演顺序.csv', 'utf-8').split('\n');
    Ginfo_f = fs.readFileSync('./data/类型顺序.csv', 'utf-8').split('\n');
    movieInfo_f = fs.readFileSync('./data/raw_movieinfo.txt', 'utf-8').split('\n');

    initialize() {
        this.getQueueInfo(this.Ainfo_f, this.actorInfo)
        this.getQueueInfo(this.DInfo_f, this.directorInfo)
        this.getQueueInfo(this.Ginfo_f, this.genreInfo)
        this.loadMovieInfo(this.movieInfo_f, this.movieInfo)
    };
    getQueueInfo(data, arr) {
        data.forEach(element => {
            arr.push(element)
        });
    };
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
    };
    loadKGATAtt(data,array){
        console.log('ok')
        data.forEach((element)=>{
            try{
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
            }catch(err){

            }
        })
        console.log('end')
    }   
}
// let test = new doubanInfo()
// test.initialize()
// console.log(test.AttentionInfo_f['user'][0][0])
module.exports = doubanInfo;