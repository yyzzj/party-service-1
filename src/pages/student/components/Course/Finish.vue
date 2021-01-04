 /*
 * @Author: 高燕生
 * @Date: 2020-05-06 12:12:16
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-12-01 16:01:43
 */
 //课堂页面--已结束学习课程列表组件
<template>
  <div class="completedcourse_container">
    <ul class="completedcourse--allitems">
      <li v-for="item in data" :key="item.id" class="completedcourse--item">
        <span class="course--title">{{ item.coursename }}</span>
        <div class="progress_wrap--container">
          <div :style="{width:progressWidth+'px'}">
            <Progress :full-width="progressWidth" :width="dynamicWidth(progressWidth,item.percentage)" status-type="fail" />
          </div>
          <span class="finished_course--text">{{ `已学习${item.percentage}%` }}</span>
        </div>
        <div class="coursedetail--container clearfix">
          <div class="coursedetail_teacher--container">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#old-icon-icon-test" />
            </svg>
            <span class="coursedetail_teacher--teachername">{{ item.teacher }}</span>
          </div>
          <div class="coursedetail_unfinished--container">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#old-icon-shanxingtu" />
            </svg>
            <span class="coursedetail_unfinished--courses">{{ `未完成${item.unfinishedcourses}课时` }}</span>
          </div>
          <div class="coursedetail_button--container clearfix">
            <van-button v-if="item.renew" color="#68627E" size="normal">可续费</van-button>
            <van-button v-else color="#989898" size="normal" disabled>已结束</van-button>
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
  name: 'Finish',
  components: {
    Progress
  },
  data: () => {
    return {
      data: [{
        id: 1,
        coursename: '精品书法课进阶入门',
        percentage: 50,
        teacher: '王老师',
        unfinishedcourses: 3,
        renew: false
      },
      {
        id: 2,
        coursename: '舞蹈基础',
        percentage: 70,
        teacher: '张老师',
        unfinishedcourses: 4,
        renew: false
      },
      {
        id: 3,
        coursename: '篆刻写法',
        percentage: 100,
        teacher: '高老师',
        unfinishedcourses: 2,
        renew: false
      }
      ],
      viewWidth: 0,
      progressWidth: 0
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

    .van-button {
        margin-top: -3px;
        border-radius: 4px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #ffffff;
        height: 24px;
        line-height: 17px;
        border: none;
        width: 70px;
    }

    .completedcourse_container {
        min-height: 100vh;
        padding-top: 11px;
        background-color: rgb(244, 246, 245);
    }

    .completedcourse {
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

    .finished_course {
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
            margin-top: 20px;
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
            color: #989898;
        }
    }

    .coursedetail_unfinished {
        &--container {
            width: 34%;
        }
        &--courses {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            height: 18px;
            line-height: 18px;
            margin-left: 10px;
            vertical-align: top;
            color: #989898;
        }
    }

    .coursedetail_button {
        &--container {
            width: 30%;
            height: 24px;
            text-align: right;
            margin-right: 5.6%;
        }
    }

    .footer_content--text {
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        height: 70px;
        color: #989898;
        margin-top: 7px;
    }
</style>
