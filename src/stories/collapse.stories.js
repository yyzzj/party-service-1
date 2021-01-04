/*
 * @Author: 庞泽邦
 * @Date: 2020-06-26 21:20:24
 * @Last Modified by:   庞泽邦
 * @Last Modified time: 2020-06-26 21:20:24
 */

import Example from '../components/Example.vue'

export default {
  title: 'Collapse',
  parameters: {
    notes: '折叠动效组件'
  }
}

export const CollapseCommon = () => ({
  components: { Example },
  template: '<Example name="collapse" :delay="5000"></Example>'

})
