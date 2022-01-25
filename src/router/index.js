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
  }
]

const router = new VueRouter({
  routes
})

export default router
