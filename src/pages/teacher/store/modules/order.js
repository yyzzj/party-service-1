/*
* @Author:吴晓斌
* @Date:2020-09-17
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2020-09-17 15:23:00
*/

// 订单详情
const getDefaultState = () => {
  return {
    detail: {}
  }
}
// 初始化数据源
const state = getDefaultState()

const mutations = {
  setOrderDetail(state, orderDetail) {
    state.detail = orderDetail
  }
}

export default {
  namespaced: true, // dispatch或commit时需要拼接namespace
  state,
  mutations
}

