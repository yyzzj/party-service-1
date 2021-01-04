/*
 * @Author: 庞泽邦
 * @Date: 2020-09-09 17:39:44
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-13 16:24:09
 */
// 进度条函数式组件

<script>
export default {
  name: 'Progress',
  functional: true,
  props: {
    // 进度条容器宽度（即灰色条）
    fullWidth: {
      type: Number,
      default: 0
    },
    // 进度条宽度（即蓝色条）
    width: {
      type: Number,
      default: 0
    },
    // 进度条类型
    statusType: {
      type: String,
      default: 'success'
    }
  },
  render: (h, context) => {
    const styleString = 'stroke-dasharray:' + context.props.width + ';stroke-dashoffset:' + context.props.width
    const isSuccess = context.props.statusType === 'success' ? 'progress_line--success' : 'progress_line--fail'
    return (
      <div>
        <svg version='1.1' xmlns='http://www.w3.org/2000/svg' width={context.props.fullWidth} height='15'>
          <line x1='0' y1='0' x2={context.props.fullWidth} y2='0' class='progress_line--wrap'></line>
          <line
            x1='0'
            y1='0'
            x2={context.props.width}
            y2='0'
            style={styleString}
            class={isSuccess}>
          </line>
        </svg>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes scale {
  0%, 100% {
    transform: none;
  }
  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}
@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #7ac142;
  }
}
.progress_wrap--container{
    background: #ebedf0;
    height: 15px;
}
.progress_line{
  &--wrap{
    stroke-width: 30;
    stroke: #ebedf0;
  }
  &--success{
  stroke-width: 30;
  stroke: rgb(125, 171, 207);
  animation: stroke 1s ease-in-out forwards;
  }
  &--fail{
    stroke-width: 30;
    stroke: rgb(109, 114, 120);
    animation: stroke 1s ease-in-out forwards;
  }
}

</style>
