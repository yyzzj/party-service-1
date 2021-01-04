/*
 * @Author: 杨志杰
 * @Date: 2020-06-01
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 12:38:21
 */

// 搜索信息相关接口
import request from '../studentRequest'

/**
 * 搜索课程
 * @param {string} keyword
 */
export function searchCourse(keyword) {
  return request({
    url: '/elderStudent/getInterestedCourse',
    method: 'get',
    params: {
      keyword
    }
  })
}

/**
 * 获取用户搜索历史
 */
export function getSearchHistory() {
  return request({
    url: '/elderStudent/getSearchRecord',
    method: 'get'
  })
}

/**
 * 删除用户搜索历史
 */
export function deleteSearchHistory() {
  return request({
    url: '/elderStudent/deleteSearchRecord',
    method: 'get'
  })
}
