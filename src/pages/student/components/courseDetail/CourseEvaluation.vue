/*
 * @Author: 范开杰
 * @Date: 2020-05-06
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 17:41:51
 */
//课程详情学员评价组件
<template>
  <div class="courseEvaluation_container">
    <span class="head_evaluationInfo--num">{{ `共${evaluationNum}学员评价` }}</span> <!-- 学员评价数量 -->
    <div v-for="(item,index) in commentList" :key="index" class="cell_studentInfo--container"> <!-- 学员评价容器 -->
      <div style="clear:both">
        <van-image
          round
          width="30px"
          height="30px"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          class="cell_studentInfo--image"
        /> <!-- 学员头像 -->
        <div class="cell_studentInfo--name">{{ item.name }}</div> <!-- 学员名字 -->
        <div class="cell_studentInfo--time">{{ item.time }}</div> <!-- 学员评价时间 -->
        <van-rate
          :value="5"
          :size="10"
          class="cell_studentInfo--score"
        /> <!-- 学员评价星数 -->
        <div class="cell_studentInfo--label">{{ item.content }}</div> <!-- 学员评价内容 -->
      </div>
      <div v-if="index!=commentList.length-1" class="cell_line" /> <!-- 分割线 -->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image, Rate } from 'vant'

Vue.use(Image)
  .use(Rate)
export default {
  name: 'CourseTeacher',
  props: {
    commentList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: () => {
    return {
      evaluationNum: 233 // 学员评价数量
    }
  }
}
</script>

<style lang="scss" scoped>
.courseEvaluation_container{
    height: 374px;
    background: white;
}
.head_evaluationInfo--num{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #989898;
    margin-top: 18px;
    margin-left: 17px;
    line-height: 17px;
}
.cell_studentInfo{
  &--image{
    margin-top: 19px;
    margin-left: 17px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: white;
    float: left;
  }
  &--name{
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #68627E;
    margin-top: 22px;
    margin-left: 15px;
    line-height: 20px;
    float: left;
  }
  &--time{
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #989898;
    margin-top: 22px;
    margin-right: 17px;
    line-height: 14px;
    float: right;
  }
  &--score{
    margin-left: 63px;
    float: left;
    clear: both;
  }
  &--label{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #313131;
    margin-top: 11px;
    margin-left: 62px;
    margin-bottom: 26px;
    width: 264px;
    line-height: 17px;
    float: left;
    clear: both;
  }
}
.cell_line{
    width: 337px;
    border: 1px solid #F4F6F5;
    margin: 0 auto;
    float: left;
    clear: both;
}
</style>
