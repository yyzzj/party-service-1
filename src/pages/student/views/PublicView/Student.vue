/*
 * @Author: 庞泽邦
 * @Date: 2020-05-01
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-05 14:17:31
 */
//学生端底部嵌套路由导航栏
<template>
  <div class="student_navbar--container">
    <transition name="fade" mode="out-in">
      <keep-alive :include="['Home','Select','Course']">
        <router-view />
      </keep-alive>
    </transition>
    <div class="fixed_tabbar--container">
      <van-tabbar active-color="#A12831" inactive-color="#000" route :fixed="false" class="fix_pc--container">
        <van-tabbar-item to="/home">
          <span>首页</span>
          <template #icon>
            <van-icon slot="icon" class-prefix="old-icon" name="shouye" size="25" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/select">
          <span>选课</span>
          <template #icon>
            <van-icon slot="icon" class-prefix="old-icon" name="fenlei" size="25" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/healthy">
          <span>健康</span>
          <template #icon>
            <van-icon slot="icon" class-prefix="old-icon" name="jiankang" size="25" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/user">
          <span>我的</span>
          <template #icon>
            <van-icon slot="icon" class-prefix="old-icon" name="wode" size="25" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabbarItem, Icon } from 'vant'

Vue.use(Tabbar).use(TabbarItem).use(Icon)
export default {
  name: 'Student',
  data: () => {
    return {
    }
  },
  methods: {
    // 此方法来解决vue-router 3.1版本后NavigationCancelledError错误
    // 详情看 https://github.com/vuejs/vue-router/releases/tag/v3.1.0
    toCourse() {
      this.$router.push('/course').catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.fixed_tabbar--container{
position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
}
.fix_pc--container{
  max-width: 600px;
  margin: 0 auto;
}
</style>
