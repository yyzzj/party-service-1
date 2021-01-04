/*
 * @Author: 庞泽邦
 * @Date: 2020-06-26 22:10:15
 * @Last Modified by:   庞泽邦
 * @Last Modified time: 2020-06-26 22:10:15
 */

<template>
  <component
    :is="componentType"
    :tag="tag"
    v-bind="$attrs"
    enter-active-class="fadeIn"
    move-class="fade-move"
    leave-active-class="fadeOut"
    v-on="hooks"
  >
    <slot />
  </component>
</template>
<script>
import { baseTransition } from '../../mixins/index.js'

export default {
  name: 'FadeTransition',
  mixins: [baseTransition]
}
</script>
<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .fadeIn {
    animation-name: fadeIn;
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .fadeOut {
    animation-name: fadeOut;
  }

  .fade-move {
    transition: transform .3s ease-out;
  }
</style>
