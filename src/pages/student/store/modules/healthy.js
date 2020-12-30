/*
 * @Author: 庞泽邦
 * @Date: 2020-09-23 10:41:37
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-07 18:28:05
 */
// 健康养生模块Vuex仓库

const getDefaultState = () => {
  return {
    active: 0, // 养生模块选择的tab
    doctorId: '', // 医生ID
    doctorName: '',
    doctorContent: [], // 医生聊天返回的信息
    chatId: '', // 1对1聊天对应ID
    interestTag: [] // 兴趣标签集
  }
}
// 初始化数据源
const state = getDefaultState()

const mutations = {
  SET_Active: (state, val) => {
    state.active = val
  },
  SET_DOCTORID: (state, val) => {
    state.doctorId = val
  },
  SET_DOCTORNAME: (state, val) => {
    state.doctorName = val
  },
  SET_DOCTORCONTENT: (state, val) => {
    state.doctorContent = val
  },
  SET_CHATID: (state, val) => {
    state.chatId = val
  },
  SET_INTERESTTAG: (state, val) => {
    state.interestTag = val
  }
}

export default {
  namespaced: true, // dispatch或commit时需要拼接namespace
  state,
  mutations
}
