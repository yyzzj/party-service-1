/*
 * @Author: 范开杰
 * @Date: 2020-05-13
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-02 20:13:38
 */
//课程作业-作业提交组件
<template>
  <div class="homeworkSubmit_container"> <!-- 作业提交容器 -->
    <van-form @submit="onSubmit"><!-- 表单 -->
      <van-field
        v-model="message"
        rows="6"
        autosize
        type="textarea"
        placeholder="请输入作业内容..."
        :border="false"
        class="field_homeworkMessage"
      /><!-- 输入框 -->
      <van-field name="uploader_homeworkImage" :border="false"><!-- 上传图片 -->
        <template #input>
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
        </template>
      </van-field>
      <div class="btn_homeworkSubmit--container"> <!-- 提交按钮容器 -->
        <van-button block type="info" native-type="submit" color="#A12831" class="btn_homeworkSubmit">
          提交作业
        </van-button><!-- 提交按钮 -->
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Field, Uploader, Form, Button, Toast } from 'vant'
import { submitHomework } from '@/api/student/user'

Vue.use(Icon)
  .use(Field)
  .use(Uploader)
  .use(Form)
  .use(Button)
export default {
  name: 'HomeworkSubmit',
  data: () => {
    return {
      message: '',
      uploader: []
    }
  },
  methods: {
    onSubmit() {
      this.submitHomework()
    },
    async submitHomework() {
      try {
        if (this.message === '') {
          Toast.fail('请输入作业内容')
          return
        }
        const homeworkId = this.$route.query.homeworkId
        const res = await submitHomework(homeworkId, this.message, this.uploader)
        if (res.code === 200) {
          Toast.success('提交成功')
        } else {
          Toast.fail('提交失败')
        }
      } catch (error) {
        console.lg(error)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.homeworkSubmit_container {
    background: white;
}
.field_homeworkMessage{
    font-family: PingFangSC-Regular;
    font-size: 12px;
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
.btn_homeworkSubmit{
    &--container{
        display:flex;
        justify-content:center;
        padding-top: 71px;
        padding-bottom: 60px;;
        background: #F4F6F5 ;
    }
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #FFFFFF;
    width: 300px;
    height: 40px;
    border-radius: 4px;
}
</style>
