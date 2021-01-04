/*
 * @Author: 庞泽邦
 * @Date: 2020-07-11 18:15:03
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2020-11-23 09:53:42
 */
//新增课程页面
<template>
  <div class="content_wrap--container">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">新增课程</span>
      </template>
    </van-nav-bar>
    <van-form label-align="center" @submit="onSubmit">
      <!-- 课程名称 -->
      <van-field
        v-model="courseName"
        name="courseName"
        placeholder="请输入课程名称"
        :rules="[{ required: true }]"
      >
        <template #label>
          <span class="require_font--color">*</span>
          <span>课程名称</span>
        </template>
      </van-field>
      <!-- 课程类型 -->
      <van-field
        readonly
        clickable
        :value="courseType"
        name="courseType"
        :rules="[{ required: true, message: '请选择课程类型' }]"
        @click="showPicker = true"
      >
        <template #label>
          <span class="require_font--color">*</span>
          <span>课程类型</span>
        </template>
        <template #right-icon>
          <div style="display:flex">
            <span>请选择</span>
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
      <!-- 课程价格 -->
      <van-field
        v-model="coursePrice"
        name="coursePrice"
        placeholder="请输入课程价格"
        :rules="[{ required: true }]"
      >
        <template #label>
          <span class="require_font--color">*</span>
          <span>课程价格</span>
        </template>
      </van-field>
      <!-- 课程封面 -->
      <van-field
        class="label_pic--width"
        readonly
      >
        <template #label>
          <span class="require_font--color">*</span>
          <span>课程封面</span>
          <van-uploader v-model="coursePic" name="image" preview-size="100px" :after-read="readPic" max-count="1">
            <div class="uploader">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#old-icon-xiangji1" />
              </svg>
            </div>
          </van-uploader>
        </template>
      </van-field>
      <div class="info_title--container">
        <div style="margin-left:18px;">
          课程信息
        </div>
      </div>
      <!-- 课程简介 -->
      <van-field
        v-model="courseInfo"
        type="textarea"
        name="courseBasicIntroduction"
        autosize
        maxlength="150"
        show-word-limit
        :rules="[{ required: true }]"
        placeholder="请输入课程简介说明..."
      >
        <template #label>
          <span class="require_font--color">*</span>
          <span>课程简介</span>
        </template>
      </van-field>
      <div class="info_title--container" style="height:50px">
        <div style="margin-left:18px;">
          课程资源
        </div>
        <div style="margin-right:18px;">
          <van-button color="#68627E" size="small" native-type="button" @click.stop="addCourse">新增</van-button>
        </div>
      </div>
      <!-- 上传课程卡片 -->
      <div v-for="(item,index) in uploadList" :key="item.id" class="uploadCard_wrap--container">
        <!-- 子课程名称 -->
        <van-field
          v-model="item.courseName"
          placeholder="请输入课程名称"
        >
          <template #label>
            <span>课程列表{{ index+1 }}</span>
          </template>
        </van-field>
        <!-- 子课程资源 -->
        <van-field
          :value="item.fileName"
          readonly
        >
          <template #label>
            <span>课程资源</span>
          </template>
          <template #right-icon>
            <van-uploader
              :name="index"
              result-type="file"
              :after-read="afterRead"
              accept="image/*,video/*, .pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .zip, .rar"
            >
              <van-button size="small" color="#AF5F65">上传</van-button>
            </van-uploader>
          </template>
        </van-field>
        <div class="upload_del--btn">
          <van-button round plain hairline color="black" size="small" style="width:50px" @click.stop="delCourse(index)">删除</van-button>
        </div>
      </div>
      <div class="check_wrap--container">
        <div style="margin-left:-150px">
          <van-checkbox v-model="check" checked-color="#A12831" shape="square">同时上架该课程为销售状态</van-checkbox>
        </div>
      </div>
      <div class="submit_button--wrapper">
        <van-button block native-type="submit" color="#68627E" style="width:300px">
          发布课程
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { uploadCourseResource, createCourse } from '@/api/teacher/courseManage'

import Vue from 'vue'
import { NavBar, Icon, Button, Form, Field, Popup, Picker, Radio, RadioGroup, Checkbox, CheckboxGroup, Uploader, Notify } from 'vant'

Vue.use(NavBar)
  .use(Icon)
  .use(Button)
  .use(Form)
  .use(Field)
  .use(Popup)
  .use(Picker)
  .use(Radio)
  .use(RadioGroup)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Uploader)
  .use(Notify)
export default {
  name: 'AddCourse',
  data() {
    return {
      showPicker: false,
      columns: ['书法课', '绘画课', '陶瓷课', '其他'],
      // 课程名字
      courseName: '',
      // 课程类型
      courseType: '',
      // 课程价格
      coursePrice: '',
      // 课程图片
      coursePic: [],
      // 课程简介
      courseInfo: '',
      // 创建课程后返回的课程Id
      courseId: '',
      // 上传资源的列表
      uploadList: [{
        courseName: '',
        courseFile: '',
        fileName: '',
        id: 1
      }],
      fileList: [],
      uploadIndex: 1,
      check: false, // 课程是否上架
      picSubmitPermission: false, // 检验课程封面是否上传
      reSubmitPermission: false // 检验资源名称是否填写
    }
  },
  methods: {
    async uploadCourseResource(courseId) {
      // 上传资源
      try {
        for (var i = 0; i < this.uploadList.length; i++) {
          if (this.uploadList[i].courseName !== '' && this.uploadList[i].fileName !== '') {
            const formData = new FormData()
            formData.append('courseResourceFile', this.uploadList[i].courseFile)
            formData.append('courseId', courseId)
            formData.append('teacherLeader', window.sessionStorage.getItem('teacher_Id'))
            formData.append('fileName', this.uploadList[i].courseName)
            formData.append('type', 9) // 0：视频资源  1：图片资源 2:PPt等资源 9：其他资源
            const res = await uploadCourseResource(formData)
            if (res.code === 200) {
              Notify('资源"' + this.uploadList[i].courseName + '"上传成功~')
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async createCourse(image, elderCourse) {
      // 创建课程
      try {
        const res = await createCourse(image, elderCourse)
        if (res.code === 200 && res.detail !== '') {
          Notify('课程创建成功~')
          this.uploadCourseResource(Number(res.detail))
        }
      } catch (err) {
        console.log(err)
      }
    },
    clickLeft() {
      this.$router.go(-1)
    },
    // 课程类型选择器
    onConfirm(value, index) {
      this.courseType = value
      this.showPicker = false
    },
    // 增加课程资源
    addCourse() {
      this.uploadIndex += 1
      this.uploadList.push({
        courseName: '',
        courseFile: '',
        fileName: '',
        id: this.uploadIndex
      })
    },
    // 删除课程资源
    delCourse(index) {
      this.uploadList.splice(index, 1)
    },
    readPic(file) {
      console.log(this.coursePic)
    },
    // 文件读取后的回调
    afterRead(file, detail) {
      // detail中的name使用下标定义，方便向资源数组添加资源
      console.log(file.file)
      const index = detail.name
      const name = file.file.name
      this.uploadList[index].fileName = name
      this.uploadList[index].courseFile = file.file
    },
    // 课程类型数字(1:书法 2:绘画 3:陶瓷 4:其他)
    courseTypeOption() {
      const map = {
        '书法课': 1,
        '绘画课': 2,
        '陶瓷课': 3,
        '其他': 4
      }
      return map[this.courseType]
    },
    // 提交表单
    onSubmit(values) {
      values.courseType = this.courseTypeOption()
      values.status = Number(this.check) // 课程上架状态(1:上架 2:未上架)
      // 将其他默认信息存入object中
      values.orgId = window.sessionStorage.getItem('teacher_orgId')
      values.teacherId = window.sessionStorage.getItem('teacher_Id')
      values.teacherName = window.sessionStorage.getItem('teacher_username')

      // 判断课程封面是否已上传
      if (this.coursePic.length === 0) {
        Notify('未上传课程封面噢~')
      } else {
        this.picSubmitPermission = true
      }

      // 判断课程资源名称是否填写
      if (this.uploadList.length === 0) {
        this.reSubmitPermission = true
      }
      for (var i = 0; i < this.uploadList.length; i++) {
        if (this.uploadList[i].fileName !== '' && this.uploadList[i].courseName === '') {
          Notify('未填写课程资源名称噢~')
          this.reSubmitPermission = false
        } else {
          this.reSubmitPermission = true
        }
      }
      // 创建课程
      if (this.picSubmitPermission && this.reSubmitPermission) {
        const courseImg = new FormData()
        courseImg.append('image', this.coursePic[0].file)
        this.createCourse(courseImg, JSON.stringify(values))// 创建课程
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";
.van-nav-bar {
  background-color: #a12831;
}
.label_pic--width /deep/ .van-field__label{
    width: 105px;
}
.uploader {
    width: 100px;
    height: 100px;
    margin-top: 17px;
    background: #F4F6F5;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
        width: 40px;
        height: 40px;
    }
}
.content_wrap--container{
    background: $bg;
}
.require_font--color{
    color: red;
}
.info_title--container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 35px;
    background-color: $bg;
    font-size: 14px;
    color: #989898;
}
.uploadCard_wrap--container{
    margin-bottom: 10px;
}
.check_wrap--container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 27px;
    font-size: 14px;
    color: #313131;
}
.upload_del--btn{
    background: white;
    height: 35px;
    padding: 5px 18px 5px 0px;
    display: flex;
    justify-content: flex-end;
}
.submit_button--wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 27px;
}
</style>
