/*
 * @Author: 庞泽邦
 * @Date: 2020-05-20 10:31:39
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-24 09:42:00
 */
//课程播放页面
<template>
  <div>
    <public-video />
    <van-tabs v-model="active" color="#A12831" title-active-color="#A12831" swipe-threshold="5" animated swipeable>
      <van-tab title="课程简介">
        <course-info />
      </van-tab>
      <van-tab title="评论">
        <course-comment />
      </van-tab>
      <van-tab title="课堂考勤">
        <course-check />
      </van-tab>
      <van-tab title="课程课件">
        <download-file />
      </van-tab>

    </van-tabs>
    <div v-if="active===1" class="button_wrap-container">
      <div class="component_wrap--container">
        <input class="input_container" type="text" placeholder="说点什么吧">
        <van-button color="#A12831" size="small" round>评论</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import DownloadFile from '../../components/CoursePlay/DownloadFile'
import CourseCheck from '../../components/CoursePlay/CourseCheck'
import CourseComment from '../../components/CoursePlay/CourseComment'
import CourseInfo from '../../components/CoursePlay/CourseInfo'
import Video from '@/components/Video'

import Vue from 'vue'
import { Tab, Tabs, Button } from 'vant'

Vue.use(Tab)
  .use(Tabs)
  .use(Button)
export default {
  name: 'CoursePlay',
  components: {
    'download-file': DownloadFile,
    'course-check': CourseCheck,
    'course-info': CourseInfo,
    'course-comment': CourseComment,
    'public-video': Video
  },
  data: () => {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.button_wrap-container{
  position: fixed;
  bottom: -1px;
  width: 100%;
  max-width: 600px;
  height: 52px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0;
  border-radius: 5px;
}
.component_wrap--container{
  display:flex;
  justify-content: center;
  align-items:center;
  height:100%;
  padding-right: 20px;
}
.input_container{
    background: #F4F6F5;
    border-radius: 16.5px;
    width: 100%;
    height: 33px;
    padding-left: 10px;
    border: none;
    font-size: 12px;
    color: #989898;
    margin-right: 20px;
    margin-left:20px;
}
</style>
