/*
 * @Author: 范开杰
 * @Date: 2020-05-13
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-02 19:44:43
 */
//课程作业-作业信息组件
<template>
  <div class="homeworkMessage_container"> <!-- 作业信息容器 -->
    <van-row class="head_homework" type="flex" justify="space-between">
      <van-col span="18" class="cell_homework--title">{{ info.title }}</van-col>
      <van-col span="4.5" class="cell_homework--teacherInfo">
        <van-image
          round
          width="18px"
          height="18px"
          :src="imgSrc"
          class="cell_homework--teacheravatar"
        /><!-- 教师头像 -->
        <span class="cell_homework--teachername">{{ info.teacher }}</span><!-- 教师名字 -->
      </van-col>
    </van-row>
    <div class="cell_homework--message">{{ info.content }}</div><!-- 作业内容 -->
    <div class="cell_homework--deadline">
      <van-icon slot="icon" class-prefix="old-icon" name="ai253" size="14" />
      <span class="cell_homework--deadlinetime">{{ `${info.deadTime}截止提交` }}</span><!-- 截止日期 -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image, Col, Row, Cell, Icon } from 'vant'

Vue.use(Image)
  .use(Col)
  .use(Row)
  .use(Cell)
  .use(Icon)
export default {
  name: 'HomeworkMessage',
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
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
.homeworkMessage_container {
    display: flex;
    flex-direction: column;
    height: 120px;
    background: white;
}
.head_homework{
    margin: 13px 19px 0px 19px;
}
.cell_homework{
    &--title{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #313131;
        line-height: 20px;
    }
    &--teacherInfo{
        display: flex;
    }
    &--teacheravatar{
        margin-right: 10px;
    }
    &--teachername{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #313131;
        line-height: 17px;
    }
    &--message{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #6D7278;
        line-height: 17px;
        margin-left: 19px;
        margin-top: 14px;
    }
    &--deadline{
        display: flex;
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: #313131;
        margin-left: 19px;
        margin-top: 19px;
    }
    &--deadlinetime{
        margin-left: 6px;
        line-height: 17px;
    }
}
</style>
