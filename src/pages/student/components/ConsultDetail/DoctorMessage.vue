/*
 * @Author: 庞泽邦
 * @Date: 2020-06-02 13:53:32
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-24 13:39:11
 */
//我的咨询医生消息组件
<template>
  <div>
    <div class="row_wrap--container">
      <div class="row_margin--top">
        <van-row type="flex">
          <van-col span="24">
            <div class="title_info--container">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#old-icon-icon-test4" />
              </svg>
              <div class="title_info--text">
                {{ doctor }}
              </div>
            </div>
          </van-col>
        </van-row>
        <van-row type="flex" justify="end" align="center">
          <van-col span="19">
            <div class="content_wrap--container">
              <div style="padding:10px 10px 10px 10px">
                {{ content }}
              </div>
            </div>
          </van-col>
          <van-col span="1" />
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Col, Row } from 'vant'

Vue.use(Col)
Vue.use(Row)
export default {
  name: 'DoctorMessage',
  props: {
    infoArray: {
      type: Array,
      default: () => {
        return []
      }
    },
    content: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      doctor: ''
    }
  },
  created() {
    const doctorName = this.$store.state.healthy.doctorName
    if (doctorName === '') this.doctor = window.sessionStorage.getItem('doctorName')
    else this.doctor = doctorName
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
    margin-top: 5px;
    background: white;
    border-radius: 4px;
    font-size: 14px;
    color: $font-color;
}
</style>
