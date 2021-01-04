/*
* @Author: 吴晓斌
* @Date: 2020-09-16
* @Last Modified by: 吴晓斌
* @Last Modified time: 2020-11-03 08:40:02
*/
//个人中心-我的订单-已完成组件
<template>
  <div>
    <div v-if="isCourseListShow" class="container">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        finished-text="已经到达底部了噢~"
        @load="onLoad"
      >
        <div v-for="(item,index) in courseList" :key="index">
          <div v-show="item.status===1"> <!--上架课程状态为1-->
            <div class="card--top">
              <div class="orderId">
                <span>课程ID：{{ item.courseId }}</span> <!--课程Id-->
              </div>
              <van-button class="card--detailBtn" size="normal" round @click="queryOrderHandle(item.courseId)">查看订单</van-button>
            </div>
            <div class="card--content">
              <van-image class="card--image" width="70" height="70" :src="item.courseImgUrl" />
              <div class="card--contentRight">
                <div class="card--title">{{ item.courseName }}</div> <!--课程主题-->
                <div class="card--sale">
                  <span class="card--saleCount">销售量</span> <!--销售量-->
                  <span>{{ item.payNum }}</span>
                </div>
                <div class="card--class">
                  <span class="card--classTitle">类型</span>
                  <span class="card--classTime">{{ item.classHour }}课时</span> <!--上课时间-->
                  <span class="card--course">{{ item.courseType | courseTypeOption(item.courseType) }}</span> <!--课程类型-->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 网络错误 -->
        <van-empty v-if="error" image="network" description="网络请求错误" />
      </van-list>
    </div>
    <div v-else class="container">
      <div class="backBtnBox">
        <van-button class="backBtn" size="normal" @click="backToCourseList">返回课程列表</van-button>
      </div>
      <div v-for="(item,index) in orderList" :key="index">
        <div v-show="item.payStatus===1"> <!--订单状态为已支付-->
          <div class="card--top">
            <div class="orderId">
              <span>订单编号：{{ item.out_trade_no }}</span> <!--订单编号-->
            </div>
            <div class="completed"> <!--订单状态文字颜色-->
              <span>已完成</span> <!--订单状态文字-->
            </div>
          </div>
          <div class="card--content">
            <van-image class="card--image" width="70" height="70" :src="item.image" />
            <div class="card--contentRight">
              <div class="card--title">{{ item.courseName }}</div> <!--课程主题-->
              <div class="card--student">
                <span class="card--studentName">学生</span> <!--上课学生-->
                <span>{{ item.name }}</span>
              </div>
              <div class="card--class">
                <span class="card--classTitle">类型</span>
                <span class="card--classTime">{{ item.classHour }}课时</span> <!--上课时间-->
                <span class="card--course">{{ item.courseLabel }}</span> <!--课程类型-->
              </div>
            </div>
          </div>
          <div class="card--bottom">
            <van-row type="flex" justify="space-between" calss="card_bottomContainer">
              <van-col span="12" class="card_priceContainer">
                <span>已付：&nbsp;&nbsp;</span>
                <span class="card--price">{{ `￥${item.total_fee}` }}</span> <!--订单价格-->
              </van-col>
              <van-col span="6" class="card_btnContainer">
                <van-button class="card--detailBtn" size="normal" round @click="orderDetail(item.out_trade_no)">查看详情</van-button>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
      <div class="footer">
        <span>无更多数据啦~</span>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import { Image, Col, Row, Button, List, Empty, Toast } from 'vant'
import { listCourse, queryOrderByCourseId } from '@/api/teacher/myOrder'

Vue.use(Image)
  .use(Col)
  .use(Row)
  .use(Button)
  .use(List)
  .use(Empty)
  .use(Toast)

export default {
  name: 'Completed',
  filters: {
    courseTypeOption(courseType) {
      const map = {
        1: '书法',
        2: '绘画',
        3: '陶瓷',
        4: '其他'
      }
      return map[courseType]
    }
  },
  data: () => {
    return {
      isCourseListShow: true, // 显示该教师课程列表
      courseList: [],
      orderList: null,
      courseListLength: 0,
      loading: false, // 加载状态
      finished: false, // 结束状态
      error: false, // 是否请求失败
      temp: {
        page: 0,
        size: 4,
        courseId: ''
      }
    }
  },
  methods: {
    // 获取该教师所有课程
    async listCourse() {
      try {
        this.temp.page++
        const res = await listCourse(this.temp.page, this.temp.size)
        this.courseList = this.courseList.concat(res.data.rows)
        this.courseListLength = res.data.total

        this.loading = false
        if (this.courseList.length === this.courseListLength) {
          this.finished = true
        }
      } catch (e) {
        this.loading = false
        this.error = true
        Toast.fail('加载出错')
        console.log(e)
      }
    },
    // 通过课程Id获取该课程的订单
    async queryOrderByCourseId() {
      try {
        const res = await queryOrderByCourseId(this.temp.courseId)
        this.orderList = res.data
      } catch (e) {
        console.log(e)
      }
    },
    // 点击获取该课程的订单
    queryOrderHandle(courseId) {
      this.temp.courseId = courseId
      this.isCourseListShow = false
      this.queryOrderByCourseId()
    },
    // 点击查看订单详情
    orderDetail(queryByOrderId) {
      window.sessionStorage.setItem('queryByOrderId', queryByOrderId)
      this.$router.push('/orderDetail') // 路由跳转到订单详情页面
    },
    // 点击返回课程列表
    backToCourseList() {
      this.isCourseListShow = true
    },
    onLoad() {
      setTimeout(() => {
        this.listCourse()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.container{
  background: $bg;
  padding-top: 1px;
}
.footer{
  width: 100%;
  height: 20px;
  background: $bg;
  margin-top: 10px;
  text-align: center;
  span {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: $background-grey;
  }
}
.card{
  &--top {
    display: flex;
    background: $white;
    align-items: center;
    justify-content: space-between;
    padding: 10px 17px;
    font-size: 12px;
    .completed {
      color: $success-lighter;
    }
  }
  &--content{
    display: flex;
    background: $white;
  }
  &--contentRight{
    margin-top: 20px;
  }
  &--image{
    width: 70px;
    height: 70px;
    margin: 20px 15px 20px 16px;
  }
  &--title{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: $font-color;
    height: 20px;
  }
  &--student, &--sale{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: $background-grey;
    margin-top: 8px;
  }
  &--studentName, &--saleCount{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: $background-grey;
    margin-right: 10px;
  }
  &--class{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: $background-grey;
    margin-top: 10px;
    margin-bottom: 15px;
  }
  &--classTitle{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: $background-grey;
    margin-right: 12px;
  }
  &--classTime{
    margin-right: 5px;
  }
  &--bottom{
    background: $white;
    margin-top: 1px;
    margin-bottom: 10px;
  }
  &--payTime{
    display: flex;
    align-items: center;
    margin-left: 16px;
    margin-bottom: 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
  }
  &--payTimeContent{
    color: $background-grey;
  }
  &--remark{
    display: flex;
    align-items: center;
    margin-left: 16px;
    margin-bottom: 10px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
  }
  &--remarkContent{
    color: $background-grey;
  }
  &_bottomContainer{
    display: flex;
    align-items: center;
    height: 51px;
  }
  &_priceContainer{
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: $font-color;
    margin-left: 16px;
  }
  &_btnContainer{
    display: flex;
    align-items: center;
    justify-content: end;
    margin-right: 10px;
    height: 51px;
  }
  &--price{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: $font-color;
  }
  &--detailBtn{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: $deep-purple;
    width: 90px;
    height: 31px;
    border: 1px solid $deep-purple;
    border-radius: 15.5px;
    line-height: 31px;
  }
}
.backBtnBox{
  width: 100%;
  padding: 5px 0;
  .backBtn {
    background-color: $main-color;
    color: $white;
    border-radius: 0 20px 20px 0;
  }
}
</style>
