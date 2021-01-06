/*
 * @Author: 范开杰
 * @Date: 2020-05-05
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-14 13:07:45
 */
//活动详情负责人简介组件
<template>
  <div class="adminIntroduce_container"> <!-- 负责人容器 -->
    <van-image
      round
      width="30px"
      height="30px"
      :src="imgSrc"
      class="cell_adminInfo--image"
    /> <!-- 负责人头像 -->
    <div class="cell_adminInfo--name">{{ adminName }}</div> <!-- 负责人姓名 -->
    <div class="cell_adminInfo--label">{{ label }}</div> <!-- 负责人介绍 -->
    <div class="cell_adminInfo--phoneNum">{{ `联系电话：${phoneNum}` }}</div> <!-- 负责人联系电话 -->
  </div>
</template>

<script>
import Vue from 'vue'
import { Image } from 'vant'

Vue.use(Image)
export default {
  name: 'AdminIntroduce',
  props: {
    adminName: {
      type: String,
      default: '张余歌'
    },
    label: {
      type: String,
      default: '没错，我就是海绵宝宝里面那个章鱼哥。'
    },
    phoneNum: {
      type: String,
      default: '1233211234567'
    }
  },
  data: () => {
    return {
      imgSrc: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1677977126,1881686609&fm=26&gp=0.jpg' // 负责人头像地址
    }
  }
}
</script>

<style lang="scss" scoped>
.adminIntroduce_container {
  height: 188px;
  background: white;
}
.cell_adminInfo {
  &--image {
    margin-top: 17px;
    margin-left: 17px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: white;
    float: left;
  }
  &--name {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #68627e;
    margin-top: 22px;
    margin-left: 15px;
    line-height: 20px;
    float: left;
  }
  &--label {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #313131;
    margin: 13px 49px 0px 62px;
    line-height: 17px;
    float: left;
    clear: both;
  }
  &--phoneNum {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    margin: 13px 49px 26px 62px;
    line-height: 17px;
    color: #f12323;
    float: left;
    clear: both;
  }
}
</style>
