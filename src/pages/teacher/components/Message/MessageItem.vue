/*
 * @Author: 庞泽邦
 * @Date: 2020-09-07 10:49:14
 * @Last Modified by: 杨志杰
 * @Last Modified time: 2021-01-07 11:00:01
 */
// 教师端消息页面信息条组件

<template>
  <div class="courseItem_wrap--container">
    <div>
      <van-swipe-cell>
        <van-row type="flex" justify="end">
          <van-col span="4">
            <div class="avatar_wrap--container">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#old-icon-gonggao" />
              </svg>
            </div>
          </van-col>
          <van-col span="20">
            <van-cell center style="height:100%">
              <template #title>
                <div class="cell_title">系统公告 </div>
                <div class="cell_desc">
                  <span>你被封号了哟 </span>
                </div>
              </template>
              <template #default>
                <div class="cell_num"> 1 </div>
              </template>
            </van-cell>
          </van-col>
        </van-row>
        <template #right>
          <van-button square color="#A12831" text="删除" class="swipeCell_button--container" />
        </template>
      </van-swipe-cell>
      <van-swipe-cell>
        <van-row type="flex" justify="end">
          <van-col span="4">
            <div class="avatar_wrap--container">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#old-icon-gonggao" />
              </svg>
            </div>
          </van-col>
          <van-col span="20">
            <van-cell center style="height:100%">
              <template #title>
                <div class="cell_title">头昏脑胀是怎么回事？ </div>
                <div class="cell_desc">
                  <span>昨天上吐下泻头昏脑胀[照片]是怎么回事？ </span>
                </div>
              </template>
              <template #default>
                <div class="cell_num"> 1 </div>
              </template>
            </van-cell>
          </van-col>
        </van-row>
        <template #right>
          <van-button square color="#A12831" text="删除" class="swipeCell_button--container" />
        </template>
      </van-swipe-cell>
    </div>
    <div v-for="(item,index) in info" :key="index" class="swipeCell_wrap--container" @click.stop="ToMessageDetail(item.title,item.isTeacher,item.teacher,item.message)">
      <van-swipe-cell>
        <van-row type="flex" justify="end">
          <van-col span="4">
            <div class="avatar_wrap--container">
              <svg class="icon" aria-hidden="true">
                <use v-if="item.isTeacher===true" xlink:href="#old-icon-icon-test4" />
                <use v-else xlink:href="#old-icon-gonggao" />
              </svg>
            </div>
          </van-col>
          <van-col span="20">
            <van-cell center style="height:100%">
              <template #title>
                <div class="cell_title">{{ item.title }}</div>
                <div class="cell_desc">
                  <span>{{ `${item.teacher}:` }}{{ item.message }}</span>
                </div>
              </template>
              <template #default>
                <div class="cell_num">{{ item.num }}
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
import { messageInfo } from '@/api/student/courseMessage'

Vue.use(Cell)
  .use(Col)
  .use(Row)
  .use(SwipeCell)
  .use(Button)
export default {
  name: 'MessageItem',
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
      const res = await messageInfo()
      this.info = res.data.array
    },
    ToMessageDetail(titleName, isTeacher, teacher, message) {
      window.sessionStorage.setItem('message', message)
      this.$router.push({
        path: '/messageDetail',
        query: {
          title: titleName,
          isTeacher: isTeacher,
          teacher: teacher
        }
      })
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
