/*
 * @Author: 杨志杰
 * @Date: 2020-12-28 14:51:51
 * @Last Modified by: 杨志杰
 * @Last Modified time: 2020-12-28 14:51:51
 */

// 微信请求相关接口
import request from '../wechatRequest'

/**
 * @desc 教师微信登陆接口
 */
export function authorizeWechat() {
  return request({
    url: '/teacher/authorize',
    method: 'get'
  })
}
