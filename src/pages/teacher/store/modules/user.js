/*
 * @Author: 庞泽邦
 * @Date: 2020-04-27
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2020-12-08 14:55:02
 */

// 用户相关
import { getToken, setToken, removeToken } from '@/utils/auth'
import { teacherLogin, getInfo } from '@/api/teacher/user'
import md5 from 'js-md5'

const getDefaultState = () => {
  return {
    token: getToken('teacher'),
    username: '',
    role: '',
    teacherId: ''
  }
}
// 初始化数据源
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    // 浅拷贝
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_TEACHERID: (state, val) => {
    state.teacherId = val
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo

    return new Promise((resolve, reject) => {
      teacherLogin({ orgId: '246001', teacherName: username.trim(), password: md5(password) }).then((response) => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken('teacher', data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const { data } = response
        if (!data) {
          reject('验证失败，请重新登录')
        }
        const { teacherName, role, teacherId, orgId } = data
        window.sessionStorage.setItem('teacher_username', teacherName)
        window.sessionStorage.setItem('teacher_Id', teacherId)
        window.sessionStorage.setItem('teacher_orgId', orgId)
        commit('SET_USERNAME', teacherName)
        commit('SET_ROLE', role === 1 ? 'teacher' : 'teacher')
        commit('SET_TEACHERID', teacherId)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 退出
  logout({ commit, state }) {
    return new Promise(resolve => {
      removeToken('teacher') // 必须先移除cookie中token
      window.sessionStorage.clear() // session也清除
      commit('RESET_STATE')
      resolve()
    })
  },

  // 移除store中的token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken('teacher') // 必须先移除cookie中token
      commit('RESET_STATE') // 重置store
      resolve()
    })
  }
}

export default {
  namespaced: true, // dispatch或commit时需要拼接namespace
  state,
  mutations,
  actions
}
