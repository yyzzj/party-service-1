/*
* @Author:范开杰
* @Date:2020-06-02
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-14 16:40:00
*/
//忘记密码页面
<template>
  <div class="forgetPassword_container">
    <van-nav-bar>
      <template #left>
        <van-icon slot="icon" name="arrow-left" size="20" color="white" @click.stop="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">忘记密码</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="shouye" size="22" color="white" @click.stop="clickRight" />
      </template>
    </van-nav-bar>
    <van-form
      validate-first
      :show-error="false"
      :show-error-message="false"
      scroll-to-error
      @failed="onFailed"
      @submit="submitPwd"
    > <!-- 表单 -->

      <div class="identity_container">
        <div class="identity_title"> <!-- 验证身份标题 -->
          <div class="identity_title--icon" />
          验证身份
        </div>
        <div>
          <van-field
            v-model="identityCard"
            class="identity_validation"
            name="identityCard"
            placeholder="请输入您身份证号码后六位"
            :rules="[{ required: true, validator: identity_asyncValidator }]"
          > <!-- 验证身份输入框 -->
            <template #label>
              <div class="identity_validation--title">身份证</div>
            </template>
            <template #button><!-- 验证状态图标 -->
              <div class="identity_validation--icon">
                <svg v-show="identity_validationTrue" class="icon" aria-hidden="true">
                  <use xlink:href="#old-icon-Group-" />
                </svg>
                <svg v-show="identity_validationFalse" class="icon" aria-hidden="true">
                  <use xlink:href="#old-icon-Group-1" />
                </svg>
              </div>
            </template>
          </van-field>
          <div class="identity_validation--tip"><!-- 验证状态提示 -->
            <span v-show="identity_validationTrue" class="identity_validation--success">{{ identity_tipSuccess }}</span>
            <span v-show="identity_validationFalse" class="identity_validation--failure">{{ identity_tipFailure }}</span>
          </div>
        </div>
      </div>

      <div class="password_container">
        <div class="password_title"> <!-- 验证密码标题 -->
          <div class="password_title--icon" />
          重置密码
        </div>
        <div>
          <van-field
            v-model="pwd"
            class="password_validation"
            name="password"
            type="password"
            placeholder="请设置你的新密码"
            :rules="[{ required: true, validator: password_asyncValidator }]"
          > <!-- 密码输入框 -->
            <template #label>
              <div class="password_validation--pwdtitle">密码</div>
            </template>
            <template #button>
              <div class="password_validation--icon" />
            </template>
          </van-field>

          <van-field
            v-model="againpwd"
            class="password_validation"
            name="againpassword"
            type="password"
            placeholder="请再次确认输入您的密码"
            :rules="[{ required: true, validator: password_asyncValidator }]"
          > <!-- 验证密码输入框 -->
            <template #label>
              <div class="password_validation--againPwdTitle">确认密码</div>
            </template>
            <template #button><!-- 验证状态图标 -->
              <div class="password_validation--icon">
                <svg v-show="password_validationTrue" class="icon" aria-hidden="true">
                  <use xlink:href="#old-icon-Group-" />
                </svg>
                <svg v-show="password_validationFalse" class="icon" aria-hidden="true">
                  <use xlink:href="#old-icon-Group-1" />
                </svg>
              </div>
            </template>
          </van-field>
          <div class="password_validation--tip"><!-- 验证状态提示 -->
            <span v-show="password_validationTrue" class="password_validation--success">{{ password_tipSuccess }}</span>
            <span v-show="password_validationFalse" class="password_validation--failure">{{ password_tipFailure }}</span>
          </div>
        </div>
      </div>
      <div class="forgetPassword_submit--container"><!-- 提交按钮 -->
        <van-button class="forgetPassword_submit" block native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <van-dialog v-model="show" class="dialog" confirm-button-text="去登陆" confirm-button-color="#6D7278" @confirm="goLogin"><!-- 弹窗 -->
      <div class="dialog_container">
        <svg class="icon dialog_icon" aria-hidden="true">
          <use xlink:href="#old-icon-Group-" />
        </svg>
        <div class="dialog_text">
          密码重置成功
        </div>
      </div>
    </van-dialog>

  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Button, Tab, Tabs, Form, Dialog, Field } from 'vant'
Vue.use(NavBar)
  .use(Icon)
  .use(Button)
  .use(Tab)
  .use(Tabs)
  .use(Form)
  .use(Dialog)
  .use(Field)
export default {
  name: 'Forget',
  components: {},
  data: () => {
    return {
      show: false, // 是否显示弹窗
      identityCard: '', // 身份证输入框的值
      identity_validationTrue: false, // 身份证判断验证成功
      identity_validationFalse: false, // 身份证判断验证失败
      identity_tipSuccess: '验证成功！', // 身份证验证成功提示
      identity_tipFailure: '提示: 身份证号码信息不正确!', // 身份证验证失败提示
      pwd: '', // 密码输入框的值
      againpwd: '', // 验证密码输入框的值
      password_validationTrue: false, // 密码判断验证成功
      password_validationFalse: false, // 密码判断验证失败
      password_tipSuccess: '验证成功！', // 密码验证成功提示
      password_tipFailure: '提示：输入两次密码内容前后不一致！' // 密码验证失败提示
    }
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.$router.push('/home')
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo)
    },
    submitPwd() {
      if (this.identity_validationTrue === true && this.password_validationTrue === true) {
        this.show = !this.show
      }
    },
    goLogin() {
      this.$router.push('login')
    },
    identity_asyncValidator(val) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (/^\d{5}[0-9Xx]$/.test(val)) { // 通过正则表达式来判断输入的身份证后6位
            this.identity_validationTrue = true
            this.identity_validationFalse = false
            resolve(true)
          } else {
            this.identity_validationFalse = true
            this.identity_validationTrue = false
            resolve(false)
          }
        }, 200)
      })
    },
    password_asyncValidator(val) {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (this.pwd === this.againpwd) { // 判断两次密码是否一致
            this.password_validationTrue = true
            this.password_validationFalse = false
            resolve(true)
          } else {
            this.password_validationFalse = true
            this.password_validationTrue = false
            resolve(false)
          }
        }, 200)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.van-nav-bar {
  background-color: $main-color;
}
.icon{
    width: 25px;
    height: 25px;
}
.forgetPassword{
  &_container{
    background-color: $white;
    min-height: 100vh;
  }
  &_submit--container{
    position: absolute;
    left: 50%;
    bottom: 77px;
    transform: translateX(-50%);
  }
  &_submit{
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: $white;
      width: 300px;
      height: 40px;
      line-height: 40px;
      background: $main-color;
      border: 1px solid $main-color;
      border-radius: 4px;
  }
}
.dialog{
  width: 260px;
  height: 200px;
  border-radius: 10px;
  &_container{
      display: flex;
      flex-direction:column;
      justify-content: center;
      align-items: center;
  }
  &_icon{
      width: 52.8px;
      height: 52.8px;
      margin-top: 28px;
  }
  &_text{
      font-family: PingFangSC-Regular;
      font-size: 16px;
      color: $font-color;
      margin-top: 13.6px;
      margin-bottom: 23.6px;
      border-bottom: 1px solid #F4F6F5;
  }
}

.identity_container,.password_container{
    background: $white;
}
/deep/ .van-cell:not(:last-child)::after{
    border-bottom: none;
}
/deep/ .van-field{
    &__body{
        display: flex;
        justify-content: space-between;
    }
    &__label{
        width: 80px;
    }
    &__control{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: $gery-middle;
        background: $white-light;
        border-radius: 20px;
        min-width: 223px;
        height: 38px;
        padding-left: 22px;
    }
}

.identity_title,.password_title{
    display: flex;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: $font-color-lighter;
    background: $white;
    padding-top: 20px;
    padding-left: 20px;

    &--icon{
        border-radius: 2px;
        background: $red-tip-color;
        width: 4px;
        height: 17px;
        margin-right: 10px;
    }
}
.identity_validation,.password_validation{
    display: flex;
    align-items: baseline;
    height: 60px;
    padding-top: 11px;

    &--title{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.85);
        width: 42px;
        margin-left: 18px;
    }
    &--icon{
        display: flex;
        align-items: center;
        width: 25px;
        margin-right: 9px;
    }
    &--tip{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        background: $white;
        height: 30px;
        padding-left: 112px;
    }
    &--success{
        color: $success-lighter;
    }
    &--failure{
        color: $main-color;
    }
}

.password_validation{
    &--pwdtitle{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.85);
        width: 42px;
        margin-left: 18px;
    }
    &--againPwdTitle{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: rgba(0,0,0,0.85);
        width: 56px;
        margin-left: 16px;
    }
}

</style>
