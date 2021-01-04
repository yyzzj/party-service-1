<template>
  <div class="order_wrap--container">
    <div style="font-size: 12px;color: #676767;">我的订单</div>
    <van-grid :column-num="3" :border="false">
      <van-grid-item @click.stop="changeView('/myOrder',0)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-daizhifu" />
        </svg>
        <div class="gird_item--text">待支付</div>
      </van-grid-item>
      <van-grid-item @click.stop="changeView('/myOrder',1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-yiwancheng" />
        </svg>
        <div class="gird_item--text">已完成</div>
      </van-grid-item>
      <van-grid-item @click.stop="changeView('/myOrder',2)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#old-icon-daiziti" />
        </svg>
        <div class="gird_item--text">已取消</div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import Vue from 'vue'
import { Grid, GridItem } from 'vant'

Vue.use(Grid)
Vue.use(GridItem)
export default {
  name: 'MyOrder',
  data: () => {
    return {}
  },
  methods: {
    changeView(ViewPath, value) {
      this.$router.push({
        path: ViewPath,
        query: {
          active: value
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order_wrap--container {
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 25px;
  background: white;
  margin-top: 10px;
}
.icon {
  width: 30px;
  height: 30px;
}
.gird_item {
  &--text {
    font-size: 12px;
    color: #313131;
    margin-top: 9px;
  }
}
</style>
