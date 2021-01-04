/*
 * @Author: 庞泽邦
 * @Date: 2020-07-04 20:25:45
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-18 17:36:17
 */
//教师端用户页面

<template>
  <div class="user_wrap--container">
    <userHeader :username="username" />
    <MyMoney />
    <MyOrder />
    <MyTools />
    <div
      style="height:50px"
    />
  </div>
</template>

<script>
import MyTools from '../../components/User/MyTools'
import MyOrder from '../../components/User/MyOrder'
import MyMoney from '../../components/User/MyMoney'
import userHeader from '@/components/userHeader'
import { Toast } from 'vant'
export default {
  name: 'User',
  components: {
    MyTools,
    MyOrder,
    MyMoney,
    userHeader
  },
  data: () => {
    return {
      username: ''
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      // 初始化用户信息
      try {
        const name = window.sessionStorage.getItem('teacher_username')
        if (!name) {
          const data = await this.$store.dispatch('user/getInfo')
          this.username = data.username
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
