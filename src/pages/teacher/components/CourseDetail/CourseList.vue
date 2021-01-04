/*
 * @Author: 庞泽邦
 * @Date: 2020-08-07 16:54:35
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-08-07 17:17:48
 */

//课程列表组件
<template>
  <div class="courseList">
    <div v-for="(item,index) in courseDetail" :key="index" class="courseListItem">
      <div class="left">
        {{ item.courseId | formatCourseId }}
      </div>
      <div class="middle">
        <div class="middle-top">
          {{ item.courseTitle }}
        </div>
        <div class="middle-bottom">
          <div class="middle-bottom-left">
            <van-icon class="middle-bottom-icon" class-prefix="old-icon" name="ai253" size="18" />
            <span class="middle-bottom-text">{{ item.courseTime }}分钟</span>
          </div>
          <div class="middle-bottom-middle">
            <van-icon class="middle-bottom-icon" class-prefix="old-icon" name="kecheng" size="15" />
            <span v-if="item.viewPercent===100" class="middle-bottom-text" style="color:#A12831">
              已上课
            </span>
            <span v-else class="middle-bottom-text">
              未上课
            </span>
          </div>
          <div class="middle-bottom-right">
            <van-icon class="middle-bottom-icon" class-prefix="old-icon" name="guanzhongshu" size="15" />
            <span class="middle-bottom-text">{{ item.courseViews }}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <van-icon class="play" class-prefix="old-icon" name="bofang" size="30" color="#a12831" />
      </div>
      <div class="adjust" />
    </div>
  </div>
</template>

<script>
import { getCourseList } from '@/api/student/personalCourseDetail'

export default {
  name: 'CourseList',
  components: {
  },
  filters: {
    formatCourseId(value) {
      const id = value
      return (id < 10 ? '0' + id : id) + '.'
    }
  },
  data() {
    return {
      courseDetail: []
    }
  },
  created() {
    this.getCourseList()
  },
  mounted() {
  },
  methods: {
    async getCourseList() {
      try {
        const res = await getCourseList()
        this.courseDetail = res.data.array
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/scss/_settings.scss';

  $height: 80px;
  $padding: 15px;
  $margin-top: 1px;

  .courseListItem {
    background-color: $white;
    width: 100%;
    height: $height;
    margin-top: $margin-top;
    padding: $padding;
    box-sizing: border-box;

    font: {
      family: PingFangSC-Regular;
      size: 14px;
    }

    display: flex;

    .left {
      width: 40px;
      color: $grey;
    }

    .middle {
      flex: 1;

      &-top {
        color: $font-color;
        margin-bottom: 10px;
      }

      &-bottom {
        display: flex;
        width: 100%;

        &-left {
          flex: 1;
        }

        &-middle {
          flex: 1;
        }

        &-right {
          flex: 1;
        }

        &-text {
          margin-left: 5px;
          font-size: 10px;
          color: $grey;
        }

        &-icon {
          vertical-align: middle;
        }
      }
    }

    .right {
      width: 40px;
      //居中：根据高度和内间距来计算div高度
      line-height: $height - $padding*2;

      .play {
        cursor: pointer;
      }
    }

    //调整播放图标的右间距专用,无其他用途
    .adjust {
      width: 10px;
    }
  }
</style>
