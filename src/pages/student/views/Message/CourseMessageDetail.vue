/*
 * @Author: 庞泽邦
 * @Date: 2020-05-19 15:42:35
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-14 10:47:04
 */
//课堂消息详情
<template>
  <div class="messageInfo_wrap--container">
    <div class="fix_fixed--container">
      <van-nav-bar>
        <template #left>
          <van-icon name="arrow-left" size="18" color="white" @click.stop="clickLeft" />
        </template>
        <template #title>
          <span style="color:white">{{ title }}</span>
        </template>
        <template #right>
          <van-icon slot="icon" class-prefix="old-icon" name="shouye-copy" size="18" color="white" @click.stop="clickRight" />
        </template>
      </van-nav-bar>
    </div>
    <div>
      <teacher-message :send-name="sendName" :info="info" :is-teacher="isTeacher" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Tab, Tabs } from 'vant'
import TeacherMessage from '../../components/CourseMessageDetail/TeacherMessage'
import { getMessageDetail } from '@/api/student/user'
Vue.use(NavBar)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
export default {
  name: 'CourseMessageDetail',
  components: {
    'teacher-message': TeacherMessage
  },
  data: () => {
    return {
      templateId: undefined,
      title: '',
      sendName: '',
      info: [],
      isTeacher: '0'
    }
  },
  created() {
    this.templateId = this.$route.query.templateId
    this.getMessageDetail(this.templateId)
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.$router.push('/home')
    },
    async getMessageDetail(templateId) {
      try {
        const res = await getMessageDetail(templateId)
        this.sendName = res.data.data[0].sendName
        this.title = res.data.data[0].title
        this.info = res.data.data[0].messageList
        this.isTeacher = res.data.data[0].isTeacher
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
.messageInfo_wrap--container{
    min-height: 100vh;
    background: $bg;

}
</style>
