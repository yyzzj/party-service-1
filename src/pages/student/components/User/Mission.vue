<template>
  <div class="mission_wrap--container">
    <div style="font-size: 12px;color: #676767;">今日任务</div>
    <van-row type="flex" justify="center" align="center" style="width:100%,height:100%">
      <van-col span="11" @click.stop="ToMissionDetail(0)">
        <div class="col_top--text">{{ `${unCompleteNum}节` }}</div>
        <div class="col_botom--text">未完成</div>
      </van-col>
      <van-col style="height:60px;border: 1px solid #F4F6F5;" />
      <van-col span="11" @click.stop="ToMissionDetail(1)">
        <div class="col_top--text">{{ `${completeNum}节` }}</div>
        <div class="col_botom--text">已完成</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Col, Row } from 'vant'

Vue.use(Col)
Vue.use(Row)
export default {
  name: 'Mission',
  props: {
    unCompleteNum: {
      type: String,
      default: ''
    },
    completeNum: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
    }
  },
  created() {
  },
  methods: {
    ToMissionDetail(value) {
      this.$router.push({
        path: '/dailyTask',
        query: {
          active: value
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mission_wrap--container {
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 25px;
  background: white;
  margin-top: 10px;
  height: 90px;
}
.icon {
  width: 30px;
  height: 30px;
}
.col_botom {
  &--text {
    text-align: center;
    font-size: 12px;
    color: #313131;
    margin-top: 8px;
  }
}
.col_top {
  &--text {
    font-size: 16px;
    color: #a12831;
    text-align: center;
  }
}
</style>
