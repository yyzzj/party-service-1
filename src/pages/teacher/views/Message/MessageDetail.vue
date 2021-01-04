/*
 * @Author: 庞泽邦
 * @Date: 2020-09-07 11:17:24
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-24 09:44:28
 */
// 消息详情页面
<template>
  <div class="ConsultInfo_wrap--container">
    <van-nav-bar @click-left="goBack">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">{{ title }}</span>
      </template>
    </van-nav-bar>
    <SysteamMessage />
    <div style="height:162px" />
    <div class="button_wrap-container">
      <div class="component_wrap--container">
        <input v-model="content" class="input_container" type="text" placeholder="说点什么吧" @keyup.enter="submit">
        <van-button color="#A12831" size="small" round @click.stop="submit">发送</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Tab, Tabs, Button, Toast } from 'vant'
import SysteamMessage from '../../components/MessageDetail/SysteamMessage'

Vue.use(NavBar)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Button)
  .use(Toast)
export default {
  name: 'MessageDetail',
  components: {
    SysteamMessage
  },
  data: () => {
    return {
      title: '',
      info: ['111', '22222'],
      submitArray: [],
      content: '',
      clientHeight: 0
    }
  },
  watch: {
    clientHeight() { // 如果clientHeight 发生改变，这个函数就会运行
      this.changeFixed()
    }
  },
  created() {
    this.title = this.$route.query.doctor
    this.clientHeight = document.body.clientHeight
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    submit() {
      if (this.content === '') {
        Toast.fail('您尚未输入任何内容')
      } else {
        this.submitArray.push(this.content)
        this.content = ''
        this.clientHeight = document.body.clientHeight
      }
    },
    changeFixed() {
      window.scroll(0, this.clientHeight)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.van-nav-bar {
    background-color: $main-color;
}
.ConsultInfo_wrap--container{
    min-height: 100vh;
    background: $bg;
}
.button_wrap-container{
  position: fixed;
  bottom: -1px;
  width: 100%;
  max-width: 600px;
  height: 52px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0;
  border-radius: 5px;
}
.component_wrap--container{
  display:flex;
  justify-content: center;
  align-items:center;
  height:100%;
  padding-right: 20px;
}
.input_container{
    background: #F4F6F5;
    border-radius: 16.5px;
    width: 100%;
    height: 33px;
    padding-left: 10px;
    border: none;
    font-size: 12px;
    color: #989898;
    margin-right: 20px;
    margin-left:20px
}
</style>
