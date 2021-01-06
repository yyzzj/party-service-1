/*
 * @Author: 吴晓斌
 * @Date: 2020-01-04 15:04:27
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2021-01-06 09:39:33
 */
//学生端首页社区活动组件
<template>
  <div class="container">
    <van-cell is-link to="/activity">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="head_course--title">热门活动</span>
      </template>
      <template #default>
        <span class="head_course--value">查看更多</span>
      </template>
    </van-cell>
    <div v-if="!noData && !error" class="activityBox">
      <van-grid :border="false" :column-num="2">
        <van-grid-item v-for="(item, index) in activityList" :key="index" @click="toActivityDetail(item.id)">
          <div class="picContent__title">{{ item.title }}</div>
          <van-image :src="item.pic" fit="cover" height="150" />
        </van-grid-item>
      </van-grid>
    </div>
    <div v-if="error" class="noData_tips">
      <van-empty image="network" description="网络请求错误" />
    </div>
    <div v-if="noData" class="noData_tips">
      <van-empty image="error" description="暂无数据" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Grid, GridItem, Icon } from 'vant'

Vue.use(Grid)
  .use(GridItem)
  .use(Icon)
export default {
  name: 'CommunityService',
  data: () => {
    return {
      noData: false, // 是否没数据
      error: false, // 是否网络错误
      activityList: [
        {
          id: 156,
          title: '社区卫生清洁活动',
          pic: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1507047492,2245874742&fm=26&gp=0.jpg',
          detail: ''
        },
        {
          id: 157,
          title: '社区温馨家访活动',
          pic: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1403941441,3620010516&fm=26&gp=0.jpg',
          detail: ''
        }
      ]
    }
  },
  created() {
  },
  methods: {
    toActivityDetail(activityId) {
      this.$router.push({
        path: '/activityDetail',
        query: {
          activityId
        }
      }).catch(() => { })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  background-color: #fff;
}
.head_course {
  &--value {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #6d7278;
  }
}
.activityBox{
  width: 95%;
  margin: 0 auto;
}
.van-image{
  opacity: 0.8;
  position: relative;
  cursor: pointer;
}
.van-image:hover{
  opacity: 0.5;
  position: relative;
  transition: 0.5s all;
}
.picContent__title{
  z-index: 1;
  position: absolute;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
}

</style>
