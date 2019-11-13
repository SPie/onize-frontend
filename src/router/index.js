import Login from '@/pages/Auth/Login'
import Dashboard from '@/pages/Dashboard/Dashboard'
import Register from '@/pages/User/Register'
import PasswordResetStart from '@/pages/User/PasswordResetStart'
import SecuritySettings from '@/pages/User/SecuritySettings'
import PasswordResetFinish from '@/pages/User/PasswordResetFinish'
import ProjectsList from '@/pages/Project/ProjectsList'
import ProjectDetails from '@/pages/Project/ProjectDetails'
import ProjectMembers from '@/pages/Project/ProjectMembers'
import AddProject from '@/pages/Project/AddProject'
import ProjectInviteFinish from '@/pages/Project/ProjectInviteFinish'
import ProjectConfiguration from '@/pages/Project/ProjectConfiguration'
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
      path: '/password-reset/finish',
      name: 'PasswordResetFinish',
      component: PasswordResetFinish,
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
    },
    {
      path: '/projects',
      name: 'ProjectsList',
      component: ProjectsList,
      meta: {requiresAuth: true}
    },
    {
      path: '/project',
      name: 'ProjectDetails',
      component: ProjectDetails,
      meta: {
        requiresAuth: true,
        requiresProject: true
      }
    },
    {
      path: 'project/configuration',
      name: 'ProjectConfiguration',
      component: ProjectConfiguration,
      meta: {
        requiresAuth: true,
        requiresProject: true
      }
    },
    {
      path: '/project/members',
      name: 'ProjectMembers',
      component: ProjectMembers,
      meta: {
        requiresAuth: true,
        requiresProject: true
      }
    },
    {
      path: '/projects/add',
      name: 'AddProject',
      component: AddProject,
      meta: {requiresAuth: true}
    },
    {
      path: '/projects/invite',
      name: 'ProjectInviteFinish',
      component: ProjectInviteFinish,
      meta: {
        requiresAuth: true,
        requiresProject: true
      }
    }
  ]
})
