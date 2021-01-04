/*
 * @Author: 庞泽邦
 * @Date: 2020-06-02 11:30:01
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-11-07 17:22:55
 */
//兴趣标签页面
<template>
  <div>
    <van-nav-bar @click-left="goBack" @click-right="showMenu">
      <template #left>
        <van-icon name="arrow-left" size="18" color="white" />
      </template>
      <template #title>
        <span style="color:white">兴趣标签</span>
      </template>
      <template #right>
        <van-icon slot="icon" class-prefix="old-icon" name="caidan" size="18" color="white" />
      </template>
    </van-nav-bar>
    <healthy-popup v-model="showPopup" />
    <div class="container">
      <div v-if="isFirstEnter === 1" class="advertisement">
        <div>
          <div class="title">
            <van-row type="flex" justify="center">
              <van-col span="24">
                <div style="font-weight:600;color:#989898 ">选择你感兴趣的标签吧</div>
              </van-col>
            </van-row>
          </div>
          <div class="intro-animate">
            <transition-group
              :css="false"
              @before-enter="beforeEnter"
              @enter="enter"
              @after-enter="afterEnter"
            >
              <div
                v-for="(item,index) of animation"
                :key="item.id"
                ref="chooseItem"
                :class="[myTag.includes(item.id)?'choose_chat':'','chat',isphone===true?'chat_size--phone':'chat_size--pc']"
                :data-delay="index*250"
                :data-x="index%2 === 0 ? '-50%' : '50%'"
                :data-y="getRandom()+'%'"
                :data-s="0"
                @click="chooseItem(item.id,index)"
              >{{ item.name }}</div>
            </transition-group>
          </div>
        </div>
        <div class="footer">
          <div v-if="tagLength > 6" class="footer_icon--wrap">
            <span class="footer_icon--text" @click="change">
              <van-icon ref="icon" name="replay" size="14" />
              <span style="margin-left:10px">换一换</span>
            </span>
          </div>
          <div class="footer_btn--wrap">
            <van-button color="#A12831" block class="footer_btn" @click="jumpToShow">选定</van-button>
          </div>
        </div>
      </div>
      <div v-else-if="isFirstEnter === 2">
        <van-tabs v-model="active">
          <van-tab title="全部标签">
            <div>
              <van-cell v-for="item of chats" :key="item.id" :title="item.name" icon="shop-o">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                  <van-button v-if="myTagID.includes(item.id)" color="#68627E" round size="mini" plain @click="unFollowTag(item.id)">已关注</van-button>
                  <van-button v-else icon="plus" color="#A12831" round size="mini" @click="unFollowTag(item.id)">关注</van-button>
                </template>
                <template #label>
                  <span>{{ `${item.countFollow}人关注-${item.countArticle}篇文章` }}</span>
                </template>
              </van-cell>
              <div class="fix_bottom" />
            </div>
          </van-tab>
          <van-tab title="已关注标签">
            <div>
              <van-cell v-for="item of myTag" :key="item.id" :title="item.name" icon="shop-o">
                <template #right-icon>
                  <van-button v-if="myTagID.includes(item.id)" color="#68627E" round size="mini" plain @click="unFollowTag(item.id)">已关注</van-button>
                  <van-button v-else icon="plus" color="#A12831" round size="mini" @click="unFollowTag(item.id)">关注</van-button>
                </template>
                <template #label>
                  <span>{{ `${item.countFollow}人关注-${item.countArticle}篇文章` }}</span>
                </template>
              </van-cell>
              <div class="fix_bottom" />
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, NavBar, Button, Tabs, Tab, Toast, Col, Row, Cell, CellGroup } from 'vant'
import HealthyPopup from '@/components/HealthyPopup'
import { getTag, addTag, judegTag } from '@/api/student/healthy'
Vue.use(NavBar)
  .use(Icon)
  .use(Button)
  .use(Tabs)
  .use(Tab)
  .use(Toast)
  .use(Col)
  .use(Row)
  .use(Cell)
  .use(CellGroup)
export default {
  name: 'InterestTag',
  components: {
    'healthy-popup': HealthyPopup
  },
  data: () => {
    return {
      showPopup: false,
      chats: [], // 数据源
      animation: [], // 显示数组
      flag: 0, // 切换显示数组
      choose: [], // 选择数组
      isphone: true, // 判断是否PC
      tagLength: 0, // 标签个数
      myTag: [], // 用户已关注的标签
      myTagID: [], // 用户已关注的标签ID集合，用于filter在全部标签中筛选出已关注
      active: 0,
      isFirstEnter: 3 // 3表示等待接口请求 2表示第二次进入 1表示第一次进入
    }
  },
  created() {
    this.judegTag()
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.animation.push(...this.chats[0])
    // })
    const width = document.getElementById('app').offsetWidth
    this.isphone = width < 600
  },
  methods: {
    // onclick方法
    // 返回上一页
    goBack() {
      this.$router.go(-1)
    },
    // 展示菜单
    showMenu() {
      this.showPopup = !this.showPopup
    },
    beforeEnter(dom) {
      const { x = 0, y = 0, s = 1, opacity = 0 } = dom.dataset
      dom.style.cssText = `transition: .3s;opacity: ${opacity};transform: scale(${s}) translateX(${x}) translateY(${y});`
    },
    enter(dom, done) {
      const delay = dom.dataset.delay
      setTimeout(function() {
        dom.style.cssText = `transition: .3s;opacity: 1;transform: scale(1) translateX(0) translateY(0);`
        // 监听 transitionend 事件
        var transitionend = window.ontransitionend
          ? 'transitionend'
          : 'webkitTransitionEnd'
        dom.addEventListener(transitionend, function onEnd() {
          dom.removeEventListener(transitionend, onEnd)
          done() // 调用done() 告诉vue动画已完成，以触发 afterEnter 钩子
        })
      }, delay)
    },
    afterEnter(dom) {
      dom.style.cssText = ''
    },
    getRandom() {
      const rate = Math.floor(Math.random() * 100 + 10)
      return Math.random() > 0.5 ? rate : -1 * rate
    },
    change() {
      // this.choose = []
      this.flag++
      const temp = this.flag % this.chats.length
      this.animation = this.chats[temp]
      // 挂载旋转动效
      this.$refs.icon.classList.add('icon')
      setTimeout(() => {
        this.$refs.icon.classList.remove('icon')
      }, 1000)
    },
    // 选择标签
    chooseItem(name, index) {
      // ref拿到dom属性--可以$event优化
      const color = window
        .getComputedStyle(this.$refs.chooseItem[index])
        .getPropertyValue('background-color')
      if (color === 'rgb(245, 221, 156)') {
        this.$refs.chooseItem[index].style = 'background-color:#68627E;color:white'
      } else {
        this.$refs.chooseItem[index].style = 'background-color:#F5DD9C;color:black'
      }
      if (this.choose.includes(name)) {
        const index = this.choose.indexOf(name)
        this.choose.splice(index, 1)
      } else {
        this.choose.push(name)
      }
    },
    jumpToShow() {
      if (this.choose.length === 0) {
        Toast.fail('您尚未选择兴趣标签')
      } else {
        this.addTag(true, true, this.choose.join(','))
      }
    },
    // 获取所有兴趣标签
    async getTag() {
      try {
        const res = await getTag()
        // 当再次进入时源数据为一维数组
        if (this.isFirstEnter === 2) {
          this.chats = res.data
        } else if (this.isFirstEnter === 1) {
          // 当初次进入时源数据需要构造为二维数组以便进行取模切换显示标签
          const len = res.data.length
          this.tagLength = len
          const n = 6 // 每行显示6个
          const lineNum = len % n === 0 ? len / n : Math.floor((len / n) + 1)
          for (let i = 0; i < lineNum; i++) {
            const temp = res.data.slice(i * n, i * n + n)
            this.chats.push(JSON.parse(JSON.stringify(temp)))
          }
          this.animation.push(...this.chats[0])
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 初次进入时批量添加兴趣标签
    async addTag(replace, favorite, tagIdList) {
      try {
        const res = await addTag(replace, favorite, tagIdList)
        if (res.code === 200) {
          this.$router.push({
            path: '/healthyAsk'
          })
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 再次进入时对单一标签操作
    async unFollowTag(id) {
      try {
        let favorite
        if (this.myTagID.includes(id)) {
          favorite = false
        } else favorite = true
        const res = await addTag(false, favorite, id)
        if (res.code === 200) {
          this.judegTag()
        }
        if (!favorite) {
          Toast.success('成功取消关注')
        } else {
          Toast.success('成功关注')
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取我已关注的标签
    async judegTag() {
      try {
        const res = await judegTag()
        const temp = []
        const len = res.data.length
        if (len > 0) {
          this.myTag = res.data
          for (const i of res.data) {
            temp.push(i.id) // 只要id
          }
          this.myTagID = temp
          this.isFirstEnter = 2
        } else {
          this.isFirstEnter = 1
        }
        // 重置数据源为初始状态
        this.chats = []
        this.getTag()
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
@function getRight($w) {
  @if $w % 3 == 0 {
    @return 29%;
  }
  @if $w == 5 {
    @return 23%;
  }
  @return 71%;
}
@function getLeft($w) {
  @if $w % 4 == 0 {
    @return 13%;
  }
  @if $w % 6 == 0 {
    @return 29%;
  }
  @return 29%;
}
@function getTop($w) {
  $topArr : 7%  31%  17%  53%  41%  73%;
  @if $w == 1{
    @return nth($topArr,1)
  }
  @if $w == 2{
    @return nth($topArr,2)
  }
  @if $w == 3{
    @return nth($topArr,3)
  }
  @if $w == 4{
    @return nth($topArr,4)
  }
  @if $w == 5{
    @return nth($topArr,5)
  }
  @return nth($topArr,6)
}
.container {
  background: white;
  .advertisement {
    height: 90vh;
    position: relative;
    background: #fff;
  }
}
.intro-animate{
  width: 100%;
  height: 100%;
}
.title {
  position: absolute;
  width: 100%;
  text-align: center;
  margin-top: 17px;
}
.chat_size--phone{
  height: 45px;
  width: 45px;
}
.chat_size--pc{
  height: 80px;
  width: 80px;
}
.chat {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: #ffffff;
  box-shadow: 0px 0px 6px 0px rgba(83, 110, 245, 0.2);
  border-radius: 50%;
  text-align: center;
  background: #F5DD9C;
  color: black;
  user-select: none;
  @for $i from 1 through 10 {
    @if $i % 2 == 0 {
        &:nth-child(#{$i}) {
        top: #{getTop($i)};
        left: #{getLeft($i)};
        }
    }
    @else {
      &:nth-child(#{$i}) {
        top: #{getTop($i)};
        right: #{getRight($i)};
      }
    }
  }
}
.footer {
  position: fixed;
  bottom: 14px;
  max-width: 600px;
  width: 100%;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  &_btn--wrap{
    display: flex;
    justify-content: center;
  }
  &_icon{
    &--wrap{
        display:flex;
        justify-content:flex-end;
        margin-bottom:22px;
        margin-right:20%;
    }
    &--text{
        font-size:12px;
        font-weight:600;
        color:#676767;
        cursor: pointer;
        user-select: none;
    }
  }
  &_btn{
    width: 100%;
    max-width: 75%;
  }
}
.tag {
  position: absolute;
  height: 20px;
  width: 55px;
  border-radius: 10px;
  background-color: red;
  text-align: center;
  left: 5px;
  bottom: 5px;
}
@keyframes rotateIcon {
  0% {
    transform: rotate(60deg);
  }
  25% {
    transform: rotate(120deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(240deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.icon {
  animation: rotateIcon 0.5s;
}
.choose_chat{
  background-color:#68627E;
  color:white
}
.fix_bottom{
  height: 50px;
}
</style>
