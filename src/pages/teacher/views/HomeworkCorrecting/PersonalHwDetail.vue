/*
* @Author: 郑丽敏
* @Date: 2020-08-02 17:25:21
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-08-12 10:08:30
*/
// 教师端课堂模块-课堂作业-批改作业详情2
<template>
  <div class="personal-hw-detail">
    <van-nav-bar>
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" @click="clickLeft" />
      </template>
      <template #title>
        <span style="color:white">作业详情</span>
      </template>
    </van-nav-bar>
    <div class="submitted--listbox">
      <div class="submitted--listbox--item">
        <div class="submitted--listbox--item--imgbox">
          <img :src="personData.imgUrl">
        </div>
        <div class="submitted--listbox--item--nick">
          <span class="submitted--listbox--item--nick-text">{{ personData.nick }}</span>
        </div>
      </div>
    </div>
    <hw-command :data="hwCommand" />
    <div class="mark">
      <van-cell-group class="mark--item">
        <van-field
          label="批改分数"
          :value="correctMark.mark"
          placeholder="请输入作业分数"
          bind:change="onChange"
        />
      </van-cell-group>
      <van-cell-group class="mark--item">
        <van-field
          type="default"
          label="备注"
          :value="correctMark.note"
          placeholder="请填写备注内容"
        />
      </van-cell-group>
    </div>
    <div class="btnbox">
      <van-button color="#68627E">提交批改</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, CellGroup, Field, Button } from 'vant'
import HwCommand from '../../components/HomeworkCorrecting/HwCommand'
Vue.use(NavBar)
  .use(Icon)
  .use(CellGroup)
  .use(Field)
  .use(Button)
export default {
  name: 'PersonalHwDetail',
  components: {
    HwCommand
  },
  data() {
    return {
      personData: {
        imgUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1697947381,2256063041&fm=26&gp=0.jpg',
        nick: '瓜皮酱'
      },
      hwCommand: {
        text: '这里是作业要求，不上班的巨额货币危机而北京考生不代表我当时不觉得苦v均位于和v第五恶霸丢不掉',
        imgUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596443404886&di=f5da8246ddf7370b756eef9988501bd3&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3D13edba51e8c4b7453494b71efffd1e78%2F9d2039738bd4b31c9eb9a8c384d6277f9f2ff80a.jpg'
      },
      correctMark: {
        mark: '',
        note: ''
      }
    }
  },
  methods: {
    clickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";
.van-nav-bar {
  background-color: #a12831;
}
.personal-hw-detail {
  background: $body-color;
  min-height: 100vh;
  .mark {
    margin-top: 18px;
    &--item {
      height: 60px;
      .van-field {
        line-height: 40px;
      }
    }
  }
  .btnbox {
    margin-top: 38px;
    border-radius: 4px;
    text-align: center;
    .van-button {
      width: 330px;
    }
  }
  .submitted {
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
      }
    }
  }
}
</style>
