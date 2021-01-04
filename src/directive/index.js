/*
 * @Author: 庞泽邦
 * @Date: 2020-09-17 09:44:46
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-17 09:58:28
 */
// 自动注入指令
import Vue from 'vue'
const files = require.context('./modules', false, /\.js$/)

const install = function(Vue) {
  files.keys().forEach(key => {
    Vue.directive(key.replace(/(\.\/|\.js)/g, ''), files(key).default)
  })
}

export default () => {
  install(Vue)
}
