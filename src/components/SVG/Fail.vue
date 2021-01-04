/*
 * @Author: 庞泽邦
 * @Date: 2020-06-26 22:09:58
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-10 11:27:56
 */
// svg loding失败动效
<template>
  <div>
    <svg class="errormark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
      <circle class="errormark__circle" cx="26" cy="26" r="25" fill="none" />
      <g style="width: 56px;height: 56px">
        <line class="errormark__check" fill="none" stroke="#fff" x1="12" y1="36" x2="36" y2="12" />
        <line class="errormark__check" fill="none" stroke="#fff" x1="40" y1="36" x2="16" y2="12" />
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Fail'
}
</script>

<style lang="scss" scoped>
.errormark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke: #993333;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.errormark {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  margin: 10% auto;
  box-shadow: inset 0px 0px 0px #993333;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.errormark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 70;
  stroke-dashoffset: 70;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #993333;
  }
}
</style>
