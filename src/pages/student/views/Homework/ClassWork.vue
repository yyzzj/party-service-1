/*
* @Author:吴晓斌
* @Date:2020-05-11
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-02 16:50:34
*/
<template>
  <div>
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">课堂作业</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="shouye-copy" size="18" color="white" @click="clickRight" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" color="#A12831" swipe-threshold="5" animated @change="commitActive">
      <van-tab :title="`待提交(${incomplete.length})`">
        <incomplete :info="incomplete" />
      </van-tab>
      <van-tab :title="`已完成(${complete.length})`">
        <completed :info="complete" />
      </van-tab>
    </van-tabs>
    <div v-if="isLoading===false" class="buttonTextBox">
      <span class="buttonTextBox--buttonText">没有更多内容了～</span>
      <br><br>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Tab, Tabs } from 'vant'
import Incomplete from '../../../student/components/classWork/Incomplete'
import Completed from '../../../student/components/classWork/Completed'
import { getWorkList } from '@/api/student/user'
Vue.use(NavBar)
  .use(Icon)
  .use(Tab)
  .use(Tabs)

export default {
  name: 'ClassWork',
  components: {
    Incomplete,
    Completed
  },
  data: () => {
    return {
      active: 0,
      incomplete: [],
      complete: [],
      isLoading: true
    }
  },
  created() {
    this.active = this.$store.state.courseWork.active
    this.getWorkList()
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.$router.push('/home')
    },
    commitActive(name) {
      this.$store.commit('courseWork/Change_Active', name)
    },
    async getWorkList() {
      try {
        const res = await getWorkList()
        const data = res.data.data
        this.incomplete = data[0]
        this.complete = data[1]
        this.isLoading = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .van-nav-bar {
        background-color: #a12831;
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
