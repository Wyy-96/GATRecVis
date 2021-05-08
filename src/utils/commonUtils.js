// 常用工具类

import moment from 'moment'

const commonUtils = {
  // 判空
  isNull: function (obj) {
    if (obj == null || typeof (obj) == "undefined" || obj.toString() == "" || obj.toString() == "null" || obj.toString() == "NaN" || obj.toString() == "undefined") {
      return true;
    }
    return false;
  },
  // 判断邮箱格式是否正确
  isEmail: function(email){
    let regex = /^\s*\w+(?:\.{0,1}[\w-]+)*@[a-zA-Z0-9]+(?:[-.][a-zA-Z0-9]+)*\.[a-zA-Z]+\s*$/;
    return regex.test(email);
  },
  //去左空格;
  ltrim:function(s){
    return s.replace(/(^\s*)/g, "");
  },
  //去右空格;
  rtrim:function(s){
    return s.replace(/(\s*$)/g, "");
  },
  //去左右空格;
  trim:function(s){
    return s.replace(/(^\s*)|(\s*$)/g, "");
  },
  // 获取get请求url后的参数
  getQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return decodeURI(r[2]); return null;
  },
  
  //深拷贝对象
  deepCopy:function(obj){
    // 根据obj的类型判断是新建一个数组还是对象
    let newObj = Array.isArray(obj)? [] : {};
    // 判断传入的obj存在，且类型为对象
    if (obj && typeof obj === 'object') {
      for(let key in obj) {
        // 如果obj的子元素是对象，则进行递归操作
        if(obj[key] && typeof obj[key] ==='object') {
          newObj[key] = commonUtils.deepCopy(obj[key])
        } else {
        // // 如果obj的子元素不是对象，则直接赋值
          newObj[key] = obj[key]
        }
      }
    }
    return newObj // 返回新对象
  },
  //判断内核
  isUserAgent:function(name){
    var b = {//判断浏览器内核
      v: function () {
        var u = navigator.userAgent //, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
          trident: u.indexOf('Trident') > -1, //IE内核
          presto: u.indexOf('Presto') > -1, //opera内核
          webKit: u.indexOf('AppleWebKit') > -1, //苹果内核
          chrome: u.indexOf("chrome") > -1, //谷歌内核
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
          mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
          iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
          iPad: u.indexOf('iPad') > -1, //是否iPad
          webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
          wx: u.indexOf("MicroMessenger") > 0 //是否是微信
        };
      }(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    return b.v[name]
  },
  //通过地址加载Image对象 回调方法
  loadImg: async function(src){
    return new Promise(function(resolve,reject){
      let img=new Image();
      img.src=src;
      img.onload=function(){
        resolve(img);
      }
      img.onerror=function(){
        reject(img)
      }
    })
  },
  //文件加载 回调方法
  fileReader:async function(file){
    return new Promise(function(resolve,reject){
      //文件读取
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file); //根据图片路径读取图片
      fileReader.onload=function(){
        resolve(fileReader);
      }
      fileReader.onerror=function(){
        reject(fileReader)
      }
    })
  },
  //返回时间差
  timePast(time1, time2){
    moment.locale("zh-cn")
    time1=moment(time1);
    time2=moment(time2);
    return time1.from(time2);
  },
  // 获取上一个交易日
  getYesterday:function(){
    if(moment().day()==0){ //周日
      return moment().day(-2).format("YYYY-MM-DD");
    }
    if(moment().day()==6){ //周六
      return moment().day(5).format("YYYY-MM-DD");
    }
    if(moment().hour()>16){
      return moment().format("YYYY-MM-DD");
    }else if(moment().day()==1){
      return moment().day(-2).format("YYYY-MM-DD");
    }else{
      return moment().subtract(1, 'days').format("YYYY-MM-DD");
    }
  },
  // 获取周几
  getWeekDay:function(date){
    switch(moment(date).day()){
      case 0 :
        return '星期日'
      case 1 :
        return '星期一'
      case 2 :
        return '星期二'
      case 3 :
        return '星期三'
      case 4 :
        return '星期四'
      case 5 :
        return '星期五'
      case 6 :
        return '星期六'
    }
    return ''
  },
  // 格式化数字 加逗号 和 小数位Decimal places
  formatNum(num,dp){
    if(this.isNull(num)){return ''}
    let numStr = Math.abs(parseInt(num)).toString();
    let result='';
    // 处理整数
    while (numStr.length>3){
      result=','+numStr.slice(-3)+result;
      numStr = numStr.slice(0, numStr.length - 3);
    }
    if(numStr){result = numStr + result;}
    if(num<0){result = '-'+result }
    if(this.isNull(dp)){
      // 保留原有小数
      this.isNull(num.toString().split('.')[1])?result:result+=('.'+num.toString().split('.')[1])
      return result
    }
    // 处理小数
    return result+'.'+num.toFixed(dp).toString().split('.')[1];
  }
}

export default commonUtils

