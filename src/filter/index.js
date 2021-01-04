/*
 * @Author: 庞泽邦
 * @Date: 2020-09-28 13:13:52
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-10-10 10:55:34
 */
// 全局过滤器，以key-val形式
const filter = {
  /**
   * 格式化课程价格
   */
  formatPrice: (val) => {
    if (val === 0) {
      return '免费'
    } else {
      return '￥' + val
    }
  }
}

export default filter
