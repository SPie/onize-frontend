import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: {
      token: null,
      user: null
    },
    snackbar: {
      visible: false,
      text: '',
      color: ''
    },
    projectUuid: null
  },
  getters: {
    getToken: (state) => {
      return state.auth.token
    },
    getAuthenticatedUser: (state) => {
      return state.auth.user
    },
    getSnackbar: (state) => {
      return state.snackbar
    },
    getProjectUuid: (state) => {
      return state.projectUuid
    }
  },
  mutations: {
    setAuthToken (state, token) {
      window.localStorage.setItem('authToken', token)
      state.auth.token = token

      if (token === null) {
        state.auth.user = null
      }
    },
    setAuthenticatedUser (state, user) {
      state.auth.user = user
    },
    showSnackbar (state, payload) {
      state.snackbar.text = payload.text
      state.snackbar.color = payload.color
      state.snackbar.visible = true
    },
    closeSnackbar (state) {
      state.snackbar.visible = false
      state.snackbar.text = ''
    },
    setSnackbarVisible (state, visible) {
      state.snackbar.visible = visible
    },
    setProjectUuid (state, projectUuid) {
      window.localStorage.setItem('projectUuid', projectUuid)
      state.projectUuid = projectUuid
    }
  }
})
