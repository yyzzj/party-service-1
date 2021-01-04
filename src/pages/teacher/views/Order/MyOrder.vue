/*
* @Author: 吴晓斌
* @Date: 2020-09-16
* @Last Modified by: 吴晓斌
* @Last Modified time: 2020-10-31 09:28:23
*/
//个人中心-我的订单页面
<template>
  <div class="myOrder_container">
    <van-nav-bar>
      <template #left>
        <van-icon slot="icon" class-prefix="old-icon" name="fanhui" size="20" color="white" @click.stop="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">我的订单</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="shouye" size="22" color="white" @click.stop="clickRight" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" color="#A12831" animated :swipeable="true" title-active-color="#A12831" @click="tabChange">
      <van-tab title="已完成" title-style="font-size: 12px;font-family: PingFangSC-Regular;" />
      <van-tab title="待退款" title-style="font-size: 12px;font-family: PingFangSC-Regular;" />
      <van-tab title="已取消" title-style="font-size: 12px;font-family: PingFangSC-Regular;" />
    </van-tabs>
    <div v-if="active===0">
      <completed />
    </div>
    <div v-else>
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        finished-text="已经到达底部了噢~"
        @onload="onLoad"
      >
        <div v-for="item in orderList" :key="item.out_trade_no">
          <order-item :data="item" />
        </div>
        <!-- 网络错误 -->
        <van-empty v-if="error" image="network" description="网络请求错误" />
      </van-list>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Button, Tab, Tabs, List, Toast, Empty } from 'vant'
import Completed from '@/pages/teacher/components/MyOrder/Completed'
import OrderItem from '@/pages/teacher/components/MyOrder/OrderItem'
import { queryOrderByTeacherId } from '@/api/teacher/myOrder'

Vue.use(NavBar)
  .use(Icon)
  .use(Button)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(Toast)
  .use(Empty)

export default {
  name: 'MyOrder',
  components: {
    Completed,
    OrderItem
  },
  data: () => {
    return {
      active: '',
      orderList: null,
      temp: {
        teacherId: '',
        type: ''
      },
      loading: false, // 加载状态
      finished: false, // 结束状态
      error: false // 是否请求失败
    }
  },
  created() {
    this.active = this.$route.query.active
    this.temp.teacherId = window.sessionStorage.getItem('teacher_Id')
    this.queryOrderByTeacherId()
  },
  methods: {
    tabChange() {
      switch (this.active) {
        case 1: this.temp.type = 3
          break
        case 2: this.temp.type = 2
          break
      }
      this.orderList = []
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.error = false
      this.onLoad()
    },
    // 获取全部订单列表
    async queryOrderByTeacherId() {
      try {
        const res = await queryOrderByTeacherId(this.temp.teacherId, this.temp.type)
        this.orderList = res.data
        this.finished = true
      } catch (e) {
        this.loading = false
        this.error = true
        Toast.fail('加载出错')
        console.log(e)
      }
    },
    onLoad() {
      setTimeout(() => {
        this.queryOrderByTeacherId()
      }, 1000)
    },
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.van-nav-bar {
  background-color: $main-color;
}

.myOrder_container{
  background-color: $bg;
  min-height: 100vh;
}
</style>
