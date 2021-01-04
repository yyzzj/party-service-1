/*
 * @Author: 庞泽邦
 * @Date: 2020-05-19 10:40:49
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-30 20:32:24
 */
//课堂消息信息条组件

<template>
  <div class="courseItem_wrap--container">
    <div v-for="(item,index) in info" :key="index" class="swipeCell_wrap--container" @click.stop="ToMessageDetail(item.templateId)">
      <van-swipe-cell>
        <van-row type="flex" justify="end">
          <van-col span="4">
            <div class="avatar_wrap--container">
              <svg class="icon" aria-hidden="true">
                <use v-if="item.isTeacher===1" xlink:href="#old-icon-icon-test4" />
                <use v-else xlink:href="#old-icon-gonggao" />
              </svg>
            </div>
          </van-col>
          <van-col span="20">
            <van-cell center style="height:100%">
              <template #title>
                <div class="cell_title">{{ item.title }}</div>
                <div class="cell_desc">
                  <span>{{ `${item.sendName}:` }}{{ item.content }}</span>
                </div>
              </template>
              <template #default>
                <div v-if="item.unreadNum > 0" class="cell_num">{{ item.unreadNum }}
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

Vue.use(Cell)
  .use(Col)
  .use(Row)
  .use(SwipeCell)
  .use(Button)
export default {
  name: 'MessageItem',
  props: {
    info: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: () => {
    return {
      arr: []
    }
  },
  methods: {
    ToMessageDetail(templateId) {
      this.$router.push({
        path: '/courseMessageDetail',
        query: {
          templateId
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
