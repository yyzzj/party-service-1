import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken} from '@/utils/auth'
import {Toast} from 'vant'

Vue.use(VueRouter)

const routes = [{
  // 需要底部栏的页面在根路由的children下注册
  path: '/',
  name: 'index',
  redirect: '/home',
  component: () =>
    import ('../views/PublicView/Student.vue'),
  children: [{
    path: '/home',
    name: 'home',
    component: () => import ('../views/Home/Home.vue')
  }, {
    path: '/select',
    name: 'select',
    component: () => import ('../views/Select/Select.vue')
  }, {
    path: '/activity',
    name: 'activity',
    component: () => import ('../views/Activity/Activity.vue')
  }, {
    path: '/user',
    name: 'user',
    component: () => import ('../views/User/User.vue')
  }]
}, {
  // 登录页
  path: '/login',
  name: 'login',
  component: () => import ('../views/PublicView/Login.vue')
}, {
  // 注册页
  path: '/register',
  name: 'register',
  component: () => import ('../views/PublicView/Register.vue')
}, {
  // 课程详情页（未登录)
  path: '/courseDetail',
  name: 'courseDetail',
  component: () => import ('../views/Course/CourseDetail.vue')
}, {
  // 活动详情页
  path: '/activityDetail',
  name: 'activityDetail',
  component: () => import ('../views/Activity/ActivityDetail.vue')
}, {
  // 课堂进度页面
  path: '/course',
  name: 'course',
  component: () => import ('../views/Course/Course.vue')
}, {
  // 课堂作业页
  path: '/classWork',
  name: 'classWork',
  component: () => import ('../views/Homework/ClassWork.vue')
}, {
  // 作业详情页
  path: '/courseHomework',
  name: 'courseHomework',
  component: () => import ('../views/Homework/CourseHomework.vue')
}, {
  // 课程详情页（已登录）
  path: '/personalCourseDetail',
  name: 'personalCourseDetail',
  component: () => import ('../views/Course/PersonalCourseDetail.vue')
}, {
  // 课程消息页
  path: '/courseMessage',
  name: 'courseMessage',
  component: () => import ('../views/Message/CourseMessage.vue')
}, {
  // 课程详细消息页
  path: '/courseMessageDetail',
  name: 'courseMessageDetail',
  component: () => import ('../views/Message/CourseMessageDetail.vue'),
  beforeEnter: (to, from, next) => {
    const csp = ['/courseMessage']
    if (csp.includes(from.path)) {
      next()
    } else {
      if (to.path === '/courseMessageDetail') {
        next()
      } else {
        Toast.fail('似乎发现了不正确的入口方式噢')
        next(from.path)
      }
    }
  }
}, {
  // 课程播放页面
  path: '/coursePlay',
  name: 'coursePlay',
  component: () => import ('../views/Course/CoursePlay.vue')
}, {
  // 我的考勤页面
  path: '/personalAttendance',
  name: 'personalAttendance',
  component: () => import ('../views/Attendance/PersonalAttendance.vue')
}, {
  // 我的订单页面
  path: '/myOrder',
  name: 'myOrder',
  component: () => import ('../views/Order/MyOrder.vue')
}, {
  // 今日任务页面
  path: '/dailyTask',
  name: 'dailyTask',
  component: () => import ('../views/Mission/DailyTask.vue')
}, {
  // 我的活动页面
  path: '/myActivity',
  name: 'myActivity',
  component: () => import ('../views/MyActivity/MyActivity.vue')
}, {
  // 在线问诊页面
  path: '/askHealthy',
  name: 'askHealthy',
  component: () => import ('../views/AskHealthy/AskHealthy.vue')
}, {
  // 个人设置页面
  path: '/settingCenter',
  name: 'settingCenter',
  component: () => import ('../views/Setting/SettingCenter.vue')
}, {
  // 个人详细信息页面
  path: '/personDetail',
  name: 'personDetail',
  component: () => import ('../views/Setting/PersonDeatil.vue')
}, {
  // 反馈页面
  path: '/feedback',
  name: 'feedback',
  component: () => import ('../views/Setting/Feedback.vue')
}, {
  // 我的收藏页面
  path: '/myCollection',
  name: 'myCollection',
  component: () => import ('../views/HealthyAsk/MyCollection.vue')
}, {
  // 养生问答页面
  path: '/healthyAsk',
  name: 'healthyAsk',
  component: () => import ('../views/HealthyAsk/Index.vue')
}, {
  // 忘记密码页面
  path: '/forget',
  name: 'forget',
  component: () => import ('../views/PublicView/Forget.vue')
}, {
  // 养生模块兴趣标签页
  path: '/interestTag',
  name: 'interestTag',
  component: () => import ('../views/HealthyAsk/InterestTag.vue')
}, {
  // 养生模块我的咨询页
  path: '/consult',
  name: 'consult',
  component: () => import ('../views/HealthyAsk/Consult.vue')
}, {
  // 养生模块我的咨询详情页
  path: '/consultDetail',
  name: 'consultDetail',
  component: () => import ('../views/HealthyAsk/ConsultDetail.vue'),
  beforeEnter: (to, from, next) => {
    const csp = ['/healthyAsk', '/consult']
    if (csp.includes(from.path)) {
      next()
    } else {
      if (to.path === '/consultDetail') {
        next()
      } else {
        Toast.fail('似乎发现了不正确的入口方式噢')
        next(from.path)
      }
    }
  }
}, {
  // 养生模块文章详情页面
  path: '/article',
  name: 'article',
  component: () => import ('../views/HealthyAsk/Article.vue')
}, {
  // 搜索结果页面
  path: '/searchResult',
  name: 'searchResult',
  component: () => import ('../views/Search/SearchResult.vue')
}, {
  // 首页搜索页面
  path: '/homesearch',
  name: 'homesearch',
  component: () => import ('../views/Search/HomeSearch.vue')
}, {
  // 404错误页面
  // 所有业务路由必须放置在该路由之上
  path: '*',
  name: 'notFound',
  component: () => import ('../views/PublicView/404.vue')
}]
const base = `${process.env.BASE_URL}` + 'student'
const createRouter = () => new VueRouter({
  mode: 'history',
  base: base,
  routes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
  // 前往登录页自己就放行
  const routerCsp = ['/old/', '/login', '/register', '/forget', '/home', '/select', '/activity', '/courseDetail', '/activityDetail', '/homesearch', '/searchResult']
  if (routerCsp.includes(to.path)) {
    // 路由白名单直接放行
    next()
  } else {
    // 没登录
    if (!getToken('student')) {
      next({
        path: '/login',
        query: {
          from: to.path
        }
      })
    } else {
      // 已登录放行
      next()
    }
  }
})

export function resetRouter() {
  const newRouter = createRouter()
  // 内部通过matcher触发路由替换
  router.matcher = newRouter.matcher
}

export default router
