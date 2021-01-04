/*
* @Author: 杨志杰
* @Date: 2020-10-29 15:40
* @Last Modified by: 杨志杰
* @Last Modified time: 2020-10-30 15:40
*/
// 我的工具-养生问答
<template>
  <div class="index-container">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="$router.go(-1)" />
      </template>
      <template #title>
        <span style="color:white">养生问答</span>
      </template>
      <template #right>
        <van-icon name="wap-nav" size="18" color="white" @click="showPopup = !showPopup" />
      </template>
    </van-nav-bar>
    <add-healthy-ask v-if="showAdd" />
    <my-article v-if="showArticle" />
    <my-ask v-if="showAsk" />
    <van-popup v-model="showPopup" position="right">
      <van-nav-bar>
        <template #title>
          <span style="color:white">个人中心</span>
        </template>
      </van-nav-bar>
      <div class="van-popup-container">
        <div
          class="van-popup-container-text"
          :class="{'van-popup-container-text-active':showAdd}"
          @click="mShowAdd"
        >新增文章
        </div>
        <div
          class="van-popup-container-text"
          :class="{'van-popup-container-text-active':showArticle}"
          @click="mShowArticle"
        >我的文章
        </div>
        <div
          class="van-popup-container-text"
          :class="{'van-popup-container-text-active':showAsk}"
          @click="mShowAsk"
        >我的咨询
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import AddHealthyAsk from '@/pages/teacher/views/HealthyAsk/AddHealthyAsk'
import MyArticle from '@/pages/teacher/views/HealthyAsk/MyArticle'
import MyAsk from '@/pages/teacher/views/HealthyAsk/MyAsk'
import { Popup, Icon, NavBar } from 'vant'

Vue.use(Popup)
  .use(Icon)
  .use(NavBar)
export default {
  name: 'Index',
  components: {
    AddHealthyAsk,
    MyArticle,
    MyAsk
  },
  data() {
    return {
      showPopup: false,
      showAdd: true,
      showArticle: false,
      showAsk: false
    }
  },
  methods: {
    mShowAdd() {
      [this.showAdd, this.showArticle, this.showAsk] = [true, false, false]
      this.closePopup()
    },
    mShowArticle() {
      [this.showAdd, this.showArticle, this.showAsk] = [false, true, false]
      this.closePopup()
    },
    mShowAsk() {
      [this.showAdd, this.showArticle, this.showAsk] = [false, false, true]
      this.closePopup()
    },
    closePopup() {
      this.showPopup = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";

.index-container {
  min-height: 100vh;
  .van-nav-bar {
    background-color: #a12831;
  }

  .van-popup {
    height: 100%;
    width: 50%;

    &-container {
      margin-left: 25px;
      margin-right: 5px;

      &-text {
        font-size: 14px;
        padding: 15px 0;
        border-bottom: solid 1px $border-bottom-color;

        &-active {
          color: $main-color;
        }
      }
    }
  }
}
</style>
