/*
 * @Author: 庞泽邦
 * @Date: 2020-07-31 15:48:03
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-07-31 16:22:14
 */
//教师端课程播放页面课程课件组件
<template>
  <div>
    <van-field
      v-model="pptName"
      placeholder="请输入课件名称"
    >
      <template #label>
        <span>课件名称</span>
      </template>
    </van-field>
    <van-field
      :value="fileName"
      readonly
    >
      <template #label>
        <span>课程资源</span>
      </template>
      <template #right-icon>
        <van-uploader
          result-type="file"
          :after-read="afterRead"
          accept="image/*,video/*, .pdf, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, .zip, .rar"
        >
          <van-button size="small" color="#AF5F65">上传</van-button>
        </van-uploader>
      </template>
    </van-field>
    <div class="submit_button--wrapper">
      <van-button block native-type="submit" color="#68627E" style="width:300px">
        新增
      </van-button>
    </div>
    <div class="file_item--container">
      <div class="file_info--text">课件列表</div>
      <van-cell-group>
        <van-cell title="课件1.ppt">
          <template #right-icon>
            <van-icon class-prefix="old-icon" name="shanchu" />
          </template>
        </van-cell>
        <van-cell title="课件2.ppt">
          <template #right-icon>
            <van-icon class-prefix="old-icon" name="shanchu" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Button, Field, Uploader, Cell, CellGroup } from 'vant'

Vue.use(Icon)
  .use(Button)
  .use(Field)
  .use(Uploader)
  .use(Cell)
  .use(CellGroup)
export default {
  name: 'CourseResource',
  data: () => {
    return {
      pptName: '',
      fileName: ''
    }
  },
  methods: {
    afterRead(File, detail) {
      this.fileName = File.file.name
    }
  }
}
</script>

<style lang="scss" scoped>
.submit_button--wrapper{
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 15px;
}
.file{
    &_item--container{
        margin-top: 36px;
    }
    &_info--text{
        margin-left: 18px;
        margin-bottom: 10px;
        font-size: 12px;
        color: #989898;
    }
}
</style>
