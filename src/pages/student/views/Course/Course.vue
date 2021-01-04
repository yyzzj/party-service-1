/*
 * @Author: 庞泽邦
 * @Date: 2020-05-02 17:46:21
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-05 15:43:51
 */
//我的课程页面
<template>
  <div>
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="$router.go(-1)" />
      </template>
      <template #title>
        <span style="color:white">课堂进度</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="shouye" size="22" color="white" @click.stop="$router.push('/home')" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" color="#A12831" animated>
      <van-tab title="学习中">
        <van-tabs v-model="mode" color="#A12831" line-width="0" title-active-color="#A12831">
          <van-tab title="全部" />
          <van-tab title="最新购买" />
          <van-tab title="即将结课" />
          <van-tab title="经常学习" />
        </van-tabs>
        <learning />
      </van-tab>
      <van-tab title="已结束">
        <finish />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// import { getToken } from '@/utils/auth.js'
import Finish from '../../components/Course/Finish'
import Learning from '../../components/Course/Learning'
import Vue from 'vue'
import { Tab, Tabs, Icon, NavBar } from 'vant'

Vue.use(Tab)
  .use(Tabs)
  .use(Icon)
  .use(NavBar)
export default {
  name: 'Course',
  components: {
    'learning': Learning,
    'finish': Finish
  },
  data: () => {
    return {
      active: 0,
      mode: 0
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/scss/_settings.scss";

.van-nav-bar {
  background-color: $main-color;
}
</style>
