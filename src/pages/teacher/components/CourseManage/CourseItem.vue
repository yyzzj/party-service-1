/*
* @Author: 杨志杰
* @Date: 2020-07-05 23:17
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2020-11-10 09:24:00
*/
// 课程管理列表卡片组件
<template>
  <div class="course-item">
    <div class="course-item-top">
      <div class="courseId">
        <span>课程编号：{{ courseInfo.courseId }}</span>
      </div>
      <div :class="[courseInfo.status ? 'sell':'notSell']">
        <span>{{ courseInfo.status ? '销售中' : '待上架' }}</span>
      </div>
    </div>
    <div class="course-item-middle">
      <div class="image">
        <van-image
          fit="cover"
          :src="courseInfo.courseImgUrl"
        />
      </div>
      <div class="detail">
        <div class="detail-title">
          <span>{{ courseInfo.courseName }}</span>
        </div>
        <div class="detail-price">
          <span>￥{{ courseInfo.coursePrice }}</span>
        </div>
        <div v-show="courseInfo.status" class="detail-sell">
          <van-tag type="warning" text-color="#FA6400" color="#F1E3BD">已售</van-tag>
          <span class="detail-sell-number">{{ courseInfo.payNum }}</span>
        </div>

      </div>
    </div>
    <div class="course-item-footer">
      <div class="courseIcon">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-shanchu" />
        </svg>
      </div>
      <div class="courseButton">
        <van-button round class="shareButton">{{ courseInfo.status ? '分享' : '上架' }}</van-button>
        <van-button round class="editButton">编辑</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Image as VanImage, Tag } from 'vant'

Vue.use(Button)
  .use(VanImage)
  .use(Tag)
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
      courseInfo: {}
    }
  },
  created() {
    this.courseInfo = this.data
  }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/_settings.scss';
    //设置span的字体颜色的混合指令
    @mixin setSpanStyle($fontSize,$color) {
        font-size: $fontSize;
        color: $color;
    }

    .icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
    }

    .course-item {
        font-family: PingFangSC-Regular,serif;
        background-color: $white;
        margin-top: 5px;

        &-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 17px;
            font-size: 12px;

            .courseId {
                color: $background-grey;
            }

            .sell {
                color: $course-status-sell;
            }

            .notSell {
                color: $course-status-not-sell;
            }
        }

        &-middle {
            background-color: $white-light;
            display: flex;
            padding: 5px 17px;

            .image {
                .van-image {
                    width: 70px;
                    height: 70px;
                }
            }

            .detail {
                margin-left: 15px;

                &-title {
                    font-family: PingFangSC-Semibold,serif;
                    font-weight: bold;
                    @include setSpanStyle(14px, $font-color);
                }

                &-price {
                    margin-top: 10px;
                    font-family: PingFangSC-Semibold,serif;
                    font-weight: bold;
                    @include setSpanStyle(14px, $main-color);
                }

                &-sell {
                    margin-top: 10px;
                    @include setSpanStyle(12px, $background-grey);

                    &-number {
                        margin-left: 5px;
                    }
                }
            }
        }

        &-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 17px;
            font-size: 22px;

            .van-button {
                width: 75px;
                height: 30px;
                line-height: 30px;
                margin-left: 10px;
            }

            .shareButton {
                border: 1px solid $deep-purple;
                background-color: $deep-purple;
                @include setSpanStyle(14px, $white)
            }

            .editButton {
                border: 1px solid $font-color-lighter;
                @include setSpanStyle(14px, $font-color)
            }
        }
    }
</style>
