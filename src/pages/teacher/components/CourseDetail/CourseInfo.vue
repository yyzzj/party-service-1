/*
 * @Author: 庞泽邦
 * @Date: 2020-08-28 14:31:23
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-07 13:01:03
 */
// 课程信息组件
<template>
  <div>
    <div class="courseInfo_wrap--container">
      <div class="title_text">课程信息</div>
      <van-cell-group>
        <van-field v-model="time" label="开课时间" placeholder="请选择开课时间" readonly clickable @click.stop="showTime=true"	/>
      </van-cell-group>
      <van-popup v-model="showTime" position="bottom" get-container="#app">
        <van-datetime-picker
          type="datetime"
          :min-date="new Date()"
          title="选择年月日"
          @cancel="showTime=false"
          @confirm="confirmTime"
        />
      </van-popup>

      <input-tags v-model="tags">
        <template v-slot="{tags,inputEvents,inputAttrs,removeTag}">
          <div class="courseTag_wrap">
            <div class="courseTag_text">课程标签</div>
            <div class="input-tags-wrap">
              <span v-for="(tag,index) in tags" :key="index" class="tag">
                <span>{{ tag }}</span>
                <div style="margin-left:10px;user-select:none" @click="removeTag(tag)">x</div>
              </span>
              <input type="text" class="tag_input" placeholder="输入内容并按回车键新增标签" v-bind="inputAttrs" style="font-size: 12px;" maxlength="10" v-on="inputEvents">
            </div>
          </div>
        </template>
      </input-tags>
      <div class="btn_wrap">
        <van-button style="width:330px;border-radius: 4px;" color="#68627E">提交信息</van-button>
      </div>
    </div>
    <div class="courseAnnouncement_wrap--container">
      <div class="title_text">课程公告</div>
      <van-field v-model="title" placeholder="填写公告标题" />
      <van-field v-model="content" type="textarea" placeholder="请输入公告内容" />
      <div class="btn_wrap">
        <van-button style="width:330px;border-radius: 4px;" color="#68627E">发布公告</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, DatetimePicker, Popup, Button, Cell } from 'vant'
import { parseTime } from '@/utils'
import InputTags from './InputTags'

Vue.use(Field)
  .use(DatetimePicker)
  .use(Popup)
  .use(Button)
  .use(Cell)
export default {
  name: 'CourseInfo',
  components: {
    InputTags
  },
  data: () => {
    return {
      time: '',
      showTime: false,
      tags: ['111', '2222'],
      title: '',
      content: ''
    }
  },
  methods: {
    confirmTime(value) {
      this.time = parseTime(value, '{y}-{m}-{d} {h}:{i}:{s}')
      this.showTime = false
    }
  }
}
</script>

<style lang="scss" scoped>

.title_text{
    font-size: 12px;
    color: #989898;
    margin: 12px 12px 12px 12px;
}
.btn_wrap{
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.courseTag_wrap{
    display: flex;
    padding:10px 16px 10px 16px;
    background: #ffffff;
}
.courseTag_text{
    font-size: 14px;
    color: #646566;
    background: #ffffff;
    width: 88px;
    padding-top: 10px;
}
.input-tags-wrap {
    width: 100%;
    min-height: 34px;
    border: 1px solid #ddd;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    background: #ffffff;
    .tag {
        height: 22px;
        border: 1px solid #ddd;
        text-align: center;
        padding: 0 10px;
        margin: 4px 0;
        margin-left: 5px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #FFFFFF;
        background: #68627E;
        border-radius: 4px;
    }
}
.tag_input {
    width: 160px;
    border: 0;
    padding: 5px 0;
    margin-left: 5px;
    outline: none;
}
.courseAnnouncement_wrap--container{
    margin-top: 30px;
}
</style>
