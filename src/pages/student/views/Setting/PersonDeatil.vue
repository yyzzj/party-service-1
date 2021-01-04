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
      v-model="plans.name"
      :readonly="isChange"
      clickable
      right-icon="arrow"
      left-icon="manager"
      placeholder="name"
      label="姓名"
      class="mb-1"
    />
    <van-field
      v-model="plans.sex"
      :readonly="isChange"
      clickable
      right-icon="arrow"
      left-icon="like"
      placeholder="sex"
      label="性别"
      class="mb-1"
    />
    <van-field
      v-model="plans.address"
      :readonly="isChange"
      clickable
      right-icon="arrow"
      left-icon="location"
      placeholder="address"
      label="地址"
      class="mb-1"
    />
    <van-field
      v-model="plans.familyPhone"
      :readonly="isChange"
      clickable
      right-icon="arrow"
      left-icon="phone"
      placeholder="familyPhone"
      label="电话"
      class="mb-1"
    />
    <van-field
      v-model="plans.nation"
      :readonly="isChange"
      clickable
      right-icon="arrow"
      left-icon="map-marked"
      placeholder="nation"
      label="国家"
      class="mb-1"
    />
    <van-field
      v-model="plans.idCard"
      :readonly="isChange"
      clickable
      right-icon="arrow"
      left-icon="coupon"
      placeholder="idcard"
      label="身份证"
      class="mb-1"
    />
    <div class="page-button">
      <van-button v-show="isChange" class="button change-button" round @click="change">修改资料</van-button>
      <van-button v-show="!isChange" class="button" round @click="updatePersonDetailInfo">确定修改</van-button>
      <van-button v-show="!isChange" class="button" round @click="cancel">取消</van-button>
    </div>
  </div>
</template>
<script>
import {
  NavBar,
  NoticeBar,
  Field,
  Icon,
  Button
} from 'vant'
import Vue from 'vue'
import { getPersonDetailInfo, updatePersonDetailInfo } from '@/api/student/user'

Vue.use(NavBar)
  .use(NoticeBar)
  .use(Field)
  .use(Icon)
  .use(Button)
export default {
  name: 'PersonDetail',
  data() {
    return {
      plans: [],
      isChange: true,
      list: []
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
    },
    async updatePersonDetailInfo() {
      try {
        await updatePersonDetailInfo(this.plans)
        this.isChange = true
      } catch (error) {
        console.log(error)
      }
    },
    change() {
      this.list = this.plans
      this.isChange = false
    },
    cancel() {
      this.isChange = true
      this.plans = this.list
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
  &-button {
    text-align: center
  }
}
.mb-1 {
    margin-bottom: 10px;
  }
.button{
  background-color: $main-color;
  width: 40%;
  border: 0;
  color: $white;
  margin: 10px 5px;
}
.change-button{
  width: 60%;
}
</style>
