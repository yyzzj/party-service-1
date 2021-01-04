/*
 * @Author: 吴晓斌
 * @Date: 2020-01-04 15:04:27
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2021-01-04 16:06:06
 */
//学生端首页社区服务组件
<template>
  <div class="container">
    <van-cell is-link>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="head_course--title">社区服务</span>
      </template>
      <template #default>
        <span class="head_course--value">查看更多</span>
      </template>
    </van-cell>
    <div class="home_gird--container">
      <van-grid :column-num="5" class="home_gird--item">
        <van-grid-item>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#old-icon-bianpinghuatubiaosheji-3" />
          </svg>
          <div class="home_gird--font">社区公告</div>
        </van-grid-item>
        <van-grid-item>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#old-icon-bianpinghuatubiaosheji-4" />
          </svg>
          <div class="home_gird--font">小区报修</div>
        </van-grid-item>
        <van-grid-item>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#old-icon-bianpinghuatubiaosheji-1" />
          </svg>
          <div class="home_gird--font">意见反馈</div>
        </van-grid-item>
        <van-grid-item>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#old-icon-bianpinghuatubiaosheji-" />
          </svg>
          <div class="home_gird--font">物业缴费</div>
        </van-grid-item>
        <van-grid-item>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#old-icon-bianpinghuatubiaosheji-2" />
          </svg>
          <div class="home_gird--font">便民号码</div>
        </van-grid-item>
        <van-grid-item>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#old-icon-bianpinghuatubiaosheji-3" />
          </svg>
          <div class="home_gird--font">常用查询</div>
        </van-grid-item>
        <van-grid-item>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#old-icon-bianpinghuatubiaosheji-4" />
          </svg>
          <div class="home_gird--font">手机开门</div>
        </van-grid-item>
        <van-grid-item>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#old-icon-bianpinghuatubiaosheji-1" />
          </svg>
          <div class="home_gird--font">小区活动</div>
        </van-grid-item>
        <van-grid-item>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#old-icon-bianpinghuatubiaosheji-" />
          </svg>
          <div class="home_gird--font">家政维修</div>
        </van-grid-item>
        <van-grid-item>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#old-icon-bianpinghuatubiaosheji-2" />
          </svg>
          <div class="home_gird--font">生活超市</div>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Grid, GridItem, Icon } from 'vant'

Vue.use(Grid)
  .use(GridItem)
  .use(Icon)
export default {
  name: 'CommunityService',
  data: () => {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.container{
  background-color: #fff;
}
.head_course {
  &--value {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #6d7278;
  }
}
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
