/*
* @Author: 杨志杰
* @Date: 2020-05-11 20:54:15
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-17 15:54:44
*/
//学生个人课程详细信息
<template>
  <div class="personalCourseDetail">
    <!--导航栏-->
    <van-nav-bar @click-left="goBack" @click-right="share">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">课程详情</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="fenxiang" size="18" color="white" />
      </template>
    </van-nav-bar>
    <!--课程介绍-->
    <course-introduction class="course-introduction" :course-detail="courseDetail" />
    <!--标签页-->
    <tab
      class="tab"
      :course-list="courseList"
      :course-announcement="courseAnnouncement"
      :coursework="coursework"
    />
    <ShareCourse v-model="showPopup" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, NavBar } from 'vant'

import CourseIntroduction from '@/pages/student/components/PersonalCourseDetail/CourseIntroduction'
import Tab from '@/pages/student/components/PersonalCourseDetail/Tab'
import ShareCourse from '@/components/ShareCourse'

import { getCourseDetail } from '@/api/student/courseDetail.js'
import { getCourseList, getCourseAnnouncement, getCoursework } from '@/api/student/personalCourseDetail'

Vue.use(NavBar)
  .use(Icon)

export default {
  name: 'PersonalCourseDetail',
  components: {
    CourseIntroduction,
    Tab,
    ShareCourse
  },
  data() {
    return {
      courseDetail: {}, // 课程介绍信息
      courseList: [], // 课程列表
      courseAnnouncement: [], // 课程公告
      coursework: [], // 课堂作业
      active: 0,
      showPopup: false
    }
  },
  created() {
    this.getCourseDetail()
    this.getCourseList()
    this.getCourseAnnouncement()
    this.getCoursework()
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    // 异步方法:
    // 获取课程介绍信息
    async getCourseDetail() {
      try {
        const res = await getCourseDetail()
        this.courseDetail = res.data[0]
      } catch (err) {
        console.log(err)
      }
    },
    // 获取课程列表
    async getCourseList() {
      try {
        const res = await getCourseList()
        this.courseList = res.data.array
      } catch (err) {
        console.log(err)
      }
    },
    // 获取课程公告
    async getCourseAnnouncement() {
      try {
        const res = await getCourseAnnouncement()
        this.courseAnnouncement = res.data.array
      } catch (err) {
        console.log(err)
      }
    },
    // 获取课堂作业
    async getCoursework() {
      try {
        const res = await getCoursework()
        this.coursework = res.data.array
      } catch (err) {
        console.log(err)
      }
    },
    share() {
      this.showPopup = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';

.personalCourseDetail {
  min-height: 100vh;
  background-color: $grey-lighter;

  .van-nav-bar {
    background-color: $main-color;
  }

  .tab {
    margin-top: 10px;
  }
}

.popup_wrap--container {
  height: 500px;
  width: 320px;
}
</style>
