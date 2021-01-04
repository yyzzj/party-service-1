/*
 * @Author: 庞泽邦
 * @Date: 2020-06-11 16:04:49
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-07-21 11:26:25
 */
//404错误拦截页面
<template>
  <div class="container">
    <div class="image">
      <van-image width="40" height="40" fit="contain" :src="cloud" class="test cloud" />
      <van-image width="40" height="40" fit="contain" :src="cloud" class="test2 cloud2" />
      <van-image width="300" height="300" fit="contain" :src="url" />
    </div>
    <div class="font-container">
      <van-row type="flex" justify="center">
        <van-col span="24" class="first-row slide">您要找的网页丢失啦!</van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col span="24" class="second-row slide">请检查您输入的网址是否正确，或者点击下面的按钮返回首页</van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-button type="info" round class="slide" style="width:100px" :to="path">返回首页</van-button>
      </van-row>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Col, Row, Image, Button } from 'vant'

Vue.use(Col)
  .use(Row)
  .use(Image)
  .use(Button)

export default {
  name: 'NotFound',
  data() {
    return {
      url: require('@/assets/404.png'),
      cloud: require('@/assets/404_cloud.png'),
      path: '/course'
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
@keyframes slide {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes cloud {
  0% {
    top: 100px;
    left: 220px;
    opacity: 0;
  }
  20% {
    top: 110px;
    left: 188px;
    opacity: 1;
  }
  80% {
    top: 170px;
    left: 110px;
    opacity: 0;
  }
  100% {
    top: 180px;
    left: 100px;
    opacity: 0;
  }
}
@keyframes cloud2 {
  0% {
    top: 130px;
    left: 150px;
    opacity: 0;
  }
  20% {
    top: 140px;
    left: 140px;
    opacity: 1;
  }
  80% {
    top: 210px;
    left: 70px;
    opacity: 0;
  }
  100% {
    top: 220px;
    left: 60px;
    opacity: 0;
  }
}
.container {
  background-color: white;
  height: 667px;
  width: 100%;
}
.image {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.font-container {
  text-align: center;
  .first-row {
    font-size: 20px;
    color: #1482f0;
    margin-bottom: 20px;
  }
  .second-row {
    font-size: 13px;
    color: grey;
    margin-bottom: 30px;
  }
}
.slide {
  animation-name: slide;
  animation-duration: 1s;
}
.cloud {
  opacity: 0;
  animation: cloud 2s;
}
.cloud2 {
  opacity: 0;
  animation: cloud2 2s;
}
.test {
  position: absolute;
  top: 180px;
  left: 100px;
  z-index: 2;
}
.test2 {
  position: absolute;
  top: 220px;
  left: 60px;
  z-index: 2;
}
</style>
