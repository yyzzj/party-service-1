/*
 * @Author: 庞泽邦
 * @Date: 2020-06-26 21:20:27
 * @Last Modified by:   庞泽邦
 * @Last Modified time: 2020-06-26 21:20:27
 */

import Example from '../components/Example.vue'

export default {
  title: 'Fade',
  parameters: {
    notes: '渐隐动效组件'
  }
}

export const FadeCommon = () => ({
  components: { Example },
  template: '<Example name="fade"></Example>'

})
