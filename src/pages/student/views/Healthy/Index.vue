<template>
  <div class="container">
    <div class="healthy_header--container" @click="$router.push('/healthyAsk')">
      <div class="icon_tran">
        <van-icon class-prefix="old-icon" name="shouzhixuanzhong" color="#f6f6f6" size="25" />
        <span>点击查看</span>
      </div>
    </div>
    <div class="healthy_dite--container">
      <div class="healthy_dite--title">社区活动</div>
    </div>
    <div>
      <recipe-item />
    </div>
    <div style="margin-bottom:50px;" />
  </div>
</template>

<script>
import Vue from 'vue'
import RecipeItem from '../../components/Healthy/RecipeItem.vue'
import { Icon } from 'vant'

Vue.use(Icon)
export default {
  name: 'Healthy',
  components: {
    RecipeItem
  },
  data() {
    return {
    }
  },
  mounted() {}
}
</script>

<style lang='scss' scoped>
@keyframes icon_scale{
0% {
    transform: scale(.9);
}
2% {
    transform: scale(1)
}
4% {
    transform: scale(1.1)
}
6% {
    transform: scale(1)
}
8% {
    transform: scale(.9)
}
10% {
    transform: scale(1)
}
12% {
    transform: scale(1.1)
}
14% {
    transform: scale(1)
}
16% {
    transform: scale(.9)
}
18% {
    transform: scale(1)
}
20% {
    transform: scale(1.1)
}
22% {
    transform: scale(1)
}
24% {
    transform: scale(.9)
}
26% {
    transform: scale(1)
}
28% {
    transform: scale(1.1)
}
30% {
    transform: scale(1)
}
32% {
    transform: scale(.9)
}
34% {
    transform: scale(1)
}
36% {
    transform: scale(1.1)
}
38% {
    transform: scale(1)
}
40% {
    transform: scale(.9)
}
42% {
    transform: scale(1)
}
44% {
    transform: scale(1.1)
}
46% {
    transform: scale(1)
}
48% {
    transform: scale(.9)
}
50% {
    transform: scale(1)
}
52% {
    transform: scale(1.1)
}
54% {
    transform: scale(1)
}
56% {
    transform: scale(.9)
}
58% {
    transform: scale(1)
}
60% {
    transform: scale(1.1)
}
62% {
    transform: scale(1)
}
64% {
    transform: scale(.9)
}
66% {
    transform: scale(1)
}
68% {
    transform: scale(1.1)
}
70% {
    transform: scale(1)
}
72% {
    transform: scale(.9)
}
74% {
    transform: scale(1)
}
76% {
    transform: scale(1.1)
}
78% {
    transform: scale(1)
}
80% {
    transform: scale(.9)
}
82% {
    transform: scale(1)
}
84% {
    transform: scale(1.1)
}
86% {
    transform: scale(1)
}
88% {
    transform: scale(.9)
}
90% {
    transform: scale(1)
}
92% {
    transform: scale(1.1)
}
94% {
    transform: scale(1)
}
96% {
    transform: scale(.9)
}

}
.healthy_header--container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  margin: 20px 10px;
  border-radius: 10px;
  user-select: none;
  background-image: url('http://www.qstheory.cn/titlepic/112656/1126561345_1601430194526_title0h.jpg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #f6f6f6;
  font-size: 20px;
  cursor: pointer;
}
.icon_tran{
  animation: icon_scale 12s linear infinite ;
}
.healthy_dite{
    &--container{
        margin-bottom: 10px;
    }
    &--title{
        margin-left: 15px;
        font-size: 22px;
        font-family: "Microsoft JhengHei";
        font-weight: 550;
    }
}
</style>
