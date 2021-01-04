/*
 * @Author: 庞泽邦
 * @Date: 2020-06-02 11:43:48
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-06-02 13:32:15
 */
//我的咨询页面
<template>
  <div class="consult_wrap--container">
    <van-nav-bar @click-left="goBack" @click-right="showMenu">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">我的咨询</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="caidan" size="18" color="white" />
      </template>
    </van-nav-bar>
    <consult-cell />
    <healthy-popup v-model="showPopup" />
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Tab, Tabs } from 'vant'
import ConsultCell from '../../components/Consult/ConsultCell.vue'
import HealthyPopup from '@/components/HealthyPopup'
Vue.use(NavBar)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
export default {
  name: 'Consult',
  components: {
    'consult-cell': ConsultCell,
    'healthy-popup': HealthyPopup
  },
  data: () => {
    return {
      showPopup: false
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    showMenu() {
      this.showPopup = !this.showPopup
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.consult_wrap--container{
  height: 100vh;
  background: $bg;
}
.van-nav-bar {
    background-color: $main-color;
}
</style>
