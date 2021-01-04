<template>
  <div class="hw-command">
    <div class="hw-command-box">
      <div class="hw-command-box--textbox">
        <p>{{ data.text }}</p>
      </div>
      <div class="hw-command-box--imgbox">
        <img :src="data.imgUrl">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HwCommand',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .hw-command {
    background: $white;
    &-box {
      width: 85%;
      display: flex;
      flex-direction: column;
      margin:0 auto;
      &--textbox {
        font-size: 14px;
        color: #676767;
        p {
          line-height: 20px;
          margin-top:18px;
          margin-bottom:0;
        }
      }
      &--imgbox {
        width: 125px;
        height: 88px;
        margin-top: 19px;
        margin-bottom: 27px;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
