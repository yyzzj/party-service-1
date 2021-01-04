/*
 * @Author: 庞泽邦
 * @Date: 2020-05-01
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-03 10:38:50
 */
//学生端登陆页面
<template>
  <div class="login_container">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">登录</span>
      </template>
      <template #right>
        <van-icon
          slot="icon"
          class-prefix="old-icon"
          name="shouye-copy"
          size="18"
          color="white"
          @click="clickRight"
        />
      </template>
    </van-nav-bar>
    <van-row type="flex" justify="center" align="center" class="row_title--container">
      <van-col class="row_title--text">健康书院</van-col>
    </van-row>
    <div class="input_container">
      <van-row type="flex" justify="center" align="center">
        <van-col>
          <van-field v-model="username" left-icon="user-o" placeholder="请输入您的手机号" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" align="center" style="margin-top:30px">
        <van-col>
          <van-field v-model="password" left-icon="info-o" placeholder="请输入您的密码" type="password" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" align="center" style="margin-top:11px">
        <van-col span="8">
          <span class="col_regesiter--text" @click="go2Register">新生注册</span>
        </van-col>
        <van-col span="8">
          <span class="col_forget--text" @click="goForget">忘记密码</span>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" align="center" style="margin-top:11px">
        <van-col span="8" style="width:100%">
          <van-button
            color="#A12831"
            style="width:100%;height:40px;margin-top:60px;border-radius:4px"
            @click="login"
          >登录</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Col, Row, Field, CellGroup, Button, Toast } from 'vant'

Vue.use(NavBar)
  .use(Icon)
  .use(Col)
  .use(Row)
  .use(Field)
  .use(CellGroup)
  .use(Button)
export default {
  name: 'Login',
  data: () => {
    return {
      password: '',
      username: ''
    }
  },
  methods: {
    login() {
      const loginForm = {
        username: this.username,
        password: this.password,
        role: 'student'
      }
      this.$store
        .dispatch('user/login', loginForm)
        .then(() => {
          this.$store.dispatch('user/getInfo').then(() => {
            this.username = ''
            this.password = ''
            const query = this.$route.query.from
            if (query) {
              // const path = '/' + query
              this.$router.push({
                path: query
              })
                .catch(() => {}) // 兼容vue-router3.0.1版本后抛错
            } else {
              this.$router.push({
                path: '/home'
              })
                .catch(() => {}) // 兼容vue-router3.0.1版本后抛错
            }
          })
            .catch((err) => {
              Toast.fail(err)
            })
        })
        .catch(error => {
          console.log(error)
        })
    },
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.$router.push('/home')
    },
    go2Register() {
      this.$router.push('/register')
    },
    goForget() {
      this.$router.push('/forget')
    }
  }
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
  background-color: #a12831;
}
.login_container {
  height: 667px;
  background: white;
  user-select: none;
}
.row_title {
  &--container {
    margin-top: 66px;
  }
  &--text {
    font-family: PingFangSC-Semibold;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    text-align: center;
  }
}
.van-col {
  width: 100%;
}
.van-cell {
  background: #f6f6f6;
  border-radius: 20px;
  border-radius: 20px;
  width: 100%;
  height: 40px;
}
.input_container {
  margin-top: 60px;
  padding-left: 16%;
  padding-right: 16%;
}
.col_regesiter {
  &--text {
    float: left;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #a12831;
    cursor: pointer;
  }
}
.col_forget {
  &--text {
    float: right;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #6d7278;
    cursor: pointer;
  }
}
</style>
