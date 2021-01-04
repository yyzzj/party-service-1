/*
* @Author: 杨志杰
* @Date: 2020-06-01
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-08 11:15:29
*/
// 搜索结果的显示组件
<template>
  <div class="searchItem">
    <div class="left">
      <van-image width="100%" height="100%" fit="contain" :src="url" />
    </div>
    <div class="middle">
      <div class="middle-text"><span class="title">{{ itemData.courseName }}</span></div>
      <div class="middle-text"><span class="price">{{ itemData.coursePrice | formatPrice }}</span></div>
      <div class="middle-text"><span class="numbers">已有{{ itemData.payNum }}人报名</span></div>
      <div class="middle-text middle-bottom">
        <div class="circle" />
        <span class="teacher">讲师：{{ itemData.teacherName }}</span>
      </div>
    </div>
    <div class="right">
      <div>
        <button class="apply-button" @click="jump(itemData.courseId)">立即报名</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image as VanImage } from 'vant'
import { jumpToCourseDetail } from '@/mixins'

Vue.use(VanImage)
export default {
  name: 'SearchItem',
  // 混入跳转到课程详情逻辑
  mixins: [jumpToCourseDetail],
  props: {
    itemData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data: () => {
    return {
      url: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }
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

    .searchItem {
        background-color: $white;
        padding: 10px;
        margin-top: 1px;
        box-sizing: border-box;
        font-family: PingFangSC-Regular;
        display: flex;

        .left {
            flex: 1;
        }

        .middle {
            margin-left: 10px;
            flex: 2;

            &-text {
                margin-top: 10px;

                .fontBold {
                    font-family: PingFangSC-Semibold;
                }

                .title {
                    @extend .fontBold;
                    @include setSpanStyle(14px, $black);
                }

                .price {
                    @extend .fontBold;
                    @include setSpanStyle(16px, $main-color);
                }

                .numbers {
                    @include setSpanStyle(10px, $numbers-grey);
                }

                .circle {
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    background: $circle-grey;
                    border-radius: 50%;
                }

                .teacher {
                    margin-left: 10px;
                    @include setSpanStyle(12px, $background-grey);
                }
            }

            &-bottom {
                display: flex;
                align-items: center; /*定义body的元素垂直居中*/
            }
        }

        .right {
            flex: 1;
            display: flex;
            align-items: center; /*定义body的元素垂直居中*/
            flex-direction: column-reverse;

            .apply-button {
                width: 80px;
                height: 30px;
                padding: 5px;
                @include setSpanStyle(14px, $white);
                background: $main-color;
                border: $main-color solid 1px;
                border-radius: 4px;
                cursor: pointer;
            }
        }
    }
</style>
