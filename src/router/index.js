import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LoginView from '@/views/LoginView.vue'
import MyPageView from '@/views/dashboard/MyPageView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard/mypage',
    name: 'MyPage',
    component: MyPageView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
