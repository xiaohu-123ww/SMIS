/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// import { baseURL } from '@/utils/config'

// 日期格式化
export function parseTime (time, pattern) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    } else if (typeof time === 'string') {
      time = time.replace(new RegExp(/-/gm), '/')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

// 表单重置
export function resetForm (refName) {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields()
  }
}

// 添加日期范围
export function addDateRange (params, dateRange) {
  var search = params
  search.beginTime = ''
  search.endTime = ''
  if (dateRange != null && dateRange != '') {
    search.beginTime = this.dateRange[0]
    search.endTime = this.dateRange[1]
  }
  return search
}

// 回显数据字典
export function selectDictLabel (datas, value) {
  var actions = []
  Object.keys(datas).map(key => {
    if (datas[key].key == '' + value) {
      actions.push(datas[key].value)
      return false
    }
  })
  return actions.join('')
}

// 通用下载方法
// export function download(fileName) {
//   window.location.href =
//     baseURL +
//     '/common/download?fileName=' +
//     encodeURI(fileName) +
//     '&delete=' +
//     true
// }

// 字符串格式化(%s )
export function sprintf (str) {
  var args = arguments
  var flag = true
  var i = 1
  str = str.replace(/%s/g, function () {
    var arg = args[i++]
    if (typeof arg === 'undefined') {
      flag = false
      return ''
    }
    return arg
  })
  return flag ? str : ''
}

// 转换字符串，undefined,null等转化为""
export function praseStrEmpty (str) {
  if (!str || str == 'undefined' || str == 'null') {
    return ''
  }
  return str
}
// http://1.13.8.165
export function disposeImg (img) {
  if (img !== undefined) {
    img = String(img)
    if (img.substr(0, 1) == '/') {
      img = img.substr(1)
    }
    return 'https://znzz.tech/loc/' + img
  }
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree (data, id, parentId, children, rootId) {
  id = id || 'id'
  parentId = parentId || 'parentId'
  children = children || 'children'
  rootId = rootId || 0
  // 对源数据深度克隆
  //  (JSON.stringify(data));\
  //  (rootId);
  const cloneData = JSON.parse(JSON.stringify(data))
  // 循环所有项
  const treeData = cloneData.filter(father => {
    const branchArr = cloneData.filter(child => {
      // 返回每一项的子级数组
      //  (father[id] === child[parentId]);

      return father[id] == child[parentId]
    })
    branchArr.length > 0 ? (father.children = branchArr) : ''
    // 返回第一层
    return father[parentId] == null
  })
  //  (treeData);
  return treeData != '' ? treeData : data
}

export function disposeTime (oldtime) {
  var date1 = new Date(oldtime)
  var s2 = Date.parse(new Date())
  var s1 = date1.getTime()
  var total = (s2 - s1) / 1000
  var day = parseInt(total / (246060))// 计算整数天数
  var afterDay = total - day * 24 * 60 * 60// 取得算出来天数后剩余的秒数
  var hour = parseInt(afterDay / (60 * 60))// 计算整数小时百数
  var afterHour = total - day * 24 * 60 * 60 - hour * 60 * 60// 取得算出小时数后剩余的秒数
  var min = parseInt(afterHour / 60)// 计算整数分
  var afterMin = total - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60// 取得算出分后度剩余的秒数
  if (day) {
    return day
  }
  if (hour) {
    return hour
  }
  if (min) {
    return min
  }
  if (afterMin) {
    return afterMin
  }
}

export function dateFormat (fmt, date) {
  let ret = ''
  date = new Date(date)
  const opt = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0')
      )
    }
  }
  return fmt
}

// 年月日
export function formateDate (date) {
  // let  = "2019-11-06T16:00:00.000Z"
  // 2021-05-17T01:44:45.452
  const arr = date.split(/[-: ]/)
  //  (arr)
  if (arr.length > 3) {
    return arr[0] + '年' + arr[1] + '月' + arr[2] + '日' + ' ' + arr[3] + ':' + arr[4]
  } else {
    return arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
  }
}

// 处理拼合时间
export function constTime (...arr) {
  //  ([...arr])
  return [...arr]
}

export function arrTrans (num, arr) { // 一维数组转换为二维数组
  const iconsArr = []// 声明数组
  arr.forEach((item, index) => {
    const page = Math.floor(index / num)// 计算该元素为第几个素组内
    if (!iconsArr[page]) { // 判断是否存在
      iconsArr[page] = []
    }
    iconsArr[page].push(item)
  })
  return iconsArr
}
