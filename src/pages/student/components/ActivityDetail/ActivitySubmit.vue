/*
 * @Author: 庞泽邦
 * @Date: 2020-05-09 14:47:46
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-02 22:14:58
 */
//活动详情页面底部提交按钮
<template>
  <div class="sumbit_wrap--container">
    <div style="width:100%">
      <van-row type="flex" justify="center" align="center">
        <van-col span="8">
          <div style="text-align:center;font-size: 16px;color: #D4828F;">活动</div>
          <div style="text-align:center;font-size: 12px;color: #989898;">{{ `已有${num}人报名` }}</div>
        </van-col>
        <van-col span="16">
          <div style="display:flex;justify-content:flex-end;margin-right:20px">
            <van-button color="#A12831" style="width:150px;border-radius: 4px;">报名参加</van-button>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Col, Row, Button, Dialog } from 'vant'

Vue.use(Row)
  .use(Col)
  .use(Button)
  .use(Dialog)
export default {
  name: 'ActivitySubmit',
  props: {
    num: {
      type: Number,
      default: 102
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.sumbit_wrap{
    &--container{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
    }
}
</style>
