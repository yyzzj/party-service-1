/*
* @Author: 杨志杰
* @Date: 2020-10-09 12:53:21
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-07 19:40:30
*/

// 养生问答模块接口
import request from '../healthyRequest'

/**
 * @desc 获取养生讲堂内容标签
 * @returns {AxiosPromise}
 */
export function getTag() {
  return request({
    url: '/lecture/tag ',
    method: 'get'
  })
}

/**
 * @desc 发布文章
 * @param {String} categoryId 类别ID
 * @param {String} title 标题
 * @param formData 图片&&文章内容
 * @returns {AxiosPromise}
 */
export function addArticle(categoryId, title, formData) {
  return request({
    url: '/lecture/article',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: formData,
    params: { categoryId, title }
  })
}

/**
 * @desc 获取个人发布的文章列表
 * @returns {AxiosPromise}
 */
export function getMyArticle() {
  return request({
    url: '/lecture/myArticle',
    method: 'get'
  })
}

/**
 * @desc 删除文章
 * @param {String} id 文章ID
 * @returns {AxiosPromise}
 */
export function deleteMyArticle(id) {
  return request({
    url: '/lecture/article',
    method: 'delete',
    params: { id }
  })
}

/**
 * @desc 更新文章
 * @param {String} id 文章ID
 * @param {String} categoryId 类别ID
 * @param {String} title 标题
 * @param {String} content 内容
 * @returns {AxiosPromise}
 */
export function updateMyArticle(id, categoryId, title, content) {
  return request({
    url: '/lecture/article',
    method: 'put',
    params: { id, categoryId, title, content }
  })
}
