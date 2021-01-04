/*
 * @Author: 庞泽邦
 * @Date: 2020-05-20 10:47:44
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-07-24 10:17:44
 */
//课程播放页面评论组件

<template>
  <div class="courseComment_container">
    <span class="head_evaluationInfo--num">{{ `共${evaluationNum}学员评价` }}</span> <!-- 学员评价数量 -->
    <van-cell-group>
      <van-cell v-for="(item,index) of studentInfo" :key="index">
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
              <div class="comment_user--text">{{ item.studentName }}</div>
              <div class="comment_time--text">{{ item.time }}</div>
            </div>
            <div class="comment_content--text">{{ item.label }}</div>
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
  name: 'CourseComment',
  data: () => {
    return {
      evaluationNum: 233, // 学员评价数量
      studentInfo: [{ // 学员评价信息
        imgSrc: 'https://img.yzcdn.cn/vant/cat.jpeg',
        studentName: '可爱的小王',
        time: '2020.05.04  07:59',
        value: 5,
        label: '我觉得非常棒，这个课程收获良多！'
      },
      {
        imgSrc: 'https://img.yzcdn.cn/vant/cat.jpeg',
        studentName: '可爱的小王',
        time: '2020.05.04  07:59',
        value: 3,
        label: '我觉得非常棒，这个课程收获良多！'
      },
      {
        imgSrc: 'https://img.yzcdn.cn/vant/cat.jpeg',
        studentName: '可爱的小王',
        time: '2020.05.04  07:59',
        value: 5,
        label: '我觉得非常棒，这个课程收获良多！'
      }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.head_evaluationInfo--num{
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #989898;
    margin-top: 18px;
    margin-left: 17px;
    line-height: 40px;
}
.icon{
  width: 30px;
  height: 30px;
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
