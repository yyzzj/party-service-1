/*
* @Author: 范开杰
* @Date: 2020-05-26
* @Last Modified by: 杨志杰
* @Last Modified time: 2020-12-15 11:18:59
*/
//个人中心-养生问答-热门组件
<template>
  <div class="hotHealthyAsk_container"> <!-- 养生热门信息容器 -->
    <pull-list :func="getArticle" :params="params">
      <template v-slot="{data}">
        <div v-for="item in data" :key="item.id" @click="toArticle(item.id)">
          <div class="hotHealthyAsk--info"> <!-- 养生热门信息 -->
            <van-image class="hotHealthyAsk--image" width="70" height="70" :src="item.cover" lazy-load /><!-- 图片 -->
            <div class="hotHealthyAsk--inforight">
              <div class="hotHealthyAsk--title">{{ item.title }}</div> <!-- 标题 -->
              <div class="hotHealthyAsk--tag"> <!-- 标签 -->
                <span>{{ item.categoryName }}</span>
              </div>
              <div class="hotHealthyAsk--footer">
                <div class="hotHealthyAsk--teacher"> <!-- 教师 -->
                  <van-image width="20" height="20" round :src="url" />
                  <span class="hotHealthyAsk--teacherFont">{{ item.creatorName }}</span>
                </div>
                <div class="hotHealthyAsk--watched"><!-- 已看人数 -->
                  <van-icon slot="icon" class-prefix="old-icon" name="guanzhongshu-copy" size="15" />
                  <span class="hotHealthyAsk--watchedFont">{{ item.countView }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </pull-list>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image, Icon, Col, Row, Lazyload } from 'vant'
import PullList from '@/components/PullList'
import { getPopularArticle, underTagArticle } from '@/api/student/healthy'

Vue.use(Image)
  .use(Icon)
  .use(Col)
  .use(Row)
  .use(Lazyload)
export default {
  name: 'HotHealthyAsk',
  components: {
    PullList
  },
  props: {
    active: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data: () => {
    return {
      info: [],
      url: 'https://img.yzcdn.cn/vant/cat.jpeg',
      pageSize: 5, // 一页多少
      page: 0, // 当前页数
      params: { pageSize: 5 },
      getArticle: getPopularArticle
    }
  },
  created() {
    if (this.active === 0) {
      this.params = { pageSize: this.pageSize }
      this.getArticle = getPopularArticle
    } else {
      this.params = { tageId: this.id, pageSize: this.pageSize }
      this.getArticle = underTagArticle
    }
  },
  methods: {
    toArticle(id) {
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
@import '@/scss/_settings.scss';

.hotHealthyAsk_container {
  background: $bg;
  padding-top: 1px;
}

.hotHealthyAsk {
  &--info {
    display: flex;
    background: $white;
    margin-bottom: 1px;
  }

  &--inforight {
    margin-top: 17px;
    margin-right: 27px;
    width: 100%;
  }

  &--image {
    flex-shrink: 0;
    margin: 15px 20px;
  }

  &--title {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: $font-color;
    height: 20px;
    line-height: 20px;
  }

  &--tag {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: $white;
    height: 18px;
    max-width: 50px;
    margin-top: 4px;
    background: $green-light;
    border-radius: 3px;
  }

  &--footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20px;
    margin-top: 6px;
  }

  &--teacher {
    display: flex;
    align-items: stretch;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: $font-color-lighter;
    line-height: 20px;
  }

  &--teacherFont {
    margin-left: 5px;
  }

  &--watched {
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 10px;
    color: $font-color-lighter;
  }

  &--watchedFont {
    margin-left: 5px;
  }
}
</style>
