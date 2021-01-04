/*
 * @Author: 庞泽邦
 * @Date: 2020-06-02 13:18:28
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-24 14:07:57
 */

//我的咨询信息条组件

<template>
  <div class="courseItem_wrap--container">
    <div v-for="(item,index) in info" :key="index" class="swipeCell_wrap--container" @click.stop="ToConsultDetail(item.contactName,item.id)">
      <van-swipe-cell>
        <van-row type="flex" justify="end">
          <van-col span="4">
            <div class="avatar_wrap--container">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#old-icon-icon-test4" />
              </svg>
            </div>
          </van-col>
          <van-col span="20">
            <van-cell center style="height:100%">
              <template #title>
                <div class="cell_title">{{ item.contactName }}</div>
                <div class="cell_desc">
                  <span>{{ item.latestMessageText }}</span>
                </div>
              </template>
              <template #default>
                <div v-if="item.unread > 0" class="cell_num">{{ item.unread }}
                </div></template>
            </van-cell>
          </van-col>
        </van-row>
        <template #right>
          <van-button square color="#A12831" text="删除" class="swipeCell_button--container" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Col, Row, Cell, SwipeCell, Button } from 'vant'
import { getChatList } from '@/api/student/healthy'

Vue.use(Cell)
  .use(Col)
  .use(Row)
  .use(SwipeCell)
  .use(Button)
export default {
  name: 'ConsultCell',
  data: () => {
    return {
      info: []
    }
  },
  created() {
    this.getMessageInfo()
  },
  methods: {
    async getMessageInfo() {
      const res = await getChatList()
      this.info = res.data
    },
    ToConsultDetail(doctor, chatId) {
      this.$router.push({
        path: '/consultDetail'
      })
      this.$store.commit('healthy/SET_DOCTORNAME', doctor)
      this.$store.commit('healthy/SET_CHATID', chatId)
      window.sessionStorage.setItem('chatId', chatId)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.icon {
    width: 45px;
    height: 45px;
}
.avatar_wrap--container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: white;
}
.swipeCell{
    &_wrap--container{
        border-bottom:1px solid #F4F6F5;
    }
    &_button--container{
        height: 100%;
    }
}
.cell{
    &_title{
        font-size: 14px;
        color: $font-color;
        font-weight: 600;
        height: 20px;
    }
    &_desc{
        width: 160px;
        height: 20px;
        font-size: 12px;
        color: $font-color-lighter;
        text-overflow:ellipsis;
        overflow:hidden;
        white-space:nowrap;
    }
    &_num{
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 50%;
        border-radius: 10px;
        background:rgb(236, 73, 74);
        color: white;
        font-size: 12px;
    }
}
</style>
