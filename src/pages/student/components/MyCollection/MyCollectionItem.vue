/*
* @Author:吴晓斌
* @Date:2020-05-27
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-07 20:37:41
*/
//我的收藏组件
<template>
  <div>
    <div v-for="(item,index) in info" :key="index" class="myCollection_box" @click="jumpToShow(item.id)">
      <van-row type="flex" justify="start">
        <van-col>
          <div class="myCollection_collectionImageBox">
            <van-image style="vertical-align:middle;" width="100%" height="100%" :src=" url " />
          </div>
        </van-col>
        <van-col>
          <div class="info_wrap--container">
            <div class="myCollection_collectionTitle">
              <span class="myCollection_collectionTitle--text">{{ item.title }}</span>
            </div>
            <van-row type="flex" justify="start">
              <van-col span="18">
                <div class="myCollection_doctor">
                  <van-image style="vertical-align:middle;" round width="20px" height="20px" :src=" url " />
                  <span class="myCollection_doctor--text">{{ item.creatorName }}</span>
                </div>
              </van-col>
              <van-col span="6">
                <div class="myCollection_visitedCount">
                  <van-icon slot="icon" class-prefix="old-icon" name="guanzhongshu-copy" size="15" />
                  <span class="myCollection_visitedCount--text">{{ item.countView }}</span>
                </div>
              </van-col>
            </van-row>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Image, Col, Row } from 'vant'
Vue.use(Image).use(Col).use(Row).use(Icon)

export default {
  name: 'MyCollectionItem',
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
      url: 'https://img.yzcdn.cn/vant/cat.jpeg'
    }
  },
  methods: {
    jumpToShow(id) {
      this.$router.push({
        path: '/article',
        query: {
          id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";

.myCollection_box {
  height: 80px;
  padding-top: 20px;
}

.myCollection_collectionImageBox {
  height: 80px;
  width: 80px;
  margin-left: 15px;
}

.info_wrap--container{
  padding-left: 20px;
}

.myCollection_collectionTitle{
  margin-top: 10px;

  &--text {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: $font-color;
  }
}

.myCollection_doctor {
  margin-top: 20px;

  &--text {
    margin-left: 5px;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: $font-color-lighter;
  }
}

.myCollection_visitedCount {
  margin-top: 20px;

  &--text {
    margin-left: 5px;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: $font-color-lighter;
  }
}
</style>
