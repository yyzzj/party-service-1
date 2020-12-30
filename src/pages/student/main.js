import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import defaultSetting from '@/settings.js'
import 'normalize.css/normalize.css' // CSS样式重置

Vue.config.productionTip = false
// 调用公共方法加载配置
defaultSetting(Vue)

// 自动注入全局过滤器
Object.keys(filter).forEach(key => {
  Vue.filter(key, filter[key])
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
