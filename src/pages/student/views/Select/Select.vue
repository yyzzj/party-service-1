/*
 * @Author: 庞泽邦
 * @Date: 2020-05-02 17:46:36
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-18 13:02:10
 */
//选课页面
<template>
  <div class="select_warp--container">
    <van-sticky :offset-top="0">
      <div class="fix_fixed--container">
        <van-tabs v-model="active" color="#A12831" swipe-threshold="5" animated>
          <van-tab title="热门精品" />
          <van-tab title="陶瓷课" />
          <van-tab title="书法课" />
          <van-tab title="绘画课" />
          <van-tab title="更多" />
        </van-tabs>
        <van-tabs v-model="mode" color="#A12831" line-width="0" title-active-color="#A12831">
          <van-tab title="全部" />
          <van-tab title="最新发布" />
          <van-tab title="销量最高" />
          <van-tab>
            <template #title>
              <div @click="show = true">
                <van-icon class-prefix="old-icon" name="shaixuan-copy" />筛选
              </div>
            </template>
          </van-tab>
        </van-tabs>
      </div>
    </van-sticky>
    <component :is="componentName" :course-type="active" :select-type="mode" :price-low="parseFloat(filterType.priceLow)" :price-high="parseFloat(filterType.priceHigh)" :course-time-type="filterType.courseTimeType" :is-confrim="filterType.isConfirm" />
    <SelectPopup v-model="show" v-bind.sync="filterType" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Tab, Tabs, Popup, Field, Col, Row, Button, Sticky } from 'vant'
import hotCourse from '../../components/Select/hotCourse'
import commonCourse from '../../components/Select/commonCourse'
import SelectPopup from '@/components/SelectPopup'
Vue.use(Tab)
  .use(Tabs)
  .use(Popup)
  .use(Field)
  .use(Col)
  .use(Row)
  .use(Button)
  .use(Sticky)
export default {
  name: 'Select',
  components: {
    'hot-course': hotCourse,
    'common-course': commonCourse,
    SelectPopup
  },
  data: () => {
    return {
      active: 0,
      mode: 0,
      componentName: 'hot-course',
      show: false,
      filterType: {
        priceLow: '',
        priceHigh: '',
        courseTimeType: 5,
        isConfirm: false
      }
    }
  },
  watch: {
    active() {
      this.active === 0
        ? (this.componentName = 'hot-course')
        : (this.componentName = 'common-course')
      this.mode = 0
    }
  },
  mounted() {
    this.initActive()
    this.$on('hook:activated', this.initActive)
  },
  methods: {
    initActive() {
      if (!this.$route.query.active) {
        this.active = 0
      } else {
        this.active = this.$route.query.active
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.select_warp {
  &--container {
    min-height: 100vh;
    background: rgb(244, 246, 245);
  }
}
.popup_warap--container{
  max-width: 70vw;
}
.popup_price {
  &--container {
    padding-left: 6%;
    padding-right: 6%;
    margin-top: 3%;
  }
}
.popup_button {
  &--container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 265px;
  }
  &--reset {
    width: 128px;
    height: 48px;
    background: #f6f6f6;
    border-radius: 24px 0 0 24px;
    border: none;
    color: black;
  }
  &--confirm {
    width: 128px;
    height: 48px;
    background: #a12831;
    border-radius: 0 24px 24px 0;
    border: none;
    color: white;
  }
}
.popup_price {
  &--container {
    padding-left: 6%;
    padding-right: 6%;
    margin-top: 3%;
  }
}
.popup_time {
  &--container {
    padding-left: 6%;
    padding-right: 6%;
    margin-top: 52px;
  }
}
.van-cell {
  background: #efefef;
}
.btn_active{
  width:100px;
  background:#FFEDBC;
  color:#FF7113
}
.btn_notActive{
  width:100px;
  background:#EFEFEF
}
.font_active{
color: #FF7113 ;
font-size: 12px;
}
.font_notActive{
color: #989898;
font-size: 12px;
}
</style>
