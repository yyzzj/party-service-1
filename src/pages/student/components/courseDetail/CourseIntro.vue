/*
 * @Author: 吴晓斌
 * @Date: 2020-05-07
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-05-09 15:09:36
 */

//课程介绍组件
<template>
  <div class="courseIntro_container">
    <div class="courseIntro_textbox">
      <span class="courseIntro_textbox--text">{{ courseIntroText }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseIntro',
  props: {
    courseIntroText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
    .courseIntro_container {
        width: 100%;
        padding-top: 15px;

    }

    .courseIntro_textbox {
        width: 90%;
        margin-left: 20px;

        &--text {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #989898;
        }
    }
</style>
