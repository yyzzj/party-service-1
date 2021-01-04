/*
 * @Author: 范开杰
 * @Date: 2020-05-19
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2020-11-20 12:43:05
 */
//个人中心-我的订单-待支付组件
<template>
  <div class="waittingPay_container"> <!-- 待支付订单信息容器 -->
    <div v-if="info.length > 0">
      <div v-for="(item,index) in info" :key="index">
        <div class="card_waittingPay--info"> <!-- 待支付订单信息头部 -->
          <van-image class="card_waittingPay--image" width="70" height="70" :src="url" /><!-- 课程商品图片 -->
          <div class="card_waittingPay--inforight">
            <div class="card_waittingPay--title">{{ item.courseName }}</div> <!-- 课程标题 -->
            <div class="card_waittingPay--time"> <!-- 课程时间 -->
              <span class="card_waittingPay--timetitle">时间</span>
              <span>{{ item.date }}</span>
            </div>
            <div class="card_waittingPay--selectclass"> <!-- 课程信息 -->
              <span class="card_waittingPay--selectclasstitle">类型</span>
              <span>{{ item.classtime }}</span>
              <span>{{ item.course }}</span>
            </div>
          </div>
        </div>
        <div class="card_waittingPay--bottom"> <!-- 待支付订单信息底部 -->
          <van-row type="flex" justify="space-between" calss="card_waittingPay_bottomcontainer">
            <van-col span="8" class="card_waittingPay_pricecontainer">
              <span>总计&nbsp;&nbsp;&#58;</span>
              <span class="card_waittingPay--price">{{ `￥${item.totalFee}` }}</span> <!-- 课程价格 -->
            </van-col>
            <van-col span="12" class="card_waittingPay_btncontainer">
              <van-button class="card_waittingPay--pay" size="normal" round>去支付</van-button>
              <van-button class="card_waittingPay--cancel" size="normal" round>取消订单</van-button>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="empty_container">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-MBEfenggeduosetubiao-gouwuche" />
        </svg>
        <div style="color:#929191;padding:12px">您还没有相关的订单</div>
        <van-button round type="info" color="#A12831" @click="$router.push('/select')">前往选课</van-button>
      </div>
    </div>
    <div class="waittingPay_footer" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Image, Col, Row, Button } from 'vant'

Vue.use(Image)
  .use(Col)
  .use(Row)
  .use(Button)
export default {
  name: 'WaittingPay',
  props: {
    info: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data: () => {
    return {
      url: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.waittingPay_container{
    background: $bg;
    padding-top: 1px;
}
.waittingPay_footer{
    background: $bg;
}
.card_waittingPay{
    &--info{
        display: flex;
        background: $white;
    }
    &--inforight{
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
    &--time{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #989898;
        margin-top: 8px;
    }
    &--timetitle{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: $background-grey;
        margin-right: 10px;
    }
    &--selectclass{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #989898;
        margin-top: 6px;
        margin-bottom: 21px;
    }
    &--selectclasstitle{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: $background-grey;
        margin-right: 10px;
    }
    &--bottom{
        background: $white;
        margin-top: 1px;
        margin-bottom: 10px;
    }
    &_bottomcontainer{
        display: flex;
        align-items: center;
        height: 51px;
    }
    &_pricecontainer{
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 10px;
        color: $font-color;
        margin-left: 16px;
    }
    &_btncontainer{
        display: flex;
        align-items: center;
        justify-content: end;
        margin-right: 22px;
        height: 51px;
    }
    &--price{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: $main-color;
    }
    &--pay{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: $white;
        width: 90px;
        height: 31px;
        background: $deep-purple;
        border: 1px solid $deep-purple;
        border-radius: 15.5px;
        line-height: 31px;
    }
    &--cancel{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: $deep-purple;
        width: 90px;
        height: 31px;
        border: 1px solid $deep-purple;
        border-radius: 15.5px;
        line-height: 31px;
        margin-left: 10px;
    }
}
.empty_container{
  text-align: center;
  margin-top: 20%;
}
</style>
