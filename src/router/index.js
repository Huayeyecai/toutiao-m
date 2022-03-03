import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout/index'),
    children: [
      {
        path: '', // 默认子路由，只有一个
        name: 'home',
        component: () => import('@/views/home/index')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/index')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/index')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/index')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true // 开启props传参
  },
  {
    name: 'user-profile',
    path: '/user/profile',
    component: () => import('@/views/user-profile')
  }
]

const router = new VueRouter({
  routes
})

export default router
