/*
 * @Author: 庞泽邦
 * @Date: 2020-09-23 11:21:08
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 12:38:08
 */

// 健康模块相关接口
import request from '../healthyRequest'

/**
 * @desc 学生端获取医生列表
 * @param {Object} params
 * @param {string} params.start - 分页的页数
 * @param {string} params.count - 一页的数量.
 */
export function getDoctorList(params) {
  return request({
    url: '/clinic/doctor',
    method: 'get',
    params
  })
}

/**
 * @desc 健康模块发送消息
 * @param {string} contentText
 * @param {number} receiverId
 * @param {number} chatId
 */
export function sendMessage(contentText, receiverId, chatId) {
  return request({
    url: '/clinic/msg',
    method: 'post',
    params: {
      contentText,
      receiverId,
      chatId
    }
  })
}

/**
 * @desc 获取聊天信息列表
 */
export function getChatList() {
  return request({
    url: '/clinic/chat',
    method: 'get'
  })
}

/**
 * @desc 获取对应聊天ID的详细信息
 * @param {number} chatId
 * @param {number} start
 */
export function getMessageDetail(chatId, start = 0) {
  return request({
    url: '/clinic/msg',
    method: 'get',
    params: {
      chatId,
      start
    }
  })
}

/**
 * @desc 获取热门文章
 * @param {Number} pageNum 页数
 * @param {Number} pageSize 一页多少
 */
export function getPopularArticle(pageNum = 0, pageSize = 10) {
  return request({
    url: '/lecture/popularArticle',
    method: 'get',
    params: {
      pageNum,
      pageSize
    }
  })
}

/**
 * @desc 判断该用户是否已经选择过兴趣标签
 */
export function judegTag() {
  return request({
    url: '/personal/myTag',
    method: 'get'
  })
}

/**
 * @desc 增加兴趣标签
 * @param {boolean} replace 是增量还是替换
 * @param {boolean} favorite 是否感兴趣
 * @param {String} tagIdList 标签id数组
 */
export function addTag(replace, favorite, tagIdList) {
  return request({
    url: '/personal/myTag',
    method: 'post',
    params: {
      replace,
      favorite,
      tagIdList
    }
  })
}

/**
 * @desc 获取所有兴趣标签
 */
export function getTag() {
  return request({
    url: '/lecture/tag',
    method: 'get'
  })
}

/**
 * @desc 查看文章详情
 * @param {number} id
 */
export function getArticle(id) {
  return request({
    url: '/lecture/article',
    method: 'get',
    params: {
      id
    }
  })
}

/**
 * @desc 获取文章收藏列表
 */
export function getMyFavoriteArticle() {
  return request({
    url: '/personal/myFavoriteArticle',
    method: 'get'
  })
}

/**
 * @desc 收藏文章
 * @param {number} articleId
 * @param {boolean} favorite
 */
export function MyFavoriteArticle(articleId, favorite) {
  return request({
    url: '/personal/myFavoriteArticle',
    method: 'post',
    params: {
      articleId,
      favorite
    }
  })
}

/**
 * @desc 获取特定标签的文章列表
 * @param {String} tagId 标签ID
 * @param {Number} pageNum 页数
 * @param {Number} pageSize 一页多少
 */
export function underTagArticle(pageNum = 0, tagId, pageSize = 5) {
  return request({
    url: '/lecture/articleUnderTag',
    method: 'get',
    params: {
      pageNum,
      tagId,
      pageSize
    }
  })
}

/**
 * @desc 添加或取消收藏文章
 * @param {number} articleId 文章ID
 * @param {boolean} favorite ture代表收藏 false代表取消收藏
 */
export function addCollect(articleId, favorite) {
  return request({
    url: '/personal/myFavoriteArticle',
    method: 'post',
    params: {
      articleId,
      favorite
    }
  })
}

/**
 * @desc 文章发布评论接口
 * @param {string} articleId 文章ID
 * @param {string} content 评论内容
 */
export function articleComment(articleId, content) {
  return request({
    url: '/lecture/articleComment',
    method: 'post',
    params: {
      articleId,
      content
    }
  })
}
