import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/auth'

Vue.use(VueRouter)

const routes = [
  {
    // 需要底部栏的页面在根路由的children下注册
    path: '/',
    name: 'index',
    redirect: '/course',
    component: () => import('../views/PublicView/Teacher.vue'),
    children: [{
      path: '/course',
      name: 'course',
      component: () => import('../views/Course/Index.vue')
    }, {
      path: '/courseManage',
      name: 'courseManage',
      component: () => import('../views/CourseManage/Index.vue')
    }, {
      path: '/message',
      name: 'message',
      component: () => import('../views/Message/Index.vue')
    }, {
      path: '/user',
      name: 'user',
      component: () => import('../views/User/Index.vue')
    }]
  }, {
    // 登录页
    path: '/login',
    name: 'login',
    component: () => import('../views/PublicView/Login.vue')
  }, {
    // 注册页
    path: '/register',
    name: 'register',
    component: () => import('../views/PublicView/Register.vue')
  }, {
    // 忘记密码页
    path: '/forget',
    name: 'forget',
    component: () => import('../views/PublicView/Forget.vue')
  }, {
    // 新增课程页
    path: '/addCourse',
    name: 'addCourse',
    component: () => import('../views/CourseManage/AddCourse.vue')
  }, {
    // 课程播放页
    path: '/coursePlay',
    name: 'coursePlay',
    component: () => import('../views/Course/CoursePlay.vue')
  }, {
    // 课堂详情页
    path: '/courseDetail',
    name: 'courseDetail',
    component: () => import('../views/Course/CourseDetail.vue')
  }, {
    path: '/homeworkCorrecting',
    name: 'homeworkCorrecting',
    component: () => import('../views/HomeworkCorrecting/Index.vue')
  }, {
    path: '/hwDetail',
    name: 'hwDetail',
    component: () => import('../views/HomeworkCorrecting/HwDetail.vue')
  }, {
    path: '/personalHwDetail',
    name: 'personalHwDetail',
    component: () => import('../views/HomeworkCorrecting/PersonalHwDetail.vue')
  }, {
    // 课堂作业——发布作业
    path: '/publish',
    name: 'publish',
    component: () => import ('../views/HomeworkCorrecting/Publish.vue')
  }, {
    // 消息详情页
    path: '/messageDetail',
    name: 'messageDetail',
    component: () => import('../views/Message/MessageDetail')
  }, {
    // 我的订单页面
    path: '/myOrder',
    name: 'myOrder',
    component: () => import ('../views/Order/MyOrder.vue')
  }, {
    // 订单详情页面
    path: '/orderDetail',
    name: 'orderDetail',
    component: () => import ('../views/Order/OrderDetail.vue')
  }, {
    // 养生问答
    path: '/healthyAsk',
    name: 'healthyAsk',
    component: () => import ('../views/HealthyAsk/Index.vue')
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
    // 404错误页面
    // 所有业务路由必须放置在该路由之上
    path: '*',
    name: 'notFound',
    component: () => import('../views/PublicView/404.vue')
  }
]
const base = `${process.env.BASE_URL}` + 'teacher'
const createRouter = () => new VueRouter({
  mode: 'history',
  base: base,
  routes
})

const router = createRouter()

router.beforeEach((to, from, next) => {
  // 前往登录页自己就放行
  const routerCsp = ['/login', '/register', '/forget']
  if (routerCsp.includes(to.path)) {
    next()
  } else {
    // 没登录
    if (!getToken('teacher')) {
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
