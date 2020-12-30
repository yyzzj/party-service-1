/*
 * @Author: 庞泽邦
 * @Date: 2020-11-10 12:36:22
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-10 19:13:27
 */
// 文件下载工具函数
import axios from 'axios'
import { getEnvDomain } from './index'
import { isMobile, isTouch, isOnWechat } from './validate'

/**
 * 文件下载通用函数(调用时使用try catch)
 * @param {string} resourceUrl 文件下载路径
 * @param {string} fileName 文件名
 * @param {boolean} isSameOrigin 是否同源资源
 */
export function download(resourceUrl, fileName, isSameOrigin) {
  // 根据不同线上环境获取当前域名
  const baseUrl = getEnvDomain()

  let url
  // 判断是否在微信内打开
  if (!isOnWechat()) {
    if (!isSameOrigin) {
      url = resourceUrl // 非同源资源不拼接本地域名
    } else {
      url = baseUrl + resourceUrl // 同源资源拼接本地域名
    }

    if (isMobile() && isTouch()) {
      // 如果是在移动端设备打开,则直接调用a标签下载
      downloadByATag(url, fileName)
    } else {
      // 否则使用blob格式下载
      downloadByBlob(url, fileName)
    }
  } else {
    throw new Error('请在非微信浏览器环境内进行资源下载')
  }
}

function downloadByATag(url, fileName) {
  // 创建隐式a标签
  const a = document.createElement('a')
  a.style.display = 'none'
  a.href = url
  // 设置download属性与文件名
  a.setAttribute('download', fileName)

  // Safari认为_blank锚点是弹出窗口。如果浏览器不支持HTML5下载属性，我们只需要设置_blank target。
  // 这允许你下载文件在桌面safari如果弹出拦截启用。
  if (typeof a.download === 'undefined') {
    a.setAttribute('target', '_blank')
  }
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function downloadByBlob(url, fileName) {
  axios({
    url: url,
    method: 'GET',
    responseType: 'arraybuffer' // 避免blob文件下载乱码或损坏
  })
    .then((res) => {
      // 强转为blob，因为直接使用a标签的download当拼接上域名时会跨域成预览，不拼接时导致404同时由于线上测试与正式环境冲突不好处理
      const blob = new Blob([res.data])
      // 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveBlob(blob, fileName)
      } else {
        // 转换blob URL
        const url = (window.URL && window.URL.createObjectURL) ? window.URL.createObjectURL(blob) : window.webkitURL.createObjectURL(blob)
        downloadByATag(url, fileName)
        // 避免 "webkit blob resource error 1" webkit内核中blob url唯一
        URL.revokeObjectURL(url)
      }
    })
    .catch(error => {
      console.log('blob格式转换失败:', error)
    })
}
