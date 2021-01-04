/*
 * @Author: 庞泽邦
 * @Date: 2020-06-26 22:09:38
 * @Last Modified by:   庞泽邦
 * @Last Modified time: 2020-06-26 22:09:38
 */

<template>
  <component
    :is="componentType"
    :tag="tag"
    v-bind="$attrs"
    enter-active-class="zoomInY"
    move-class="zoom-move"
    leave-active-class="zoomOutY"
    v-on="hooks"
  >
    <slot />
  </component>
</template>
<script>
import { baseTransition } from '../../mixins/index.js'

export default {
  name: 'ZoomYTransition',
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

  @keyframes zoomInY {
    from {
      opacity: 0;
      transform: scaleY(0);
    }

    50% {
      opacity: 1;
      transform: scaleY(1)
    }
  }

  .zoomInY {
    animation-name: zoomInY;
  }

  @keyframes zoomOutY {
    from {
      opacity: 1;
    }

    50% {
      opacity: 0;
      transform: scaleY(0);
    }

    to {
      opacity: 0;
    }
  }

  .zoomOutY {
    animation-name: zoomOutY;
  }
</style>
