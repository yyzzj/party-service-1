/*
 * @Author: 庞泽邦
 * @Date: 2020-05-09 14:47:46
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-02 22:14:58
 */
//课程详情页面底部提交按钮
<template>
  <div class="sumbit_wrap--container">
    <div style="width:100%">
      <van-row type="flex" justify="center" align="center">
        <van-col span="8">
          <div style="text-align:center;font-size: 16px;color: #D4828F;">{{ price===0?'免费':`￥${price}` }}</div>
          <div style="text-align:center;font-size: 12px;color: #989898;">{{ `已有${num}人抢购` }}</div>
        </van-col>
        <van-col span="16">
          <div style="display:flex;justify-content:flex-end;margin-right:20px">
            <van-button color="#A12831" style="width:150px;border-radius: 4px;" @click="pay">{{ price === 0 ?'0元抢购':'选购课程' }}</van-button>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Col, Row, Button, Dialog } from 'vant'
import { createFreeOrder } from '@/api/student/courseDetail'
import { getToken } from '@/utils/auth'

Vue.use(Row)
  .use(Col)
  .use(Button)
  .use(Dialog)
export default {
  name: 'CourseSubmit',
  props: {
    num: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      default: 0
    }
  },
  methods: {
    async createFreeOrder() {
      const courseId = this.$route.query.courseId
      const res = await createFreeOrder(courseId)
      if (res.code === 200) {
        Dialog.confirm({
          title: '抢购成功',
          message: '是否查看订单?'
        })
          .then(() => {
            // on confirm
            this.$router.push({
              path: '/myOrder',
              query: {
                active: 1
              }
            })
          })
      }
    },
    pay() {
      if (!getToken('student')) {
        Dialog.confirm({
          title: '您尚未登录',
          message: '是否前往登录'
        })
          .then(() => {
            // on confirm
            this.$router.push({
              path: '/login',
              query: {
                from: this.$route.fullPath
              }
            })
          })
          // 仅为捕获promise
          .catch(() => {
          })
        return
      }
      if (this.price === 0) {
        this.createFreeOrder()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sumbit_wrap{
    &--container{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 60px;
    }
}
</style>
