/*
 * @Author: 庞泽邦
 * @Date: 2020-08-28 14:31:12
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-07 12:39:18
 */

// 标签组件 --- 函数式实现方便需求样式更改
<script>
import { Toast } from 'vant'
export default {
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },

  data() {
    return {
      newTag: ''
    }
  },

  methods: {
    addTag() {
      if (this.newTag.trim().length === 0 || this.value.includes(this.newTag.trim())) {
        Toast.fail({ getContainer: '#app', message: '请仔细检查标签内容是否重复或为空' })
        return
      }
      this.$emit('input', [...this.value, this.newTag.trim()])
      this.newTag = ''
    },
    removeTag(tag) {
      this.$emit('input', this.value.filter(t => t !== tag))
    }
  },

  render() {
    return this.$scopedSlots.default({
      tags: this.value,
      addTag: this.addTag,
      removeTag: this.removeTag,
      inputEvents: {
        input: e => {
          this.newTag = e.target.value
        },
        keydown: e => {
          if (e.keyCode === 13) {
            console.log('11111')
            e.preventDefault()
            this.addTag()
          }
        }
      },
      inputAttrs: {
        value: this.newTag
      }
    })
  }
}
</script>
