/*
 * @Author: 庞泽邦
 * @Date: 2020-05-01
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-07 21:11:45
 */
//用户功能宫格
<template>
  <div class="home_gird--container">
    <van-grid :column-num="5" class="home_gird--item">
      <van-grid-item :to="{path:'/select',query:{active:0}}">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-bianpinghuatubiaosheji-3" />
        </svg>
        <div class="home_gird--font">精品课</div>
      </van-grid-item>
      <van-grid-item :to="{path:'/select',query:{active:2}}">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-bianpinghuatubiaosheji-4" />
        </svg>
        <div class="home_gird--font">书法</div>
      </van-grid-item>
      <van-grid-item :to="{path:'/select',query:{active:3}}">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-bianpinghuatubiaosheji-1" />
        </svg>
        <div class="home_gird--font">绘画</div>
      </van-grid-item>
      <van-grid-item :to="{path:'/select',query:{active:1}}">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-bianpinghuatubiaosheji-" />
        </svg>
        <div class="home_gird--font">陶瓷</div>
      </van-grid-item>
      <van-grid-item :to="{path:'/select',query:{active:4}}">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-bianpinghuatubiaosheji-2" />
        </svg>
        <div class="home_gird--font">更多热门</div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import Vue from 'vue'
import { Grid, GridItem, Icon } from 'vant'

Vue.use(Grid)
  .use(GridItem)
  .use(Icon)
export default {
  name: 'UserGird',
  data: () => {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.home_gird {
  &--container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #ffffff;
    box-shadow: 0 1px 2px 0 rgba(206, 206, 206, 0.5);
    user-select: none;
  }
  &--item {
    width: 100%;
    height: 100%;
  }
  &--font {
    margin-top: 10px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
  }
}
.icon {
  width: 40px;
  height: 40px;
}
</style>
