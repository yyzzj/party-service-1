/*
 * @Author: 吴晓斌
 * @Date: 2020-05-07
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-05-09 15:09:36
 */

//活动负责人简介组件
<template>
  <div class="activityIntro_container">
    <div class="activityIntro_textbox">
      <span class="activityIntro_textbox--text" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdiminIntroduce',
  props: {
    activityIntroText: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
    .activityIntro_container {
        width: 100%;
        padding-top: 15px;

    }

    .activityIntro_textbox {
        width: 90%;
        margin-left: 20px;

        &--text {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #989898;
        }
    }
</style>
