/*
 * @Author: 庞泽邦
 * @Date: 2020-06-26 22:09:48
 * @Last Modified by:   庞泽邦
 * @Last Modified time: 2020-06-26 22:09:48
 */

<template>
  <component
    :is="componentType"
    :tag="tag"
    v-bind="$attrs"
    enter-active-class="zoomInUp"
    move-class="zoom-move"
    leave-active-class="zoomOutUp"
    v-on="hooks"
  >
    <slot />
  </component>
</template>
<script>
import { baseTransition } from '../../mixins/index.js'

export default {
  name: 'ZoomUpTransition',
  mixins: [baseTransition],
  props: {
    styles: {
      type: Object,
      default: () => {
        return {
          animationFillMode: 'both',
          animationTimingFunction: 'ease-out'
        }
      }
    }
  }
}
</script>
<style lang="scss">
  @import "move";

  @keyframes zoomInUp {
    from {
      opacity: 0;
      transform: scaleY(0);
      transform-origin: top center;
    }

    50% {
      opacity: 1;
    }

    to {
      transform: scaleY(1);
    }
  }

  .zoomInUp {
    animation-name: zoomInUp;
  }

  @keyframes zoomOutUp {
    from {
      opacity: 1;
    }

    50% {
      transform: scaleY(0);
    }

    to {
      opacity: 0;
    }
  }

  .zoomOutUp {
    animation-name: zoomOutUp;
  }
</style>
