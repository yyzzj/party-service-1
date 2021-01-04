/*
* @Author:庞泽邦
* @Date:2020-05-03
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 18:31:03
*/
<template>
  <div>
    <van-nav-bar @click-left="clickLeft" @click-right="share">
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
    <van-skeleton title :row="18" :loading="loading">
      <div v-if="!isEmpty">
        <course-detail-middle :course-info="courseInfo" />
        <van-tabs v-model="active" color="#A12831" swipe-threshold="5" animated>
          <van-tab title="课程介绍">
            <course-intro :course-intro-text="courseInfo.courseSpecificIntroduction" />
          </van-tab>
          <van-tab title="课程列表">
            <course-list :course-list="courseList" />
          </van-tab>
          <van-tab title="主讲老师">
            <course-teacher :teacher-name="courseInfo.teacherName" :label="courseInfo.teacherIntroduction" />
          </van-tab>
          <van-tab title="学员评价">
            <course-evaluation :comment-list="commentList" />
          </van-tab>
        </van-tabs>
        <div style="height:60px" />
        <div class="submit_wrap--container">
          <course-submit :num="courseInfo.payNum" :price="courseInfo.coursePrice" />
        </div>
        <ShareCourse v-model="showPopup" :price="courseInfo.coursePrice" :course-name="courseInfo.courseName" :num="courseInfo.payNum" />
      </div>
      <div v-else>
        <van-empty image="error" description="暂无此课程详情" />
      </div>
    </van-skeleton>
  </div>
</template>
<script>
import Vue from 'vue'
import CourseDetailMiddle from '@/pages/student/components/courseDetail/Middle'
import CourseIntro from '../../../student/components/courseDetail/CourseIntro'
import CourseList from '../../../student/components/courseDetail/CourseList'
import CourseTeacher from '../../../student/components/courseDetail/CourseTeacher'
import CourseEvaluation from '../../../student/components/courseDetail/CourseEvaluation'
import CourseSubmit from '../../../student/components/courseDetail/CourseSubmit'
import ShareCourse from '@/components/ShareCourse'
import { getCourseDetail } from '@/api/student/courseDetail'

import { NavBar, Icon, Tab, Tabs, Empty, Skeleton } from 'vant'

Vue.use(NavBar)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Empty)
  .use(Skeleton)
export default {
  name: 'CourseDetail',
  components: {
    CourseDetailMiddle,
    CourseIntro,
    CourseList,
    CourseTeacher,
    CourseEvaluation,
    CourseSubmit,
    ShareCourse
  },
  data: () => {
    return {
      active: 0,
      showPopup: false,
      courseInfo: {},
      courseList: [],
      commentList: [],
      isEmpty: false,
      loading: true
    }
  },
  created() {
    this.getCourseDetail()
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    },
    share() {
      this.showPopup = true
    },
    async getCourseDetail() {
      try {
        const courseId = this.$route.query.courseId || ''
        const res = await getCourseDetail(courseId)
        if (!res.data) {
          this.isEmpty = true
        } else {
          this.courseInfo = res.data
          this.courseList = res.data.elderLessonDtoList
          this.commentList = res.data.contentDtoList
        }
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.van-nav-bar {
  background-color: $main-color;
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
</style>
