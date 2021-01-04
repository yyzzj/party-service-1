/*
* @Author: 杨志杰
* @Date: 2020-10-29 17:32
* @Last Modified by: 杨志杰
* @Last Modified time: 2020-12-05 15:40
*/
// 我的工具-养生问答-我的文章
<template>
  <div class="container">
    <div v-if="isEmpty" class="my-article">
      <div class="my-article-top">
        <van-tag size="medium">管理</van-tag>
      </div>
      <div v-for="(item,index) in articleList" :key="item.id" class="article-item">
        <van-swipe-cell>
          <van-card
            :thumb="item.cover"
          >
            <template #title>
              <div class="article-item-title">
                {{ item.title }}
              </div>
            </template>
            <template #tags>
              <div class="article-item-tags">
                <van-tag size="medium">{{ item.categoryName }}</van-tag>
              </div>
            </template>
            <template #price>
              <div class="article-item-price">
                <van-image
                  round
                  lazy-load
                  fit="cover"
                  src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <div class="article-item-price-name">{{ item.creatorName }}</div>
              </div>
            </template>
            <template #num>
              <div class="article-item-num">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#old-icon-guanzhongshu-copy" />
                </svg>
                <div class="article-item-num-watcher">{{ item.countView }}</div>
              </div>

            </template>
          </van-card>
          <template #right>
            <div class="article-item-right">
              <van-button text="编辑" class="btn-edit" />
              <van-button text="删除" class="btn-delete" @click="deleteMyArticle(item.id,index)" />
            </div>
          </template>
        </van-swipe-cell>
      </div>
      <van-overlay :show="showOverlay">
        <div class="wrapper" @click.stop>
          <van-loading />
        </div>
      </van-overlay>
    </div>
    <van-divider v-if="isEmpty">没有更多了</van-divider>
    <van-empty v-if="!isEmpty" description="没有内容，去发布吧" />
  </div>
</template>

<script>
import Vue from 'vue'
import {
  Button,
  Toast,
  SwipeCell,
  Empty,
  Card,
  Tag,
  Lazyload,
  Image as VanImage,
  Overlay,
  Loading,
  Dialog,
  Divider
} from 'vant'
import { getMyArticle, deleteMyArticle } from '@/api/teacher/healthyAsk'

Vue.use(Button)
  .use(SwipeCell)
  .use(Toast)
  .use(Card)
  .use(Tag)
  .use(VanImage)
  .use(Lazyload)
  .use(Overlay)
  .use(Loading)
  .use(Dialog)
  .use(Divider)
  .use(Empty)
export default {
  name: 'MyArticle',
  data() {
    return {
      articleList: [],
      isEmpty: false,
      showOverlay: false // 遮罩层的显示
    }
  },
  created() {
    this.getMyArticle()
  },
  mounted() {
    this.isEmpty = this.articleList.length === 0
  },
  methods: {
    async getMyArticle() {
      try {
        const res = await getMyArticle()
        this.articleList = res.data
      } catch (e) {
        console.log(e)
      }
    },
    deleteMyArticle(id, index) {
      Dialog.confirm({ message: '确认删除？' }).then(async() => {
        try {
          this.showOverlay = true
          await deleteMyArticle(id)
          this.articleList.splice(index, 1)
          this.showOverlay = false
          Toast.success('删除成功')
        } catch (e) {
          console.log(e)
          this.showOverlay = false
          Toast.fail('删除失败')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/_settings.scss";

.my-article {
  background-color: $grey-lighter;

  &-top {
    padding: 10px 20px;

    .van-tag {
      background-color: $deep-purple;
      color: $white;
    }
  }

  .article-item {
    background-color: $white;
    border-bottom: solid 1px rgba(234, 234, 234, 0.92);

    &-title {
      font-size: 14px;
      color: $font-color;
      //文本不换行，这样超出一行的部分被截取，显示...
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &-tags {
      margin-top: 10px;

      .van-tag {
        background-color: $green-light;
        color: $white;
      }
    }

    &-price {
      display: flex;
      align-items: center;

      .van-image {
        width: 20px;
        height: 20px;
      }

      &-name {
        margin-left: 5px;
        font-size: 12px;
        color: $font-color-lighter;
      }
    }

    &-num {
      display: flex;
      align-items: center;

      &-watcher {
        color: $font-color-lighter;
        margin-left: 5px;
      }
    }

    &-right {
      height: 100%;
      display: flex;
      flex-direction: column;

      .van-button {
        height: 50%;
        background-color: rgba(234, 234, 234, 0.92);
      }

      .btn-edit {
        font-size: 15px;
        color: $background-grey;
      }

      .btn-delete {
        font-size: 15px;
        color: $red-tip-color;
      }
    }
  }

  .icon {
    width: 15px;
    height: 15px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
