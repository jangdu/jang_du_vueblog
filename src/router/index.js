import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/list/:tag',
    name: 'list',
    component: () => import(/* webpackChunkName: "list" */ '../views/BlogPostListView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/write',
    name: 'write',
    component: () => import(/* webpackChunkName: "write" */ '../views/AddPostView.vue')
  },
  {
    path: '/post/:id',
    name: 'post',
    component: () => import(/* webpackChunkName: "post" */ '../views/BlogPostView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 언제나 페이지 제일 위로 이동하기
    return { top: 0 }
  }
})

export default router
