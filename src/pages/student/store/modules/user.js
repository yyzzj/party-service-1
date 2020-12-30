/*
 * @Author: 庞泽邦
 * @Date: 2020-04-27
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-14 11:19:51
 */

// 用户相关
import { getToken, setToken, removeToken } from '@/utils/auth'
import { studentLogin, studentLogout, getInfo } from '@/api/student/user'
import md5 from 'js-md5'
import { Toast } from 'vant'

const getDefaultState = () => {
  return {
    token: getToken('student'),
    username: '',
    role: '',
    studentId: ''
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
  SET_STUDENTID: (state, studentId) => {
    state.studentId = studentId
  }
}

const actions = {
  // 登录
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      studentLogin({ username: username.trim(), password: md5(password) }).then((response) => {
        // const { data } = response
        commit('SET_TOKEN', response.detail)
        setToken('student', response.detail)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data) {
          reject('验证失败，请重新登录')
        }
        const { studentName, studentId } = data
        window.sessionStorage.setItem('student_username', studentName)
        commit('SET_USERNAME', studentName)
        commit('SET_STUDENTID', studentId)
        window.sessionStorage.setItem('student_id', studentId)
        commit('SET_ROLE', 'student')
        resolve(data)
      }).catch(() => {
        reject('身份验证失败，请重新登录')
      })
    })
  },

  // 退出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (getToken('student')) {
        studentLogout(state.token).then(() => {
          removeToken('student') // 必须先移除token
          window.sessionStorage.clear() // session也清除
          commit('RESET_STATE')
          resolve()
        }).catch(error => {
          reject(error)
        })
      } else {
        Toast.fail('您尚未登录')
      }
    })
  },

  // 移除store中的token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken('student') // 必须先移除cookie中token
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
