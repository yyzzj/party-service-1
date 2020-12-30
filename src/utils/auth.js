/*
 * @Author: 庞泽邦
 * @Date: 2020-04-27
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-07 19:34:44
 */

// 角色权限相关公共方法

import Cookie from 'js-cookie'

const StudentTokenKey = 'zhsj_old_student_token'
const TeacherTokenKey = 'zhsj_old_teacher_token'

/**
 * 获取token
 * @param {string} role 当前客户端的角色 student/teacher
 */
export function getToken(role) {
  return role === 'student' ? Cookie.get(StudentTokenKey) : Cookie.get(TeacherTokenKey)
}

/**
 * 移除token
 * @param {string} role 当前客户端的角色 student/teacher
 * @param {string} token
 */
export function setToken(role, token) {
  const halfDay = 0.5
  return role === 'student' ? Cookie.set(StudentTokenKey, token, { expires: halfDay }) : Cookie.set(TeacherTokenKey, token, { expires: halfDay })
}

/**
 * 移除token
 * @param {string} role 当前客户端的角色 student/teacher
 */
export function removeToken(role) {
  return role === 'student' ? Cookie.remove(StudentTokenKey) : Cookie.remove(TeacherTokenKey)
}

/**
 * 判断当前是教师端还是学生端
 */
export function getEntry() {
  return document.getElementsByTagName('meta')['entry-port'].content
}
