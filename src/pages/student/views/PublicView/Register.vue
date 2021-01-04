/*
 * @Author: 庞泽邦
 * @Date: 2020-05-01
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-14 15:52:17
 */
//学生端注册页面
<template>
  <div class="register_wrap--contanier">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">注册</span>
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
    <div style="padding-left:40px;padding-right:40px">
      <van-form @submit="onSubmit">
        <van-row type="flex" justify="center" align="center">
          <div class="upload_container">
            <van-uploader v-model="fileList" :show-upload="true" :max-count="1">
              <div class="upload_icon--container">
                <van-icon class-prefix="old-icon" name="xiangji" size="30" />
              </div>
              <template #preview-cover="{ file }">
                <div class="preview-cover van-ellipsis">{{ file.name }}</div>
              </template>
            </van-uploader>
          </div>
        </van-row>
        <van-row type="flex" justify="center" align="center">
          <van-col span="6">
            <div style="float:right;font-size: 14px;">姓名：</div>
          </van-col>
          <van-col span="18">
            <van-field
              v-model="username"
              name="用户名"
              placeholder="请输入真实姓名"
              :rules="[{ required: true, message: '请填写姓名' }]"
            />
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" align="center" class="row_margin--top">
          <van-col span="6">
            <div style="float:right;font-size: 14px;">手机号：</div>
          </van-col>
          <van-col span="18">
            <van-field
              v-model="phone"
              name="手机号"
              placeholder="手机号"
              :rules="[{required:true,message:'请填写手机号码'},{validator, message: '手机号码格式不正确' }]"
            />
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" align="center" class="row_margin--top">
          <van-col span="6">
            <div style="float:right;font-size: 14px;">验证码：</div>
          </van-col>
          <van-col span="12">
            <van-field
              v-model="validate"
              name="验证码"
              placeholder="验证码"
              :rules="[{ required: true, message: '请填写验证码' }]"
            />
          </van-col>
          <van-col span="6" style="margin-left:10px">
            <van-button color="#A12831" size="small" native-type="button">发送验证码</van-button>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" align="center" class="row_margin--top">
          <van-col span="6">
            <div style="float:right;font-size: 14px;">性别：</div>
          </van-col>
          <van-col span="18">
            <van-radio-group v-model="radio" direction="horizontal" checked-color="#A12831">
              <van-radio name="1" shape="square" style="margin-left:17px">男</van-radio>
              <van-radio name="2" shape="square" style="margin-left:17px">女</van-radio>
            </van-radio-group>
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" align="center" class="row_margin--top">
          <van-col span="6">
            <div style="float:right;font-size: 14px;">密码：</div>
          </van-col>
          <van-col span="18">
            <van-field
              v-model="password"
              type="password"
              name="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
          </van-col>
        </van-row>
        <van-row type="flex" justify="center" align="center" class="row_margin--top">
          <van-col span="6">
            <div style="float:right;font-size: 14px;">确认密码：</div>
          </van-col>
          <van-col span="18">
            <van-field
              v-model="confirmPassword"
              type="password"
              name="确认密码"
              placeholder="确认密码"
              :rules="[{ required: true, message: '请再次确认密码' }]"
            />
          </van-col>
        </van-row>
        <van-row
          type="flex"
          justify="center"
          align="center"
          style="margin-top:30px;margin-bottom:30px"
        >
          <van-col>
            <span>新生注册，已有账号?</span>
            <span style="margin-left:30px;color:#A12831" @click="go2Login">去登录</span>
          </van-col>
        </van-row>
        <div style="margin: 16px;margin-top:35px">
          <van-button block native-type="submit" color="#A12831" style="border-radius: 4px;">提交</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { tel } from '@/utils/validate.js'
import Vue from 'vue'
import {
  NavBar,
  Icon,
  Col,
  Row,
  Field,
  CellGroup,
  Button,
  Form,
  Radio,
  RadioGroup,
  Uploader
} from 'vant'

Vue.use(NavBar)
  .use(Icon)
  .use(Col)
  .use(Row)
  .use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Form)
  .use(RadioGroup)
  .use(Radio)
  .use(Uploader)
export default {
  name: 'Register',
  data: () => {
    return {
      fileList: undefined,
      username: '',
      phone: '',
      validate: '',
      radio: '1',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.$router.push('/home')
    },
    onSubmit() {},
    validator(val) {
      return tel(val)
    },
    go2Login() {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.register_wrap--contanier{
  height: 100%;
  background: white;
  user-select: none;
}
.van-nav-bar {
  background-color: $main-color;
}
.van-field {
  background: #f6f6f6;
  border-radius: 20px;
  border-radius: 20px;
}
.row_margin--top {
  margin-top: 20px;
}
.upload_icon{
  &--container{
    display:flex;
    justify-content:center;
    align-items:center;
    background: #F6F6F6;border: 1px solid rgba(0,0,0,0.25);
    height:80px;width:80px;
    border-radius:40px;
    margin-bottom:25px;
  }
}
.upload_container{
  height: 130px;
}
/deep/ .van-uploader__preview-image{
  border:1px solid rgba(0, 0, 0, 0.25);
  border-radius: 50%;
}
/deep/ .van-uploader__wrapper{
  padding-top: 25px;
}
</style>
