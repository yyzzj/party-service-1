/*
* @Author:庞泽邦
* @Date:2020-05-03
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2021-01-05 16:40:28
*/
<template>
  <div>
    <van-nav-bar @click-left="clickLeft">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">活动详情</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="fenxiang" size="18" color="white" />
      </template>
    </van-nav-bar>
    <van-skeleton title :row="18" :loading="loading">
      <activity-detail-middle />
      <div v-if="!isEmpty">
        <van-tabs color="#A12831" swipe-threshold="5" animated>
          <van-tab title="活动介绍">
            <activity-introduce />
          </van-tab>
          <van-tab title="活动流程" />
          <van-tab title="负责人简介">
            <van-skeleton title avatar :row="3" />
            <admin-introduce />
          </van-tab>
          <van-tab title="活动评价" />
        </van-tabs>
        <div style="height:60px" />
        <div class="submit_wrap--container">
          <activity-submit />
        </div>
      </div>
      <div v-else>
        <van-empty image="error" description="暂无此课程详情" />
      </div>
    </van-skeleton>
  </div>
</template>
<script>
import Vue from 'vue'
import ActivityDetailMiddle from '@/pages/student/components/ActivityDetail/Middle'
import ActivityIntroduce from '@/pages/student/components/ActivityDetail/ActivityIntroduce'
import AdminIntroduce from '@/pages/student/components/ActivityDetail/AdminIntroduce'
import ActivitySubmit from '@/pages/student/components/ActivityDetail/ActivitySubmit'
import { NavBar, Icon, Tab, Tabs, Empty, Skeleton } from 'vant'
Vue.use(NavBar)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Empty)
  .use(Skeleton)
export default {
  name: 'ActivityDetail',
  components: {
    ActivityDetailMiddle,
    ActivityIntroduce,
    AdminIntroduce,
    ActivitySubmit
  },
  data() {
    return {
      isEmpty: false,
      loading: true
    }
  },
  mounted() {
    this.loading = false
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
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
