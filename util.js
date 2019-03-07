/**
 * [时间戳转换]
 * timsta:时间戳
 * type：需要输出的格式
 *
 */
import config from "../config/config.js";
const formatePhpTime = (timsta, type) => {
  let date = new Date(timsta * 1000); //获取一个时间对象  注意：如果是uinx时间戳记得乘于1000。比如php函数time()获得的时间戳就要乘于1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  let newTime = '';
  switch (type) {
    case 'YYYY-MM-DD':
      newTime = Y + M + D;
      break;
    case 'YYYY-MM-DD h:m':
      newTime = Y + M + D + h + m;
      break;
    case 'YYYY-MM-DD h:m:s':
      newTime = Y + M + D + h + m + s;
      break;
  }
  return newTime;
};

/**
 * [formatMoney 格式化金钱]
 */
const formatMoney = (val) => {
  if (val !== "") {
    return Number(val / 100).toFixed(2);
  } else {
    return "0.00";
  }
}

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 分转元 保留两位小数 600.00
 */
const formatF2Y = y => {
  return (y / 100).toFixed(2);
}

/**
 * 处理“{}”的高亮
 */
const getHighLightArray = str => {
  let strArr = [];
  if (str.indexOf("{") == -1) { //不包含大括号
    strArr.push({
      key: false,
      text: str
    })
  } else {
    if (str.indexOf("{") == 0) { //高亮开头
      let highLight = str.substring(str.indexOf("{") + 1, str.indexOf("}"));
      let def = str.substring(str.indexOf("}") + 1);
      strArr.push({
        key: true,
        text: highLight
      });
      strArr.push({
        key: false,
        text: def
      });
    } else if (str.indexOf("}") == str.length - 1) { //高亮结尾
      let highLight = str.substring(str.indexOf("{") + 1, str.indexOf("}") - 1);
      let def = str.substring(0, str.indexOf("{"));
      strArr.push({
        key: false,
        text: def
      });
      strArr.push({
        key: true,
        text: highLight
      });
    } else { //中间高亮
      let def2 = str.substring(str.indexOf("}") + 1);
      let highLight = str.substring(str.indexOf("{") + 1, str.indexOf("}"));
      let def = str.substring(0, str.indexOf("{"));
      strArr.push({
        key: false,
        text: def
      });
      strArr.push({
        key: true,
        text: highLight
      });
      strArr.push({
        key: false,
        text: def2
      });
    }
  }
  return strArr;
}

/**
 * h5公共参数
 */
const getUrlBaseQuery = url => {
  if (url.indexOf("?") == -1) {
    url += "?";
  } else {
    url += "&";
  }
  if (url.indexOf("appid=") == -1) {
    url += "appid=" + config.HZAPPID;
  } else {
    url += "minix=0"; //占位
  }
  if (url.indexOf("channel=") == -1) {
    url += "&channel=" + config.CHANNEL;
  }
  if (url.indexOf("site_id=") == -1) {
    url += "&site_id=" + wx.getStorageSync("site_id");
  }
  let isLogin = wx.getStorageSync("isHzLogin")
  if (isLogin) {
    let user = wx.getStorageSync("hzUserInfo")
    if (url.indexOf("mobile=") == -1) {
      url += "&mobile=" + user.mobile;
    }
    if (url.indexOf("user_id=") == -1) {
      url += "&user_id=" + user.user_id;
    }
  }
  if (url.indexOf("login=") == -1) {
    url += "&login=" + (isLogin ? "1" : "0");
  }
  if (url.indexOf("rel=") == -1) {
    url += "&rel=mini";
  }
  return url;
}

const getTimestamp = (date) => {
  let dateStr = date.substring(0, 19);
  dateStr = dateStr.replace(/-/g, '/');
  let msTime = new Date(dateStr).getTime();
  return msTime / 1000;
}

/**
 * 截取字符串  多余的用...代替
 */
const formatStr = (str, length) => {
  if (!str) {
    return "";
  }
  if (str.length <= length) {
    return str;
  } else {
    return str.substring(0, length) + "...";
  }
}
const formatSeconds = (secends) => {
  let minutes = parseInt(secends / 60);
  let second = secends % 60;
  let hours = parseInt(minutes / 60);
  let leftMinutes = minutes & 60;

  let h = hours < 10 ? '0' + hours : hours;
  let m = leftMinutes < 10 ? '0' + leftMinutes : leftMinutes;
  let s = second < 10 ? '0' + second : second;
  return `${h}:${m}:${s}`
}
//获取上一天时间
const getYesterday=()=>{
  let nowTimestamp = new Date().getTime();
  let yesterdayTimestamp = nowTimestamp - 24*60*60*1000;
  return formatePhpTime(yesterdayTimestamp / 1000,"YYYY-MM-DD")
}


/**判断是否是手机号**/
const isPhoneNumber = (tel) => {
  var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
  return reg.test(tel);
}

module.exports = {
  formatTime: formatTime,
  formatePhpTime: formatePhpTime,
  formatMoney: formatMoney,
  formatF2Y: formatF2Y,
  getHighLightArray: getHighLightArray,
  getUrlBaseQuery: getUrlBaseQuery,
  getTimestamp: getTimestamp,
  formatStr: formatStr,
  formatSeconds: formatSeconds,
  isPhoneNumber: isPhoneNumber,
  getYesterday: getYesterday
}