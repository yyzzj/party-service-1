/*
* @Author: 杨志杰
* @Date: 2020-05-14 20:24:16
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-08-07 16:55:10
*/
// 课程列表组件
<template>
  <div class="courseListItem">
    <div class="left">
      {{ courseId }}
    </div>
    <div class="middle">
      <div class="middle-top">
        {{ itemData.courseTitle }}
      </div>
      <div class="middle-bottom">
        <div class="middle-bottom-left">
          <van-icon class="middle-bottom-icon" class-prefix="old-icon" name="ai253" size="18" />
          <span class="middle-bottom-text">{{ itemData.courseTime }}分钟</span>
        </div>
        <div class="middle-bottom-middle">
          <van-icon class="middle-bottom-icon" class-prefix="old-icon" name="kecheng" size="15" />
          <span ref="viewPercent" class="middle-bottom-text" :style="{color:viewPercentColor}">
            已学习{{ itemData.viewPercent }}%
          </span>
        </div>
        <div class="middle-bottom-right">
          <van-icon class="middle-bottom-icon" class-prefix="old-icon" name="guanzhongshu" size="15" />
          <span class="middle-bottom-text">{{ itemData.courseViews }}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <van-icon class="play" class-prefix="old-icon" name="bofang" size="30" color="#a12831" />
    </div>
    <div class="adjust" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon } from 'vant'

Vue.use(Icon)
export default {
  name: 'CourseListItem',
  props: {
    itemData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      percentColor: ['#999', '#A12831', '#6DD400']
    }
  },
  computed: {
    // 格式化courseId
    courseId() {
      const id = this.itemData.courseId
      return (id < 10 ? '0' + id : id) + '.'
    },
    // 根据已看百分数(viewPercent)来确定字体颜色(viewPercentColor)
    viewPercentColor() {
      const temp = this.itemData.viewPercent
      if (temp === 0) {
        return this.percentColor[0]
      } else if (temp === 100) {
        return this.percentColor[2]
      }
      return this.percentColor[1]
    }
  },
  mounted() {
    // 需加载后再执行
    this.judgeViewPercentText()
  },
  methods: {
    // 判断已看百分数是否为0，为0则显示‘未开始学习’文本
    judgeViewPercentText() {
      if (this.itemData.viewPercent === 0) this.$refs.viewPercent.innerText = '未开始学习'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/scss/_settings.scss';

  $height: 80px;
  $padding: 15px;
  $margin-top: 1px;

  .courseListItem {
    background-color: $white;
    width: 100%;
    height: $height;
    margin-top: $margin-top;
    padding: $padding;
    box-sizing: border-box;

    font: {
      family: PingFangSC-Regular;
      size: 14px;
    }

    display: flex;

    .left {
      width: 40px;
      color: $grey;
    }

    .middle {
      flex: 1;

      &-top {
        color: $font-color;
        margin-bottom: 10px;
      }

      &-bottom {
        display: flex;
        width: 100%;

        &-left {
          flex: 1;
        }

        &-middle {
          flex: 1;
        }

        &-right {
          flex: 1;
        }

        &-text {
          margin-left: 5px;
          font-size: 10px;
          color: $grey;
        }

        &-icon {
          vertical-align: middle;
        }
      }
    }

    .right {
      width: 40px;
      //居中：根据高度和内间距来计算div高度
      line-height: $height - $padding*2;

      .play {
        cursor: pointer;
      }
    }

    //调整播放图标的右间距专用,无其他用途
    .adjust {
      width: 10px;
    }
  }
</style>
