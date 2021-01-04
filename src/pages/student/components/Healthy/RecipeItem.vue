/*
 * @Author: 吴晓斌
 * @Date: 2020-12-08
 * @Last Modified by: 吴晓斌
 * @Last Modified time: 2020-12-08 11:02:21
 */
//食谱列表
<template>
  <div class="recipeItemContainer">
    <van-cell-group>
      <van-cell title="韭菜碎炒鸡蛋" value="润肠" label="11评论 739人气" size="large" is-link />
      <van-cell title="菠菜炒坚果" value="美容" label="14评论 722人气" size="large" is-link />
      <van-cell title="西红柿鸡蛋片汤" value="防癌" label="4评论 21人气" size="large" is-link />
      <van-cell title="红豆莲子粥" value="强身健体" label="325评论 4144人气" size="large" is-link />
      <van-cell title="莲藕菌菇大骨汤" value="降血脂" label="0评论 7人气" size="large" is-link />
      <van-cell title="川贝雪梨" value="开胃" label="3评论 45人气" size="large" is-link />
      <van-cell title="红油扁豆" value="补血" label="22评论 143人气" size="large" is-link />
      <van-cell title="青芒果炒虾仁" value="清热去火" label="7评论 452人气" size="large" is-link />
      <van-cell title="米面烩" value="健脑益智" label="0评论 1人气" size="large" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue'
import { Icon, Cell, CellGroup } from 'vant'
Vue.use(Icon).use(Cell).use(CellGroup)
export default {

}
</script>

<style lang='scss' scoped>

</style>
