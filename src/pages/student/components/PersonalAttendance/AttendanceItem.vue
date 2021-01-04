/*
* @Author: 杨志杰
* @Date: 2020-05-22 17:30:16
* @Last Modified by: 杨志杰
* @Last Modified time: 2020-05-23 19:58:16
*/
//考勤列表子组件
<template>
  <div class="attendanceItem">
    <div class="left">
      <div class="left-top"><span class="title">{{ itemData.courseTitle }}</span></div>
      <div class="left-middle"><span class="time">开课时间：{{ itemData.courseStartTime }}</span></div>
      <div class="left-bottom">
        <span class="status">签到：</span>
        <span class="status" :style="{color:get.status.color}">{{ get.status.text }}</span>
      </div>
    </div>
    <div class="right">
      <div
        class="attendanceButton"
        :style="{color:get.button.color , backgroundColor:get.button.bgColor}"
      >
        <span>{{ get.button.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AttendanceItem',
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
      statusColorSet: ['#989898', '#FF9249'],
      statusTextSet: ['正常', '缺勤'],
      buttonTextSet: ['查看回放', '去学习'],
      buttonBgColorSet: ['#FFFFFF', '#68627E'],
      buttonColorSet: ['#68627E', '#FFFFFF']
    }
  },
  computed: {
    // 根据签到状态赋值
    get() {
      return {
        status: {
          // 根据签到状态给status文本赋值
          text: this.statusTextSet[this.itemData.attendanceStatus],
          // 根据签到状态给status颜色赋值
          color: this.statusColorSet[this.itemData.attendanceStatus]
        },
        button: {
          // 根据签到状态给button文本赋值
          text: this.buttonTextSet[this.itemData.attendanceStatus],
          // 根据签到状态给button背景颜色赋值
          bgColor: this.buttonBgColorSet[this.itemData.attendanceStatus],
          // 根据签到状态给button文本颜色赋值
          color: this.buttonColorSet[this.itemData.attendanceStatus]
        }
      }
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

    .formatTimeStatus {
        margin-top: 2px;
    }

    .attendanceItem {
        background-color: $white;
        width: 100%;
        margin-bottom: 10px;
        padding: 15px 25px;
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

            &-middle {
                @extend .formatTimeStatus;

                .time {
                    @include setSpanStyle(12px, $grey);
                }
            }

            &-bottom {
                @extend .formatTimeStatus;

                .status {
                    @include setSpanStyle(12px, $grey);
                }
            }

            .text {
                margin-top: 5px;
            }
        }

        .right {
            padding: 0 5px;
            width: 85px;
            display: flex;
            justify-content: center;
            flex-direction: column;

            .attendanceButton {
                width: 100%;
                height: 25px;
                border: 1px solid $deep-purple;
                border-radius: 15.5px;
                font: {
                    size: 12px;
                }
                text-align: center;
                line-height: 25px;
                cursor: pointer;
            }
        }

    }
</style>
