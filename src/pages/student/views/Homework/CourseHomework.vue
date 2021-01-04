/*
* @Author:范开杰
* @Date:2020-05-13
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-02 19:45:28
*/
<template>
  <div style="background: #F4F6F5">
    <van-nav-bar>
      <template #left>
        <van-icon slot="icon" class-prefix="old-icon" name="fanhui" size="20" color="white" @click.stop="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">作业详情</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="shouye" size="22" color="white" @click.stop="clickRight" />
      </template>
    </van-nav-bar>
    <homework-message style="margin-bottom:18px" :info="info" />
    <span class="cell_submitTitle">提交作业</span>
    <homework-submit style="margin-top:9px" />
  </div>
</template>

<script>
import Vue from 'vue'
import HomeworkMessage from '../../../student/components/CoureseHomework/HomeworkMessage'
import HomeworkSubmit from '../../../student/components/CoureseHomework/HomeworkSubmit'
import { NavBar, Icon, Button } from 'vant'
import { getHomeworkDeatil } from '@/api/student/user'

Vue.use(NavBar)
  .use(Icon)
  .use(Button)
export default {
  name: 'CourseHomework',
  components: {
    HomeworkMessage,
    HomeworkSubmit
  },
  data: () => {
    return {
      active: 0,
      info: {}
    }
  },
  created() {
    this.getHomeworkDeatil()
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.$router.push('/home')
    },
    async getHomeworkDeatil() {
      try {
        const homeworkId = this.$route.query.homeworkId
        const res = await getHomeworkDeatil(homeworkId)
        this.info = res.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-nav-bar {
  background-color: #a12831;
}
.cell_submitTitle{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #676767;
    margin-left: 19px;
}
</style>
