import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 登入路由
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      { path: '', name: 'home', component: () => import('@/views/home') }, // 默认子路由
      { path: '/qq', name: 'qq', component: () => import('@/views/qq') },
      { path: '/video', name: 'video', component: () => import('@/views/video') },
      { path: '/my', name: 'my', component: () => import('@/views/my') }
    ]
  },
  { path: '/search', name: 'search', component: () => import('@/views/search/index') },
  // 开启props参数 就是把路由参数映射到props中
  { path: '/articles/:articleId', name: 'articles', component: () => import('@/views/article/index'), props: true }
]

const router = new VueRouter({
  routes
})

export default router
