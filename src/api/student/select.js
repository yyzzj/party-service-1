/*
 * @Author: 庞泽邦
 * @Date: 2020-09-11 10:56:27
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-02 21:46:29
 */

// 搜索信息相关接口
import request from '../studentRequest'

// 获取搜索信息
export function getSelectHot() {
  return request({
    url: '/selectHot',
    method: 'get'
  })
}

/**
 * 选课获取陶瓷课列表
 * @param {number} pageNum
 * @param {number} pageSize
 */
export function getCeramicsCourse(pageNum, pageSize) {
  return request({
    url: '/elderStudent/getCeramicsCourse',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}

/**
 * 选课获取书法课列表
 * @param {number} pageNum
 * @param {number} pageSize
 */
export function getCalligraphyCourse(pageNum, pageSize) {
  return request({
    url: '/elderStudent/getCalligraphyCourse',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}

/**
 * 选课获取绘画课列表
 * @param {number} pageNum
 * @param {number} pageSize
 */
export function getPaintingCourse(pageNum, pageSize) {
  return request({
    url: '/elderStudent/getPaintingCourse',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}

/**
 * 选课获取热门课列表
 * @param {number} pageNum
 * @param {number} pageSize
 */
export function getMoreHotCourse(pageNum, pageSize) {
  return request({
    url: '/elderStudent/getMorePopularCourse',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}

/**
 * 选课获取更多课列表
 * @param {number} pageNum
 * @param {number} pageSize
 */
export function getMorePopularCourse(pageNum, pageSize) {
  return request({
    url: '/elderStudent/getOtherCourse',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}
