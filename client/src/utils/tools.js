// session保存obj
export function sessionSetObj(key, value) {
  if (!value) {
    let obj = {};
    window.sessionStorage.setItem(key, JSON.stringify(obj));
  }
  window.sessionStorage.setItem(key, JSON.stringify(value));
}

// session获取 obj
export function sessionGetObj(key) {
  let sessionItem = window.sessionStorage.getItem(key);
  if (sessionItem) {
    if (sessionItem === '') {
      return {}
    }
    return JSON.parse(sessionItem || '{}');
  } else {
    return {}
  }
}

// 日期时间字符串
export function dateFormatTransform(date) {
  if(typeof date != 'object') {
    date = new Date(date)
  }
  var yy = date.getFullYear(); //年
  var mm = date.getMonth() + 1; //月
  var dd = date.getDate(); //日
  if (mm < 10) {
    mm = "0" + mm
  }
  if (dd < 10) {
    dd = "0" + dd
  }
  return yy + '-' + mm + '-' + dd;
}

// 毫秒转时间字符串
export function dateFormatAllTime(date) {
  date = new Date(Number(date))
  var yy = date.getFullYear(); //年
  var MM = date.getMonth() + 1; //月
  var dd = date.getDate(); //日
  var HH = date.getHours(); // 时
  var mm = date.getMinutes(); // 分
  var ss = date.getSeconds(); // 秒
  if (MM < 10) {
    MM = "0" + MM
  }
  if (dd < 10) {
    dd = "0" + dd
  }
  if (HH < 10) {
    HH = "0" + HH
  }
  if (mm < 10) {
    mm = "0" + mm
  }
  if (ss < 10) {
    ss = "0" + ss
  }
  return yy + '-' + MM + '-' + dd + ' ' + HH + ':' + mm + ':' + ss;
}

// 图表时间字符串
export function timeFormatTransform(time) {
  var totalMin = time * 60;
  var min = totalMin % 60;
  var hour = parseInt(time);
  var zeroStr = '0';
  var hourStr = '';
  var minStr = '';
  if (hour === 0) {
    hourStr = '00'
  } else if (hour < 10) {
    hourStr = zeroStr + hour
  } else {
    hourStr = hour.toString();
  }
  min = Math.ceil(min);
  if (min === 0) {
    minStr = '00'
  } else if (min < 10) {
    minStr = zeroStr + min
  } else {
    minStr = min.toString();
  }
  return hourStr + ':' + minStr;
}