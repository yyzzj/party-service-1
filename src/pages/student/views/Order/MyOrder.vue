/*
* @Author:范开杰
* @Date:2020-05-19
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-12 10:49:39
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
    <van-tabs v-model="active" color="#A12831" animated :swipeable="true" title-active-color="#A12831">
      <van-tab title="待支付" title-style="font-size: 12px;font-family: PingFangSC-Regular;">
        <waitting-pay :info="info" />
      </van-tab>
      <van-tab title="已完成" title-style="font-size: 12px;font-family: PingFangSC-Regular;">
        <completed :info="info" />
      </van-tab>
      <van-tab title="已取消" title-style="font-size: 12px;font-family: PingFangSC-Regular;">
        <cancelled :info="info" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import WaittingPay from '../../../student/components/MyOrder/WaittingPay'
import Completed from '../../../student/components/MyOrder/Completed'
import Cancelled from '../../../student/components/MyOrder/Cancelled'
import { getOrder } from '@/api/student/user'
import { NavBar, Icon, Button, Tab, Tabs } from 'vant'

Vue.use(NavBar)
  .use(Icon)
  .use(Button)
  .use(Tab)
  .use(Tabs)
export default {
  name: 'MyOrder',
  components: {
    WaittingPay,
    Completed,
    Cancelled
  },
  data: () => {
    return {
      active: 0,
      waittingpay: [{
        image: 'https://img.yzcdn.cn/vant/cat.jpeg', /* 课程商品图片 */
        title: '精品书法课入门课程', /* 课程商品标题 */
        time: '2020.05.05 20:00:00 开课', /* 课程商品上课时间 */
        classtime: '4课时', /* 课程商品课时 */
        course: '书法', /* 课程商品类型 */
        price: '100' /* 课程商品价格 */
      }, {
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '精品书法课入门课程',
        time: '2020.05.05 20:00:00 开课',
        classtime: '4课时',
        course: '书法',
        price: '100'
      }, {
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '精品书法课入门课程',
        time: '2020.05.05 20:00:00 开课',
        classtime: '4课时',
        course: '书法',
        price: '100'
      }],
      completed: [{
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '精品书法课入门课程',
        time: '2020.05.05 20:00:00 开课',
        classtime: '4课时',
        course: '书法',
        price: '100'
      }],
      cancelled: [{
        image: 'https://img.yzcdn.cn/vant/cat.jpeg',
        title: '精品书法课入门课程',
        time: '2020.05.05 20:00:00 开课',
        classtime: '4课时',
        course: '书法',
        price: '100'
      }],
      info: []
    }
  },
  watch: {
    active() {
      switch (this.active) {
        case 1:
          this.getOrder(1)
          break
        case 2:
          this.getOrder(2)
          break
        default:
          this.getOrder(0)
      }
    }
  },
  created() {
    this.active = this.$route.query.active
    if (this.active === 0) this.getOrder(0)
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.$router.push('/home')
    },
    async getOrder(payStatus) {
      try {
        const res = await getOrder(payStatus)
        this.info = res.data.data
      } catch (error) {
        console.log(error)
      }
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
