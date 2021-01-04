/*
 * @Author: 庞泽邦
 * @Date: 2020-06-26 22:09:53
 * @Last Modified by:   庞泽邦
 * @Last Modified time: 2020-06-26 22:09:53
 */

<template>
  <component
    :is="componentType"
    :tag="tag"
    v-bind="$attrs"
    enter-active-class="zoomIn"
    move-class="zoom-move"
    leave-active-class="zoomOut"
    v-on="hooks"
  >
    <slot />
  </component>
</template>
<script>
import { baseTransition } from '../../mixins/index.js'

export default {
  name: 'ZoomCenterTransition',
  mixins: [baseTransition]
}
</script>
<style lang="scss">
  @import "move";

  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }

    50% {
      opacity: 1;
    }
  }

  .zoomIn {
    animation-name: zoomIn;
  }

  @keyframes zoomOut {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      transform: scale3d(.3, .3, .3);
    }

    to {
      opacity: 0;
    }
  }

  .zoomOut {
    animation-name: zoomOut;
  }
</style>
