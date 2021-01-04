/*
* @Author: 郑丽敏
* @Date: 2020-08-02 17:25:21
 * @Last Modified by: 郑丽敏
 * @Last Modified time: 2020-08-02 17:25:21
*/
<template>
  <div class="hw-item">
    <div class="left">
      <span class="left--num">{{ data.index }}.</span>
    </div>
    <div class="right">
      <div class="right--title">
        <span class="right--title--text">{{ data.title }}</span>
      </div>
      <div class="right--detail">
        <div class="right--detail--deadline">
          <van-icon class="right--detail--deadline--icon" name="underway-o" size="15px" />
          <span class="right--detail--deadline--date">{{ data.deadlineMonth }}/{{ data.deadlineDay }}截止</span>
        </div>
        <div class="right--detail--status">
          <span class="right--detail--status--text">{{ data.status }}</span>
        </div>
        <div class="right--detail--submit">
          <span class="right--detail--submit--text">提交数量：{{ data.submitNum }}/{{ data.unSubmitNum }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'
Vue.use(Icon)
export default {
  name: 'HwItem',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/scss/settings.scss';
  .hw-item {
    display: flex;
    height: 84px;
    font-family: PingFangSC-Regular;
    background: $white;
    border-bottom: 1px solid $body-color;
    .left {
      width: 58px;
      margin-top: 17px;
      &--num {
        display: block;
        text-align: center;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #989898;
      }
    }
    .right {
      &--title {
        margin-top: 17px;
        &--text {
          line-height: 20px;
          font-size: 14px;
          color: #313131;
        }
      }
      &--detail {
        display: flex;
        margin-top: 13px;
        &--deadline {
          position: relative;
          &--icon {
            position: absolute;
            top: 4px;
          }
          &--date {
            margin-left: 22px;
            font-size: 10px;
            color: #989898;
          }
        }
        &--status {
          margin-left: 40px;
          &--text {
            font-size: 10px;
            color: #A12831;
          }
        }
        &--submit {
          margin-left: 43px;
          &--text {
            font-size: 10px;
            color: #313131;
          }
        }
      }
    }
  }
</style>
