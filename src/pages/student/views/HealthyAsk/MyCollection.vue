/*
* @Author:吴晓斌
* @Date:2020-05-27
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-07 20:35:09
*/
//养生模块-我的收藏页面
<template>
  <div class="myCollection">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">我的收藏</span>
      </template>
      <template #right>
        <van-icon
          slot="icon"
          class-prefix="old-icon"
          name="caidan"
          size="18"
          color="white"
          @click="clickRight"
        />
      </template>
    </van-nav-bar>
    <my-collection-item :info="info" />
    <healthy-popup v-model="showPopup" />
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Popup, Cell, CellGroup } from 'vant'
import MyCollectionItem from '@/pages/student/components/MyCollection/MyCollectionItem'
import HealthyPopup from '@/components/HealthyPopup'
import { getMyFavoriteArticle } from '@/api/student/healthy'
Vue.use(NavBar).use(Icon).use(Popup).use(Cell).use(CellGroup)

export default {
  name: 'MyCollection',
  components: {
    MyCollectionItem,
    'healthy-popup': HealthyPopup
  },
  data: () => {
    return {
      showPopup: false,
      info: []
    }
  },
  created() {
    this.getMyFavoriteArticle()
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    },
    clickRight() {
      this.showPopup = true
    },
    async getMyFavoriteArticle() {
      try {
        const res = await getMyFavoriteArticle()
        this.info = res.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";

.myCollection {
  min-height: 100vh;
}
.van-nav-bar {
  background-color: $main-color;
}
.popup_wrap--container{
    min-width: 50vw;
}
</style>
