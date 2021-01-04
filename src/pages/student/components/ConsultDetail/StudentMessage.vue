/*
 * @Author: 庞泽邦
 * @Date: 2020-06-02 13:53:32
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-25 10:39:10
 */
//我的咨询用户消息组件
<template>
  <div>
    <div v-if="!isSubmit">
      <div class="message_wrap--container">
        <van-row type="flex" justify="end">
          <van-col span="24">
            <div class="student_message--container">
              <van-icon v-if="isError" name="warning-o" style="margin-top:15px;margin-right:5px;margin-left:5px" />
              <div class="student_message--content">{{ content }}</div>
              <div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#old-icon-icon-test4" />
                </svg>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div v-else>
      <div v-for="(item,index) in infoArray" :key="index" class="message_wrap--container">
        <van-row type="flex" justify="end">
          <van-col span="24">
            <div class="student_message--container">
              <div class="student_message--content">{{ item }}</div>
              <div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#old-icon-icon-test4" />
                </svg>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Col, Row, Icon } from 'vant'

Vue.use(Col)
  .use(Row)
  .use(Icon)
export default {
  name: 'StudentMessage',
  props: {
    infoArray: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 判断是否是发出的信息
    isSubmit: {
      type: Boolean,
      default: false
    },
    // 如果是服务器返回的历史信息
    content: {
      type: String,
      default: ''
    },
    // 是否发送失败
    isError: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
@keyframes opacityContent{
    0%{opacity:0}
    50%{
        opacity:.5;
        transform: translateY(20px);
    }
    80%{opacity: .8;}
    100%{opacity:1}
}
.icon {
    width: 45px;
    height: 45px;
}
.message_wrap--container{
    margin-top: 35px;
    animation: opacityContent .5s;
}
.student_message{
    &--container{
        display: flex;
        justify-content: flex-end;
        margin-right: 10px;
    }
    &--content{
        background: #C4646B;
        width: 266px;
        border-radius: 4px;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: $font-color;
        padding:10px 10px 10px 10px
    }
}
</style>
