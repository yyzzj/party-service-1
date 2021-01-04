/*
* @Author: 杨志杰
* @Date: 2020-06-01
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-25 21:54:24
*/
//首页-搜索结果页面
<template>
  <div class="searchResult">
    <div class="top">
      <van-row type="flex" justify="center">
        <van-col span="2" class="top-left">
          <van-icon name="arrow-left" color="#575757" size="25" @click="goBack" />
        </van-col>
        <van-col span="21" class="top-right">
          <van-search
            v-model="value"
            shape="round"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
          >
            <template #left-icon>
              <van-icon class-prefix="old-icon" name="sousuo" size="20" color="#979797" />
            </template>
            <template #action>
              <span class="cancel" @click="onCancel">取消</span>
            </template>
          </van-search>
        </van-col>
      </van-row>
    </div>
    <div class="empty" />
    <van-tabs
      v-model="active"
      color="white"
      title-active-color="#A12831"
      title-inactive-color="#676767"
    >
      <van-tab title="全部" />
      <van-tab title="最新发布" />
      <van-tab title="销量最高" />
      <van-tab>
        <template #title>
          <div @click="show = true">
            <van-icon class="play" class-prefix="old-icon" name="shaixuan" />
            筛选
          </div>
        </template>
      </van-tab>
    </van-tabs>
    <SelectPopup v-model="show" v-bind.sync="filterType" />
    <search-item v-for="(item,i) in selectList" :key="i" :item-data="item" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Tab, Tabs, Search, Col, Row } from 'vant'
import SearchItem from '@/pages/student/components/Search/SearchItem'
import SelectPopup from '@/components/SelectPopup'
import { searchCourse } from '@/api/student/search'

Vue.use(Tab)
  .use(Tabs)
  .use(Icon)
  .use(Search)
  .use(Col)
  .use(Row)
export default {
  name: 'SearchResult',
  components: {
    SearchItem,
    SelectPopup
  },
  data() {
    return {
      active: 0,
      value: '',
      searchResult: [], // 源数据
      tempResult: [], // 源数据的拷贝
      show: false,
      filterType: {
        priceLow: '',
        priceHigh: '',
        courseTimeType: 5,
        isConfirm: false
      }
    }
  },
  computed: {
    selectList: {
      get() {
        const data = [...this.searchResult]
        switch (this.active) {
          case 0:
            return data
          case 1:
            return data.sort(function(a, b) { return a.releaseTime < b.releaseTime ? 1 : -1 })
          case 2:
            return data.sort((a, b) => { return b.payNum - a.payNum })
          default:
            return this.filterType.isConfirm === true ? this.tempResult : data
        }
      },
      set(val) {
        this.tempResult = val
      }
    }
  },
  watch: {
    filterType: {
      handler: function() {
        // do something
        const data = [...this.searchResult]
        const { priceLow, priceHigh, courseTimeType } = this.filterType
        const Low = Number.isNaN(parseFloat(priceLow)) ? 0 : priceLow
        const High = Number.isNaN(parseFloat(priceHigh)) ? Number.MAX_VALUE : priceHigh
        let timeLow, timeHight
        switch (courseTimeType) {
          case 1:
            timeLow = 0
            timeHight = 4
            break
          case 2:
            timeLow = 4
            timeHight = 8
            break
          case 3:
            timeLow = 8
            timeHight = 16
            break
          case 4:
            timeLow = 16
            timeHight = Number.MAX_VALUE
            break
          default:
            timeLow = 0
            timeHight = Number.MAX_VALUE
            break
        }
        const priceFilter = data.filter((item) => {
          return item.coursePrice >= Low && item.coursePrice <= High
        })
        const timeFilter = priceFilter.filter((item) => {
          return item.classHour >= timeLow && item.classHour <= timeHight
        })
        this.selectList = timeFilter
      },
      deep: true
    }
  },
  created() {
    this.value = this.$route.query.keyword
    this.searchCourse(this.value)
  },
  methods: {
    // 返回上一页面
    goBack() {
      this.$router.go(-1)
    },
    // 搜索事件
    onSearch(val) {
      this.$router.replace({
        path: '/searchResult',
        query: {
          keyword: val
        }
      })
      this.searchCourse(val)
    },
    // 取消事件
    onCancel() {
      this.value = ''
    },
    async searchCourse(keyword) {
      try {
        const res = await searchCourse(keyword)
        this.searchResult = res.data.data
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/_settings.scss';
    //设置span的字体颜色的混合指令
    @mixin setSpanStyle($fontSize,$color) {
        font-size: $fontSize;
        color: $color;
    }

    .searchResult {
        background-color: $grey-lighter;
        min-height: 100vh;
        font-family: PingFangSC-Regular;

        .top {
            background-color: $white;

            &-left {
                display: flex;
                align-items: center; /*定义body的元素垂直居中*/
                justify-content: center; /*定义body的里的元素水平居中*/
                .van-icon {
                    cursor: pointer;
                }
            }

            &-right {
                .cancel {
                    @include setSpanStyle(16px, $background-grey);
                }
            }
        }

        .empty {
            height: 1px;
        }
    }
</style>
