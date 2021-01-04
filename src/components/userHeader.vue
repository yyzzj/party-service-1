/*
 * @Author: 庞泽邦
 * @Date: 2020-07-09 12:39:46
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-18 17:39:17
 */

//个人中心头像
<template>
  <div class="user_header--container">
    <van-row type="flex" justify="space-between" align="center" style="height:100%">
      <van-col span="12">
        <div style="display:flex">
          <van-image
            cover
            round
            width="60px"
            height="60px"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
            style="margin-left:15%"
          />
          <div style="padding-top: 10px;padding-left: 15px;">
            <div v-if="isLogin===false" class="col_middle--loginText loginText_margin--fix" @click.stop="goLogin">点击登录</div>
            <div v-else class="col_middle--loginText">{{ username }}</div>
            <div v-if="isLogin===true" class="col_middle--welcomeText">欢迎回来~</div>
          </div>
        </div>
      </van-col>
      <van-col span="7">
        <van-button size="small" round @click="logout">
          <template #default>
            <van-icon class-prefix="old-icon" name="tuichu" />&nbsp;&nbsp;&nbsp;退出登录
          </template>
        </van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { getToken, getEntry } from '@/utils/auth.js'
import Vue from 'vue'
import { Col, Row, Image, Icon, Button, Toast } from 'vant'

Vue.use(Col)
  .use(Row)
  .use(Image)
  .use(Icon)
  .use(Button)
export default {
  name: 'UserHeader',
  props: {
    username: {
      type: String,
      default: '',
      required: true
    }
  },
  data: () => {
    return {
      isLogin: false,
      entry: ''
    }
  },
  created() {
    // 根据meta信息判断登录入口所对应的token是否存在
    this.entry = getEntry()
    switch (this.entry) {
      case 'teacher':
        if (getToken('teacher')) {
          this.isLogin = true
        }
        break
      case 'student':
        if (getToken('student')) {
          this.isLogin = true
        }
        break
    }
  },
  methods: {
    goLogin() {
      this.$router.push({
        path: '/login',
        query: {
          from: 'user'
        }
      })
    },
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        switch (this.entry) {
          case 'teacher':
            this.$router.push('/course')
            break
          case 'student':
            this.$router.push('/home')
            break
        }
        Toast.success('登出成功')
      })
        .catch(e => {
          Toast.fail('登出失败')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.loginText_margin--fix{
  margin-top: 10px;
}
.user_header--container {
  height: 110px;
  background: white;
}
.col_middle {
  &--loginText {
    font-size: 16px;
    color: #313131;
    font-weight: 600;
  }
  &--welcomeText {
    font-size: 12px;
    color: #989898;
    margin-top: 8px;
  }
}
</style>
