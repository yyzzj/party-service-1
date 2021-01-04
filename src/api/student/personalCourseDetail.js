/*
 * @Author: 杨志杰
 * @Date: 2020-05-14
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 12:38:18
 */

// 个人课程详细信息相关接口
import request from '../studentRequest'

// 获取课程列表信息
export function getCourseList() {
  return request({
    url: '/getCourseList',
    method: 'get'
  })
}

// 获取课程公布
export function getCourseAnnouncement() {
  return request({
    url: '/getCourseAnnouncement',
    method: 'get'
  })
}

// 获取课程作业
export function getCoursework() {
  return request({
    url: '/getCoursework',
    method: 'get'
  })
}
