/*
* @Author: 杨志杰
* @Date: 2020-10-09 12:53:21
* @Last Modified by: 杨志杰
* @Last Modified time: 2020-10-09 12:53:20
*/
// 我的工具-养生问答-新增文章
<template>
  <div class="add-healthy-contain">
    <van-form @submit="onSubmit">
      <van-field
        v-model="title"
        required
        name="title"
        label="文章标题"
        placeholder="请输入文章标题"
        :rules="[{ required: true, message: '请输入文章标题' }]"
      />
      <van-field
        required
        name="categoryId"
        :value="tagVal"
        readonly
        clickable
        label="文章标签"
        placeholder="请选择文章标签"
        :rules="[{ required: true, message: '请设置文章标签' }]"
        @click="showPicker = true"
      >
        <template #right-icon>
          <div style="display:flex">
            <span>请选择</span>
            <van-icon name="arrow" />
          </div>
        </template>
      </van-field>
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          title="文章标签"
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
        />
      </van-popup>
      <div class="cover">
        <p class="cover-text">课程封面</p>
        <van-field
          name="cover"
          :rules="[{ required: true, message: '请上传封面' }]"
        >
          <template #input>
            <van-uploader v-model="cover" :max-count="1" />
          </template>
        </van-field>
      </div>
      <div class="bg"><p class="content-text">文章内容</p></div>
      <div class="content-contain">
        <van-field
          v-model="content"
          name="content"
          rows="8"
          required
          label="文章内容"
          type="textarea"
          placeholder="请填写文章内容…"
          :rules="[{ required: true, message: '请填写文章内容' }]"
        />
      </div>
      <div class="submit">
        <van-button class="submit-button" text="提交" native-type="submit" />
      </div>
    </van-form>
    <van-overlay :show="showOverlay">
      <div class="wrapper" @click.stop>
        <van-loading />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import Vue from 'vue'
import { Form, Field, Button, Picker, Popup, Uploader, Toast, Overlay, Loading } from 'vant'
import { getTag, addArticle } from '@/api/teacher/healthyAsk'

Vue.use(Form)
  .use(Field)
  .use(Button)
  .use(Picker)
  .use(Popup)
  .use(Uploader)
  .use(Toast)
  .use(Overlay)
  .use(Loading)
export default {
  name: 'AddHealthyAsk',
  data() {
    return {
      // 遮罩层
      showOverlay: false,
      // 文章标签id
      categoryId: '',
      // 文章标题
      title: '',
      // 文章内容
      content: '',
      // 文章封面
      cover: [],
      // 文章标签
      tagVal: '',
      // 文章标签选 择器是否显示
      showPicker: false,
      // 文章标签列表
      columns: []
    }
  },
  created() {
    this.getTag()
  },
  methods: {
    // 提交表单
    onSubmit(values) {
      this.addArticle()
    },
    // 文章标签选择器
    onConfirm(value) {
      this.tagVal = value
      this.categoryId = value.split('.')[0]
      this.showPicker = false
    },
    async getTag() {
      try {
        const { data } = await getTag()
        this.columns = data.map(val => `${val.id}. ${val.name}`)
      } catch (e) {
        console.log(e)
      }
    },
    // 上传文章方法
    async addArticle() {
      try {
        this.showOverlay = true
        const formData = new FormData()
        formData.append('cover', this.cover[0].file)
        formData.append('content', this.content)
        await addArticle(this.categoryId, this.title, formData)
        this.categoryId = ''
        this.title = ''
        this.content = ''
        this.cover = []
        this.tagVal = ''
        this.showOverlay = false
        Toast.success('发布成功')
      } catch (e) {
        console.log(e)
        this.showOverlay = false
        Toast.fail('发布失败')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/scss/_settings.scss";

.add-healthy-contain {
  background-color: $bg;

  .van-form {
    background-color: $white;
  }

  .cover {
    padding: 0 9px;
    font-size: 14px;
    color: $font-color
  }

  .cover-text::before {
    color: #ee0a24;
    font-size: 14px;
    content: '*';
  }

  .bg {
    background-color: $bg;
    display: flex;
  }

  .content-text {
    color: $font-color-lighter;
    margin-left: 16px;
    font-size: 13px;
  }

  .content-contain {
    .van-field {
      display: flex;
      flex-direction: column;
    }
  }

  .submit {
    padding-top: 16px;
    background-color: $bg;
    display: flex;
    align-content: center;
    justify-content: center;

    &-button {
      width: 300px;
      background: $deep-purple;
      border: 1px solid $deep-purple;
      border-radius: 4px;
      color: $white;
      font-size: 16px;
    }
  }
}
</style>
