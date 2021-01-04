/*
 * @Author: 杨志杰
 * @Date: 2020-05-14
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 12:38:16
 */

// 个人考勤信息相关接口
import request from '../studentRequest'

// 获取个人全部考勤信息
export function getAllAttendance() {
  return request({
    url: '/getAllAttendance',
    method: 'get'
  })
}

// 获取个人缺勤信息
export function getAbsence() {
  return request({
    url: '/getAbsence',
    method: 'get'
  })
}
