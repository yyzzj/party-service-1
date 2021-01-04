/*
* @Author:吴晓斌
* @Date:2020-05-11
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-19 15:50:03
*/
//课堂作业待提交部分组件
<template>
  <div class="incompelte_item--container">
    <div
      v-for="(item,index) of info"
      :key="index"
      class="classWork_box"
      @click.stop="ToHomeworkInfo(item.homeworkId)"
    >
      <div class="classWork_title">
        <span class="classWork_title--text">{{ item.content }}</span>
      </div>
      <van-row type="flex" justify="end">
        <van-col span="4">
          <div class="classWork_status">
            <span class="classWork_status--text">待提交</span>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex">
        <van-col span="8">
          <div class="classWork_deadline">
            <span class="classWork_deadline--text">{{ `${item.deadTime}截止` }}</span>
          </div>
        </van-col>
        <van-col span="16">
          <div class="classWork_mark">
            <span class="classWork_mark--text">分数：{{ item.score }}</span>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Col, Row } from 'vant'

Vue.use(Col)
Vue.use(Row)

export default {
  name: 'ClassWorkIncomplete',
  props: {
    info: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data: () => {
    return {

    }
  },
  methods: {
    ToHomeworkInfo(id) {
      this.$router.push({
        path: '/courseHomework',
        query: {
          homeworkId: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.incompelte_item--container{
  height: 100%;

}
.classWork_box {
  width: 100%;
  height: 80px;
  padding-top: 20px;
}

.classWork_title {
  margin-left: 20px;
  &--text {
    font-family: PingFangSC-Regular;
    color: #313131;
    font-size: 14px;
  }
}

.classWork_deadline {
  margin-left: 20px;

  &--text {
    font-family: PingFangSC-Regular;
    color: #989898;
    font-size: 10px;
  }
}

.classWork_mark {
  &--text {
    font-family: PingFangSC-Regular;
    color: #989898;
    font-size: 10px;
  }
}

.classWork_status {
  &--text {
    font-family: PingFangSC-Regular;
    color: #6dd400;
    font-size: 12px;
  }
}
</style>
