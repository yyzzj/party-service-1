/*
 * @Author: 范开杰
 * @Date: 2020-05-05
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 13:07:45
 */
//课程详情主讲老师组件
<template>
  <div class="courseTeacher_container"> <!-- 主讲老师容器 -->
    <van-image
      round
      width="30px"
      height="30px"
      :src="imgSrc"
      class="cell_teacherInfo--image"
    /> <!-- 主讲老师头像 -->
    <div class="cell_teacherInfo--name">{{ teacherName }}</div> <!-- 主讲老师姓名 -->
    <div class="cell_teacherInfo--label">{{ label }}</div> <!-- 主讲老师介绍 -->
  </div>
</template>

<script>
import Vue from 'vue'
import { Image } from 'vant'

Vue.use(Image)
export default {
  name: 'CourseTeacher',
  props: {
    teacherName: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      imgSrc: 'https://img.yzcdn.cn/vant/cat.jpeg' // 老师头像地址
    }
  }
}
</script>

<style lang="scss" scoped>
.courseTeacher_container {
  height: 188px;
  background: white;
}
.cell_teacherInfo {
  &--image {
    margin-top: 17px;
    margin-left: 17px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: white;
    float: left;
  }
  &--name {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #68627e;
    margin-top: 22px;
    margin-left: 15px;
    line-height: 20px;
    float: left;
  }
  &--label {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #313131;
    margin: 13px 49px 26px 62px;
    line-height: 17px;
    float: left;
    clear: both;
  }
}
</style>
