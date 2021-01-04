/*
 * @Author: 庞泽邦
 * @Date: 2020-06-03 21:43:48
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-13 15:02:56
 */
//文章详情页面评价组件
<template>
  <div class="courseComment_container">
    <span class="head_evaluationInfo--num">{{ `共${countComment}学员评价` }}</span> <!-- 学员评价数量 -->
    <van-cell-group>
      <van-cell v-for="item of addCommentList" :key="item.id">
        <template #icon>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#old-icon-icon-test" />
            </svg>
          </div>
        </template>
        <template #title>
          <div class="comment_content--container">
            <div style="display:flex;justify-content:space-between">
              <div class="comment_user--text">{{ item.owner }}</div>
              <div class="comment_time--text">{{ item.createTime }}</div>
            </div>
            <div class="comment_content--text">{{ item.content }}</div>
          </div>
        </template>
      </van-cell>
      <van-cell v-for="item of defaultCommentList" :key="item.id">
        <template #icon>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#old-icon-icon-test" />
            </svg>
          </div>
        </template>
        <template #title>
          <div class="comment_content--container">
            <div style="display:flex;justify-content:space-between">
              <div class="comment_user--text">{{ item.owner }}</div>
              <div class="comment_time--text">{{ item.createTime }}</div>
            </div>
            <div class="comment_content--text">{{ item.content }}</div>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- 高度撑开 -->
    <div style="height:52px" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Image, Cell, CellGroup } from 'vant'

Vue.use(Image)
  .use(Cell)
  .use(CellGroup)
export default {
  name: 'ArticleComment',
  props: {
    countComment: {
      type: Number,
      default: 0
    },
    defaultCommentList: {
      type: Array,
      default: () => {
        return []
      }
    },
    addCommentList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: () => {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.head_evaluationInfo--num{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #989898;
    margin-top: 18px;
    margin-left: 17px;
    line-height: 17px;
}
.icon{
  width: 30px;
  height: 30px;
}
.courseComment_container{
  background: white;
  border-top: 10px solid #eaeceb;
  height: 100%;
}
.comment{
  &_content--container{
    margin-left: 18px;
  }
  &_user--text{
    font-size: 14px;
    color: $font-color;
  }
  &_time--text{
    font-size: 10px;
    color: $font-color-lighter;
  }
  &_content--text{
    width: 100%;
    font-size: 12px;
    color: #676767;
    margin-top: 10px;
  }
}
</style>
