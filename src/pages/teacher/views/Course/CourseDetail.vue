/*
* @Author: 庞泽邦
* @Date: 2020-08-07 15:05:20
* @Last Modified by: 杨志杰
* @Last Modified time: 2020-10-03 20:01:40
*/
//教师端课堂详情页面
<template>
  <div class="courseDetail_wrap--container">
    <van-nav-bar @click-left="clickLeft" @click-right="share">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">课堂详情</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="fenxiang" size="18" color="white" />
      </template>
    </van-nav-bar>
    <CourseIntroduction :course-detail="courseDetail" />
    <van-tabs v-model="active" color="#A12831" swipe-threshold="5" animated @click="tabClick">
      <van-tab title="课程列表">
        <CourseList />
      </van-tab>
      <van-tab title="课程信息">
        <CourseInfo />
      </van-tab>
      <van-tab title="课堂作业">
        <div class="homework_wrap--container">
          <router-link to="publish">
            <div class="homework_icon--warp">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#old-icon-ziyuan1" />
              </svg>
              <div class="homework_text">发布作业</div>
            </div>
          </router-link>
          <router-link to="homeworkCorrecting">
            <div class="homework_icon--warp">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#old-icon-ziyuan" />
              </svg>
              <div class="homework_text">批改作业</div>
            </div>
          </router-link>
        </div>
      </van-tab>
      <van-tab title="学员列表">
        <StudentList :students="studentList" />
      </van-tab>
    </van-tabs>
    <div style="height:60px" />
    <ShareCourse v-model="showPopup" />
  </div>
</template>

<script>
import Vue from 'vue'
import CourseIntroduction from '../../components/CourseDetail/CourseIntroduction'
import CourseList from '../../components/CourseDetail/CourseList'
import StudentList from '../../components/CourseDetail/StudentList'
import CourseInfo from '../../components/CourseDetail/CourseInfo'
import ShareCourse from '@/components/ShareCourse'
import { getCourseDetail, getStudentList } from '@/api/teacher/courseIndex'
import { NavBar, Icon, Tab, Tabs } from 'vant'

Vue.use(NavBar)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
export default {
  name: 'CourseDetail',
  components: {
    CourseIntroduction,
    CourseList,
    StudentList,
    CourseInfo,
    ShareCourse
  },
  data: () => {
    return {
      active: 0,
      showPopup: false,
      courseId: null,
      studentList: [],
      courseDetail: {}
    }
  },
  created() {
    this.courseId = this.$route.query.courseId
    this.getCourseDetail()
  },
  methods: {
    async getCourseDetail() {
      const { data } = await getCourseDetail(this.courseId)
      this.courseDetail = data
    },
    async getStudentList() {
      const { data } = await getStudentList(this.courseId)
      this.studentList = data
    },
    tabClick() {
      this.getStudentList()
    },
    clickLeft() {
      this.$router.go(-1)
    },
    share() {
      this.showPopup = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';

.icon {
  width: 40px;
  height: 40px;
}

.van-nav-bar {
  background-color: $main-color;
}

.courseDetail_wrap--container {
  background: #f5f5f5;
}

.submit_wrap--container {
  position: fixed;
  bottom: -1px;
  width: 100%;
  max-width: 600px;
  height: 60px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0;
  border-radius: 5px;
}

.homework_wrap--container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 110px;
  background: #ffffff;

  .homework_icon--warp {
    margin-left: 30px;
  }

  .homework_text {
    font-size: 12px;
    color: #676767;
    margin-top: 10px;
  }
}
</style>
