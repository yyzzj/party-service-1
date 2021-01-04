/*
 * @Author: 范开杰
 * @Date: 2020-05-19
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2020-11-20 12:42:23
 */
//个人中心-我的订单-已取消组件
<template>
  <div class="cancelled_container"> <!-- 已取消订单信息容器 -->
    <div v-for="(item,index) in info" :key="index">
      <div class="card_cancelled--info"> <!-- 已取消订单信息头部 -->
        <van-image class="card_cancelled--image" width="70" height="70" :src="url" /> <!-- 课程商品图片 -->
        <div class="card_cancelled--inforight">
          <div class="card_cancelled--title">{{ item.courseName }}</div> <!-- 课程标题 -->
          <div class="card_cancelled--time"> <!-- 课程时间 -->
            <span class="card_cancelled--timetitle">时间</span>
            <span>{{ item.date }}</span>
          </div>
          <div class="card_cancelled--selectclass"> <!-- 课程信息 -->
            <span class="card_cancelled--selectclasstitle">类型</span>
            <span>{{ item.classtime }}</span>
            <span>{{ item.course }}</span>
          </div>
        </div>
      </div>
      <div class="card_cancelled--bottom"> <!-- 已取消订单信息底部 -->
        <van-row type="flex" justify="space-between" calss="card_cancelled_bottomcontainer">
          <van-col span="12" class="card_cancelled_pricecontainer">
            <span>总计&nbsp;&nbsp;&#58;</span>
            <span class="card_cancelled--price">{{ `￥${item.totalFee}` }}</span> <!-- 课程价格 -->
          </van-col>
          <van-col span="6" class="card_cancelled_btncontainer">
            <van-button class="card_cancelled--again" size="normal" round>再次购买</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="cancelled_footer" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Image, Col, Row } from 'vant'

Vue.use(Image)
  .use(Col)
  .use(Row)
export default {
  name: 'Cancelled',
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
.cancelled_container{
    background: $bg;
    padding-top: 1px;

}
.cancelled_footer{
    background: $bg;
}
.card_cancelled{
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
        color: $font-color;
    }
    &--again{
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
</style>
