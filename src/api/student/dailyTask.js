/*
* @Author:吴晓斌
* @Date:2020-05-18
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 12:38:03
*/
// 今日任务相关接口
import request from '../studentRequest'

// 获取今日任务未完成部分
export function getDailyTaskIncomplete() {
  return request({
    url: '/getDailyTaskIncomplete',
    method: 'get'
  })
}

// 获取今日任务已完成部分
export function getDailyTaskCompleted() {
  return request({
    url: '/getDailyTaskCompleted',
    method: 'get'
  })
}
