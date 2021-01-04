/*
 * @Author: 吴晓斌
 * @Date: 2020-05-08
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 17:31:59
 */

//课程列表组件
<template>
  <div class="courseList_container">
    <div class="courseList_box">
      <div v-for="(item,index) of courseList" :key="index" class="courseList_detail">
        <div class="courseList_listId">
          <span class="courseList_listId--text">{{ index+1 }}</span>
        </div>
        <div class="courseList_main">
          <div class="courseList_main--courseList_listTitle">
            <span class="courseList_listTitle--text">{{ item.lessonName }}</span>
          </div>
          <van-row type="flex">
            <van-col span="8">
              <div class="courseList_main--courseList_listTime">
                <span class="courseList_listTime--text">时长30分钟</span>
              </div>
            </van-col>
            <van-col span="16">
              <div class="courseList_main--courseList_listNum">
                <span class="courseList_listNum--text">当前0人正在学习中</span>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Col, Row } from 'vant'

Vue.use(Col)
Vue.use(Row)
export default {
  name: 'CourseList',
  props: {
    courseList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.courseList_container {
  width: 100%;
  height: 300px;
  padding-top: 15px;
}
.courseList_box {
  width: 90%;
  height: 90%;
  margin-left: 20px;
}
.courseList_detail {
  width: 100%;
  height: 20%;
  margin-top: 10px;
}
.courseList_listId {
  width: 10%;
  height: 100%;
  margin-left: 10px;
  float: left;

  &--text {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #989898;
  }
}
.courseList_main {
  width: 85%;
  height: 100%;
  margin-left: 5px;
  float: left;

  .courseList_listTitle {
    width: 100%;
    float: left;
    margin-bottom: 5px;

    &--text {
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: #313131;
    }
  }

  .courseList_listTime {
    width: 40%;
    float: left;

    &--text {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #989898;
    }
  }

  .courseList_listNum {
    width: 60%;
    float: left;

    &--text {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #989898;
    }
  }
}
</style>
