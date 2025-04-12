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
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/dashboard',
    component: DashboardLayout,
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

export default createRouter({
  history: createWebHistory(),
  routes
})
