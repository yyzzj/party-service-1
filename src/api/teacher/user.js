/*
 * @Author: 庞泽邦
 * @Date: 2020-04-27
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 12:51:51
 */

// 用户相关接口
import request from '../teacherRequest'

/**
 * @desc 教师登陆接口
 * @param {object} data
 */
export function teacherLogin(data) {
  return request({
    url: '/login/doLogin',
    method: 'post',
    params: data
  })
}
/**
 * 教师获取个人信息
 */
export function getInfo() {
  return request({
    url: '/base/queryByToken',
    method: 'post'
  })
}
/**
 * 教师退出接口
 */
export function teacherLogout() {
  return request({
    url: '/teacherlogout',
    method: 'get'
  })
}
