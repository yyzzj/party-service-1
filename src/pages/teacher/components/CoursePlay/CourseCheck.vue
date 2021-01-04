/*
 * @Author: 庞泽邦
 * @Date: 2020-07-24 10:23:22
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-07-24 12:28:48
 */

//教师端课程播放页面考勤组件

<template>
  <div class="check_wrap--container">
    <van-tabs v-model="active" line-width="0" title-active-color="#313131" title-inactive-color="#989898" animated swipeable>
      <van-tab title="已签到" />
      <van-tab title="未签到" />
    </van-tabs>
    <div v-for="(item,index) in showData" :key="index" class="checkItem_wrap--container">
      <div class="icon_wrap--container">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-icon-test" />
        </svg>
      </div>
      <span class="checkItem_name--text">{{ item.name }}</span>
      <div v-if="item.status===1">
        <span class="checkItem_time">{{ item.time }}</span>
        <span class="checkItem_status--success">已签到</span>
      </div>
      <span v-else class="checkItem_status--fail">未签到</span>
    </div>
  </div>
</template>

<script>
import { getCheckInfo } from '@/api/teacher/coursePlay'
import Vue from 'vue'
import { Tab, Tabs } from 'vant'

Vue.use(Tab)
  .use(Tabs)
export default {
  name: 'CourseCheck',
  data: () => {
    return {
      active: 0,
      arr: []
    }
  },
  computed: {
    showData() {
      if (this.active === 0) {
        return this.arr.filter((item) => item.status === 1)
      } else {
        return this.arr.filter((item) => item.status === 0)
      }
    }
  },
  created() {
    this.getCheck()
  },
  methods: {
    async getCheck() {
      const res = await getCheckInfo()
      this.arr = res.data.array
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.icon{
    width: 30px;
    height: 30px;
}
.info{
    &_button{
        margin-top: 85px;
    }
    &_font--size{
        font-size: 14px;
        color: $font-color;
        margin-top: 20px;
    }
}
.check_wrap--container{
    text-align: center;
    background: white;
}
.checkItem{
    &_wrap--container{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 60px;
        background: #ffffff;
    }
    &_name--text{
        font-size: 14px;
        flex: 1;
        color: #313131;
        padding-left: 15px;
        text-align: initial;
    }
    &_status{
        font-size: 14px;
        margin-right: 30px;
        &--success{
            @extend .checkItem_status;
            color:$course-status-sell
        }
        &--fail{
            @extend .checkItem_status;
            color:$course-status-not-sell
        }
    }
    &_time{
        display: inline-block;
        font-size: 12px;
        color: #989898;
        margin-right: 30px;
    }
}
.icon_wrap--container{
    margin-left: 18px;
}
</style>
