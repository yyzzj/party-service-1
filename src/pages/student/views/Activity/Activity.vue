<template>
  <div class="container">
    <div class="activity_warp--container">
      <van-sticky :offset-top="0">
        <div class="fix_fixed--container">
          <van-tabs v-model="active" color="#A12831" swipe-threshold="5" animated>
            <van-tab title="热门活动" />
            <van-tab title="党建活动" />
            <van-tab title="文体活动" />
            <van-tab title="便民活动" />
            <van-tab title="更多" />
          </van-tabs>
        </div>
      </van-sticky>
      <div v-for="(item, index) in activityList" :key="index">
        <activity-item :activity-item="item" />
      </div>
    </div>
    <div style="margin-bottom:50px;" />
  </div>
</template>

<script>
import Vue from 'vue'
import ActivityItem from '../../components/Activity/ActivityItem.vue'
import { Icon, Sticky, Tabs, Tab } from 'vant'

Vue.use(Icon).use(Sticky).use(Tabs).use(Tab)
export default {
  name: 'Activity',
  components: {
    ActivityItem
  },
  data() {
    return {
      active: 0,
      activityList: [
        {
          id: 1,
          pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3971786561,185723513&fm=11&gp=0.jpg',
          title: '好书伴我行',
          detail: '全民读书活动'
        },
        {
          id: 2,
          pic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3523888900,186781806&fm=26&gp=0.jpg',
          title: '清洁家园、从我做起',
          detail: '为绿化、美化环境做实事'
        },
        {
          id: 3,
          pic: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3728800083,1536601026&fm=26&gp=0.jpg',
          title: '庆祝建党90周年',
          detail: '培养爱党、爱国的思想'
        },
        {
          id: 4,
          pic: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=420812649,1398705332&fm=26&gp=0.jpg',
          title: '社区免费义诊活动',
          detail: '借着义诊的机会向社区居民普及卫生健康知识，让社区居民了解健康知识'
        },
        {
          id: 5,
          pic: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=452847217,635863716&fm=26&gp=0.jpg',
          title: '健康五一节·爱心衣加衣',
          detail: '用实际行动为创建和谐社区做贡献。'
        }
      ]
    }
  },
  mounted() {}
}
</script>

<style lang='scss' scoped>
.activity_warp {
  &--container {
    min-height: 100vh;
    background: rgb(244, 246, 245);
  }
}
</style>
