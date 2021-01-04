<template>
  <div class="StuedentList_wrap--container">
    <van-cell-group>
      <van-cell v-for="(student,i) in students" :key="i">
        <template #title>
          <div style="display:flex">
            <div>
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#old-icon-icon-test" />
              </svg>
            </div>
            <span class="cell_item--text">{{ student.name }}</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="footer_text">没有更多内容了~</div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Cell, CellGroup } from 'vant'

Vue.use(Cell)
  .use(CellGroup)
export default {
  name: 'StudentList',
  props: {
    students: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data: () => {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.StuedentList_wrap--container{
    background: #ffffff;
}
.icon{
    width: 30px;
    height: 30px;
}
.cell_item--text{
    display:inline-block;
    margin-left:16px;
    line-height:35px;
    font-size: 14px;
    color: #313131;
}
.footer_text{
    text-align: center;
    font-size: 12px;
    color: #989898;
    height: 40px;
    line-height: 40px;
}
</style>
