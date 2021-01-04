/*
 * @Author: 杨志杰
 * @Date: 2020-07-06
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2020-11-23 09:50:00
 */

// 课程管理相关接口
import request from '../teacherRequest'

/**
 * 获取全部课程列表
 * @param {Integer} page 第几页
 * @param {Integer} size 一页的数目
 * @param {Integer} status 课程状态
 * @param {Integer} courseType 课程分类
 * @returns {Object}
 */
export function getCourseList(page, size, status, courseType) {
  return request({
    url: '/course/listCourse',
    method: 'get',
    params: {
      page: page,
      size: size,
      status: status,
      courseType: courseType
    }
  })
}

/**
 * 上传课程资源
 * @param {FormData} formData 表单
 * @returns {Object}
 */
export function uploadCourseResource(formData) {
  return request({
    url: `/course/uploadCourseResource/${formData.get('courseId')}/course/${formData.get('teacherLeader')}/teacherLeader/${formData.get('fileName')}/fileName`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;boundary=' + new Date().getTime()
    },
    data: formData,
    params: {
      type: formData.get('type')
    }
  })
}

/**
 * 创建课程
 * @param {FormData} image 课程图片
 * @param {String} elderCourse 课程dto
 * @returns {Object}
 */
export function createCourse(image, elderCourse) {
  return request({
    url: '/course/create',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data;boundary=' + new Date().getTime()
    },
    data: image,
    params: {
      elderCourse: elderCourse
    }
  })
}
