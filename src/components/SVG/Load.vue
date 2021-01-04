/*
 * @Author: 庞泽邦
 * @Date: 2020-06-26 22:10:03
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-10 11:27:51
 */
// svg loding动效
<template>
  <div class="container">
    <svg id="load" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 33 33;270 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite" />
        <circle fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30" stroke-dasharray="187" stroke-dashoffset="610">
          <animateTransform attributeName="transform" type="rotate" values="0 33 33;135 33 33;450 33 33" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite" />
          <animate attributeName="stroke" values="#4285F4;#DE3E35;#F7C223;#1B9A59;#4285F4" begin="0s" dur="5.6s" fill="freeze" repeatCount="indefinite" />
          <animate attributeName="stroke-dashoffset" values="187;46.75;187" begin="0s" dur="1.4s" fill="freeze" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Load'
}
</script>

<style lang="scss" scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
}
</style>
