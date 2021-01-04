/*
 * @Author: 庞泽邦
 * @Date: 2020-07-21 11:33:18
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-07-24 09:55:19
 */
//教师端课程播放页面课程简介组件
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
      <van-field
        v-model="pointInfo"
        rows="5"
        autosize
        type="textarea"
        maxlength="150"
        placeholder="请输入课程重点介绍"
        show-word-limit
        style="font-size: 12px;color: #989898;"
      />
    </div>
    <div class="btn_container">
      <van-button block color="#68627E" style="width:300px">
        提交
      </van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell, CellGroup, Icon, Field, Button } from 'vant'

Vue.use(Cell)
  .use(CellGroup)
  .use(Icon)
  .use(Field)
  .use(Button)
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
      arr: [1, 2, 3],
      pointInfo: ''
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
.btn_container{
    display: flex;
    justify-content: center;
    margin-top: 25px;
}
</style>
