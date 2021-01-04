/*
 * @Author: 杨志杰
 * @Date: 2020-05-05
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-02 21:47:57
 */

// 课程详细信息相关接口
import request from '../studentRequest'

/**
 * 获取课程详细信息
 * @param {string} courseId 课程Id
 */
export function getCourseDetail(courseId) {
  return request({
    url: '/elderStudent/getCourseInfo',
    method: 'get',
    params: {
      courseId
    }
  })
}
// 获取课程介绍
export function getCourseIntro() {
  return request({
    url: '/getCourseIntro',
    method: 'get'
  })
}

// 获取课程列表
export function getCourseList() {
  return request({
    url: '/getCourseList',
    method: 'get'
  })
}

/**
 * 免费课程下单
 * @param {string} courseId 课程Id
 */
export function createFreeOrder(courseId) {
  return request({
    url: '/elderStudent/createFreeOrder',
    method: 'post',
    params: {
      courseId
    }
  })
}
