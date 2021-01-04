/*
 * @Author: 庞泽邦
 * @Date: 2020-09-16 19:35:36
 * @Last Modified by: 杨志杰
 * @Last Modified time: 2020-12-28 13:35:30
 */

/**
 * @desc 复制到剪贴板方法
 * @param {string} input
 * @param {*} param1
 */
const copyTextToClipboard = (input, { target = document.body } = {}) => {
  const element = document.createElement('textarea')
  const previouslyFocusedElement = document.activeElement

  element.value = input

  // 阻止键盘显示在手机上
  element.setAttribute('readonly', '')

  element.style.contain = 'strict'
  element.style.position = 'absolute'
  element.style.left = '-9999px'
  element.style.fontSize = '12pt' // Prevent zooming on iOS

  const selection = document.getSelection()
  let originalRange = false
  if (selection.rangeCount > 0) {
    originalRange = selection.getRangeAt(0)
  }

  target.append(element)
  element.select()

  // 显示解决IOS选择版起点
  element.selectionStart = 0
  element.selectionEnd = input.length

  let isSuccess = false
  try {
    // 核心代码
    const flg = document.queryCommandEnabled('copy')
    isSuccess = flg && document.execCommand ? document.execCommand('copy') : useClipboardApiCopyTextToClipboard(element.value)
    // eslint-disable-next-line no-empty
  } catch (_) {
  }

  element.remove()

  if (originalRange) {
    selection.removeAllRanges()
    selection.addRange(originalRange)
  }

  // 如果当前有dom元素获得焦点就获取
  if (previouslyFocusedElement) {
    previouslyFocusedElement.focus()
  }

  return isSuccess
}

/**
 * @desc 使用ClipboardApi复制到剪贴板方法
 * @param {string} value 要复制的内容
 */
const useClipboardApiCopyTextToClipboard = async(value) => {
  return await navigator.clipboard.writeText(value)
}

const copy = {
  bind(el, { value, arg }) {
    // 如果arg为callback代表成功复制到剪切板后需要回调函数, 例子： v-copy:callback="yourfunction"
    if (arg === 'callback') {
      el.$copyCallback = value
    } else {
      // 如果没有则代表直接复制Value字符串
      el.$copyValue = value
      const handler = () => {
        copyTextToClipboard(el.$copyValue)
        if (el.$copyCallback) {
          el.$copyCallback(el.$copyValue)
        }
      }
      el.addEventListener('click', handler)
      el.$destroyCopy = () => el.removeEventListener('click', handler)
    }
  },

  unbind(el) {
    el.$destroyCopy()
  },

  componentUpdated(el, { value, arg }) {
    if (arg === 'callback') {
      el.$copyCallback = value
    } else {
      el.$copyValue = value
    }
  }
}

export default copy
