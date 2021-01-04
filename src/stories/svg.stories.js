/*
 * @Author: 庞泽邦
 * @Date: 2020-06-26 21:20:33
 * @Last Modified by:   庞泽邦
 * @Last Modified time: 2020-06-26 21:20:33
 */

import SvgExample from '../components/SvgExample.vue'

export default {
  title: 'Svg'
}

export const SuccessSvg = () => ({
  components: { SvgExample },
  template: '<SvgExample name="svg-sucess"></SvgExample>',
  parameters: {
    notes: 'Svg成功动效'
  }
})

export const FailSvg = () => ({
  components: { SvgExample },
  template: '<SvgExample name="svg-fail"></SvgExample>',
  parameters: {
    notes: 'Svg失败动效'
  }
})

export const LoadSvg = () => ({
  components: { SvgExample },
  template: '<SvgExample name="svg-load"></SvgExample>',
  parameters: {
    notes: 'Svg加载动效'
  }
})

