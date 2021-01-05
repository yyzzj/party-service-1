/*
 * @Author: 吴晓斌
 * @Date: 2020-12-08
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2021-01-05 16:04:42
 */
//社区活动
<template>
  <div class="container" @click="toActivityDetail(activityItem.id)">
    <van-row class="activityListElem">
      <van-col class="activityPic" span="4">
        <van-image height="60" :src="activityItem.pic" />
      </van-col>
      <van-col class="activityContent" span="20">
        <van-row class="activity_title">
          <van-col span="21">{{ activityItem.title }}</van-col>
          <van-col span="3" class="activity_check">
            <span>查看</span>
            <van-icon name="arrow" color="#000" size="12" />
          </van-col>
        </van-row>
        <van-row class="activity_detail">{{ activityItem.detail }}</van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Col, Row, Image as VanImage } from 'vant'
Vue.use(Icon).use(Col).use(Row).use(VanImage)
export default {
  name: 'ActivityItem',
  props: {
    activityItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  methods: {
    toActivityDetail(activityId) {
      this.$router.push({
        path: '/activityDetail',
        query: {
          activityId
        }
      }).catch(() => { })
    }
  }
}
</script>

<style lang='scss' scoped>
.container{
  margin: 15px 0;
  margin-left: 10px;
}
.activityListElem{
  width:100%;
  height:70px;
}
.activityContent{
  padding: 5px 10px;
}
.activity_title{
  height: 30px;
  font-weight: 700;
  color: #A12831;
  font-size: 20px;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.activity_detail{
  font-size: 15px;
  color: #6d7278;
  margin: 5px 0;
  overflow:hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
}
.activity_check{
  font-size: 15px;
  color: rgb(105, 116, 126);
  line-height: 23px;
}
.van-icon{
  vertical-align: middle;
}
.activity_check span{
  color: rgb(105, 116, 126);
  font-size: 13px;
}
</style>
