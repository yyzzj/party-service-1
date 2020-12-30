/*
 * @Author: 庞泽邦
 * @Date: 2020-04-27
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-04-27 15:55:16
 */

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import order from './modules/order'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    user,
    order
  },
  getters
})

export default Store
