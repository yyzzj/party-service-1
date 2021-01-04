/*
 * @Author: 庞泽邦
 * @Date: 2020-11-18 10:22:01
 * @Last Modified by: 杨志杰
 * @Last Modified time: 2020-12-25 10:52:51
 */
// 下拉刷新组件
<template>
  <van-pull-refresh v-model="loading" success-text="已成功刷新" animation-duration="1500" success-duration="800" @refresh="resetList">
    <template #pulling>
      <RefreshLoading />
    </template>
    <template #loosing>
      <RefreshLoading />
    </template>
    <template #loading>
      <RefreshLoading />
    </template>
    <van-list
      v-show="data.length !== 0"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="list"
      @load="getList"
    >
      <slot :data="data" />
    </van-list>
    <slot v-if="data.length === 0" name="empty">
      <van-empty description="暂无数据" image="error" />
    </slot>
  </van-pull-refresh>
</template>
<script>

import { List, PullRefresh, Empty } from 'vant'
import RefreshLoading from '@/components/SVG/RefreshLoading'
export default {
  name: 'PullList',
  components: {
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    [Empty.name]: Empty,
    RefreshLoading
  },
  props: {
    func: { // 请求函数
      type: Function,
      required: true
    },
    params: {
      type: Object,
      default: () => { return {} }
    },
    sortFunc: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      data: [],
      count: 0, // 总数
      page: 0,
      loading: false,
      resetLock: false
    }
  },
  computed: {
    finished() {
      return this.data.length >= this.count
    }
  },
  watch: {
    func: {
      handler: 'resetList',
      immediate: true
    }
  },
  methods: {
    async getList(isAppend = true) {
      this.loading = true
      const { data: { totalnum = 0, data = [] }} = await this.func(++this.page, ...Object.values(this.params))
      this.loading = false
      this.count = totalnum
      const result = data.length ? data : []
      isAppend ? this.data.push(...result) : (this.data = result)
    },
    resetList() {
      this.page = 0
      this.count = 0
      this.getList(false)
    }
  }
}
</script>
<style lang="scss" scoped>
  .list {
    height: 100%;
  }
</style>
