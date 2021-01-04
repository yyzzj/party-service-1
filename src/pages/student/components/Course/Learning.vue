/*
 * @Author: 高燕生
 * @Date: 2020-05-06 12:12:16
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-01 16:00:52
 */
//课堂页面--学习课程列表组件
<template>
  <div class="learningcourse_container">
    <ul class="learningcourse--allitems">
      <li v-for="item in data" :key="item.id" class="learningcourse--item" @click="$router.push('/coursePlay')">
        <span class="course--title">{{ item.coursename }}</span>
        <div class="progress_wrap--container">
          <div :style="{width:progressWidth+'px'}">
            <Progress :full-width="progressWidth" :width="dynamicWidth(progressWidth,item.percentage)" status-type="success" />
          </div>
          <span class="learning_course--text">{{ `已学习${item.percentage}%` }}</span>
        </div>
        <div class="coursedetail--container clearfix">
          <div class="coursedetail_teacher--container">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#old-icon-icon-test" />
            </svg>
            <span class="coursedetail_teacher--teachername">{{ item.teachername }}</span>
          </div>
          <div class="coursedetail_deadline--container">
            <svg class="icon coursedetail_deadline--icon" aria-hidden="true">
              <use xlink:href="#old-icon-ai253" />
            </svg>
            <span class="coursedetail_deadline--text">{{ item.deadline }}天后到期</span>
          </div>
          <div class="coursedetail_unfinished--container">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#old-icon-shanxingtu" />
            </svg>
            <span class="coursedetail_unfinished--courses">剩余<font class="coursedetail_unfinished--font">{{ item.unfinishedcourses }}</font>课时</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="footer_content--text">已经到达底部了噢~</div>
  </div>
</template>

<script>
import Progress from '@/components/SVG/Progress'
import Vue from 'vue'
import {
  Cell,
  CellGroup,
  Col,
  Row,
  Icon,
  Button
} from 'vant'
Vue.use(Cell)
  .use(CellGroup)
  .use(Col)
  .use(Row)
  .use(Icon)
  .use(Button)
export default {
  name: 'Learning',
  components: {
    Progress
  },
  data: () => {
    return {
      data: [{
        id: 1,
        coursename: '拉丁舞基础',
        percentage: 50,
        teachername: '王老师',
        deadline: 5,
        unfinishedcourses: 3
      },
      {
        id: 2,
        coursename: '陶瓷技艺进阶',
        percentage: 60,
        teachername: '王老师',
        deadline: 10,
        unfinishedcourses: 4
      },
      {
        id: 3,
        coursename: '小篆的起源',
        percentage: 70,
        teachername: '林老师',
        deadline: 9,
        unfinishedcourses: 1
      },
      {
        id: 4,
        coursename: '笔画基础教学',
        percentage: 100,
        teachername: '王老师',
        deadline: 30,
        unfinishedcourses: 30
      }
      ],
      viewWidth: 0, // 当前视窗内应用宽度
      progressWidth: 0 // 进度条总宽度
    }
  },
  created() {
    this.fixWidth()
  },
  mounted() {
    window.addEventListener('resize', this.fixWidth)
    // 组件销毁时也销毁该监听事件
    this.$on('hook:beforeDestroy', () => { window.removeEventListener('resize', this.fixWidth) })
  },
  methods: {
    // 动态计算每个课程进度的宽度显示
    dynamicWidth(containerWidth, percent) {
      return Math.floor(containerWidth * percent / 100)
    },
    // 适配PC用户的屏幕宽
    fixWidth() {
      this.viewWidth = document.getElementById('app').offsetWidth
      switch (this.viewWidth) {
      // PC端
        case 600:
          this.progressWidth = 370
          break
          // 移动端
        default:
          this.progressWidth = 230
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.progress_wrap--container{
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
  padding-left: 20px;
}
.clearfix:after {
    content: "";
    display: block;
    clear: both;
}

.icon {
    width: 18px;
    height: 18px;
}

.learningcourse_container {
    min-height: 100vh;
    padding-top: 11px;
    background-color: rgb(244, 246, 245);
}

.learningcourse {
    &--allitems {
        width: 94.7%;
        margin: 0 auto;
    }
    &--item {
        list-style: none;
        width: 100%;
        height: 120px;
        margin-bottom: 10px;
        background: #ffffff;
        border-radius: 4px;
        overflow: hidden;
    }
}

.course {
    &--title {
        display: block;
        line-height: 22px;
        margin-left: 20px;
        margin-top: 15px;
        font-family: PingFangSC-Regular;
        font-size: 16px;
        font-weight: bold;
        color: #313131;
    }
}

.learning_course {
    &--container {
        width: 100%;
        margin-top: 13px;
    }
    &--progressbar {
        display: inline-block;
        width: 64.9%;
        height: 13px;
        margin-left: 19px;
        border-radius: 0;
    }
    &--text {
        float: right;
        height: 17px;
        margin-right: 5.6%;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #989898;
    }
}

.coursedetail {
    &--container {
        width: 100%;
        margin-top: 14px;
        display: flex;
    }
}

.coursedetail_teacher {
    &--container {
        width: 30%;
        margin-left: 20px;
    }
    &--teachername {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        margin-left: 10px;
        vertical-align: top;
        color: #313131;
    }
}

.coursedetail_deadline {
    &--container {
        width: 33%;
    }
    &--icon {
        width: 20px;
        height: 20px;
    }
    &--text {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        line-height: 17px;
        margin-top: 2px;
        margin-left: 4px;
        color: #313131;
        vertical-align: 5px;
    }
}

.coursedetail_unfinished {
    &--container {
        width: 33%;
    }
    &--courses {
        font-family: PingFangSC-Regular;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        margin-left: 10px;
        vertical-align: top;
        color: #313131;
    }
    &--font {
        color: rgb(161, 40, 49);
    }
}

.footer_content--text {
    height: 70px;
    text-align: center;
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #989898;
    margin-top: 7px;
}
</style>
