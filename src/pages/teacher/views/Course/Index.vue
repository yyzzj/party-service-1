/*
* @Author: 庞泽邦
* @Date: 2020-07-04 20:24:28
* @Last Modified by: 杨志杰
* @Last Modified time: 2020-11-03 09:45:23
*/

//教师端课程页面
<template>
  <div class="course-index">
    <div class="home_header--search">
      <div class="search_wrap--container">
        <div class="search_icon--container">
          <van-icon name="search" color="#E2BBBC" size="20px" />
        </div>
        <div class="search_font--container">
          <input v-model="searchContent" type="text" placeholder="请输入课程名称" style="width:90%;height:90%;border:none;">
        </div>
      </div>
      <van-button class="search_btn" color="transparent" @click="searchDetail">搜索</van-button>
    </div>
    <div style="height:54px" />
    <van-tabs
      v-model="activeIndex"
      color="#A12831"
      line-width="0"
      swipe-threshold="5"
      title-active-color="#A12831"
      @click="tabOnClick"
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
        <div v-for="item in courseList" :key="item.courseId" class="courseList">
          <course-item :data="item" />
        </div>
      </transition-group>
      <!-- 网络错误 -->
      <van-empty v-if="error" image="network" description="网络请求错误" />
    </van-list>
    <!-- 撑开高度 -->
    <div style="height:50px;background:#F6F6F6;" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Search, Tabs, Tab, Button, Icon, List, Empty, Toast } from 'vant'
import CourseItem from '@/pages/teacher/components/Course/CourseItem'
import { listCourse } from '@/api/teacher/courseIndex'

Vue.use(Search)
  .use(Tabs)
  .use(Tab)
  .use(Button)
  .use(Icon)
  .use(List)
  .use(Empty)
  .use(Toast)
export default {
  name: 'Course',
  components: {
    CourseItem
  },
  data() {
    return {
      value: '请输入课堂名称',
      activeIndex: 0,
      courseList: [],
      searchContent: '',
      loading: false, // 加载状态
      finished: false, // 结束状态
      error: false, // 是否请求失败
      totalLength: 0,
      page: 0
    }
  },
  methods: {
    // 获取课程列表信息
    async getCourseList() {
      try {
        this.page++
        // const res = await getCourseIndexList({ status: this.activeIndex, page: this.page })
        const res = await listCourse(this.page, 10, this.activeIndex === 0 ? null : this.activeIndex, null)
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
    searchDetail() {
      this.$router.push('/searchDetail')
    },
    // 标签切换的点击事件
    tabOnClick() {
      [this.page, this.courseList] = [0, []]
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.error = false
      this.onLoad()
    },
    onLoad() {
      this.getCourseList()
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

.course-index {
  background: $white-light;
  min-height: 100vh;
}

.home_header {
  &--container {
    margin: 0 auto;
    background: #9e9a9a;
    box-shadow: 0 2px 2px 0 rgba(143, 143, 143, 0.5);
  }

  &--search {
    position: fixed;
    z-index: 999;
    display: flex;
    max-width: 600px;
    width: 100%;
    justify-content: center;
    align-items: center;
    height: 54px;
    background: #a12831;
  }
}

.search {
  &_wrap--container {
    display: flex;
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    margin-left: 20px;
    height: 34px;
    background-color: #fff;
    border-radius: 17px;
    user-select: none;
  }

  &_icon--container {
    margin-left: 15px;
    margin-top: 5px;
  }

  &_font--container {
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #989898;
    margin-left: 10px;
  }
}
</style>
