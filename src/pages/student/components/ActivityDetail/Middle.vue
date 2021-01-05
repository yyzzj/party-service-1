/*
* @Author: 杨志杰
* @Date: 2020-05-05 18:35:11
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-08 14:04:55
*/
//活动详细信息组件
<template>
  <div class="activityDetail_container">
    <div class="activityImage--container">
      <van-swipe class="activity_swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item class="activity_swipe_item">
          <van-image
            class="activityImage--image"
            width="100%"
            height="100%"
            src="http://www.qstheory.cn/titlepic/112483/1124831522_1564745875178_title0h.jpg"
          />
        </van-swipe-item>
        <van-swipe-item class="activity_swipe_item">
          <van-image
            class="activityImage--image"
            width="100%"
            height="100%"
            src="http://www.qstheory.cn/titlepic/112462/1124629810_1560656376062_title0h.jpg"
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="activityMessage--container">
      <div class="activityMessage--activityName">做不负时代重托的担当者学习主题会议</div>
      <div class="activityMessage--startTime">
        活动时间
        <span class="value">2020-12-08 08:00:00 开始</span>
      </div>
      <div class="activityMessage--admin activityMessage--others">
        负责人员
        <span class="value">张余歌</span>
      </div>
      <div class="activityMessage--chooseActivity activityMessage--others">
        活动类型
        <div class="chooseActivityItem">
          <div class="chooseActivityType">党建</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image as VanImage, Swipe, SwipeItem } from 'vant'
Vue.use(VanImage).use(Swipe).use(SwipeItem)

export default {
  name: 'ActivityDetailMiddle',
  props: {
    courseInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '@/scss/_settings.scss';

  .activityDetail_container {
    height: 325px;
    width: 100%;

    .activityImage {
      &--container {
        width: 100%;
        height: 190px;
      }
    }

    .activityMessage {
      &--container {
        width: 100%;
        height: 135 - 16px;
        padding: {
          top: 16px;
          left: 20px;
        }

        font: {
          family: PingFangSC-Regular;
          size: 14px;
        }
        color: #6D7278;

        .value {
          margin-left: 18px;
          color: $font-color;
        }
      }

      &--activityName {
        font: {
          family: PingFangSC-Semibold;
          size: 18px;
          weight: 900;
        }
        color: rgba(0, 0, 0, 0.85);

        margin-bottom: 16px;
      }

      &--others {
        margin-top: 8px;
      }

      &--chooseActivity {
        .formatItemDiv {
          display: inline-block;
          border-radius: 4px;

          width: 52px;
          height: 22px;
          line-height: 22px;
          text-align: center;

          font-size: 12px;
          color: $white;

          margin-right: 10px;
        }

        @mixin chooseActivityItemStyle($background) {
          @extend .formatItemDiv;
          background: $background;
        }

        .chooseActivityItem {
          margin-left: 18px;
          display: inline;
        }

        .chooseActivityType {
          @include chooseActivityItemStyle(red);
        }
      }
    }

    .activity_swipe_item{
      height: 190px;
    }
  }

</style>
