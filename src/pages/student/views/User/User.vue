/*
 * @Author: 庞泽邦
 * @Date: 2020-05-02 17:45:54
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-14 13:13:30
 */
//用户中心页面
<template>
  <div class="user_wrap--container">
    <user-header :username="username" />
    <mission :un-complete-num="unCompleteNum" :complete-num="completeNum" />
    <my-order />
    <my-tools />
    <div style="height:50px" />
  </div>
</template>

<script>
import MyTools from '../../components/User/MyTools'
import MyOrder from '../../components/User/MyOrder'
import userHeader from '@/components/userHeader'
import Mission from '../../components/User/Mission'
import { getTaskNum } from '@/api/student/user'
import { Toast } from 'vant'
export default {
  name: 'Course',
  components: {
    'my-order': MyOrder,
    'my-tools': MyTools,
    'user-header': userHeader,
    'mission': Mission
  },
  data: () => {
    return {
      username: '',
      unCompleteNum: '',
      completeNum: ''
    }
  },
  mounted() {
    this.getInfo()
    this.getTaskNum()
  },
  methods: {
    async getInfo() {
      // 初始化用户信息
      try {
        const name = window.sessionStorage.getItem('student_username')
        if (!name) {
          const data = await this.$store.dispatch('user/getInfo')
          this.username = data.studentName
        } else {
          this.username = name
        }
      } catch (err) {
        Toast.fail(err)
        await this.$store.dispatch('user/resetToken')
        this.$router.push({
          path: '/login',
          query: {
            from: '/user'
          }
        })
      }
    },
    async getTaskNum() {
      try {
        const unCompleteNum = window.sessionStorage.getItem('unCompleteNum')
        const completeNum = window.sessionStorage.getItem('completeNum')
        if (!unCompleteNum) {
          const studentId = window.sessionStorage.getItem('student_id')
          const res = await getTaskNum(studentId)
          this.unCompleteNum = res.data.data[0]
          this.completeNum = res.data.data[1]
          window.sessionStorage.setItem('unCompleteNum', this.unCompleteNum)
          window.sessionStorage.setItem('completeNum', this.completeNum)
        } else {
          this.unCompleteNum = unCompleteNum
          this.completeNum = completeNum
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.user_wrap--container {
  background: $bg;
  height: 100vh;
  user-select: none;
}
</style>
