/*
 * @Author: 吴晓斌
 * @Date: 2020-05-07
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-05-09 15:09:36
 */

//活动流程组件
<template>
  <div class="activityProcess_container">
    <van-steps direction="vertical" :active="1" active-color="red">
      <van-step>
        <h3>奏唱国歌</h3>
        <p>2020-12-08 08:00</p>
      </van-step>
      <van-step>
        <h3>观看会议视频</h3>
        <p>2020-12-08 08:05</p>
      </van-step>
      <van-step>
        <h3>学习讨论</h3>
        <p>2020-12-08 09:40</p>
      </van-step>
      <van-step>
        <h3>分享学习心得</h3>
        <p>2020-12-08 10:30</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
export default {
  name: 'ActivityProcess',
  props: {}
}
</script>

<style lang="scss" scoped></style>
