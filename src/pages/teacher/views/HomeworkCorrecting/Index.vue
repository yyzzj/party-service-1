/*
* @Author: 郑丽敏
* @Date: 2020-08-02 17:25:21
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-08-12 15:20:20
*/
// 教师端课堂模块-批改作业
<template>
  <div class="hw-index">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">批改作业</span>
      </template>
    </van-nav-bar>
    <div v-for="(item,index) in hwList" :key="index">
      <router-link to="hwDetail">
        <hw-item :data="item" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import HwItem from '@/pages/teacher/components/HomeworkCorrecting/HwItem.vue'
import { getHomeworkList } from '@/api/teacher/homeworkIndex.js'
import { NavBar, Icon } from 'vant'
Vue.use(NavBar)
  .use(Icon)
export default {
  name: 'HomeworkCorrecting',
  components: {
    HwItem
  },
  data() {
    return {
      hwList: []
    }
  },
  created() {
    this.getHomeworkList()
  },
  methods: {
    // 获取作业列表信息
    async getHomeworkList() {
      try {
        const res = await getHomeworkList()
        this.hwList = res.data.array
      } catch (e) {
        console.log(e)
      }
    },
    clickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";
.hw-index {
  min-height: 100vh;
  background: $body-color;
}
.van-nav-bar {
  background-color: #a12831;
}
</style>
