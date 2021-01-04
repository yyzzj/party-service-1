/*
 * @Author: 庞泽邦
 * @Date: 2020-05-01 16:18:12
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-17 11:32:45
 */
//学生端首页免费精品课推荐组件
<template>
  <div class="cell_contanier">
    <van-cell is-link to="/select">
      <template #title>
        <span>免费精品课</span>
      </template>
      <template #default>
        <span class="head_course--value">查看更多</span>
      </template>
    </van-cell>
    <div v-if="!error">
      <van-skeleton v-for="(item,index ) in list" :key="index" title avatar :row="3" :loading="loading">
        <div class="cell_course--container" @click="jump(item.courseId)">
          <div>
            <van-tag round size="medium" color="#68627E">{{ item.courseLabel }}</van-tag>
            <span class="cell_course--coursename">{{ item.courseName }}</span>
            <div class="cell_course--label">{{ `课程简介: `+ item.courseBasicIntroduction }}</div>
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
                <div class="cell_courseInfo--price">免费</div>
                <div class="cell_courseInfo--num">{{ `已有${item.payNum}人报名` }}</div>
              </div>
            </van-col>
          </van-row>
        </div>
      </van-skeleton>
    </div>
    <van-empty v-if="error" image="error" description="暂无数据" style="height:230px" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell, CellGroup, Tag, Col, Row, Image, Empty, Skeleton } from 'vant'
import { getFree } from '@/api/student/home'
import { jumpToCourseDetail } from '@/mixins'

Vue.use(Cell)
  .use(CellGroup)
  .use(Tag)
  .use(Col)
  .use(Row)
  .use(Image)
  .use(Empty)
  .use(Skeleton)
export default {
  name: 'FreeRecommend',
  // 混入跳转到课程详情逻辑
  mixins: [jumpToCourseDetail],
  data: () => {
    return {
      list: [1, 2],
      loading: true,
      error: false
    }
  },
  created() {
    this.isHaveStore()
  },
  methods: {
    async getFree() {
      try {
        const res = await getFree()
        this.list = res.data.data
        sessionStorage.setItem('freeCourse', JSON.stringify(res.data.data))
        if (this.list.length === 0) this.error = true
      } catch (error) {
        this.error = true
        console.log(error)
      }
    },
    isHaveStore() {
      const flag = sessionStorage.getItem('freeCourse')
      if (!flag) {
        this.getFree()
      } else {
        this.list = JSON.parse(flag)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.cell_contanier {
  margin-top: 9px;
      padding-bottom: 10px;
  background: white;
}
.head_course {
  &--value {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #6d7278;
  }
}
.cell_course {
  &--container {
    border-bottom: 1px solid #f4f6f5;
    margin-left: 12px;
    margin-top: 9px;
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
    width: 120px;
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
</style>
