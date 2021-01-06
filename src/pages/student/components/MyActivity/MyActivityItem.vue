/*
* @Author:吴晓斌
* @Date:2020-05-18
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2021-01-06 10:06:58
*/
//今日任务组件
<template>
  <div>

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
  name: 'MyActivityItem',
  props: {
  },
  data: () => {
    return {
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";

</style>
