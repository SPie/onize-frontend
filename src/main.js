// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import ApiClient from './services/api-client'
import router from './router'
import store from './store'
import VueI18n from 'vue-i18n'
import translations from './i18n'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

let apiClient = new ApiClient(store)

// check local storage and fill app storage
if (window.localStorage) {
  let token = window.localStorage.getItem('authToken')
  if (token) {
    store.commit('setAuthToken', token)
  }

  let projectUuid = window.localStorage.getItem('projectUuid')
  if (projectUuid) {
    store.commit('setProjectUuid', projectUuid)
  }
}

// rout guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.getToken) {
    next({name: 'login'})
  }

  if (to.meta.requiresProject && !store.getters.getProjectUuid) {
    next({name: 'ProjectsList'})
  }

  apiClient.authenticatedUser()
    .then(user => {
      store.commit('setAuthenticatedUser', user)
    })
    .catch(error => {
      if (error.response.status === 401) {
        next({
          path: '/login'
        })
      }
    })

  if ((to.name === 'Login' || to.name === 'Register' || to.name === 'PasswordResetStart') && store.getters.getToken) {
    next({
      path: '/'
    })
  }

  next()
})

// localization
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: translations
})

Vue.use(Vuetify)

Vue.prototype.$apiClient = apiClient

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
