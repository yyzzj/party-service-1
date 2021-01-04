/*
 * @Author: 李兆鹏
 * @Date: 2020-08-08 20:45:19
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-08-12 15:21:02
 */
//教师端登陆页面
<template>
  <div class="publish_container">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">发布作业</span>
      </template>
    </van-nav-bar>
    <van-field
      v-model="homework"
      placeholder="请填写作业标题"
    >
      <template #label>
        <span>作业标题</span>
      </template>
    </van-field>
    <div class="inputArea">
      <van-field
        v-model="homeworkcontent"
        rows="6"
        autosize
        type="textarea"
        placeholder="请输入作业内容..."
        :border="false"
      />
      <van-uploader
        v-model="uploader"
        preview-size="100px"
      >
        <template #default> <!-- 上传图片控件中的图标 -->
          <div class="uploader_icon">
            <van-icon slot="icon" class-prefix="old-icon" name="xiangji1" size="40" color="gray" />
          </div>
        </template>
      </van-uploader>
    </div>
    <div class="timechoice">
      <van-CellGroup>
        <van-cell title="截至时间" is-link :value="showtime" @click="showDatePicker = !showDatePicker" />
      </van-CellGroup>
      <van-popup v-model="showDatePicker" position="bottom">
        <van-datetime-picker
          ref="datetime"
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          title="选择时间"
          @confirm="showDatePicker = false;
                    confirm();"
          @cancel="showDatePicker = false"
        />
      </van-popup>
    </div>
    <div class="input_container">
      <van-row type="flex" justify="center" align="center" style="margin-top:11px">
        <van-col span="8" style="width:100%">
          <van-button
            color="#68627E"
            style="width:100%;height:40px;margin-top:60px;border-radius:4px"
            @click="publish"
          >提交发布</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Col, Row, Field, CellGroup, Button, Uploader, DatetimePicker, cell, popup } from 'vant'

Vue.use(NavBar)
  .use(Icon)
  .use(Col)
  .use(Row)
  .use(Field)
  .use(CellGroup)
  .use(Button)
  .use(Uploader)
  .use(DatetimePicker)
  .use(cell)
  .use(popup)
export default {
  name: 'Publish',
  data: () => {
    return {
      homework: '',
      password: '',
      username: '',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      showDatePicker: false,
      showtime: '请选择时间',
      uploader: [],
      homeworkcontent: ''
    }
  },
  methods: {
    confirm(value) {
      const ref = this.$refs['datetime'].getPicker().getValues()
      this.showtime = ref.map(v => parseInt(v) < 10 ? '0' + parseInt(v) : parseInt(v)).join('-')
    },
    publish() {
      alert(this.homeworkcontent)
      this.homeworkcontent = ''
    },
    clickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
.van-nav-bar {
  background-color: #a12831;
}
.publish_container {
  background-color: $grey-lighter;
  min-height: 100vh;
  font-family: PingFangSC-Regular;
}
.inputArea {
  border-bottom:1px solid #F4F6F5;
  background-color: $white;
  .field {
    padding: 10px 16px;
    font-size: 14px;
  }
  .van-uploader {
    padding: 20px;
    .uploader {
      width: 100px;
      height: 100px;
      background: #F4F6F5;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: ter;
      .icon {
        width: 40px;
        height: 40px;
      }
    }
  }
}
.timechoice{
  margin-top: 20px;
}
.input_container {
  margin-top: 60px;
  padding-left: 16%;
  padding-right: 16%;
}
.uploader_icon{
  display: table-cell;
  width: 100px;
  height: 100px;
  background: #F4F6F5;
  border-radius: 7px;
  text-align: center;
  vertical-align: middle;
}
</style>
