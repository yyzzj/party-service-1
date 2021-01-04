/*
* @Author: 吴晓斌
* @Date: 2020-09-16
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 12:51:53
*/

// 我的订单相关接口
import request from '../teacherRequest'
/**
 * 查看当前教师的所有课程
 * @param {Integer} page 第几页
 * @param {Integer} size 一页的数目
 * @param {Integer} status 课程状态
 * @returns {Object}
 */
export function listCourse(page, size, status) {
  return request({
    url: '/course/listCourse',
    method: 'get',
    params: {
      page: page,
      size: size,
      status: status
    }
  })
}

/**
 * 根据教师Id查询订单
 * @param {String} teacherId 教师Id
 * @param {Integer} type 订单支付状态
 * @returns {Object}
 */
export function queryOrderByTeacherId(teacherId, type) {
  return request({
    url: '/personal/queryOrderByTeacherId',
    method: 'get',
    params: {
      teacherId: teacherId,
      type: type
    }
  })
}

/**
 * 根据课程Id查询订单
 * @param {String} courseId 课程Id
 * @returns {Object}
 */
export function queryOrderByCourseId(courseId) {
  return request({
    url: '/personal/queryOrderByCourseId',
    method: 'get',
    params: {
      courseId: courseId
    }
  })
}

/**
 * 根据订单Id查找订单详情
 * @param {String} orderId 订单Id
 * @returns {Object}
 */
export function queryOrderByOrderId(orderId) {
  return request({
    url: '/personal/queryOrderByOrderId',
    method: 'get',
    params: {
      orderId: orderId
    }
  })
}

/**
 * 删除订单
 * @param {String} out_trade_no 订单编号
 * @returns {Object}
 */
export function deleteOrderById(out_trade_no) {
  return request({
    url: '/personal/deleteOrderById',
    method: 'get',
    params: {
      out_trade_no: out_trade_no
    }
  })
}

/**
 * 更新订单类型
 * @param {String} out_trade_no 订单编号
 * @param {Integer} type 想要更新的类型
 * @returns {Object}
 */
export function updateOrderType(out_trade_no, type) {
  return request({
    url: '/personal/updateOrderType',
    method: 'get',
    params: {
      out_trade_no: out_trade_no,
      type: type
    }
  })
}
