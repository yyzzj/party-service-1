/*
 * @Author: 庞泽邦
 * @Date: 2020-09-13 14:12:06
 * @Last Modified by: 庞泽邦
 * @Last Modified time: 2020-09-13 15:31:38
 */
// 下拉刷新等待loading动画组件

<script>
export default {
  name: 'RefreshLoading',
  functional: true,
  render(h) {
    return (
      <div class='balls_wrap--container'>
        <div class='balls'>
          <div />
          <div />
          <div />
        </div>
      </div>
    )
  }

}
</script>

<style lang="scss" scoped>
@import '~@/scss/_settings.scss';
.balls_wrap--container{
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
}
.balls {
  width: 3.5em;
  height: 35px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
}

.balls div {
  width: 0.8em;
  height: 0.8em;
  border-radius: 50%;
  background-color: $main-color;
  transform: translateY(-100%);
  animation: wave 0.8s ease-in-out alternate infinite;
}

.balls div:nth-of-type(1) {
  animation-delay: -0.4s;
}

.balls div:nth-of-type(2) {
  animation-delay: -0.2s;
}

@keyframes wave {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
