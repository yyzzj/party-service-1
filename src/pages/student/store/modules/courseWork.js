/*
 * @Author: 庞泽邦
 * @Date: 2020-05-18 11:24:59
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-23 10:41:40
 */
// 课堂作业模块Vuex仓库

const getDefaultState = () => {
  return {
    active: 0
  }
}
// 初始化数据源
const state = getDefaultState()

const mutations = {
  Change_Active: (state, val) => {
    state.active = val
  }
}

export default {
  namespaced: true, // dispatch或commit时需要拼接namespace
  state,
  mutations
}
