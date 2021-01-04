/*
 * @Author: 郑丽敏
 * @Date: 2020-07-22
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 12:51:52
 */

// 课程管理相关接口
import request from '../teacherRequest'

// 获取全部课程管理列表
export function getSubmitList() {
  return request({
    url: '/getSubmitList',
    method: 'get'
  })
}

