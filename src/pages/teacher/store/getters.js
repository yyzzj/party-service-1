// 使用getters缓存在主仓库store中注入moudle的常用数据
const getters = {
  token: state => state.user.token
}
export default getters
