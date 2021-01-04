/*
 * @Author: 范开杰
 * @Date: 2020-05-26
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-24 18:24:28
 */
//个人中心-养生问答-医师咨询组件
<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    :immediate-check="false"
    @load="onLoad"
  >
    <div class="DoctorConsulting_container"> <!-- 医师咨询容器 -->
      <div v-for="(item,index) in list" :key="index">
        <div class="DoctorConsulting--info"> <!-- 医师咨询信息 -->
          <van-image class="DoctorConsulting--image" width="60" height="60" round src="https://img.yzcdn.cn/vant/cat.jpeg" /><!-- 医师图片 -->
          <div class="DoctorConsulting--infomiddle">
            <div class="DoctorConsulting--name"> <!-- 医师名字 -->
              <span>{{ item.teacherName }}</span>
            </div>
            <div class="DoctorConsulting--attending"> <!-- 医师主治 -->
              <span>主治:</span>
              <span class="DoctorConsulting--attendingFont">{{ item.teacherId }}</span>
            </div>
            <div class="DoctorConsulting--price"> <!-- 诊费价格 -->
              <span>诊费:</span>
              <span class="DoctorConsulting--priceFont">{{ 0 | formateZero }}</span>
            </div>
          </div>
          <van-button class="DoctorConsulting--consultingBtn" @click="jumpToConsult(item.teacherId,item.teacherName,item.chatId)">咨询ta</van-button>
        </div>
      </div>
    </div>
  </van-list>
</template>

<script>
import Vue from 'vue'
import { Image, Icon, Button, List } from 'vant'
import { getDoctorList } from '@/api/student/healthy'

Vue.use(Image)
  .use(Icon)
  .use(Button)
  .use(List)

export default {
  name: 'DoctorConsulting',
  filters: {
    formateZero(val) {
      if (parseFloat(val) === 0) {
        return '免费'
      } else return val + '元'
    }
  },
  data: () => {
    return {
      list: [],
      start: 0, // 开始页数
      originData: {},
      loading: false,
      finished: false
    }
  },
  mounted() {
    this.getDoctorList()
  },
  methods: {
    jumpToConsult(doctorId, doctorName, chatId) {
      this.$store.commit('healthy/SET_DOCTORID', doctorId)
      window.sessionStorage.setItem('doctorId', doctorId)
      this.$store.commit('healthy/SET_DOCTORNAME', doctorName)
      window.sessionStorage.setItem('doctorName', doctorName)
      this.$store.commit('healthy/SET_CHATID', chatId)
      window.sessionStorage.setItem('chatId', chatId)
      this.$router.push('/consultDetail')
    },
    async getDoctorList() {
      try {
        const params = {
          start: this.start,
          count: 5
        }
        const res = await getDoctorList(params)
        this.originData = res.data
        this.start += 1 // 页数加1
        const len = this.originData.data.length
        if (this.list.length < this.originData.totalnum) {
          for (let i = 0; i < len; i++) {
            this.list.push(this.originData.data[i])
          }
        }
        // 加载状态结束
        this.loading = false
        if (this.list.length >= this.originData.totalnum) {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
      }
    },
    onLoad() {
      this.getDoctorList()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.DoctorConsulting_container{
    background: $bg;
    padding-top: 1px;
}
.DoctorConsulting{
    &--info{
        display: flex;
        align-items: center;
        background: $white;
        margin-bottom: 1px;
    }
    &--infomiddle{
        flex: auto;
    }
    &--image{
        flex: 0 0 60px;
        margin: 15px 20px;
    }
    &--name{
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: $font-color;
        height: 20px;
        line-height: 20px;
    }
    &--attending{
        display: flex;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: $font-color-lighter;
        height: 17px;
        margin-top: 3px;
    }
    &--attendingFont{
        margin-left: 5px;
    }
    &--price{
        display: flex;
        align-items: stretch;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: $font-color-lighter;
        line-height: 20px;
        margin-top: 3px;
    }
    &--priceFont{
        margin-left: 5px;
        color: $main-color;
    }
    &--consultingBtn{
        flex: 0 0 80px;
        width: 80px;
        height: 30px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: $white;
        line-height: 30px;
        margin-right: 17px;
        border-radius: 4px;
        background-color: $deep-purple;
    }
}
</style>
