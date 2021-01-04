/*
* @Author: 庞泽邦
* @Date: 2020-07-04 20:45:19
* @Last Modified by: 庞泽邦
* @Last Modified time: 2020-12-08 14:48:20
*/
//教师端登陆页面
<template>
  <div class="login_container">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">教师登录</span>
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
          <van-field v-model="username" left-icon="user-o" placeholder="请输入您的教职员工号" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" align="center" style="margin-top:30px">
        <van-col>
          <van-field v-model="password" left-icon="info-o" placeholder="请输入您的密码" type="password" />
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" align="center" style="margin-top:11px">
        <van-col span="8">
          <!-- <span class="col_regesiter--text" @click="go2Register">教师注册</span> -->
        </van-col>
        <van-col span="8">
          <span class="col_forget--text" @click="goForget">忘记密码</span>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center" align="center" style="margin-top:11px">
        <van-col span="8" style="width:100%">
          <van-button
            color="#68627E"
            style="width:100%;height:40px;margin-top:60px;border-radius:4px"
            @click="login"
          >登录
          </van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Col, Row, Field, CellGroup, Button, Toast } from 'vant'
import { getToken } from '@/utils/auth'

Vue.use(NavBar)
  .use(Icon)
  .use(Col)
  .use(Row)
  .use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Toast)
export default {
  name: 'Login',
  data: () => {
    return {
      password: '',
      username: ''
    }
  },
  mounted() {
  },
  methods: {
    login() {
      const loginForm = {
        username: this.username,
        password: this.password,
        role: 'teacher'
      }
      this.$store
        .dispatch('user/login', loginForm)
        .then(() => {
          this.$store.dispatch('user/getInfo').then(() => {
            this.username = ''
            this.password = ''
            const query = this.$route.query.from
            if (query) {
              this.$router.push({
                path: query
              })
            } else {
              this.$router.push({
                path: '/course'
              })
            }
          })
        })
        .catch(error => {
          Toast.fail(error.data.data)
          console.log(error)
        })
    },
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      if (!getToken('teacher')) {
        Toast.fail('您尚未登录哟')
        return
      } else {
        this.$router.push('/course')
      }
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
  }

  &--text:hover {
    cursor: pointer;
  }
}

.col_forget {
  &--text {
    float: right;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #6d7278;
  }

  &--text:hover {
    cursor: pointer;
  }
}
</style>
