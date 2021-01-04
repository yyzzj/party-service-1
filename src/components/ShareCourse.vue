/*
 * @Author: 庞泽邦
 * @Date: 2020-09-17 14:08:57
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-11 13:20:17
 */
// 课程分享组件
<template>
  <div>
    <div ref="toImg" class="canvas_content--container">
      <div>
        <div style="display:flex">
          <img
            width="300px"
            height="235px"
            class="img_fix"
            src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3492810649,166444062&fm=26&gp=0.jpg"
          >
        </div>
        <div class="info_wrap--container">
          <van-row type="flex" justify="space-between">
            <van-col span="18">
              <div style="height:100%">
                <div class="info_title">{{ courseName }}</div>
                <div style="display:flex;justify-content:space-between">
                  <div class="info_price">{{ price | formatPrice }}</div>
                  <div class="info_num">{{ `${num}人` }}</div>
                </div>
              </div>
            </van-col>
            <van-col span="6">
              <div style="margin-top:10px;">
                <img
                  width="70px"
                  height="70px"
                  class="img_fix"
                  :src="code"
                >
              </div>
            </van-col>
          </van-row>
        </div>
        <div class="info_btn--container">
          <div style="color: #989898;">长按保存图片</div>
        </div>
      </div>
    </div>
    <van-popup v-model="show" get-container="#app">
      <div class="popup_wrap--container">
        <div class="close_icon">
          <van-icon name="clear" size="30px" color="white" @click.stop="closePopup" />
        </div>
        <div v-if="canTouch" class="popup_content--container">
          <div v-if="isReadyRender == false" class="loading_wrap--container">
            <van-loading color="#A12831">
              正在生成图片,请稍等...
            </van-loading>
          </div>
          <div ref="imgContainer" />
        </div>
        <div v-else class="copy_content--container">
          <div style="text-align: initial;padding-left: 10px;">
            <h4>复制以下链接分享课程给朋友吧！</h4>
            <p>点击按钮可以直接复制到剪贴板噢</p>
          </div>
          <input type="text" class="copy_input" readonly :value="shareUrl">
          <button v-copy="shareUrl" v-copy:callback="copyCallback" class="copy_btn">
            <van-icon class-prefix="old-icon" name="copy" />
            <div v-show="isCopySuccess" class="copy_pop">
              <div class="trangle" />
              已复制
            </div>
          </button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue'
import shareImg from '@/utils/shareImg.js'
import imgFixBlob from '@/utils/imgFixBlob.js'
import { isTouch } from '@/utils/validate.js'
import { Icon, Popup, Image, Col, Row, Loading } from 'vant'

Vue.use(Icon)
  .use(Popup)
  .use(Image)
  .use(Row)
  .use(Col)
  .use(Loading)
export default {
  name: 'ShareCourse',
  model: {
    prop: 'showPopup',
    event: 'update'
  },
  props: {
    showPopup: {
      type: Boolean
    },
    price: {
      type: Number,
      default: 0
    },
    courseName: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    }
  },
  data: () => {
    return {
      code: require('@/assets/QRCode.png'),
      isReadyRender: false,
      canTouch: true, // 是否支持touch事件
      shareUrl: '',
      isCopySuccess: false // 是否复制成功
    }
  },
  computed: {
    show: {
      get() {
        return this.showPopup
      },
      set(val) {
        this.closePopup()
      }
    }
  },
  watch: {
    showPopup() {
      if (this.showPopup === true) {
        this.share()
      }
    }
  },
  created() {
    this.canTouch = isTouch()
    this.shareUrl = window.location.href
  },
  methods: {
    share() {
      if (this.canTouch === true) {
        // 异步渲染避免dom获取失败
        setTimeout(() => {
        // 获取需要遍历的dom
          const canvasdom = this.$refs.toImg
          // 传入节点原始宽高
          const options = {
            useCORS: true, // 允许使用跨域图片
            allowTaint: false // 不允许跨域图片污染画布
          }
          // 获取需要挂载的dom
          const container = this.$refs.imgContainer
          if (container.children.length === 0) {
          // 转换本地blob
            imgFixBlob(canvasdom).then(() => {
            // 开始绘图并挂载dom
              shareImg(canvasdom, options).then((img) => {
                img.style = 'width:320px;height:353px;margin-left:-10px;z-index:900'
                container.appendChild(img)
                this.isReadyRender = true
              })
            })
          }
        })
      }
    },
    copyCallback() {
      this.isCopySuccess = true
      // 显示1.5s
      setTimeout(() => {
        this.isCopySuccess = false
      }, 1500)
    },
    closePopup() {
      this.$emit('update', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.submit_wrap--container {
  position: fixed;
  bottom: -1px;
  width: 100%;
  max-width: 600px;
  height: 60px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0;
  border-radius: 5px;
}
.popup_wrap--container{
  height: 500px;
  width: 320px;
}
.popup_content--container{
  width: 300px;
  height: 360px;
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  padding: 10px 10px 10px 10px;
}
.canvas_content--container{
  position: absolute;
  top:0;
  z-index:-10;
  @extend .popup_content--container;
}
.loading_wrap--container{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.save_image{
  position:absolute;
  left: 10px;
  top: 15px;
  pointer-events: none;
  width:300px;
  height:360px;
}
.info{
  &_wrap--container{

  }
  &_btn--container{
    margin-top: 8px;
  }
}
.close_icon{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
}
.info{
  &_title{
    display:flex;
    margin-bottom:20px;
    margin-top:15px;
    font-size: 16px;
    margin-left: 10px;
  }
  &_price{
    font-size: 16px;
    color: $main-color;
    font-weight: 600;
    margin-left: 10px;
  }

  &_num{
    font-size: 16px;
    color: #989898;
    margin-right: 20px;
  }
}
.img_fix{
  object-fit: contain;
}
.van-popup{
  background: none;
}
.copy_content--container{
  width: 300px;
  height: 180px;
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  text-align: center;
  padding: 10px 10px 10px 10px;
}
.copy_input{
  width: 230px;
  padding: 9px 8px;
  font-size: 13px;
  color: #333;
  vertical-align: middle;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(0,0,0,.075);
  &:focus{
    border-color: #51a7e8;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.075), 0 0 5px rgba(81,167,232,.5);
  }
}
.copy_btn{
  position: relative;
  display: inline-block;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 700;
  line-height: 20px;
  color: #333;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  background-color: #eee;
  background-image: linear-gradient(#fcfcfc,#eee);
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  user-select: none;
  &:active{
    border-color: #51a7e8;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.075), 0 0 5px rgba(81,167,232,.5);
  }
  &:focus{
    border-color: #51a7e8;
    box-shadow: inset 0 1px 2px rgba(0,0,0,.075), 0 0 5px rgba(81,167,232,.5);
  }
}
.copy_pop{
  position: absolute;
  height: 20px;
  width: 50px;
  left: -5px;
  bottom: -30px;
  background: black;
  border-radius: 2px;
  color:#ffffff;
  font-size:12px;
}
.trangle{
      width: 0;
    height: 0;
    border:5px solid;
    position: absolute;
    top: -10px;
    left: 20px;
    border-color: transparent transparent black;
}
</style>
