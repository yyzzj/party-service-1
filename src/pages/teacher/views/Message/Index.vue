/*
 * @Author: 庞泽邦
 * @Date: 2020-07-04 20:28:20
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-07 10:54:55
 */

//教师端消息页面

<template>
  <div class="messageItem_wrap--container">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click.stop="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">课堂消息</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="shouye-copy" size="18" color="white" @click.stop="clickRight" />
      </template>
    </van-nav-bar>
    <message-item />
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Tab, Tabs } from 'vant'
import MessageItem from '../../components/Message/MessageItem'
Vue.use(NavBar)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
export default {
  name: 'Message',
  components: {
    'message-item': MessageItem
  },
  data: () => {
    return {}
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.$router.push('/course')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.messageItem_wrap--container{
  height: 100vh;
  background: $bg;
}
.van-nav-bar {
    background-color: $main-color;
}
</style>
