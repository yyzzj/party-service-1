<template>
  <div>
    <div id="app">
      <!-- <div v-if="Mobile===false && isIframe===false" id="frame">
      <iframe
        id="inlineFrameExample"
        title="Inline Frame Example"
        src="http://localhost:9090/"
        style="width:100%;height:750px"
        frameborder="no"
        marginwidth="0"
        marginheight="0"
        allowtransparency="yes"
      />
    </div> -->
      <div v-if="showQRcode" class="QRcode_wrap">
        <q-rcode />
      </div>
      <div id="layout">
        <!-- 显示当前路由地址所对应的内容-->
        <transition name="fade" mode="out-in">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import QRcode from '@/components/MainQRcode.vue'
export default {
  components: {
    QRcode
  },
  data() {
    return {
      Mobile: false,
      isIframe: false,
      showQRcode: false,
      nowViewWidth: 0,
      appWidth: 0
    }
  },
  created() {
    this.judge()
  },
  mounted() {
    window.addEventListener('resize', this.changeShowQRcode)
    this.$on('hook:beforeDestroy', () => { window.removeEventListener('resize', this.changeShowQRcode) })
  },
  methods: {
    // 解决ipad上二维码显示不完全的问题
    changeShowQRcode() {
      this.judge()
    },
    judge() {
      // 判断当前应用宽度+2倍二维码宽度是否比视窗宽度要小
      this.appWidth = document.getElementById('app').offsetWidth + 2 * 180
      this.nowViewWidth = document.documentElement.offsetWidth || document.body.offsetWidth
      this.showQRcode = this.nowViewWidth > this.appWidth
    }
  }
}
</script>

<style lang="scss">
@media screen and (min-width:600px){
    #app{
        max-width: 600px;
        margin: 0 auto;
        overflow-x:hidden;
        background: rgb(234,236,235);
    }
}
html,body{
  background: rgb(234,236,235);
    &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba($color: #c8c8c8, $alpha: 1);
    &:hover {
      background-color: rgba($color: #a8a8a8, $alpha: 1);
    }
    &:active {
      background-color: rgba($color: #a8a8a8, $alpha: 1);
    }
  }
}
#layout {
    width: 100%;
    min-height: 100vh;
    overflow-y: hidden;
    overflow-x:hidden;
    background: white;
    & > div {
        width: 100%;
        min-height: 100vh;
    }
}
#frame {
    width: 100%;
    min-height: 100vh;
    overflow-x:hidden;
    overflow-y:hidden;
}
.QRcode_wrap{
  position: absolute;
}
</style>

