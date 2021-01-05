/*
 * @Author: 吴晓斌
 * @Date: 2020-05-07
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-05-09 15:09:36
 */

//活动介绍组件
<template>
  <div class="activityIntro_container">
    <div class="activityIntro_textbox">
      <span class="activityIntro_textbox--text">
        习近平总书记在中央全面依法治国工作会议上
        用“十一个坚持”系统阐述了新时代推进全面依
        法治国的重要思想和战略部署。这“十一个坚
        持”集中体现了习近平法治思想的核心要义，
        既具有很强的政治性、思想性、理论性，又
        具有很强的现实性、指导性、操作性；既是
        重大工作部署，更是重大战略思想。
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivityIntroduce',
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
