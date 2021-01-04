/*
 * @Author: 庞泽邦
 * @Date: 2020-08-28 16:45:21
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-07 16:53:06
 */
//  教师端我的页面--我的收益组件
<template>
  <div class="mission_wrap--container">
    <div style="font-size: 12px;color: #676767;">我的收益</div>
    <van-row type="flex" justify="center" align="center" style="width:100%,height:100%">
      <van-col span="11">
        <div class="col_top--text">0元</div>
        <div class="col_botom--text">今日收益</div>
      </van-col>
      <van-col style="height:60px;border: 1px solid #F4F6F5;" />
      <van-col span="11">
        <div class="col_top--text">100元</div>
        <div class="col_botom--text">总收益</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Col, Row } from 'vant'

Vue.use(Col)
Vue.use(Row)
export default {
  name: 'MyMoney',
  data: () => {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.mission_wrap--container {
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 25px;
  background: white;
  margin-top: 10px;
  height: 90px;
}
.icon {
  width: 30px;
  height: 30px;
}
.col_botom {
  &--text {
    text-align: center;
    font-size: 12px;
    color: #313131;
    margin-top: 8px;
  }
}
.col_top {
  &--text {
    font-size: 16px;
    color: #a12831;
    text-align: center;
  }
}
</style>
