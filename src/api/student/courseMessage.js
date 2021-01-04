/*
 * @Author: 庞泽邦
 * @Date: 2020-05-19 14:27:17
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 12:38:00
 */
// 课程消息页面接口

import request from '../studentRequest'

// 学生登录
export function messageInfo(data) {
  return request({
    url: '/messageInfo',
    method: 'get'
  })
}
