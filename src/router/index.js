import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardLayout from '../views/DashboardLayout.vue'
import DashboardHome from '../views/DashboardHome.vue'
import PostManagement from '../views/PostManagement.vue'
import CategoryManagement from '../views/CategoryManagement.vue'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView, meta: { requiresAuth: false } },
  { path: '/register', component: RegisterView, meta: { requiresAuth: false } },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true }, // Semua rute dashboard membutuhkan auth
    children: [
      { path: '', component: DashboardHome },
      { path: 'posts', component: PostManagement },
      { path: 'categories', component: CategoryManagement },
      {
        path: '/dashboard/profile',
        name: 'Profile',
        component: ProfileView
      }      
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard untuk memeriksa token
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // Jika rute membutuhkan autentikasi dan tidak ada token
  if (to.meta.requiresAuth && !token) {
    next('/login')
  } 
  // Jika sudah login tapi mencoba mengakses login/register
  else if ((to.path === '/login' || to.path === '/register') && token) {
    next('/dashboard') // Redirect ke dashboard jika sudah login
  } 
  // Jika tidak ada masalah
  else {
    next()
  }
})

export default router