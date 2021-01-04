/*
 * @Author: 庞泽邦
 * @Date: 2020-04-27
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-02 20:10:12
 */

// 用户相关接口
import request from '../studentRequest'

/**
 * @desc 学生端登录接口
 * @param {object} data
 */
export function studentLogin(data) {
  return request({
    url: `/elderStudent/login`,
    method: 'post',
    params: data
  })
}

/**
 * 获取用户信息
 */
export function getInfo() {
  return request({
    url: '/elderStudent/getStudentInfo',
    method: 'post'
  })
}

/**
 * 学生退出
 */
export function studentLogout() {
  return request({
    url: '/elderStudent/logout',
    method: 'get'
  })
}

/**
 * 获取已结束课堂的信息
 */
export function getFinishedCourseInfo() {
  return request({
    url: '/getFinishedCourseInfo',
    method: 'get'
  })
}

/**
 * 获取学习中课堂的信息
 */
export function getlearningCourseInfo() {
  return request({
    url: '/getlearningCourseInfo',
    method: 'get'
  })
}

/**
 * 获取订单详情列表
 * @param {number} PayStatus 订单状态  0:未支付，1:已支付,2:已取消，3:已申请退费，4:退费通过，5.已拒绝退费，6:免费课程
 */
export function getOrder(PayStatus) {
  return request({
    url: '/elderStudent/getMyOrder',
    method: 'get',
    params: {
      PayStatus
    }
  })
}

/**
 * 获取消息列表
 */
export function getMessageList() {
  return request({
    url: '/elderStudent/getCourseMessages',
    method: 'get'
  })
}

/**
 * 获取消息的具体内容
 * @param {number} templateId
 */
export function getMessageDetail(templateId) {
  return request({
    url: '/elderStudent/getMessageDetail',
    method: 'get',
    params: {
      templateId
    }
  })
}

/**
 * 查询课堂作业
 */
export function getWorkList() {
  return request({
    url: '/elderStudent/getHomework',
    method: 'get'
  })
}

/**
 * 个人中心获取任务数
 * @param {string} studentId
 */
export function getTaskNum(studentId) {
  return request({
    url: '/elderStudent/getTaskNum',
    method: 'get',
    params: {
      studentId
    }
  })
}

/**
 * 个人中心今日任务列表
 */
export function getDailyTaskList() {
  return request({
    url: '/elderStudent/getDailyTask',
    method: 'get'
  })
}

/**
 * 学生端添加反馈
 * @param {String} feedbackContent
 * @param {File} file
 */
export function addFeedback(feedbackContent, file) {
  const form = new FormData()
  form.append('feedbackContent', feedbackContent)
  if (file) {
    form.append('file', file)
  }
  return request.post('/elderStudent/insertFeedback', form, { headers: { 'Content-Type': 'multipart/form-data' }})
}

/**
 * 获取学生个人详情
 */
export function getPersonDetailInfo() {
  return request({
    url: '/elderStudent/getStudentInfoDetail',
    method: 'get'
  })
}

/**
 * 修改学生个人详情
 * @param {Object} data 个人信息数据
 */
export function updatePersonDetailInfo(data) {
  return request({
    url: '/elderStudent/updateStudentInfo',
    method: 'post',
    params: data
  })
}

/**
 * 查询具体作业详情
 * @param {string} homeworkId 作业Id
 */
export function getHomeworkDeatil(homeworkId) {
  return request({
    url: '/elderStudent/getHomeworkDetail',
    method: 'get',
    params: {
      homeworkId
    }
  })
}

/**
 * 提交作业
 * @param {string} homeworkId 作业ID
 * @param {string} homeworkContent 提交的作业内容
 * @param {Object} file file文件对象
 */
export function submitHomework(homeworkId, homeworkContent, file) {
  const form = new FormData()
  form.append('homeworkId', homeworkId)
  form.append('homeworkContent', homeworkContent)
  if (file) {
    for (const item of file) {
      form.append('file', item.file, item.file.name)
    }
  }
  return request.post('/elderStudent/submitHomework', form, { headers: { 'Content-Type': 'multipart/form-data' }})
}
