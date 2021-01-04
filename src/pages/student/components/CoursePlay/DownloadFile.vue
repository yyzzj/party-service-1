/*
 * @Author: 庞泽邦
 * @Date: 2020-05-20 10:35:42
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-05-22 14:04:30
 */
//课程播放页面课件下载组件
<template>
  <div class="file_wrap--container">
    <van-cell v-for="(item,index) in array" :key="index" class="cell_padding">
      <template #title>
        <div class="file_name">课程信息</div>
      </template>
      <template #icon>
        <span class="file_num">{{ index+1 | FixZero }}</span>
      </template>
      <template #default>
        <van-icon class-prefix="old-icon" name="xiazai" size="20px" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell, Icon } from 'vant'

Vue.use(Cell)
  .use(Icon)
export default {
  name: 'DownloadFile',
  filters: {
    FixZero(val) {
      if (val < 10) {
        return '0' + val + '.'
      } else return val + '.'
    }
  },
  data: () => {
    return {
      array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.file{
    &_wrap--container{
        background: $bg;
    }
    &_name{
        font-size: 14px;
        color: $font-color;
        margin-left: 11px;
    }
    &_num{
        font-size: 14px;
        color: $font-color-lighter;
    }
}
.cell_padding{
    padding:15px 15px 15px 15px;
}
</style>
