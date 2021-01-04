/*
 * @Author: 庞泽邦
 * @Date: 2020-08-07 16:25:47
 * @Last Modified by: 杨志杰
 * @Last Modified time: 2020-11-04 9:25:47
 */

//课程介绍组件
<template>
  <div class="courseDetail_container">
    <div class="courseImage--container">
      <van-image
        class="courseImage--image"
        width="100%"
        height="100%"
        :src="courseDetail.courseImgUrl"
      />
    </div>
    <div class="courseMessage--container">
      <div class="courseMessage--courseName">{{ courseDetail.courseName }}</div>
      <div class="courseMessage--startTime">
        时间
        <span class="value">{{ courseDetail.startTime }} 开课</span>
      </div>
      <div class="courseMessage--teacher courseMessage--others">
        老师
        <span class="value"> {{ courseDetail.teacherName }}</span>
      </div>
      <div class="courseMessage--chooseCourse courseMessage--others">
        选课
        <div class="chooseCourseItem">
          <div class="chooseCourseTime">{{ courseDetail.classHour }}课时</div>
          <div class="chooseCourseType">{{ type[courseDetail.courseType-1] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image as VanImage } from 'vant'

Vue.use(VanImage)
export default {
  name: 'CourseIntroduction',
  props: {
    courseDetail: {
      type: Object,
      default: function() {
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

  .courseDetail_container {
    background-color: $white;
    padding: 15px;
    height: 135px;
    display: flex;

    .courseImage {
      &--container {
        flex: 4;
      }

    }

    .courseMessage {
      &--container {
        flex: 7;
        padding-top: 10px;
        padding-left: 20px;
        font: {
          family: PingFangSC-Regular;
          size: 12px;
        }
        color: #6D7278;

        .value {
          margin-left: 10px;
          color: $font-color;
        }
      }

      &--courseName {
        font: {
          family: PingFangSC-Semibold;
          size: 16px;
        }
        color: rgba(0, 0, 0, 0.85);

        margin-bottom: 16px;
      }

      &--others {
        margin-top: 8px;
      }

      &--chooseCourse {
        .formatItemDiv {
          display: inline-block;
          border-radius: 4px;

          width: 48px;
          height: 18px;
          line-height: 18px;
          text-align: center;

          font-size: 10px;
          color: $white;

          margin-right: 8px;
        }

        @mixin chooseCourseItemStyle($background) {
          @extend .formatItemDiv;
          background: $background;
        }

        .chooseCourseItem {
          margin-left: 10px;
          display: inline;
        }

        .chooseCourseTime {
          @include chooseCourseItemStyle(#68627E);
        }

        .chooseCourseType {
          @include chooseCourseItemStyle(#9CD062);
        }
      }
    }
  }

</style>
