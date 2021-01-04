/*
 * @Author: 庞泽邦
 * @Date: 2020-05-25 11:03:31
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-06-02 13:33:02
 */
//养生模块公共弹窗
<template>
  <div>
    <van-popup v-model="isShow" position="right" :style="{ height: '100%' }" get-container="#app">
      <div class="popup_wrap--container">
        <div @click.stop="goToUser">
          <van-nav-bar>
            <template #title>
              <span style="color:white">个人中心</span>
            </template>
          </van-nav-bar>
        </div>
        <van-cell-group>
          <van-cell title="兴趣标签" clickable to="/interestTag" />
          <van-cell title="我的收藏" clickable to="/myCollection" />
          <van-cell title="我的咨询" clickable to="/consult" />
        </van-cell-group>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, CellGroup, Cell, Popup } from 'vant'
Vue.use(NavBar)
  .use(CellGroup)
  .use(Cell)
  .use(Popup)
export default {
  name: 'HealthyPopup',
  model: {
    prop: 'showPopup',
    event: 'change'
  },
  props: {
    showPopup: {
      type: Boolean
    }
  },
  data: () => {
    return {
      isShow: false
    }
  },
  watch: {
    showPopup() {
      this.isShow = this.showPopup
    },
    isShow() {
      this.$emit('change', this.isShow)
    }
  },
  methods: {
    goToUser() {
      this.$router.push({
        path: '/user'
      })
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
</style>
