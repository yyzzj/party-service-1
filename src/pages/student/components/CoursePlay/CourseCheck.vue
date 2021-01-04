/*
 * @Author: 庞泽邦
 * @Date: 2020-05-20 10:44:32
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-05-22 14:03:06
 */
//课程播放页面考勤组件

<template>
  <div class="check_wrap--container">
    <div class="icon_container">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#old-icon-paibandaka" />
      </svg>
    </div>
    <div class="info_font--size">
      <span>{{ content }}</span>
    </div>
    <div class="info_button">
      <van-button color="#68627E" style="height:40px;width:300px" @click.stop="check">签到</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Toast } from 'vant'

Vue.use(Button)
export default {
  name: 'CourseCheck',
  filters: {
    FixDate(myDate) {
      const Year = myDate.getFullYear() // 获取完整的年份(4位,1970-????)
      const Month = myDate.getMonth() // 获取当前月份(0-11,0代表1月
      const Date = myDate.getDate() // 获取当前日(1-31)
      const Hour = myDate.getHours() // 获取当前小时数(0-23)
      const Minute = myDate.getMinutes() // 获取当前分钟数(0-59)
      return `已于${Year}-${Month}-${Date} ${Hour}:${Minute}签到`
    }
  },
  data: () => {
    return {
      isCheck: false,
      content: '尚未签到'
    }
  },
  methods: {
    check() {
      if (this.isCheck === false) {
        this.isCheck = true
        const myDate = new Date()
        this.content = this.$options.filters.FixDate(myDate)
      } else {
        Toast.fail('您已签到，不需要重复操作')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.icon{
    width: 60px;
    height: 60px;
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
    height: 100%;
    background: white;
    padding-top:44px
}
</style>
