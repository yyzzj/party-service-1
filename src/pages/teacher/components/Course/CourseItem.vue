/*
* @Author: 郑丽敏
* @Date: 2020-07-22
* @Last Modified by: 杨志杰
* @Last Modified time: 2020-10-03 20:04:40
*/
<template>
  <div class="course-item">
    <div class="item-id">课程编号: {{ data.courseId }}</div>
    <div class="item">
      <div class="item-img">
        <img :src="data.courseImgUrl" class="item-img-image">
      </div>
      <div class="item-right">
        <div class="item-right-title">{{ data.courseName }}</div>
        <div class="item-right-num">课堂人数<span class="item-right-num-span">{{ data.courseNum }}人</span></div>
        <div class="item-right-type">课堂类型<span class="item-right-type-span">{{ type[data.courseType-1] }}</span></div>
        <van-button round class="editButton item-right-btn" :to="{path:'courseDetail',query:{courseId:data.courseId}}">进入课堂
        </van-button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Button } from 'vant'

Vue.use(Button)
export default {
  name: 'CourseItem',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      type: ['书法', '绘画', '陶瓷', '其他']
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/scss/_settings.scss';

@mixin setSpanStyle($fontSize,$color) {
  font-size: $fontSize;
  color: $color;
}

.course-item {
  height: 140px;
  margin-bottom: 10px;
  padding-left: 17px;
  padding-right: 20px;
  background: $white;
  border: 1px solid $white;
  font-family: PingFangSC-Regular;

  .item-id {
    height: 17px;
    margin-top: 13px;
    @include setSpanStyle(12px, $background-grey);
  }

  .item {
    display: flex;
    margin-top: 17px;

    &-img {
      display: inline-block;
      margin-right: 18px;
      width: 70px;
      height: 70px;

      .item-img-image {
        width: 100%;
        height: 100%;
      }
    }

    &-right {
      position: relative;
      flex: 1;

      &-title {
        height: 20px;
        line-height: 20px;
        font-family: PingFangSC-Semibold;
        font-weight: 550;
        @include setSpanStyle(14px, $font-color);
      }

      &-num {
        margin-top: 6px;
        line-height: 14px;
        @include setSpanStyle(10px, $font-color-lighter);

        .item-right-num-span {
          margin-left: 9px;
          @include setSpanStyle(10px, $course-status-not-sell)
        }
      }

      &-type {
        @include setSpanStyle(10px, $font-color-lighter);

        &-span {
          display: inline-block;
          width: 32px;
          height: 17px;
          margin-top: 6px;
          margin-left: 9px;
          text-align: center;
          line-height: 17px;
          border-radius: 4px;
          background: $ching;
          @include setSpanStyle(10px, $white);
        }
      }

      &-btn {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 80px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: $deep-purple;
        @include setSpanStyle(12px, #fff);
        text-align: center;
        border-radius: 15px;
      }
    }
  }
}
</style>
