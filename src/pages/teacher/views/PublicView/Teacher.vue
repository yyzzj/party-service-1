/*
 * @Author: 庞泽邦
 * @Date: 2020-07-04 20:19:47
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-08-28 16:49:56
 */
//教师端底部嵌套路由导航栏
<template>
  <div class="teacher_navbar--container">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <div class="fixed_tabbar--container">
      <van-tabbar active-color="#A12831" inactive-color="#000" route :fixed="false" class="fix_pc--container">
        <van-tabbar-item to="/course">
          <span>课堂</span>
          <template #icon>
            <van-icon slot="icon" class-prefix="old-icon" name="shouye" size="25" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/courseManage">
          <span>课程管理</span>
          <template #icon>
            <van-icon slot="icon" class-prefix="old-icon" name="fenlei" size="25" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/message">
          <span>消息</span>
          <template #icon>
            <van-icon slot="icon" class-prefix="old-icon" name="xiaoxi2" size="25" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item to="/user">
          <span>我的</span>
          <template #icon>
            <van-icon slot="icon" class-prefix="old-icon" name="geren" size="25" />
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
  name: 'Teacher',
  data: () => {
    return {}
  },
  methods: {

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
