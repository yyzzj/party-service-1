/*
 * @Author: 庞泽邦
 * @Date: 2020-05-25 11:03:31
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-15 18:10:33
 */
//养生问答模块页面
<template>
  <div>
    <van-nav-bar @click-left="goBack" @click-right="showMenu">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">养生问答</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="caidan" size="18" color="white" />
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" color="#A12831" swipe-threshold="5" animated sticky class="fix">
      <van-tab title="热门">
        <hot-healthy-ask :active="active" />
      </van-tab>
      <van-tab title="医师咨询">
        <doctor-consulting />
      </van-tab>
      <van-tab v-for="(item,index) of tag" :key="index" :title="item.name">
        <hot-healthy-ask :id="item.id" :active="active" />
      </van-tab>
    </van-tabs>
    <healthy-popup v-model="showPopup" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, NavBar, CellGroup, Cell, Button, Tabs, Tab, Popup } from 'vant'
import HotHealthyAsk from '../../components/HealthyAsk/HotHealthyAsk'
import DoctorConsulting from '../../components/HealthyAsk/DoctorConsulting'
import HealthyPopup from '@/components/HealthyPopup'
import { judegTag } from '@/api/student/healthy'
Vue.use(NavBar)
  .use(Icon)
  .use(CellGroup)
  .use(Cell)
  .use(Button)
  .use(Tabs)
  .use(Tab)
  .use(Popup)
export default {
  name: 'HealthyAsk',
  components: {
    'hot-healthy-ask': HotHealthyAsk,
    'doctor-consulting': DoctorConsulting,
    'healthy-popup': HealthyPopup
  },
  data: () => {
    return {
      active: 0,
      showPopup: false,
      tag: []
    }
  },
  watch: {
    // 监听active当用户从别的页面跳转回来时依旧提留在离开的tab页
    active() {
      this.$store.commit('healthy/SET_Active', this.active)
    }
  },
  created() {
    this.judegTag()
  },
  methods: {
    // onclick方法
    // 返回上一页
    goBack() {
      this.$router.go(-1)
    },
    // 展示菜单
    showMenu() {
      this.showPopup = true
    },
    async judegTag() {
      try {
        const res = await judegTag()
        if (res.data.length === 0) {
          this.$router.replace('/interestTag')
        } else {
          this.tag = res.data
        }
        this.active = this.$store.state.healthy.active
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.van-nav-bar {
    background-color: $main-color;
}
.popup_wrap--container{
    min-width: 50vw;
}
.fix /deep/ .van-sticky--fixed{
  max-width: 600px;
  margin: 0 auto;
}
</style>
