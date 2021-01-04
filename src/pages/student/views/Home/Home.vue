/*
 * @Author: 庞泽邦
 * @Date: 2020-05-01
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-03 10:38:46
 */
//学生端首页页面
<template>
  <div class="student_home--container">
    <van-sticky class="van-sticky--fixed">
      <van-row class="home_header--container" type="flex" justify="center" align="center">
        <van-col span="6">
          <div class="home_header--title">健康书院</div>
        </van-col>
        <van-col span="18">
          <div class="home_header--search">
            <div class="search_wrap--container">
              <div class="search_icon--container">
                <van-icon name="search" color="#E2BBBC" size="20px" />
              </div>
              <div class="search_font--container" @click="gosearch">请输入感兴趣的课程名称</div>
            </div>
          </div>
        </van-col>
      </van-row>
    </van-sticky>
    <div class="swipr_wrap--container">
      <van-swipe :autoplay="3000" height="155" indicator-color="#6C6C6C" stop-propagation>
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <van-image v-lazy="image" height="150" :src="image" fit="fill" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <user-gird />
    <free-recommend />
    <hot-recommend />
  </div>
</template>

<script>
import Vue from 'vue'
import { Col, Row, Search, Swipe, SwipeItem, Lazyload, Image as VanImage, Sticky, Icon } from 'vant'
import userGird from '../../components/Home/userGird'
import freeRecommend from '../../components/Home/freeRecommend'
import hotRecommend from '../../components/Home/hotRecommend'

Vue.use(Col)
  .use(Row)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(VanImage)
  .use(Sticky)
  .use(Icon)
export default {
  name: 'Home',
  components: {
    'userGird': userGird,
    'freeRecommend': freeRecommend,
    'hotRecommend': hotRecommend
  },
  data: () => {
    return {
      value: '',
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      girdItem: []
    }
  },
  created() {

  },
  methods: {
    gosearch() {
      this.$router.push('/homesearch')
    }
  }
}
</script>
<style lang="scss" scoped>
.student_home--container{
    background: rgb(244, 246, 245);
}
.home_header {
  &--container {
    max-width: 600px;
    margin:0 auto;
    background: #a12831;
    box-shadow: 0 2px 2px 0 rgba(143, 143, 143, 0.5);
  }
  &--title {
    font-family: ShanghaiFace-Rock-BoldGB-Bold;
    font-size: 18px;
    color: #ffffff;
    text-align: center;
  }
  &--search{
    display:flex;
    justify-content:center;
    align-items:center;
    height:54px;
    padding-right: 20px;
  }
}
.search{
  &_wrap--container{
    display:flex;
    justify-content:flex-start;
    align-items:center;
    width: 100%;
    height:34px;
    background:#B14C53;
    border-radius: 17px;
    user-select: none;
  }
  &_icon--container{
    margin-left: 15px;
    margin-top: 5px;
  }
  &_font--container{
    font-size: 14px;
    color: #E2BBBC;
    margin-left: 10px;
  }
}
.van-search__content {
  background: #b14c53;
  color: #b14c53;
}
.van-sticky--fixed{
  position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 99;
}
.swipr_wrap--container{
  margin-top: 54px;
}
.placeholder_color{
  ::-webkit-input-placeholder { /* WebKit browsers */ color: #E2BBBC;}
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */  color: #E2BBBC;}
  ::-moz-placeholder { /* Mozilla Firefox 19+ */  color: #E2BBBC;}
  :-ms-input-placeholder { /* Internet Explorer 10+ */  color: #E2BBBC;}
}
.field-color /deep/ .van-field__control{
  color:#E2BBBC;
}
</style>
