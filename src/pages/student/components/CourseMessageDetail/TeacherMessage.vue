/*
 * @Author: 庞泽邦
 * @Date: 2020-05-19 18:10:34
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-14 10:53:08
 */
//课堂信息教师消息组件
<template>
  <div class="row_wrap--container">
    <div v-for="(item,index) of info" :key="index" class="row_margin--top">
      <van-row type="flex">
        <van-col span="24">
          <div class="title_info--container">
            <svg class="icon" aria-hidden="true">
              <use v-if="isTeacher==='1'" xlink:href="#old-icon-icon-test4" />
              <use v-else xlink:href="#old-icon-gonggao" />
            </svg>
            <div class="title_info--text">
              {{ sendName }}
            </div>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="end" align="center">
        <van-col span="19">
          <div class="content_wrap--container">
            <div style="padding:10px 10px 10px 10px">
              {{ item }}
            </div>
          </div>
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
  name: 'TeacherMessage',
  props: {
    isTeacher: {
      type: String,
      default: ''
    },
    info: {
      type: Array,
      default: () => {
        return []
      }
    },
    sendName: {
      type: String,
      default: ''
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
    justify-content: center;
    align-items: center;
    min-height: 50px;
    width: 100%;
    margin-top: 5px;
    background: white;
    border-radius: 4px;
    font-size: 14px;
    color: $font-color;
}
</style>
