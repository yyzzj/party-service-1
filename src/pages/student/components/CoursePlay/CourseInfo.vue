/*
 * @Author: 庞泽邦
 * @Date: 2020-05-20 10:46:01
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-07-24 09:54:53
 */
//课程播放页面课程简介组件

<template>
  <div class="course_wrap--contaier">
    <van-cell class="cell_wrap--container">
      <template #title>
        <div class="course_name">课程信息</div>
        <div class="course_icon--container">
          <van-icon class-prefix="old-icon" name="ai253" />
          <span class="course_icon--text">40分钟</span>
          <van-icon class-prefix="old-icon" name="guanzhongshu" style="margin-left:20px" />
          <span class="course_icon--text">188</span>
        </div>
      </template>
      <template #icon>
        <span class="course_num">{{ 1 | FixZero }}</span>
      </template>
    </van-cell>
    <div class="point_content--text">
      <div class="point_title--text">课程重点</div>
      <div class="point_info--text">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell, CellGroup, Icon } from 'vant'

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
export default {
  name: 'CourseInfo',
  filters: {
    FixZero(val) {
      if (val < 10) {
        return '0' + val + '.'
      } else return val + '.'
    }
  },
  data: () => {
    return {
      arr: [1, 2, 3]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.cell_wrap--container{
    width: 100%;
}
.course{
    &_wrap--contaier{
        background: $bg;
    }
    &_name{
        font-size: 14px;
        color: $font-color;
        margin-left: 11px;
    }
    &_icon{
        &--container{
        margin-top: 10px;
        display: flex;
        }
        &--text{
            margin-left: 7px;
            font-size: 10px;
            color: $font-color-lighter;
        }
    }
    &_num{
        font-size: 14px;
        color: $font-color-lighter;
    }
}
.point{
    &_title--text{
        font-size: 12px;
        color: #6D7278;
    }
    &_info--text{
        @extend .point_title--text;
        margin-top: 11px;
    }
    &_content--text{
        margin-top: 10px;
        padding: 10px 10px 10px 10px;
        height: 173px;
        background: white;
    }
}
</style>
