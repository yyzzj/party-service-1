/*
 * @Author: 吴晓斌
 * @Date: 2020-01-04 15:04:27
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2021-01-04 16:15:53
 */
//学生端首页热门课推荐组件
<template>
  <div class="hotcourse_container">
    <van-cell is-link to="/select">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="head_course--title">热门课程</span>
      </template>
      <template #default>
        <span class="head_course--value">查看更多</span>
      </template>
    </van-cell>
    <div v-if="!noData && !error">
      <van-skeleton v-for="(item,index) of data.slice(0,5)" :key="index" title avatar :round="true" :row="2" :loading="loading" style="margin-top:20px">
        <van-card thumb="https://img.yzcdn.cn/vant/ipad.jpeg" @click="jump(item.courseId)">
          <template #title>
            <span class="card_title--text">{{ item.courseName }}</span>
          </template>
          <template #desc>
            <div class="card_desc--container">
              <van-tag type="danger" color="#A12831">{{ `￥${item.coursePrice}` }}</van-tag>
            </div>
          </template>
          <template #tags>
            <div class="card_tag--container">
              <span class="card_tag--text">{{ `已有: ${item.payNum}人报名` }}</span>
            </div>
          </template>
          <template #price>
            <div class="card_price--container">
              <van-image
                round
                width="20px"
                height="20px"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
                class="card_price--avatar"
              />
              <div class="card_price--teachername">{{ `讲师: ${item.teacherName}` }}</div>
            </div>
          </template>
          <template #num>
            <van-button color="#A12831" size="small" @click="jump(item.courseId)">立即报名</van-button>
          </template>
        </van-card>
      </van-skeleton>
    </div>
    <div v-if="error" class="noData_tips">
      <van-empty image="network" description="网络请求错误" />
    </div>
    <div v-if="noData" class="noData_tips">
      <van-empty image="error" description="暂无数据" />
    </div>
    <div style="margin-bottom:50px;" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell, CellGroup, Card, Button, Skeleton, Empty, Tag } from 'vant'
import { getHot } from '@/api/student/home.js'
import { jumpToCourseDetail } from '@/mixins'
Vue.use(Cell)
  .use(CellGroup)
  .use(Card)
  .use(Button)
  .use(Skeleton)
  .use(Empty)
  .use(Tag)
export default {
  name: 'HotRecommend',
  // 混入跳转到课程详情逻辑
  mixins: [jumpToCourseDetail],
  data: () => {
    return {
      data: [0, 0, 0, 0, 0],
      loading: true,
      noData: false, // 是否没数据
      error: false// 是否网络错误
    }
  },
  created() {
    this.isHaveStore()
  },
  methods: {
    async getHotInfo() {
      try {
        const res = await getHot()
        this.data = res.data.data
        sessionStorage.setItem('hotCourse', JSON.stringify(res.data.data))
        if (this.data.length === 0) {
          this.noData = true
        }
      } catch (err) {
        setTimeout(() => {
          this.loading = false
          this.error = true
        }, 500)
        console.log(err)
      }
    },
    isHaveStore() {
      const flag = sessionStorage.getItem('hotCourse')
      if (!flag) {
        this.getHotInfo()
      } else {
        this.data = JSON.parse(flag)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.hotcourse_container {
  background: #ffffff;
  margin-top: 9px;
}
.head_course {
  &--value {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #6d7278;
  }
}
.van-card {
  background-color: white;
  margin-top: 0px;
}
.card_title {
  &--text {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
  }
}
.card_desc {
  &--container {
    margin-top: 5px;
  }
}
.card_tag {
  &--container {
    margin-top: 5px;
  }
  &--text {
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #6d7278;
  }
}
.card_price {
  &--container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &--avatar {
    margin-top: 8px;
  }
  &--teachername {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #676767;
    margin-left: 10px;
    text-align: center;
    height: 20px;
    margin-top: 11px;
  }
}
.noData_tips{
  text-align: center;
  padding-top: 50px;
}
</style>
