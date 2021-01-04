/*
* @Author:吴晓斌
* @Date:2020-05-18
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2020-11-20 12:40:33
*/
//今日任务组件
<template>
  <div>
    <div class="dailyTask_box">
      <van-row style="height:100%;width:100%" type="flex" justify="start" align="center">
        <van-col span="6">
          <div class="dailyTask_imageBox">
            <van-image width="100%" height="100%" :src="itemData.courseImgUrl" />
          </div>
        </van-col>
        <van-col span="12">
          <div class="info_wrap--container">
            <div class="dailyTask_taskTitle">
              <span class="dailyTask_taskTitle--text">{{ itemData.taskTitle }}</span>
            </div>
            <div class="dailyTask_startTime">
              <span class="dailyTask_startTime--text">开课时间：<br>{{ itemData.startDate }}</span>
            </div>
            <div class="dailyTask_teacher">
              <span class="dailyTask_teacher--text">讲师：{{ itemData.teacher }}</span>
            </div>
          </div>
        </van-col>
        <van-col span="6">
          <div style="text-align:center">
            <van-button class="dailyTask_detailButton" :style="{background:get.btColor}">
              <span class="dailyTask_detailButton--text" :style="{color:get.textColor}">{{ get.btText }}</span>
            </van-button>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image, Col, Row, Button } from 'vant'

Vue.use(Image)
  .use(Col)
  .use(Row)
  .use(Button)

export default {
  name: 'DailyTaskItem',
  props: {
    itemData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: () => {
    return {
      // 按照任务是否完成情况区分详情按钮样式
      buttonColor: ['#68627E', '#FFFFFF'],
      textColor: ['#FFFFFF', '#68627E'],
      buttonText: ['去学习', '查看回放']
    }
  },
  computed: {
    get() {
      return {
        btColor: this.buttonColor[this.itemData.completeStatus],
        textColor: this.textColor[this.itemData.completeStatus],
        btText: this.buttonText[this.itemData.completeStatus]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";
.info_wrap--container{
  padding-left: 20px;
}
.dailyTask_box {
  height: 80px;
  padding-top: 20px;
}

.dailyTask_imageBox {
  height: 80px;
  width: 80px;
  margin-left: 15px;
}

.dailyTask_taskTitle {
  margin-top: 2px;

  &--text {
    font-family: PingFangSC-Regular;
    color: $font-color;
    font-size: 14px;
  }
}

.dailyTask_startTime {
  margin-top: 8px;

  &--text {
    font-family: PingFangSC-Regular;
    color: #989898;
    font-size: 12px;
  }
}

.dailyTask_teacher {
  &--text {
    font-family: PingFangSC-Regular;
    color: #989898;
    font-size: 12px;
  }
}

.dailyTask_detailButton {
  width: 90px;
  height: 30px;
  border: 1px solid $deep-purple;
  border-radius: 15.5px;

  &--text {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    line-height: 22px;
  }
}
</style>
