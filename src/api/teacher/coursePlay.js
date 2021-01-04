/*
 * @Author: 庞泽邦
 * @Date: 2020-07-24 11:03:30
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 12:51:49
 */
// 课程播放页面
import request from '../teacherRequest'

// 获取考勤信息
export function getCheckInfo() {
  return request({
    url: '/courseCheckInfo',
    method: 'get'
  })
}
