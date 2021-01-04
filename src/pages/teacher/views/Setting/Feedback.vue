/*
* @Author: 杨志杰
* @Date: 2020-05-26
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-19 14:01:19
*/
//设置中心-意见反馈页面
<template>
  <div class="feedback">
    <van-nav-bar @click-left="goBack" @click-right="goHome">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">意见反馈</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="shouye" size="18" color="white" />
      </template>
    </van-nav-bar>

    <div class="inputArea">
      <div class="field">
        <!-- <textarea class="van-field__control" placeholder="请输入您的意见~" style="height: 100px;" maxlength="150" /> -->
        <van-field
          v-model="message"
          rows="4"
          autosize
          type="textarea"
          maxlength="150"
          placeholder="请输入您的意见~"
          show-word-limit
        />
      </div>
      <van-uploader v-model="Pic" preview-size="100px" max-count="1">
        <div class="uploader">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#old-icon-xiangji1" />
          </svg>
        </div>
      </van-uploader>
    </div>
    <div class="bottom">
      <van-button @click="addFeedback(message,Pic)">提交意见</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, NavBar, Button, Field, Uploader, Toast } from 'vant'
import { addFeedback } from '@/api/student/user'

Vue.use(NavBar)
  .use(Icon)
  .use(Button)
  .use(Field)
  .use(Uploader)
export default {
  name: 'Feedback',
  data: () => {
    return {
      message: '',
      Pic: []
    }
  },
  methods: {
    // onclick方法
    // 返回上一页
    goBack() {
      this.$router.go(-1)
    },
    // 返回首页
    goHome() {
      this.$router.push({ path: '/home' })
    },
    async addFeedback(content, file) {
      try {
        if (content === '')Toast.fail('您尚未输入反馈意见')
        else {
          let res
          if (file.length > 0) {
            res = await addFeedback(content, file[0].file)
          } else {
            res = await addFeedback(content)
          }
          if (res.code === 200) {
            Toast.success('反馈意见提交成功')
            this.message = ''
            this.Pic = []
          } else {
            Toast.fail('反馈意见提交失败')
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@/scss/_settings.scss';

    .feedback {
        background-color: $grey-lighter;
        min-height: 100vh;
        font-family: PingFangSC-Regular;

        .van-nav-bar {
            background-color: $main-color;
        }

        .inputArea {
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
                    justify-content: center;

                    .icon {
                        width: 40px;
                        height: 40px;
                    }
                }
            }
        }

        .bottom {
            margin-top: 50px;
            display: flex;
            align-items: center;
            justify-content: center;

            .van-button {
                width: 80%;
                height: 40px;
                color: $white;
                background-color: $main-color;
                border: 1px solid $main-color;
                border-radius: 4px;
            }
        }
    }
</style>
