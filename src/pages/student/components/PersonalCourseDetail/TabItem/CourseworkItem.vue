/*
* @Author: 杨志杰
* @Date: 2020-05-15 14:34:10
* @Last Modified by: 杨志杰
* @Last Modified time: 2020-05-15 19:41:42
*/
// 课程作业组件
<template>
  <div class="courseworkItem">
    <div class="left">
      <div class="left-top">
        <span class="title">{{ itemData.workTitle }}</span>
      </div>
      <div class="left-bottom">
        <span class="time">{{ itemData.workDeadline }}截止提交</span>
        <span class="score" :style="{color: scoreColor}">分数：{{ itemData.workScore }}</span>
      </div>
    </div>
    <div class="right" :style="{color:statusColor}">
      {{ statusText }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseworkItem',
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
      // 分数颜色
      courseworkScoreColor: ['#989898', '#A12831'],
      // 提交状态颜色
      courseworkStatusColor: ['#989898', '#6DD400'],
      // 提交状态文本
      courseworkStatusText: ['已完成', '待提交']
    }
  },
  computed: {
    // 判断分数颜色
    scoreColor() {
      return this.itemData.workScore === 0.0 ? this.courseworkScoreColor[0] : this.courseworkScoreColor[1]
    },
    // 提交状态颜色
    statusColor() {
      return this.courseworkStatusColor[this.itemData.workStatus]
    },
    // 提交状态文本
    statusText() {
      return this.courseworkStatusText[this.itemData.workStatus]
    }
  }

}
</script>

<style lang="scss" scoped>
  @import '@/scss/_settings.scss';

  $height: 80px;
  $padding: 17px;
  $margin-top: 1px;

  //设置span的字体颜色的混合指令
  @mixin setSpanStyle($fontSize,$color) {
    font-size: $fontSize;
    color: $color;
  }

  .courseworkItem {
    background-color: $white;
    width: 100%;
    height: $height;
    margin-top: $margin-top;
    padding: $padding;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;

    display: flex;

    .left {
      flex: 1;

      &-top {
        .title {
          @include setSpanStyle(14px, $font-color);
        }
      }

      &-bottom {
        margin-top: 10px;

        .time {
          @include setSpanStyle(10px, $grey);
        }

        .score {
          @extend .time;
          margin-left: 30px;
        }
      }
    }

    .right {
      width: 50px;
      line-height: $height - $padding*2;
      @include setSpanStyle(12px, $grey);
    }
  }
</style>
