/*
* @Author:吴晓斌
* @Date:2020-05-18
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-19 16:23:03
*/
//今日任务页面
<template>
  <div class="dailyTask">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">今日任务</span>
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
      <van-tab :title="`未完成(${dailyTaskIncompleteCount})`">
        <daily-task-item v-for="(item,index) in dailyTaskIncomplete" :key="index" :item-data="item" />
      </van-tab>
      <van-tab :title="`已完成(${dailyTaskCompletedCount})`">
        <daily-task-item v-for="(item,index) in dailyTaskCompleted" :key="index" :item-data="item" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Tab, Tabs } from 'vant'
import DailyTaskItem from '../../../student/components/DailyTask/DailyTaskItem'
import { getDailyTaskList } from '@/api/student/user'

Vue.use(NavBar)
  .use(Icon)
  .use(Tab)
  .use(Tabs)

export default {
  name: 'DailyTask',
  components: {
    DailyTaskItem
  },
  data: () => {
    return {
      active: 0,
      dailyTaskIncomplete: [],
      dailyTaskIncompleteCount: 0,
      dailyTaskCompleted: [],
      dailyTaskCompletedCount: 0
    }
  },
  created() {
    this.getDailyTaskList()
    this.active = this.$route.query.active
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.$router.push('/home')
    },
    async getDailyTaskList() {
      try {
        const res = await getDailyTaskList()
        const data = res.data.data
        this.dailyTaskIncomplete = data[0]
        this.dailyTaskCompleted = data[1]
        this.dailyTaskIncompleteCount = this.dailyTaskIncomplete.length
        this.dailyTaskCompletedCount = this.dailyTaskCompleted.length
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";

.dailyTask {
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
