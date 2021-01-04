/*
 * @Author: 庞泽邦
 * @Date: 2020-05-05 13:56:09
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-25 21:54:09
 */
//选课页热门精品组件
<template>
  <div class="cell_contanier">
    <van-empty v-if="isEmpty" image="error" description="暂无数据" />
    <van-pull-refresh v-if="!isEmpty" v-model="refreshing" success-text="已成功刷新" animation-duration="1500" success-duration="800" @refresh="onRefresh">
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
        <transition-group
          name="more"
          :css="false"
          @before-enter="beforeEnter"
          @enter="enter"
        >
          <div v-for="(item,index) of showlist" :key="index+item.courseName" class="cell_course--container demo van-clearfix" :data-index="index+1" @click="jump(item.courseId)">
            <div v-if="show">
              <div>
                <van-tag round size="medium" color="#68627E">{{ item.courseLabel }}</van-tag>
                <span class="cell_course--coursename">{{ item.courseName }}</span>
                <div class="cell_course--label">{{ `课程简介:${item.courseBasicIntroduction}` }}</div>
              </div>
              <van-row gutter="20">
                <van-col span="12">
                  <div class="cell_courseteacher--container">
                    <van-image
                      round
                      width="20px"
                      height="20px"
                      src="https://img.yzcdn.cn/vant/cat.jpeg"
                      class="cell_courseteacher--avatar"
                    />
                    <div class="cell_courseteacher--teachername">{{ `讲师: ${item.teacherName}` }}</div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="cell_courseInfo--container">
                    <div class="cell_courseInfo--price">{{ item.coursePrice | formatPrice }}</div>
                    <div class="cell_courseInfo--num">{{ `已有 ${item.payNum}人报名` }}</div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
        </transition-group>
      </van-list>
    </van-pull-refresh>
    <!-- <div class="footer_content--text">已经到达底部了噢~</div> -->
    <!-- 撑开 -->
    <div style="height:60px" />
  </div>
</template>

<script>
import { getMoreHotCourse } from '@/api/student/select'
import Vue from 'vue'
import { Cell, CellGroup, Tag, Col, Row, Image, List, PullRefresh, Empty } from 'vant'
import RefreshLoading from '@/components/SVG/RefreshLoading'
import { jumpToCourseDetail } from '@/mixins'

Vue.use(Cell)
  .use(CellGroup)
  .use(Tag)
  .use(Col)
  .use(Row)
  .use(Image)
  .use(List)
  .use(PullRefresh)
  .use(Empty)
export default {
  name: 'HotCourse',
  components: {
    RefreshLoading
  },
  // 混入跳转到课程详情逻辑
  mixins: [jumpToCourseDetail],
  props: {
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
      list: [], // 源数据
      show: false, // 延迟显示变量
      loading: false, // 是否在等待接口返回
      finished: false, // 是否所有数据加载腕表
      error: false, // 是否请求失败
      isEmpty: false, // 是否接口空数据
      refreshing: false, // 是否下拉刷新
      page: 0
    }
  },
  computed: {
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
  mounted() {
    setTimeout(() => {
      this.show = !this.show
    })
  },
  methods: {
    async getList() {
      try {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }
        const res = await getMoreHotCourse(this.page, 10)
        this.page++
        if (res.data.data.length > 0) {
          for (const i of res.data.data) {
            this.list.push(i)
          }
          // 全部加载完毕则改变finished状态
          if (this.page > res.data.pages) {
            this.finished = true
          }
        } else {
          this.loading = false
          this.isEmpty = true
          this.finished = true
        }
        this.loading = false
      } catch (e) {
        this.loading = false
        this.error = true
        console.log(e)
      }
    },
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      // const delay = el.dataset.index * 200
      window.requestAnimationFrame(() => {
        el.style.transition = 'opacity 0.4s '
        el.style.opacity = 1
        el.classList.add('demo')
        // el.style.animation = 'one-in 1s forwards'
        done()
      })
    },
    onLoad() {
      // 异步更新数据
      this.getList()
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this.onLoad()
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes one-in {
  0% {
    margin-top: 30px;
    height: 0%;
  }
  100% {
    margin-top: 0px;
    height: 100%;
  }
}
.demo{
  animation: one-in 1s forwards;
}
.cell_contanier {
  padding-top: 5px;
  background: rgb(244, 246, 245);
}
.cell_course {
  &--container {
    border-bottom: 5px solid rgb(244, 246, 245);
    padding-left: 10px;
    padding-top: 10px;
    background: white;
  }
  &--label {
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: #676767;
    margin-top: 6px;
  }
  &--coursename {
    margin-left: 11px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
  }
}
.cell_courseteacher {
  &--container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &--avatar {
    margin-top: 16px;
    margin-bottom: 10px;
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
.cell_courseInfo {
  &--container {
    float: right;
  }
  &--price {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #a12831;
    text-align: center;
    width: 80px;
    margin-right: 14px;
    margin-top: 5px;
  }
  &--num {
    font-family: PingFangSC-Semibold;
    font-size: 10px;
    color: #6d7278;
    margin-top: 3px;
  }
}
.footer_content--text{
  text-align:center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #989898;margin-top:7px
}
</style>
