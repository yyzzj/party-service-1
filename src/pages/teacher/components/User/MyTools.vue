/*
 * @Author: 庞泽邦
 * @Date: 2020-08-28 16:39:48
 * @Last Modified by: 杨志杰
 * @Last Modified time: 2021-01-07 10:30
 */
//  教师端我的页面--工具组件
<template>
  <div class="tools_wrap--container">
    <div style="font-size: 12px;color: #676767;">我的工具</div>
    <van-grid :column-num="4" :border="false">
      <van-grid-item @click.stop="changeView('/replyHealthyAsk')">
        <template #icon>
          <van-icon slot="icon" class-prefix="old-icon" name="yijianfankui" size="30"/>
        </template>
        <template #text>
          <div class="gird_item--text">诊断回复</div>
        </template>
      </van-grid-item>
      <van-grid-item @click.stop="changeView('/healthyAsk')">
        <template #icon>
          <van-icon slot="icon" class-prefix="old-icon" name="chabei" size="30" />
        </template>
        <template #text>
          <div class="gird_item--text">养生问答</div>
        </template>
      </van-grid-item>
      <van-grid-item @click.stop="changeView('/settingCenter')">
        <template #icon>
          <van-icon slot="icon" class-prefix="old-icon" name="shezhi" size="30" />
        </template>
        <template #text>
          <div class="gird_item--text">个人设置</div>
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import Vue from 'vue'
import { Grid, GridItem, Icon } from 'vant'

Vue.use(Grid)
  .use(GridItem)
  .use(Icon)
export default {
  name: 'MyTools',
  data: () => {
    return {}
  },
  methods: {
    changeView(ViewPath) {
      this.$router.push({
        path: ViewPath
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tools_wrap--container {
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 25px;
  background: white;
  margin-top: 10px;
}

.gird_item--text {
  font-size: 12px;
  color: #313131;
  margin-top: 8px;
}
</style>
