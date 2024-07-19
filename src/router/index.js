import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import SignUpView from '@/views/SignUpView.vue'
import LoginView from '@/views/LoginView.vue'
import CoursesView from '@/views/CoursesView.vue'
import CourseView from '@/views/CourseView.vue'
import MyPageView from '@/views/dashboard/MyPageView.vue'
import CreateCourseView from '@/views/dashboard/CreateCourseView.vue'
import AutherView from '@/views/AuthorView.vue'

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
    path: '/courses',
    name: 'Courses',
    component: CoursesView
  },
  {
    path: '/courses/:slug',
    name: 'Course',
    component: CourseView
  },
  {
    path: '/dashboard/mypage',
    name: 'MyPage',
    component: MyPageView
  },
  {
    path: '/dashboard/create-course',
    name: 'CreateCourse',
    component: CreateCourseView
  },
  {
    path: '/authors/:id',
    name: 'Author',
    component: AutherView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
