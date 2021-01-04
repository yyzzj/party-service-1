/*
* @Author: 杨志杰
* @Date: 2020-05-15 13:31:20
* @Last Modified by: 杨志杰
* @Last Modified time: 2020-05-15 13:42:38
*/
// 课程公告组件
<template>
  <div class="courseAnnouncementItem">
    <div class="top">
      <div class="top-left">
        <span class="title">{{ itemData.announcementTitle }}</span>
      </div>
      <div class="top-right">
        <span class="status" :style="{color: statusColor}">{{ announcementStatus }}</span>
      </div>
    </div>
    <div class="middle">
      <span class="content">{{ itemData.announcementContent }}
      </span>
    </div>
    <div class="bottom">
      <span class="time">发布于{{ itemData.announcementTime }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseAnnouncementItem',
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
      announcementStatusColor: ['#989898', '#F7B500']
    }
  },
  computed: {
    // 根据status判断是否已阅，来显示文本内容
    announcementStatus() {
      return this.itemData.announcementStatus === 0 ? '历史消息' : '最新发布'
    },
    // 根据status判断文本颜色
    statusColor() {
      return this.announcementStatusColor[this.itemData.announcementStatus]
    }
  },
  created() {
    this.changeStatus()
  },
  methods: {
    // 改变status状态码，把未读消息变成已阅
    changeStatus() {
      let status = this.itemData.announcementStatus
      if (status === 1) { status = 0 }
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

  //统一middle和bottom的样式
  .formatMB {
    margin-top: 10px;
  }

  .courseAnnouncementItem {
    background-color: $white;
    width: 100%;
    margin-top: 1px;
    padding: 15px;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;

    .top {
      display: flex;

      &-left {
        flex: 1;

        .title {
          @include setSpanStyle(14px, $black);
        }
      }

      &-right {
        width: 50px;

        .status {
          @include setSpanStyle(12px, #F7B500);
        }
      }

    }

    .middle {
      @extend .formatMB;

      .content {
        @include setSpanStyle(12px, $font-color);
      }
    }

    .bottom {
      @extend .formatMB;

      .time {
        @include setSpanStyle(10px, $grey);
      }
    }
  }
</style>
