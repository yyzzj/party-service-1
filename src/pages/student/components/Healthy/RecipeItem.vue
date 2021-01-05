/*
 * @Author: 吴晓斌
 * @Date: 2020-12-08
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2020-12-08 11:02:21
 */
//社区活动
<template>
  <div class="recipeItemContainer">
    <van-row class="activityListElem">
      <van-col class="activityNum" span="2">
        <span class="activityNum_text"></span>
      </van-col>
      <van-col class="activityContent" span="22">
        <van-row class="activity_title">
          <van-col span="20">构建人类命运共同体</van-col>
          <van-col span="4" class="activity_check">
            <van-icon name="eye-o" color="#000" /><span>查看</span>
          </van-col>
        </van-row>
        <van-row class="activity_detail">构建人类命运共同体，关键在行动</van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Cell, CellGroup,Col,Row } from 'vant'
Vue.use(Icon).use(Cell).use(CellGroup).use(Col).use(Row)
export default {

}
</script>

<style lang='scss' scoped>
.activityListElem{
  width:100%;
  height:70px;
  
}
.activityNum{
  height: 100%;
  background: red;
  color: white;
  text-align: center;
}
.activityNum_text{
  line-height: 70px;
  font-size: 20px;
  font-weight: 600;
}
.activityContent{
  padding: 10px;
}
.activity_title{
  height: 30px;
  font-weight: 700;
  color: rgb(117, 17, 17);
  font-size: 20px;
}
.activity_detail{
  height: 30px;
  font-size: 15px;
  color: rgb(105, 116, 126);
  margin: 5px 0;
}
.activity_check{
  font-size: 15px;
  color: rgb(105, 116, 126);
}
.van-icon{
  vertical-align: middle;
  margin-right: 3px;
}
.activity_check span{
  color: #6d7278;
  font-size: 13px;
}
</style>
