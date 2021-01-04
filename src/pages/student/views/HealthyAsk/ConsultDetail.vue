/*
 * @Author: 庞泽邦
 * @Date: 2020-06-02 13:20:58
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-25 10:43:57
 */
//我的咨询详情页
<template>
  <div class="ConsultInfo_wrap--container">
    <van-sticky offset-top="0">
      <div class="fix_fixed--container">
        <van-nav-bar @click-left="goBack" @click-right="showMenu">
          <template #left>
            <van-icon name="arrow-left" size="18" color="white" />
          </template>
          <template #title>
            <span style="color:white">{{ title }}</span>
          </template>
          <template #right>
            <van-icon slot="icon" class-prefix="old-icon" name="caidan" size="18" color="white" />
          </template>
        </van-nav-bar>
      </div>
    </van-sticky>
    <div v-for="(item,index ) in info" :key="item.text+index">
      <student-message v-if="item.senderRole === 1" :is-submit="false" :content="item.text" />
      <doctor-message v-else :content="item.text" />
    </div>
    <div v-for="(item,index ) in submitArray" :key="item.text+index">
      <student-message v-if="item.senderRole === 1" :is-submit="false" :content="item.text" :is-error="item.isError" />
      <doctor-message v-else :content="item.text" />
    </div>
    <!-- <student-message :info-array="submitArray" :is-submit="true" /> -->
    <healthy-popup v-model="showPopup" />
    <div style="height:162px" />
    <div class="bottom_wrap-container">
      <div class="component_wrap--container">
        <input v-model="content" class="input_container" type="text" placeholder="说点什么吧" @keyup.enter="submit">
        <van-button color="#A12831" size="small" round @click.stop="submit">发送</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Tab, Tabs, Button, Toast, Sticky } from 'vant'
import DoctorMessage from '../../components/ConsultDetail/DoctorMessage'
import StudentMessage from '../../components/ConsultDetail/StudentMessage'
import HealthyPopup from '@/components/HealthyPopup'
import { getMessageDetail, sendMessage } from '@/api/student/healthy'
Vue.use(NavBar)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
  .use(Button)
  .use(Toast)
  .use(Sticky)
export default {
  name: 'ConsultDetail',
  components: {
    'doctor-message': DoctorMessage,
    'student-message': StudentMessage,
    'healthy-popup': HealthyPopup
  },
  data: () => {
    return {
      title: '',
      showPopup: false,
      info: [],
      submitArray: [], // 学生发送的消息数组
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
    const doctorName = this.$store.state.healthy.doctorName
    if (doctorName === '') this.title = window.sessionStorage.getItem('doctorName')
    else this.title = doctorName
    this.getMessageDetail()
  },
  beforeUpdate() {
    // 拉到最底部
    this.clientHeight = document.getElementsByClassName('ConsultInfo_wrap--container')[0].clientHeight
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    showMenu() {
      this.showPopup = !this.showPopup
    },
    submit() {
      if (this.content === '') {
        Toast.fail('您尚未输入任何内容')
      } else {
        let receiverId = this.$store.state.healthy.doctorId
        if (receiverId === '') {
          receiverId = window.sessionStorage.getItem('doctorId')
          this.$store.commit('healthy/SET_DOCTORID', receiverId)
        }
        this.sendMessage(this.content, receiverId)
        this.clientHeight = document.body.clientHeight
      }
    },
    changeFixed() {
      window.scroll(0, this.clientHeight)
    },
    async sendMessage(contentText, receiverId) {
      const chatId = this.$store.state.healthy.chatId
      try {
        if (chatId === '' || chatId === -1) {
          const res = await sendMessage(contentText, receiverId)
          this.$store.commit('healthy/SET_CHATID', res.data)
          const unreadMessages = res.unreadMessages
          if (unreadMessages) {
            for (const i of unreadMessages) {
              this.submitArray.push(i)
            }
          }
        } else {
          const res = await sendMessage(contentText, receiverId, chatId)
          const unreadMessages = res.unreadMessages
          if (unreadMessages) {
            for (const i of unreadMessages) {
              this.submitArray.push(i)
            }
          }
        }
        this.submitArray.push({ text: this.content, senderRole: 1, isError: false })
        this.content = ''
      } catch (error) {
        this.submitArray.push({ text: this.content, senderRole: 1, isError: true })
        this.content = ''
        console.log(error)
      }
    },
    async getMessageDetail() {
      try {
        let chatId = this.$store.state.healthy.chatId
        if (chatId === '') {
          chatId = window.sessionStorage.getItem('chatId')
        }
        if (chatId !== -1) {
          const res = await getMessageDetail(chatId)
          this.info = res.data.data.reverse()
        }
      } catch (error) {
        Toast.fail('当前网络状态不佳')
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
.ConsultInfo_wrap--container{
    min-height: 100vh;
    background: $bg;
}
.bottom_wrap-container{
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
    margin-left:20px;
}
</style>
