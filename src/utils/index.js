/*
 * @Author: 庞泽邦
 * @Date: 2020-04-27
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-24 15:43:25
 */
// 通用公共方法

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
        decodeURIComponent(search)
          .replace(/"/g, '\\"')
          .replace(/&/g, '","')
          .replace(/=/g, '":"')
          .replace(/\+/g, ' ') +
        '"}'
  )
}

/**
 * 防抖
 * @param {Function} fn
 * @param {number} delay
 */
export function debounce(fn, delay) {
  let timer = 0
  return function(...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 节流
 * @param {Function} fn
 * @param {number} delay
 */
export function throttle(fn, delay) {
  let lastTime = 0
  return function(...args) {
    const now = +new Date()
    if (now - lastTime > delay) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
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
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * 根据当前环境获取前缀域名
 * @returns {string} url
 */
export function getEnvDomain() {
  let url = ''
  switch (process.env.NODE_ENV) {
    case 'development':
      url = '' // 开发环境url
      break
    case 'test':
      url = 'http://172.31.44.162' // 测试环境url
      break
    case 'production':
      url = 'https://all.bnuz.edu.cn' // 生产环境url
      break
  }
  return url
}
