/*
* @Author: 吴晓斌
* @Date: 2020-09-16
* @Last Modified by: 吴晓斌
* @Last Modified time: 2020-10-31 09:40:45
*/
//个人中心-我的订单-订单详情页面
<template>
  <div>
    <div class="myOrder_container">
      <van-nav-bar>
        <template #left>
          <van-icon slot="icon" class-prefix="old-icon" name="fanhui" size="20" color="white" @click.stop="clickLeft" />
        </template>
        <template #title>
          <span style="color:white">订单详情</span>
        </template>
        <template #right>
          <van-icon slot="icon" class-prefix="old-icon" name="shouye" size="22" color="white" @click.stop="clickRight" />
        </template>
      </van-nav-bar>
      <div class="card--top">
        <div class="orderId">
          <span>订单编号：{{ orderDetail.out_trade_no }}</span> <!--订单编号-->
        </div>
        <div class="orderStatusText">
          <span>已完成</span> <!--订单状态-->
        </div>
      </div>
      <div class="card--content">
        <van-image class="card--image" width="70" height="70" :src="orderDetail.image" />
        <div class="card--contentRight">
          <div class="card--title">{{ orderDetail.courseName }}</div> <!--课程主题-->
          <div class="card--student">
            <span class="card--studentName">学生</span>
            <span>{{ orderDetail.name }}</span> <!--上课学生-->
          </div>
          <div class="card--class">
            <span class="card--classTitle">类型</span>
            <span class="card--classTime">{{ orderDetail.classHour }}课时</span> <!--上课时间-->
            <span class="card--course">{{ orderDetail.courseLabel }}</span> <!--课程类型-->
          </div>
        </div>
      </div>
      <div class="card--bottom">
        <van-row type="flex" justify="space-between">
          <van-col class="card--payTime">
            <span>付款时间：</span>
            <span class="card--payTimeContent">{{ orderDetail.date }}</span> <!--付款时间-->
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-between">
          <van-col class="card--remark">
            <span>备注：</span>
            <span v-if="orderDetail.refund_reason!==null" class="card--remarkContent">{{ orderDetail.refund_reason }}</span> <!--订单备注-->
            <span v-else class="card--remarkContent">无</span>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-between" calss="card_bottomContainer">
          <van-col span="18" class="card_priceContainer">
            <span>总计：&nbsp;&nbsp;</span>
            <span class="card--price">{{ `￥${orderDetail.total_fee}` }}</span> <!--订单价格-->
          </van-col>
          <van-col span="6" class="card_btnContainer">
            <van-button class="card--deletebtn" size="normal" round @click="deleteOrderHandle(orderDetail.out_trade_no)">删除订单</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Button, Col, Row, Tab, Tabs, Dialog, Toast, Image } from 'vant'
import { queryOrderByOrderId, deleteOrderById } from '@/api/teacher/myOrder'

Vue.use(NavBar)
  .use(Icon)
  .use(Button)
  .use(Tab)
  .use(Tabs)
  .use(Col)
  .use(Row)
  .use(Dialog)
  .use(Toast)
  .use(Image)

export default {
  name: 'OrderDetail',
  data: () => {
    return {
      orderDetail: {},
      temp: {
        queryById: '',
        orderId: ''
      }
    }
  },
  created() {
    this.queryOrderByOrderId()
  },
  methods: {
    // 通过订单Id获取订单详情
    async queryOrderByOrderId() {
      this.temp.queryById = window.sessionStorage.getItem('queryByOrderId') // 获取queryByOrderId
      try {
        const res = await queryOrderByOrderId(this.temp.queryById)
        this.orderDetail = res.data
      } catch (e) {
        console.log(e)
      }
    },
    // 删除订单
    async deleteOrderById() {
      try {
        const res = await deleteOrderById(this.temp.orderId)
        if (res.code === 200) {
          Toast('删除成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 点击删除订单按钮的操作
    deleteOrderHandle(orderId) {
      Dialog.confirm({
        title: '警告',
        message: '确定删除此订单?'
      }).then(() => {
        this.temp.orderId = orderId
        this.deleteOrderById()
        this.clickLeft()
      }).catch((e) => {
        console.log(e)
      })
    },
    clickLeft() {
      this.$router.go(-1)
      window.sessionStorage.removeItem('queryByOrderId') // 离开该页面清除sessionStorage数据
    },
    clickRight() {
      this.$router.push('/')
      window.sessionStorage.removeItem('queryByOrderId') // 离开该页面清除sessionStorage数据
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
  .card{
    &--top {
      display: flex;
      background: $white;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      padding: 10px 17px;
      font-size: 12px;

      .orderStatusText {
        color: $success-lighter;
      }
    }
    &--content{
      display: flex;
      background: $white;
    }
    &--contentRight{
      margin-top: 20px;
    }
    &--image{
      width: 70px;
      height: 70px;
      margin: 20px 15px 20px 16px;
    }
    &--title{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: $font-color;
      height: 20px;
    }
    &--student{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: $background-grey;
      margin-top: 8px;
    }
    &--studentName{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: $background-grey;
      margin-right: 10px;
    }
    &--class{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: $background-grey;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    &--classTitle{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: $background-grey;
      margin-right: 10px;
    }
    &--classTime{
      margin-right: 5px;
    }
    &--bottom{
      background: $white;
      margin-top: 1px;
      margin-bottom: 10px;
    }
    &--payTime{
      display: flex;
      align-items: center;
      margin-left: 16px;
      margin-bottom: 20px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
    }
    &--payTimeContent{
      color: $background-grey;
    }
    &--remark{
      display: flex;
      align-items: center;
      margin-left: 16px;
      margin-bottom: 10px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
    }
    &--remarkContent{
      color: $background-grey;
    }
    &_bottomContainer{
      display: flex;
      align-items: center;
      height: 51px;
    }
    &_priceContainer{
      display: flex;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-size: 10px;
      color: $font-color;
      margin-left: 16px;
    }
    &_btnContainer{
      display: flex;
      align-items: center;
      justify-content: end;
      margin-right: 10px;
      height: 51px;
    }
    &--price{
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: $font-color;
    }
    &--deletebtn{
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: $deep-purple;
      width: 90px;
      height: 31px;
      border: 1px solid $deep-purple;
      border-radius: 15.5px;
      line-height: 31px;
    }
  }
}

</style>
