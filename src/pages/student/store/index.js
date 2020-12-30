/*
 * @Author: 庞泽邦
 * @Date: 2020-04-27
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-05-09 16:28:13
 */

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)
const files = require.context('./modules', false, /\.js$/)
const modules = {}
files.keys().forEach(key => {
  modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default
})

const Store = new Vuex.Store({
  modules,
  getters
})

export default Store
