/*
 * @Author: 庞泽邦
 * @Date: 2020-04-27
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-07 19:39:34
 */

// 首页相关接口
import request from '../studentRequest'

/**
 * 免费推荐接口
*/
export function getFree() {
  return request({
    url: '/elderStudent/getRecommendCourse',
    method: 'get'
  })
}

/**
 * @desc 获取热门推荐
*/
export function getHot() {
  return request({
    url: '/elderStudent/getFivePopularCourse',
    method: 'get'
  })
}
