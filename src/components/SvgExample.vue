/*
 * @Author: 庞泽邦
 * @Date: 2020-06-26 22:09:28
 * @Last Modified by:   庞泽邦
 * @Last Modified time: 2020-06-26 22:09:28
 */

<template>
  <div>
    <component :is="name" v-show="show" />
    <button class="btn trigger" @click.stop="trigger">trigger</button>
  </div>
</template>

<script>
import SvgSucess from '@/components/SVG/Sucess.vue'
import SvgFail from '@/components/SVG/Fail.vue'
import SvgLoad from '@/components/SVG/Load.vue'

export default {
  name: 'Example',
  components: {
    SvgSucess,
    SvgFail,
    SvgLoad
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data: () => {
    return {
      show: true
    }
  },
  methods: {
    trigger() {
      this.show = !this.show
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@/scss/_settings.scss";
  .trigger{
  position: absolute;
  top:300px;
  left: 45%;
}

</style>
