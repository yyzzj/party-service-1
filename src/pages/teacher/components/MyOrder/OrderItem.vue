/*
* @Author :吴晓斌
* @Date: 2020-09-16
* @Last Modified by: 吴晓斌
* @Last Modified time: 2020-11-03 11:18:23
*/

//个人中心-我的订单-订单卡片组件
<template>
  <div class="order_container">
    <div class="card--top">
      <div class="orderId">
        <span>订单编号：{{ data.out_trade_no }}</span> <!--订单编号-->
      </div>
      <div :class="data.payStatus | orderTypeColorOption(data.payStatus)"> <!--订单状态文字颜色-->
        <span>{{ data.payStatus | orderTypeTextOption(data.payStatus) }}</span> <!--订单状态文字-->
      </div>
    </div>
    <div class="card--content">
      <van-image class="card--image" width="70" height="70" :src="data.image" />
      <div class="card--contentRight">
        <div class="card--title">{{ data.courseName }}</div> <!--课程主题-->
        <div class="card--student">
          <span class="card--studentName">学生</span> <!--上课学生-->
          <span>{{ data.name }}</span>
        </div>
        <div class="card--class">
          <span class="card--classTitle">类型</span>
          <span class="card--classTime">{{ data.classHour }}课时</span> <!--上课时间-->
          <span class="card--course">{{ data.courseLabel }}</span> <!--课程类型-->
        </div>
      </div>
    </div>
    <div class="card--bottom">
      <van-row v-if="data.payStatus===3" type="flex" justify="space-between">
        <van-col class="card--remark">
          <span>备注：</span>
          <span v-if="data.refund_reason!==null" class="card--remarkContent">{{ data.refund_reason }}</span> <!--订单备注-->
          <span v-else class="card--remarkContent">无</span>
        </van-col>
      </van-row>
      <!--已取消-->
      <van-row v-if="data.payStatus===2" type="flex" justify="space-between" calss="card_bottomContainer">
        <van-col span="12" class="card_priceContainer">
          <span>总计：&nbsp;&nbsp;</span>
          <span class="card--price">{{ `￥${data.total_fee}` }}</span> <!--订单价格-->
        </van-col>
        <van-col span="6" class="card_btnContainer">
          <van-button class="card--deleteBtn" size="normal" round @click="deleteOrderHandle(data.out_trade_no)">删除订单</van-button>
        </van-col>
      </van-row>
      <!--待退款-->
      <van-row v-else-if="data.payStatus===3" type="flex" justify="space-between" calss="card_bottomContainer">
        <van-col span="12" class="card_priceContainer">
          <span>已付：&nbsp;&nbsp;</span>
          <span class="card--price">{{ `￥${data.refundFee}` }}</span> <!--订单价格-->
        </van-col>
        <van-col span="6" class="card_btnContainer">
          <van-button class="card--acceptBtn" size="normal" round @click="acceptRefundHandle(data.out_trade_no)">同意</van-button>
        </van-col>
        <van-col span="6" class="card_btnContainer">
          <van-button class="card--rejectBtn" size="normal" round @click="rejecrRefundHandle(data.out_trade_no)">拒绝</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image, Col, Row, Dialog, Toast } from 'vant'
import { updateOrderType, deleteOrderById } from '@/api/teacher/myOrder'

Vue.use(Image)
  .use(Col)
  .use(Row)
  .use(Dialog)
  .use(Toast)

export default {
  name: 'Cancelled',
  filters: {
    orderTypeColorOption(orderType) {
      const map = {
        1: 'completed',
        2: 'cancelled',
        3: 'refundPending'
      }
      return map[orderType]
    },
    orderTypeTextOption(orderType) {
      const map = {
        1: '已完成',
        2: '已取消',
        3: '待退款'
      }
      return map[orderType]
    }
  },
  props: {
    data: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: () => {
    return {
      temp: {
        orderId: ''
      }
    }
  },
  methods: {
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
    // 更新订单类型
    async updateOrderType() {
      try {
        const res = await updateOrderType(this.temp.orderId, this.temp.updateType)
        if (res.code === 200) {
          Toast('操作成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 查看订单
    orderDetail(orderId) {
      window.sessionStorage.setItem('queryByOrderId', orderId)
      this.$router.push('/orderDetail') // 路由跳转到订单详情页面
    },
    // 删除订单
    deleteOrderHandle(orderId) {
      Dialog.confirm({
        title: '警告',
        message: '确定删除此订单?'
      }).then(() => {
        this.temp.orderId = orderId
        this.deleteOrderById()
      }).catch((e) => {
        console.log(e)
      })
    },
    // 同意退款
    acceptRefundHandle(orderId) {
      Dialog.confirm({
        title: '警告',
        message: '确定同意?'
      }).then(() => {
        this.temp.orderId = orderId
        this.temp.updateType = 2 // 订单类型更改为2（已取消状态）
        this.updateOrderType()
      }).catch((e) => {
        console.log(e)
      })
    },
    // 拒绝退款
    rejecrRefundHandle(orderId) {
      Dialog.confirm({
        title: '警告',
        message: '确定拒绝?'
      }).then(() => {
        this.temp.orderId = orderId
        this.temp.updateType = 2 // 订单类型更改为2（已取消状态）
        this.updateOrderType()
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.order_container{
  background: $bg;
  padding-top: 1px;
}
.footer{
  width: 100%;
  height: 20px;
  background: $bg;
  margin-top: 10px;
  text-align: center;
  span {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: $background-grey;
  }
}
.card{
  &--top {
    display: flex;
    background: $white;
    align-items: center;
    justify-content: space-between;
    padding: 10px 17px;
    font-size: 12px;
    .completed{
      color: $success-lighter;
    }
    .cancelled{
      color: $font-color-lighter;
    }
    .refundPending{
      color: #FA6400;
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
    margin-right: 12px;
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
    margin-bottom: 10px;
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
  &--detailBtn, &--deleteBtn, &--rejectBtn, &--acceptBtn{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: $deep-purple;
    width: 90px;
    height: 31px;
    border: 1px solid $deep-purple;
    border-radius: 15.5px;
    line-height: 31px;
  }
  &--acceptBtn{
    background: $deep-purple;
    color: #fff;
  }
}
</style>
