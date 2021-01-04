/*
 * @Author: 庞泽邦
 * @Date: 2020-06-03 21:38:25
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-20 16:16:33
 */
//文章详情页面
<template>
  <div class="background_white">
    <van-nav-bar @click-left="goBack" @click-right="goHome">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">文章详情</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="shouye-copy" size="18" color="white" />
      </template>
    </van-nav-bar>
    <van-skeleton title :row="18" :loading="loading" style="margin-top:20px">
      <div v-if="isHaveId">
        <div class="header_wrap--container">
          <div class="header_title--text">{{ info.title }}</div>
          <div class="doctor_info--container">
            <div class="avatar_wrap--container">
              <div>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#old-icon-icon-test4" />
                </svg>
              </div>
              <div style="margin-left:10px">
                <div class="doctor_name--text">{{ info.creatorName }}</div>
                <div class="doctor_time--text">{{ info.createTime }}</div>
              </div>
            </div>
            <div>
              <van-button color="#68627E" type="mini" class="header_btn" @click="addCollect(info.id)">{{ isFavourite === true ? '已收藏' : '收藏' }}</van-button>
            </div>
          </div>
        </div>
        <div class="content_wrap--container">{{ info.content }}</div>
        <article-comment :count-comment="commentNum" :default-comment-list="commentList" :add-comment-list="addCommentList" />
        <div class="button_wrap-container">
          <div class="component_wrap--container">
            <input v-model="comment" class="input_container" type="text" placeholder="说点什么吧">
            <van-button color="#A12831" size="small" round @click="articleComment">评论</van-button>
          </div>
        </div>
      </div>
      <div v-else-if="isError===true || !isHaveId" class="empty_wrap--container">
        <van-empty description="暂无该文章信息" />
      </div>
    </van-skeleton>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, NavBar, Icon, Empty, Skeleton, Toast } from 'vant'
import ArticleComment from '../../components/Article/ArticleComment'
import { getArticle, addCollect, articleComment } from '@/api/student/healthy'
import { parseTime } from '@/utils/index'

Vue.use(NavBar)
  .use(Icon)
  .use(Empty)
  .use(Skeleton)
export default {
  name: 'Article',
  components: {
    'article-comment': ArticleComment,
    [Button.name]: Button
  },
  data: () => {
    return {
      isHaveId: false,
      id: null,
      info: [],
      commentList: [],
      addCommentList: [],
      isFavourite: false,
      loading: true,
      isError: true,
      comment: '',
      commentNum: 0
    }
  },
  created() {
    this.id = this.$route.query.id
    if (!this.id) {
      this.isHaveId = false
    } else {
      this.getArticle(this.id)
      this.isHaveId = true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    goHome() {
      this.$router.push({
        path: '/home'
      })
    },
    async getArticle(id) {
      try {
        const res = await getArticle(id)
        this.info = res.data.article
        this.commentList = res.data.comments
        this.isFavourite = res.data.favorite
        this.commentNum = this.info.countComment
        this.loading = false
      } catch (error) {
        this.isError = true
        this.loading = false
        console.log(error)
      }
    },
    async addCollect(id) {
      try {
        const res = await addCollect(id, !this.isFavourite)
        if (res.code === 200) {
          this.isFavourite = !this.isFavourite
          if (!this.isFavourite) {
            Toast.success('已取消收藏')
          } else {
            Toast.success('已成功收藏')
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    async articleComment() {
      try {
        if (this.comment === '')Toast.fail('请输入评论内容')
        else {
          const res = await articleComment(this.id, this.comment)
          if (res.code === 200) {
            this.addCommentList.unshift({
              owner: window.sessionStorage.getItem('student_username') || this.$store.state.user.username,
              createTime: parseTime(new Date()),
              content: this.comment
            })
            this.comment = ''
            this.commentNum++
            Toast.success('发表成功')
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
.van-nav-bar {
    background-color: $main-color;
}
.icon {
    width: 30px;
    height: 30px;
}
.empty_wrap--container{
  background: #ffffff;
  height: calc(100vh - 46px);
}
.background_white{
  background: #ffffff;
}

.header{
    &_wrap--container{
        height: 70px;
        padding: 20px 20px 20px 20px;
        background: white;
    }
    &_title--text{
        font-size: 16px;
        font-weight: 600;
        color: #313131;
    }
    &_btn{
        height: 22px;
        border-radius: 4px;
        background: #68627E;
        font-size: 10px;
        color: #FFFFFF;
        border: none;
    }
}
.avatar_wrap--container{
    display: flex;
}
.doctor{
    &_name--text{
        font-size: 14px;
        color: #313131;
    }
    &_time--text{
        font-size: 13px;
        color: #989898;
    }
}
.doctor_info--container{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
}
.content_wrap--container{
    min-height: 260px;
    padding: 20px 20px 20px 20px;
    background: white;
    font-size: 14px;
    color: #313131;
    border-top: 10px solid #eaeceb;
}
.button_wrap-container{
  position: fixed;
  bottom: -1px;
  width: 100%;
  max-width: 600px;
  height: 52px;
  background: #ffffff;
  box-shadow: 0 2px 4px 0;
  border-radius: 5px;
}
.component_wrap--container{
  display:flex;
  justify-content: center;
  align-items:center;
  height:100%;
  padding-right: 20px;
}
.input_container{
    background: #F4F6F5;
    border-radius: 16.5px;
    width: 100%;
    height: 33px;
    padding-left: 10px;
    border: none;
    font-size: 12px;
    color: #989898;
    margin-right: 20px;
    margin-left: 20px;
}
</style>
