// 获取链接参数
export const getUrlParam = function (name) {
  return decodeURIComponent((
    new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)')
      .exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
}
export const formatTwoDecimals = function (num) {
  // 补零
  num = parseFloat(num)
  let temp = num.toFixed(3)
  temp = temp.match( /([0-9]+\.[0-9]{2})[0-9]*/)[1]
  return temp
}
// 根据Id 获取名字
export const getNameByIds = function (contacts, ids) {
  if (ids instanceof Array) {

  } else {
    ids = ids.split(',')
  }
  var tempArr = []
  contacts.forEach(function (contactObj) {
    ids.forEach(function (id) {
      if (parseInt(id) === contactObj.id) {
        tempArr.push(contactObj.name)
      }
    })
  })
  return tempArr.join('、')
}
// 判断对象 是否为空
export const isEmptyObject = function (obj) {
  let t
  for (t in obj) {
    return !1
  }
  return !0
}
/**
 * 千分符
 */
export const fmoney = function(s, n){
  let flag = n;
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
  var l = s.split('.') [0].split('').reverse(),
    r = s.split('.') [1];
  var t = '';
  for (var i = 0; i < l.length; i++)
  {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
  }
  if(flag === 0){
    return t.split('').reverse().join('');
  }else{
    return t.split('').reverse().join('') + '.' + r;
  }

}

/***
 * 获得当前时间
 */
export const getCurrentDate = function () {
  return new Date();
}
/***
 * 获得指定日期时间范围
 */
export const getRangeEachDate = function (start, stop){
  //起止日期数组
  var startDate = new Date(start)
  var stopDate = new Date(stop)
  var startStop=new Array();
  //一天的毫秒数
  var millisecond=1000*60*60*24;
  // 结束时间 开始时间 之间 天数
  var diffDays = (stopDate.getTime() - startDate.getTime()) / millisecond
  if (diffDays === 0) {
    startStop.push(formatDateMMDD(startDate))
  } else {
    for (var i=0; i < diffDays; i++) {
      var nextDay = formatDateMMDD(new Date(startDate.getTime() + millisecond * i))
      startStop.push(nextDay)
    }
  }
  // 判断开始时间 结束时间 是否相同
  if (start !== stop) {
    startStop.push(formatDateMMDD(stopDate))
  }
  //返回
  return startStop;
}
/***
 * 获得明天时间
 */
export const getTomorrowDate = function (){
  //起止日期数组
  var startStop=new Array();
  //获取当前时间
  var currentDay= getCurrentDate();
  //一天的毫秒数
  var millisecond=1000*60*60*24;
  //昨日时间
  var tomorrow = new Date(currentDay.getTime() + millisecond)
  currentDay = formatDate(currentDay)
  tomorrow = formatDate(tomorrow)
  //添加今天时间
  startStop.push(currentDay);//今天终止时间
  //添加本周时间
  startStop.push(tomorrow);//明天起始时间
  //返回
  return startStop;
}
/***
 * 获得昨天时间
 */
export const getYesterdayDate = function (){
  //起止日期数组
  var startStop=new Array();
  //获取当前时间
  var currentDay=getCurrentDate();
  //一天的毫秒数
  var millisecond=1000*60*60*24;
  //昨日时间
  var yesterday = new Date(currentDay.getTime()-millisecond);
  currentDay = formatDate(currentDay)
  yesterday = formatDate(yesterday)
  //添加本周时间
  startStop.push(yesterday);//昨日起始时间
  //添加本周最后一天时间
  startStop.push(yesterday);//今天终止时间
  //返回
  return startStop;
}
/***
 * 获得本周起止时间
 */
export const getCurrentWeek = function () {
  //起止日期数组
  var startStop = new Array();
  //获取当前时间
  var currentDate = getCurrentDate();
  //返回date是一周中的某一天
  var week = currentDate.getDay();
  //返回date是一个月中的某一天
  var month = currentDate.getDate();

  //一天的毫秒数
  var millisecond = 1000 * 60 * 60 * 24;
  //减去的天数
  var minusDay = week !== 0 ? week - 1 : 6;
  //本周 周一
  var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
  //本周 周日
  var sunday = new Date(monday.getTime() + (6 * millisecond));
  monday = formatDate(monday)
  sunday = formatDate(sunday)
  //添加本周时间
  startStop.push(monday);//本周起始时间
  //添加本周最后一天时间
  startStop.push(sunday);//本周终止时间
  //返回
  return startStop;
}
/***
 * 获得本月的起止时间
 */
export const getCurrentMonth = function () {
  //起止日期数组
  var startStop = new Array();
  //获取当前时间
  var currentDate = getCurrentDate();
  //获得当前月份0-11
  var currentMonth = currentDate.getMonth();
  //获得当前年份4位年
  var currentYear = currentDate.getFullYear();
  //求出本月第一天
  var firstDay = new Date(currentYear, currentMonth, 1);
  //当为12月的时候年份需要加1
  //月份需要更新为0 也就是下一年的第一个月
  if (currentMonth === 11) {
    currentYear++;
    currentMonth = 0;//就为
  } else {
    //否则只是月份增加,以便求的下一月的第一天
    currentMonth++;
  }
  //一天的毫秒数
  var millisecond = 1000 * 60 * 60 * 24;
  //下月的第一天
  var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
  //求出上月的最后一天
  var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);
  firstDay = formatDate(firstDay);
  lastDay = formatDate(lastDay);
  //添加至数组中返回
  startStop.push(firstDay);
  startStop.push(lastDay);
  //返回
  return startStop;
};

/***
 * 获得近30天时间
 */
export const getLastThirtyDaysDate = function (){
  //起止日期数组
  var startStop=new Array();
  //获取当前时间
  var currentDay= getCurrentDate();
  //三十天的毫秒数
  var millisecond=1000*60*60*24*29;
  //三十天时间
  var lastThirtyDays = new Date(currentDay.getTime()-millisecond);
  currentDay = formatDate(currentDay)
  lastThirtyDays = formatDate(lastThirtyDays)
  //添加本周时间
  startStop.push(lastThirtyDays);//本周起始时间
  //添加本周最后一天时间
  startStop.push(currentDay);//本周终止时间
  //返回
  return startStop;
}
/***
 * 获得今天以后的某天时间
 */
export const getFutureDate = function (days){
  //获取当前时间
  var currentDay= getCurrentDate();
  //三十天的毫秒数
  var millisecond=1000*60*60*24*(days);
  //三十天时间
  var endDay = new Date(currentDay.getTime() + millisecond);
  // endDay = formatDate(endDay)
  //返回
  return endDay;
}
/***
 * 获得近3天时间
 */
export const getLastThreeDaysDate = function (){
  //起止日期数组
  var startStop=new Array();
  //获取当前时间
  var currentDay= getCurrentDate();
  //三十天的毫秒数
  var millisecond=1000*60*60*24*2;
  //三十天时间
  var lastThirtyDays = new Date(currentDay.getTime()-millisecond);
  currentDay = formatDate(currentDay)
  lastThirtyDays = formatDate(lastThirtyDays)
  //添加本周时间
  startStop.push(lastThirtyDays);//本周起始时间
  //添加本周最后一天时间
  startStop.push(currentDay);//本周终止时间
  //返回
  return startStop;
}
/**
 * 得到本季度开始的月份
 * @param month 需要计算的月份
 ***/
export const getQuarterSeasonStartMonth = function (month){
  var quarterMonthStart=0;
  var spring=0; //春
  var summer=3; //夏
  var fall=6;   //秋
  var winter=9;//冬
  //月份从0-11
  if(month<3){
    return spring;
  }

  if(month<6){
    return summer;
  }

  if(month<9){
    return fall;
  }

  return winter;
};
/**
 * 获得该月的天数
 * @param year年份
 * @param month月份
 * */
export const getMonthDays = function (year,month){
  //本月第一天 1-31
  var relativeDate=new Date(year,month,1);
  //获得当前月份0-11
  var relativeMonth=relativeDate.getMonth();
  //获得当前年份4位年
  var relativeYear=relativeDate.getFullYear();

  //当为12月的时候年份需要加1
  //月份需要更新为0 也就是下一年的第一个月
  if(relativeMonth === 11){
    relativeYear++;
    relativeMonth=0;
  }else{
    //否则只是月份增加,以便求的下一月的第一天
    relativeMonth++;
  }
  //一天的毫秒数
  var millisecond=1000*60*60*24;
  //下月的第一天
  var nextMonthDayOne=new Date(relativeYear,relativeMonth,1);
  //返回得到上月的最后一天,也就是本月总天数
  return new Date(nextMonthDayOne.getTime()-millisecond).getDate();
};
/**
 * 获得本季度的起止日期
 */
export const getCurrentSeason = function(){
  //起止日期数组
  var startStop=new Array();
  //获取当前时间
  var currentDate=getCurrentDate();
  //获得当前月份0-11
  var currentMonth=currentDate.getMonth();
  //获得当前年份4位年
  var currentYear=currentDate.getFullYear();
  //获得本季度开始月份
  var quarterSeasonStartMonth=getQuarterSeasonStartMonth(currentMonth);
  //获得本季度结束月份
  var quarterSeasonEndMonth=quarterSeasonStartMonth+2;

  //获得本季度开始的日期
  var quarterSeasonStartDate=new Date(currentYear,quarterSeasonStartMonth,1);
  //获得本季度结束的日期
  var quarterSeasonEndDate=new Date(currentYear,quarterSeasonEndMonth,getMonthDays(currentYear, quarterSeasonEndMonth));
  quarterSeasonStartDate = formatDate(quarterSeasonStartDate);
  quarterSeasonEndDate = formatDate(quarterSeasonEndDate);
  //加入数组返回
  startStop.push(quarterSeasonStartDate);
  startStop.push(quarterSeasonEndDate);
  //返回
  return startStop;
};

/***
 * 得到本年的起止日期
 *
 */
export const getCurrentYear = function(){
  //起止日期数组
  var startStop=new Array();
  //获取当前时间
  var currentDate=getCurrentDate();
  //获得当前年份4位年
  var currentYear=currentDate.getFullYear();

  //本年第一天
  var currentYearFirstDate=new Date(currentYear,0,1);
  //本年最后一天
  var currentYearLastDate=new Date(currentYear,11,31);
  currentYearFirstDate = formatDate(currentYearFirstDate)
  currentYearLastDate = formatDate(currentYearLastDate)
  //添加至数组
  startStop.push(currentYearFirstDate);
  startStop.push(currentYearLastDate);
  //返回
  return startStop;
};
export const addFrontZero = function (value) {
  return parseInt(value) > 9 ? value + '' : '0' + value
}
// YYYY-MM-DD
export const formatDate = function (value) {
  var month = addFrontZero(value.getMonth() + 1)
  var day = addFrontZero(value.getDate())
  return value.getFullYear()+"-"+month+"-"+day
}
// MM-DD
export const formatDateMMDD = function (value) {
  var month = addFrontZero(value.getMonth() + 1)
  var day = addFrontZero(value.getDate())
  return month+"-"+day
}
//按对象中的某一属性进行排序
export const sortObjectByOption = function (prop, sort) {
  return function (obj1, obj2) {
    if(sort === undefined){
      sort = 1;
    }
    var val1 = obj1[prop];
    var val2 = obj2[prop];
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1);
      val2 = Number(val2); }
    if (val1 < val2) {
      return -1*sort;
    } else if (val1 > val2) {
      return 1*sort;
    } else {
      return 0;
    }
  }
}
