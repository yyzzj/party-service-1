<template>
  <div class="tools_wrap--container">
    <div style="font-size: 12px;color: #676767;">我的工具</div>
    <van-grid :column-num="4" :border="false">
      <van-grid-item @click.stop="changeView('/personalAttendance')">
        <template #icon>
          <van-icon slot="icon" class-prefix="old-icon" name="kaoqin" size="30" />
        </template>
        <template #text>
          <div class="gird_item--text">课堂考勤</div>
        </template>
      </van-grid-item>
      <van-grid-item @click.stop="changeView('/classWork')">
        <template #icon>
          <van-icon slot="icon" class-prefix="old-icon" name="xinbaniconshangchuan-" size="30" />
        </template>
        <template #text>
          <div class="gird_item--text">课堂作业</div>
        </template>
      </van-grid-item>
      <van-grid-item @click.stop="changeView('/courseMessage')">
        <template #icon>
          <van-icon slot="icon" class-prefix="old-icon" name="xiaoxi" size="30" />
        </template>
        <template #text>
          <div class="gird_item--text">课堂消息</div>
        </template>
      </van-grid-item>
      <van-grid-item @click.stop="changeView('/course')">
        <template #icon>
          <van-icon slot="icon" class-prefix="old-icon" name="shuji" size="30" />
        </template>
        <template #text>
          <div class="gird_item--text">课堂进度</div>
        </template>
      </van-grid-item>
      <van-grid-item @click.stop="changeView('/askHealthy')">
        <template #icon>
          <van-icon slot="icon" class-prefix="old-icon" name="jiankang" size="30"/>
        </template>
        <template #text>
          <div class="gird_item--text">在线问诊</div>
        </template>
      </van-grid-item>
      <van-grid-item @click.stop="changeView('/myActivity')">
        <template #icon>
          <van-icon slot="icon" class-prefix="old-icon" name="fenlei" size="30" />
        </template>
        <template #text>
          <div class="gird_item--text">我的活动</div>
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
