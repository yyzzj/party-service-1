/*
* @Author: 杨志杰
* @Date: 2020-05-26
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-01 16:22:59
*/
//个人中心-设置中心页面
<template>
  <div class="settingCenter">
    <van-nav-bar @click-left="goBack" @click-right="goHome">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">设置中心</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="shouye" size="18" color="white" />
      </template>
    </van-nav-bar>
    <van-cell center title="个人资料" to="/personDetail">
      <template #icon>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-xiugai" />
        </svg>
      </template>
    </van-cell>
    <div class="empty" />
    <van-cell center title="意见反馈" to="/feedback">
      <template #icon>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-yijianfankui" />
        </svg>
      </template>
    </van-cell>
    <van-cell center title="联系我们">
      <template #icon>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-lianxi" />
        </svg>
      </template>
    </van-cell>
    <div class="bottom">
      <van-button @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, NavBar, Cell, Button, Toast } from 'vant'

Vue.use(NavBar)
  .use(Icon)
  .use(Cell)
  .use(Button)
export default {
  name: 'SettingCenter',
  methods: {
    // onclick方法
    // 返回上一页
    goBack() {
      this.$router.go(-1)
    },
    // 返回首页
    goHome() {
      this.$router.push({ path: '/home' })
    },
    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/home')
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
    @import '@/scss/_settings.scss';

    .settingCenter {
        background-color: $grey-lighter;
        min-height: 100vh;
        font-family: PingFangSC-Regular;

        .van-nav-bar {
            background-color: $main-color;
        }

        .van-cell {
            height: 54px;
            cursor: pointer;

            .icon {
                width: 20px;
                height: 20px;
            }

            .van-cell__title {
                font-size: 16px;
                margin-left: 10px;
            }
        }

        .empty {
            height: 20px;
        }

        .bottom {
            width: 100%;
            max-width: 600px;
            text-align: center;
            position: fixed;
            bottom: 40px;

            .van-button {
                width: 80%;
                height: 40px;
                color: $white;
                background-color: $main-color;
                border: 1px solid $main-color;
                border-radius: 4px;
            }
        }

    }
</style>
