import Login from '@/pages/Auth/Login'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Register from '@/pages/User/Register'
import PasswordResetStart from '@/pages/User/PasswordResetStart'
import SecuritySettings from '@/pages/User/SecuritySettings'
import Router from 'vue-router'
import Vue from 'vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {requiresAuth: false}
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {requiresAuth: false}
    },
    {
      path: '/password-reset/start',
      name: 'PasswordResetStart',
      component: PasswordResetStart,
      meta: {requiresAuth: false}
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      meta: {requiresAuth: true}
    },
    {
      path: '/settings/security',
      name: 'SecuritySettings',
      component: SecuritySettings,
      meta: {requiresAuth: true}
    }
  ]
})
