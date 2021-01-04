/*
* @Author: 杨志杰
* @Date: 2020-05-15 19:30:16
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-05-31 21:00:10
*/
//我的考勤页面
<template>
  <div class="personalAttendance">
    <van-nav-bar @click-left="goBack" @click-right="goHome">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">我的考勤</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="shouye" size="18" color="white" />
      </template>
    </van-nav-bar>
    <van-tabs
      v-model="active"
      title-active-color="#A12831"
      title-inactive-color="#676767"
      color="#A12831"
      swipe-threshold="5"
      animated
    >
      <van-tab :title="allAttendanceTitle">
        <div class="item">
          <attendance-item v-for="(item,i) in allAttendance" :key="i" :item-data="item" />
        </div>
      </van-tab>
      <van-tab :title="absenceTitle">
        <div class="item">
          <attendance-item v-for="(item,i) in absence" :key="i" :item-data="item" />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, NavBar, Tab, Tabs } from 'vant'
import AttendanceItem from '@/pages/student/components/PersonalAttendance/AttendanceItem'
import { getAllAttendance, getAbsence } from '@/api/student/personalAttendance'

Vue.use(NavBar)
  .use(Icon).use(Tab)
  .use(Tabs)
export default {
  name: 'PersonalAttendance',
  components: {
    AttendanceItem
  },
  data: () => {
    return {
      active: 0, // 当前激活的标签页
      allAttendance: [], // 全部考勤的数据
      absence: [], // 缺勤的数据
      allAttendanceCounter: 0, // 全部考勤的数量
      absenceCounter: 0 // 缺勤的数量
    }
  },
  computed: {
    allAttendanceTitle() {
      return '全部考勤(' + this.allAttendanceCounter + ')'
    },
    absenceTitle() {
      return '缺勤(' + this.absenceCounter + ')'
    }
  },
  created() {
    this.getAttendance()
  },
  methods: {
    // onclick方法
    // 返回上一页
    goBack() {
      this.$router.go(-1)
    },
    // 返回首页
    goHome() {
      this.$router.push({ path: '/home' })
    },
    // 异步方法
    async getAttendance() {
      try {
        const res1 = await getAllAttendance()
        const res2 = await getAbsence()
        this.allAttendance = res1.data.array
        this.absence = res2.data.array
        // 获取考勤数量
        this.allAttendanceCounter = this.allAttendance.length
        this.absenceCounter = this.absence.length
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/_settings.scss';

    .personalAttendance {
        background-color: $grey-lighter;
        min-height: 100vh;

        .van-nav-bar {
            background-color: $main-color;
        }

        .item {
            margin-top: 1px;
        }

    }
</style>
