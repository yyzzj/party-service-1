// 微信模块单独Axios
import axios from 'axios'

let url = 'https://all.bnuz.edu.cn' // 本地代理
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
url = url + process.env.VUE_APP_BASE_API + '/wechat'
// 创建axios实例
const service = axios.create({
  baseURL: url, // 主路径
  withCredentials: true, // 允许跨域携带cookie
  timeout: 5000 // 时延
})

// 设置 post、put 默认 Content-Type
service.defaults.headers.post['Content-Type'] = 'application/json'
service.defaults.headers.put['Content-Type'] = 'application/json'

export default service
