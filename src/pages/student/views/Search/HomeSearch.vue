/*
* @Author: 李兆鹏
* @Date: 2020-07-28
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-26 21:13:21
*/
// 首页-搜索页面
<template>
  <div class="Home-search">
    <div class="top">
      <!-- 居中flex布局 -->
      <van-row type="flex" justify="center">
        <van-col span="2" class="top-left">
          <!-- 返回icon -->
          <van-icon name="arrow-left" color="#575757" size="25" @click="goBack" />
        </van-col>
        <van-col span="21" class="top-right">
          <van-search
            v-model="value"
            shape="round"
            show-action
            placeholder="请输入课程名称"
            @search="onSearch"
            @cancel="onCancel"
          >
            <!-- 搜索icon -->
            <template #left-icon>
              <van-icon class-prefix="old-icon" name="sousuo" size="20" color="#979797" />
            </template>
            <!-- 右侧取消 -->
            <template #action>
              <span class="cancel" @click="onCancel">取消</span>
            </template>
          </van-search>
        </van-col>
      </van-row>
    </div>
    <div v-if="isLogin">
      <div class="search-history">
        <div class="title_wrap--container">
          <span class="text-sousuolishi">搜索历史</span>
          <van-icon id="removeicon" class-prefix="old-icon" name="shanchu" size="24" color="#575757" style="cursor:pointer;margin-right:10px" @click="remove" />
        </div>
      </div>
      <div v-if="info.length > 0" class="search-content">
        <van-row>
          <van-button v-for="(item,i) in info.slice(0,10)" :key="i" square type="info" @click="searchHistory(item)">{{ item }}</van-button>
        </van-row>
      </div>
      <div v-else class="search-conten_none">
        暂无搜索记录
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'
import Vue from 'vue'
import { Icon, Tab, Tabs, Search, Col, Row, Button, Dialog, Toast } from 'vant'
import { getSearchHistory, deleteSearchHistory } from '@/api/student/search'

Vue.use(Tab)
  .use(Tabs)
  .use(Icon)
  .use(Search)
  .use(Col)
  .use(Row)
  .use(Button)
export default {
  name: 'HomeSearch',
  data() {
    return {
      value: '',
      name: '',
      isLogin: undefined,
      info: []
    }
  },
  created() {
    this.isLogin = getToken('student')
    if (this.isLogin) {
      this.getSearchHistory()
    }
  },
  methods: {
    // 返回上一页面
    goBack() {
      this.$router.go(-1)
    },
    // 搜索事件
    onSearch() {
      if (this.value === '')Toast.fail('请输入感兴趣的课程')
      else {
        this.$router.push({
          path: '/searchResult',
          query: {
            keyword: this.value
          }
        })
        this.value = ''
      }
    },
    // 取消事件
    onCancel() {
      this.value = ''
    },
    // 删除记录事件
    remove() {
      Dialog.confirm({
        message: '确认删除全部历史记录？'
      })
        .then(() => {
          this.deleteSearchHistory()
        })
    },
    searchHistory(keyword) {
      this.$router.push({
        path: '/searchResult',
        query: {
          keyword
        }
      })
      this.value = ''
    },
    async getSearchHistory() {
      try {
        const res = await getSearchHistory()
        this.info = res.data.data
      } catch (error) {
        console.log(error)
      }
    },
    async deleteSearchHistory() {
      try {
        if (this.info.length === 0) {
          Toast.fail('您尚未进行过搜索噢')
        } else {
          const res = await deleteSearchHistory()
          if (res.code === 200) {
            this.info = []
            Toast.success('已成功删除')
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
@import 'src/scss/settings.scss';
//设置span的字体颜色的混合指令
@mixin setSpanStyle($fontSize,$color) {
    font-size: $fontSize;
    color: $color;
}

.Home-search {
    min-height: 100vh;
    font-family: PingFangSC-Regular;

    .top {
        background-color: $white;
        border-bottom: 1px solid #f4f6f5;

        &-left {
            display: flex;
            align-items: center; /*定义body的元素垂直居中*/
            justify-content: center; /*定义body的里的元素水平居中*/
            .van-icon {
                cursor: pointer;
            }
        }

        &-right {
            .cancel {
                @include setSpanStyle(16px, $background-grey);
            }
        }
    }

    .empty {
        height: 1px;
    }
    .title_wrap--container{
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
}
.search-history{
  padding-top: 15px;
  padding-left: 10px;
  background-color: $white;

}
.search-history .text-sousuolishi{
  font-size: 20px;
  color: #313131;

}

.search-content{
  padding-left: 25px;
  background-color: $white;
}
.search-content button{
  background: #F3F3F3;
  border-radius: 2px;
  margin: 10px;
  outline: none;
  border: none;
  color: #676767;
  font-size: 14px;
}

.search-conten_none{
  margin-top: 20px;
  width: 100%;
  text-align: center;
}
</style>
