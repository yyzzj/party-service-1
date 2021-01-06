/*
* @Author:吴晓斌
* @Date:2021-01-06
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2021-01-06 09:59:22
*/
//今日任务页面
<template>
  <div class="myActivity">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">我的活动</span>
      </template>
      <template #right>
        <van-icon
          slot="icon"
          class-prefix="old-icon"
          name="shouye-copy"
          size="18"
          color="white"
          @click="clickRight"
        />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" color="#A12831" swipe-threshold="5" animated>
      <van-tab :title="`进行中(0)`">
        <my-activity-item />
      </van-tab>
      <van-tab :title="`已结束(0)`">
        <my-activity-item />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Tab, Tabs } from 'vant'
import MyActivityItem from '../../../student/components/MyActivity/MyActivityItem'

Vue.use(NavBar)
  .use(Icon)
  .use(Tab)
  .use(Tabs)

export default {
  name: 'MyActivity',
  components: {
    MyActivityItem
  },
  data: () => {
    return {
      active: 0
    }
  },
  created() {
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";

.myActivity {
  min-height: 100vh;
}

.van-nav-bar {
  background-color: $main-color;
}

.buttonTextBox {
  text-align: center;

  &--buttonText {
    font-family: PingFangSC-Regular;
    color: #989898;
    font-size: 12px;
  }
}
</style>
