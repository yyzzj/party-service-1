/*
 * @Author: 庞泽邦
 * @Date: 2020-06-26 22:09:43
 * @Last Modified by:   庞泽邦
 * @Last Modified time: 2020-06-26 22:09:43
 */

<template>
  <component
    :is="componentType"
    :tag="tag"
    v-bind="$attrs"
    enter-active-class="zoomInX"
    move-class="zoom-move"
    leave-active-class="zoomOutX"
    v-on="hooks"
  >
    <slot />
  </component>
</template>
<script>
import { baseTransition } from '../../mixins/index.js'

export default {
  name: 'ZoomXTransition',
  mixins: [baseTransition],
  props: {
    styles: {
      type: Object,
      default: () => {
        return {
          animationFillMode: 'both',
          animationTimingFunction: 'cubic-bezier(.55,0,.1,1)'
        }
      }
    }
  }
}
</script>
<style lang="scss">
  @import "move";

  @keyframes zoomInX {
    from {
      opacity: 0;
      transform: scaleX(0);
    }

    50% {
      opacity: 1;
    }
  }

  .zoomInX {
    animation-name: zoomInX;
  }

  @keyframes zoomOutX {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      transform: scaleX(0);
    }

    to {
      opacity: 0;
    }
  }

  .zoomOutX {
    animation-name: zoomOutX;
  }
</style>
