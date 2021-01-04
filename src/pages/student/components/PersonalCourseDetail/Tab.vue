/*
* @Author: 杨志杰
* @Date: 2020-05-12 20:54:15
* @Last Modified by: 杨志杰
* @Last Modified time: 2020-08-09 16:36:20
*/
//个人课程详情标签页组件
<template>
  <div class="tab">
    <van-tabs v-model="active" color="#A12831" swipe-threshold="5" animated>
      <van-tab title="课程列表">
        <course-list-item v-for="(item,i) in courseList" :key="i" :item-data="item" />
      </van-tab>
      <van-tab title="课程公告">
        <course-announcement-item v-for="(item,i) in courseAnnouncement" :key="i" :item-data="item" />
      </van-tab>
      <van-tab title="课堂作业">
        <coursework-item v-for="(item,i) in coursework" :key="i" :item-data="item" />
      </van-tab>
      <van-tab title="学员评价">
        <course-evaluation />
      </van-tab>
    </van-tabs>
    <div class="nothing">
      没有更多内容了~
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

import CourseListItem from './TabItem/CourseListItem'
import CourseAnnouncementItem from './TabItem/CourseAnnouncementItem'
import CourseworkItem from './TabItem/CourseworkItem'
import CourseEvaluation from '@/pages/student/components/courseDetail/CourseEvaluation'

import { Tab, Tabs } from 'vant'

Vue.use(Tab)
  .use(Tabs)
export default {
  name: 'Tab',
  components: {
    CourseListItem,
    CourseAnnouncementItem,
    CourseworkItem,
    CourseEvaluation
  },
  props: {
    courseList: {
      type: Array,
      default() {
        return []
      }
    },
    courseAnnouncement: {
      type: Array,
      default() {
        return []
      }
    },
    coursework: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data: () => {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';

.tab {
  .nothing {
    margin-top: 2px;
    width: 100%;
    height: 45px;

    font: {
      family: PingFangSC-Regular;
      size: 12px;
    }
    color: $grey;

    background-color: $white;
    text-align: center;
    line-height: 45px;
  }

  .courseEvaluation_container {
    margin-top: 1px;
  }
}
</style>
