/*
 * @Author: 郑丽敏
 * @Date: 2020-07-22
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 12:51:52
 */

// 课程管理相关接口
import request from '../teacherRequest'

/*
// 获取全部课程管理列表
export function getCourseIndexList(query) {
  return request({
    url: '/getCourseIndexList',
    method: 'get',
    params: query
  })
}*/

/**
 * @desc 获取当前教师的所有课程
 * @param {Number} page 第几页
 * @param {Number} size 一页的数目
 * @param {Number} courseType (可以为空)兴趣分类 老年人课程分类暂且分为4类：1：书法 2：绘画 3：陶瓷 4：其他
 * @param {Number} status (可以为空)课程状态 0为未上架 1为销售中
 * @returns {AxiosPromise}
 */
export function listCourse(page, size, courseType, status) {
  return request({
    url: '/course/listCourse',
    method: 'get',
    params: { page, size, courseType, status }
  })
}

/**
 * @desc 获取课程学员列表列表
 * @param {Number} courseId 课程ID
 * @returns {AxiosPromise}
 */
export function getStudentList(courseId) {
  return request({
    url: '/class/listStudent',
    method: 'get',
    params: { courseId }
  })
}

/**
 * @desc 根据课程Id查询课程详细信息
 * @param {Number} courseId 课程ID
 * @returns {AxiosPromise}
 */
export function getCourseDetail(courseId) {
  return request({
    url: '/class/queryCourseDetail',
    method: 'get',
    params: { courseId }
  })
}
