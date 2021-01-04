/*
 * @Author: 庞泽邦
 * @Date: 2020-06-22
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-06-22
 */
//首页二维码组件
<template>
  <div class="QRcode_container">
    <div class="QRcode_img--container">
      <img :src="QRcodeUrl" class="QRcode_img">
    </div>
    <p class="foot_span--font">扫码关注微信公众号</p>
    <p class="foot_span--font">了解更多资讯吧！</p>
  </div>
</template>

<script>
export default {
  name: 'MainQRcode',
  data: () => {
    return {
      QRcodeUrl: require('@/assets/QRCode.png')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/_settings.scss';
.QRcode{
  &_container{
    box-sizing: border-box;
    width: 164px;
    height: 220px;
    position: absolute;
    left: -184px;
    margin-top: 50px;
    background: #fff;
    border-radius: 6px;
    padding: 10px;
  }
  &_img{
    width: 150px ;
    height: 150px;
    &--container{
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.foot_span--font{
  color: $font-color-lighter;
  font-size: 12px;
  text-align: center;
}
</style>
