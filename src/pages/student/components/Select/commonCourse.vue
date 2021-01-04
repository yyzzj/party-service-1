/*
 * @Author: 庞泽邦
 * @Date: 2020-05-05 14:07:20
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-25 21:54:05
 */
//选课页普通课程组件
<template>
  <div class="hotcourse_container">
    <van-empty v-if="isEmpty" image="error" description="暂无数据" />
    <van-pull-refresh v-else v-model="refreshing" success-text="已成功刷新" animation-duration="1500" success-duration="800" @refresh="onRefresh">
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
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        finished-text="已经到达底部了噢~"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <van-card v-for="(item,index) of showlist" :key="index" thumb="https://img.yzcdn.cn/vant/ipad.jpeg" @click="jump(item.courseId)">
          <template #title>
            <span class="card_title--text">{{ item.courseName }}</span>
          </template>
          <template #desc>
            <div class="card_desc--container">
              <van-tag type="danger" color="#A12831">{{ item.coursePrice | formatPrice }}</van-tag>
            </div>
          </template>
          <template #tags>
            <div class="card_tag--container">
              <span class="card_tag--text">{{ `已有: ${item.payNum}人报名` }}</span>
            </div>
          </template>
          <template #price>
            <div class="card_price--container">
              <van-image
                round
                width="20px"
                height="20px"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
                class="card_price--avatar"
              />
              <div class="card_price--teachername">{{ `讲师: ${item.teacherName}` }}</div>
            </div>
          </template>
          <template #num>
            <van-button color="#A12831" size="small" @click="jump(item.courseId)">立即报名</van-button>
          </template>
        </van-card>
      </van-list>
    </van-pull-refresh>
    <!-- 撑开 -->
    <div style="height:60px" />
  </div>
</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup, Card, Button, List, PullRefresh, Empty } from 'vant'
import { getCeramicsCourse, getCalligraphyCourse, getPaintingCourse, getMorePopularCourse } from '@/api/student/select'
import RefreshLoading from '@/components/SVG/RefreshLoading'
import { jumpToCourseDetail } from '@/mixins'
Vue.use(Cell)
  .use(CellGroup)
  .use(Card)
  .use(Button)
  .use(List)
  .use(PullRefresh)
  .use(Empty)
export default {
  name: 'CommonCourse',
  components: {
    RefreshLoading
  },
  // 混入跳转到课程详情逻辑
  mixins: [jumpToCourseDetail],
  props: {
    courseType: {
      type: Number,
      default: 1
    },
    // 筛选的tab
    selectType: {
      type: Number,
      default: 0
    },
    isConfrim: {
      type: Boolean,
      default: false
    },
    priceLow: {
      type: Number,
      default: 0
    },
    priceHigh: {
      type: Number,
      default: Number.MAX_VALUE
    },
    courseTimeType: {
      type: Number,
      default: 5
    }
  },
  data: () => {
    return {
      label: 'aaa',
      teacher: '蔡徐坤',
      data: [],
      list: [],
      loading: false, // 是否在等待接口返回
      finished: false, // 是否所有数据加载腕表
      error: false, // 是否请求失败
      isEmpty: false, // 是否接口空数据
      refreshing: false, // 是否下拉刷新
      page: 0 // 当前页
    }
  },
  computed: {
    Type() {
      return this.courseType
    },
    showlist() {
      const data = [...this.list]
      switch (this.selectType) {
        case 1:
          return data.sort(function(a, b) { return a.releaseTime < b.releaseTime ? 1 : -1 })
        case 2:
          return data.sort((a, b) => { return b.payNum - a.payNum })
        case 3:
          if (this.isConfrim === true) {
            const priceLow = Number.isNaN(this.priceLow) ? 0 : this.priceLow
            const priceHigh = Number.isNaN(this.priceHigh) ? Number.MAX_VALUE : this.priceHigh
            let timeLow, timeHight
            switch (this.courseTimeType) {
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
              return item.coursePrice >= priceLow && item.coursePrice <= priceHigh
            })
            const timeFilter = priceFilter.filter((item) => {
              return item.classHour >= timeLow && item.classHour <= timeHight
            })
            return timeFilter
          } else {
            return data
          }
        default:
          return data
      }
    }
  },
  watch: {
    // 监听type变化，清空当前状态并初始化
    Type() {
      this.page = 0
      this.list = []
      this.loading = false
      this.finished = false
      this.isEmpty = false
      // 一定要在切换时调用一次获取接口，不然不能触发List组件的load事件
      this.getHotInfo()
    }
  },
  methods: {
    onLoad() {
      this.getHotInfo()
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false
      this.page = 0
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    },
    async getHotInfo() {
      let res
      try {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        switch (this.Type) {
          case 2:
            res = await getCalligraphyCourse(this.page, 6) // 使用六个是为了解决PC端List组件不满一屏时的刷新问题
            this.page++
            break
          case 3:
            res = await getPaintingCourse(this.page, 6)
            this.page++
            break
          case 4:
            res = await getMorePopularCourse(this.page, 6)
            this.page++
            break
          default:
            res = await getCeramicsCourse(this.page, 6)
            this.page++
        }
        if (res.data.data.length > 0) {
          for (const i of res.data.data) {
            this.list.push(i)
          }
          if (this.page > res.data.pages) {
            this.finished = true
          }
        } else {
          this.isEmpty = true
          this.finished = true
        }
        this.loading = false
      } catch (err) {
        this.loading = false
        this.error = true
        console.log(err)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.hotcourse_container {
  margin-top: 5px;
}
.head_course {
  &--value {
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #6d7278;
  }
}
.van-card {
  background-color: white;
  margin-top: 0px;
  border-bottom: 5px solid rgb(244, 246, 245);
}
.card_title {
  &--text {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
  }
}
.card_desc {
  &--container {
    margin-top: 5px;
  }
}
.card_tag {
  &--container {
    margin-top: 5px;
  }
  &--text {
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #6d7278;
  }
}
.card_price {
  &--container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &--avatar {
    margin-top: 8px;
  }
  &--teachername {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #676767;
    margin-left: 10px;
    text-align: center;
    height: 20px;
    margin-top: 11px;
  }
}
.footer_content--text{
  text-align:center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #989898;margin-top:7px
}
</style>
