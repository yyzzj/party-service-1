/*
 * @Author: 庞泽邦
 * @Date: 2020-09-07 11:24:42
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-07 13:38:26
 */
// 消息详情系统公告组件
<template>
  <div class="row_wrap--container">
    <div class="row_margin--top">
      <van-row type="flex">
        <van-col span="24">
          <div class="title_info--container">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#old-icon-gonggao" />
            </svg>
            <div class="title_info--text">
              系统公告
            </div>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="end" align="center">
        <van-col span="19">
          <div class="content_wrap--container">
            <div style="padding:15px 15px 15px 15px">
              您有一笔新的订单需要处理
            </div>
          </div>
          <div style="height:1px;width:280px;background:#F4F6F5" />
          <div class="message_btn">马上处理</div>
        </van-col>
        <van-col span="1" />
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Col, Row } from 'vant'

Vue.use(Col)
Vue.use(Row)
export default {
  name: 'SysteamMessage',
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
.row_wrap--container{
    height: 100%;
}
.row_margin--top{
    margin-top: 19px;
    animation: opacityContent .5s;
}
.icon {
    width: 45px;
    height: 45px;
}
.title_info{
    &--container{
        display: flex;
        align-items: center;
        margin-left: 10px;
        height: 100%;
        width: 100%;
    }
    &--text{
        font-size: 14px;
        color: #989898;
        margin-left: 10px;
    }
}
.content_wrap--container{
    display: flex;
    align-items: center;
    min-height: 50px;
    margin-top: 5px;
    background: white;
    border-radius: 4px 4px 0 0;
    font-size: 14px;
    color: $font-color;
}
.message_btn{
  height:30px;
  background: #ffffff;
  padding-top: 10px;
  color:#AF5F65;
  user-select: none;
  text-align: center;
  border-radius: 0 0 4px 4px;
  &:hover{
    color: #ffffff;
    background: #AF5F65;
    cursor: pointer;
  }
}
</style>
