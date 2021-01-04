<template>
  <div class="page">
    <van-nav-bar @click-left="$router.back(-1);">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">个人详情</span>
      </template>
    </van-nav-bar>
    <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="manager"
      placeholder="name"
      label="姓名"
      :value="plans.name"
      class="mb-1"
    />
    <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="like"
      placeholder="sex"
      label="性别"
      :value="plans.sex"
      class="mb-1"
    />
    <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="location"
      placeholder="address"
      label="地址"
      :value="plans.address"
      class="mb-1"
    />
    <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="phone"
      placeholder="familyPhone"
      label="电话"
      :value="plans.familyPhone"
      class="mb-1"
    />
    <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="map-marked"
      placeholder="nation"
      label="国家"
      :value="plans.nation"
      class="mb-1"
    />
    <van-field
      readonly
      clickable
      right-icon="arrow"
      left-icon="coupon"
      placeholder="idcard"
      label="身份证"
      :value="plans.idcard"
      class="mb-1"
    />

  </div>
</template>
<script>
import {
  NavBar,
  NoticeBar,
  Field,
  Icon
} from 'vant'
import Vue from 'vue'
import { getPersonDetailInfo } from '@/api/student/user'

Vue.use(NavBar)
  .use(NoticeBar)
  .use(Field)
  .use(Icon)

export default {
  name: 'PersonDetail',
  data() {
    return {
      plans: []
    }
  },
  created() {
    this.getPersonDetailInfo()
  },
  methods: {
    async getPersonDetailInfo() {
      try {
        const res = await getPersonDetailInfo()
        this.plans = res.data.data[0]
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
.page {
  background: $white;
  &-notice {
    margin-bottom: 16px;
  }
  &-content {
    height: 80%;
    &_loaded {
      width: 100%;
      height: 100%;
      background: $bg;
    }
  }
}
.mb-1 {
    margin-bottom: 10px;
  }
</style>
