/*
* @Author: 庞泽邦
* @Date: 2020-07-04 20:25:21
* @Last Modified by: 吴晓斌
* @Last Modified time: 2020-11-10 09:10:05
*/
// 教师端课程管理页面
<template>
  <div class="courseManage">
    <van-nav-bar>
      <template #title>
        <span style="color:white">课程管理</span>
      </template>
      <template #right>
        <span style="color:white;width:40px" @click="addNew">新增</span>
      </template>
    </van-nav-bar>
    <van-tabs
      v-model="active"
      color="#A12831"
      swipe-threshold="5"
      animated
      @click="tabChange"
    >
      <van-tab title="销售中" />
      <van-tab title="未上架" />
    </van-tabs>
    <van-tabs
      v-model="mode"
      color="#A12831"
      line-width="0"
      swipe-threshold="5"
      title-active-color="#A12831"
      @click="tabChange"
    >
      <van-tab title="全部" />
      <van-tab title="书法课" />
      <van-tab title="绘画课" />
      <van-tab title="陶瓷课" />
      <van-tab title="其他" />
    </van-tabs>
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      finished-text="已经到达底部了噢~"
      @load="onLoad"
    >
      <transition-group
        name="more"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
      >
        <div v-for="item in courseList" :key="item.courseId">
          <course-item :data="item" />
        </div>
      </transition-group>
      <!-- 网络错误 -->
      <van-empty v-if="error" image="network" description="网络请求错误" />
    </van-list>
    <div style="height:65px;background:#f5f5f5" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs, NavBar, List, Empty, Toast } from 'vant'
import CourseItem from '@/pages/teacher/components/CourseManage/CourseItem'
import { getCourseList } from '@/api/teacher/courseManage'

Vue.use(Tab)
  .use(Tabs)
  .use(NavBar)
  .use(List)
  .use(Empty)
  .use(Toast)
export default {
  name: 'CourseManage',
  components: {
    CourseItem
  },
  data() {
    return {
      courseList: [],
      active: 0, // status(课程状态)索引
      mode: 0, // courseType(课程类型)索引
      page: 0, // 课程分页加载的第几页
      size: 4, // 课程分页加载的每页数目
      courseType: 0,
      status: 0,
      totalLength: 0,
      loading: false, // 加载状态
      finished: false, // 结束状态
      error: false // 是否请求失败
    }
  },
  methods: {
    async getCourseList() {
      try {
        this.temp()
        this.page++
        const res = await getCourseList(this.page, this.size, this.courseType, this.status)
        this.courseList = this.courseList.concat(res.data.rows)
        this.totalLength = res.data.total

        this.loading = false
        if (this.courseList.length === this.totalLength) {
          this.finished = true
        }
      } catch (e) {
        this.loading = false
        this.error = true
        Toast.fail('加载出错')
        console.log(e)
      }
    },
    temp() {
      this.courseType = this.active === 1 ? 0 : 1
      this.status = this.mode === 0 ? null : this.mode
    },
    // 标签切换的点击事件
    tabChange() {
      [this.page, this.courseList] = [0, []]
      this.temp()
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.error = false
      this.onLoad()
    },
    onLoad() {
      setTimeout(() => {
        this.getCourseList()
      }, 1000)
    },
    // 动画事件
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      // const delay = el.dataset.index * 200
      window.requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.4s '
        el.style.opacity = 1
        el.classList.add('demo')
        // el.style.animation = 'one-in 1s forwards'
        done()
      })
    },
    // 点击事件
    addNew() {
      this.$router.push('/addCourse')
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes one-in {
  0% {
    margin-top: 30px;
    height: 0%;
  }
  100% {
    margin-top: 0px;
    height: 100%;
  }
}

.demo {
  animation: one-in 1s forwards;
}
.van-nav-bar {
  background-color: #a12831;
}

.courseManage {
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
