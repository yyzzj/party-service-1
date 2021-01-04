/*
* @Author: 郑丽敏
* @Date: 2020-08-02 17:25:21
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-08-12 10:11:42
*/
// 教师端课堂模块-课堂作业-批改作业详情
<template>
  <div class="hw-detail">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">批改作业</span>
      </template>
    </van-nav-bar>
    <hw-item :data="data" />
    <hw-command :data="hwCommand" />
    <div class="submitted">
      <div class="submitted--title">
        <span class="submitted--title--text">已提交列表</span>
      </div>
      <div v-for="(item,index) of submitList" :key="index" class="submitted--listbox">
        <div class="submitted--listbox">
          <div class="submitted--listbox--item">
            <div class="submitted--listbox--item--imgbox">
              <img :src="item.imgUrl">
            </div>
            <div class="submitted--listbox--item--nick">
              <span class="submitted--listbox--item--nick-text">{{ item.nick }}</span>
            </div>
            <div class="submitted--listbox--item--btn">
              <van-button size="mini" color="#68627E" @click="correctHw">批改</van-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import HwItem from '../../components/HomeworkCorrecting/HwItem'
import HwCommand from '../../components/HomeworkCorrecting/HwCommand'
import { getSubmitList } from '@/api/teacher/submitList'
import { NavBar, Icon, Button } from 'vant'
Vue.use(NavBar)
  .use(Icon)
  .use(Button)
export default {
  name: 'HwDetail',
  components: {
    HwItem,
    HwCommand
  },
  data() {
    return {
      data: {
        index: '01',
        title: '第一次作业',
        deadlineMonth: 12,
        deadlineDay: 11,
        status: '进行中',
        submitNum: 31,
        unSubmitNum: 50
      },
      hwCommand: {
        text: '这里是作业要求，不上班的巨额货币危机而北京考生不代表我当时不觉得苦v均位于和v第五恶霸丢不掉',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596443404886&di=f5da8246ddf7370b756eef9988501bd3&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D13edba51e8c4b7453494b71efffd1e78%2F9d2039738bd4b31c9eb9a8c384d6277f9f2ff80a.jpg'
      },
      submitList: []
    }
  },
  created() {
    this.getSubmitList()
  },
  methods: {
    async getSubmitList() {
      try {
        const res = await getSubmitList()
        this.submitList = res.data.array
      } catch (e) {
        console.log(e)
      }
    },
    clickLeft() {
      this.$router.go(-1)
    },
    correctHw() {
      this.$router.push('/PersonalHwDetail')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";
.van-nav-bar {
  background-color: #a12831;
}
.hw-detail {
  background: $body-color;
  min-height: 100vh;
  .hw-command {
    background: $white;
    &-box {
      width: 85%;
      display: flex;
      flex-direction: column;
      margin:0 auto;
      &--textbox {
        font-size: 14px;
        color: #676767;
        p {
          line-height: 20px;
          margin-top:18px;
          margin-bottom:0;
        }
      }
      &--imgbox {
        width: 125px;
        height: 88px;
        margin-top: 19px;
        margin-bottom: 27px;
        img {
          width: 100%;
        }
      }
    }
  }
  .submitted {
    margin-top: 20px;
    &--title {
      margin-left: 17px;
      margin-bottom: 5px;
      &--text {
        font-size: 14px;
        color: #6D7278;
      }
    }
    &--listbox {
      background: $white;
      &--item {
        height: 59px;
        border-bottom: 1px solid $body-color;
        &--imgbox {
          float: left;
          width: 30px;
          height: 30px;
          margin-left: 18px;
          margin-top: 14px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        &--nick {
          float: left;
          margin-left: 16px;
          margin-top: 19px;
          &--text {
            font-size: 14px;
            color: #313131;
          }
        }
        &--btn {
          float: right;
          margin-top: 19px;
          margin-right: 14px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
