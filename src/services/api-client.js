import axios from 'axios'

export default class ApiClient {
  constructor (store) {
    this.store = store
    this.http = axios.create({
      baseURL: 'http://onize.x/api'
    })

    this.http.interceptors.request.use(
      (config) => {
        if (config.refreshAccessToken === undefined) {
          let token = this.getAuthToken()
          if (token) {
            config.headers = {'Authorization': token}
          }
        }

        return config
      },
      (error) => {
        return error
      }
    )

    this.http.interceptors.response.use(
      (response) => {
        let token = response.headers['authorization']
        if (token) {
          this.setAuthToken(token)
        }

        return response
      },
      (error) => {
        if (error.response.status !== 401 || error.response.config.refreshAccessToken !== undefined) {
          let token = error.response.headers['authorization']
          if (token) {
            this.setAuthToken(token)
          }

          return Promise.reject(error)
        }

        return this.refreshAuthToken()
          .then(() => {
            return this.http.request(error.response.config)
          })
      }
    )
  }

  refreshAuthToken () {
    return this.http.get('/auth/refresh', {withCredentials: true, refreshAccessToken: true})
      .catch(error => {
        this.setAuthToken(null)
        return Promise.reject(error)
      })
  }

  setAuthToken (authToken) {
    this.store.commit('setAuthToken', authToken)

    return this
  }

  getAuthToken () {
    return this.store.getters.getToken
  }

  request (method, path, requestParameters, config) {
    let promise

    switch (method) {
      case 'PUT':
        promise = this.http.put(path, requestParameters, config)
        break
      case 'POST':
        promise = this.http.post(path, requestParameters, config)
        break
      case 'DELETE':
        promise = this.http.delete(path, config)
        break
      case 'PATCH':
        promise = this.http.patch(path, requestParameters, config)
        break
      case 'GET':
      default:
        promise = this.http.get(path, config)
    }

    return promise
  }

  get (path, config) {
    return this.request('GET', path, {}, config)
  }

  post (path, requestParameters, config) {
    return this.request('POST', path, requestParameters, config)
  }

  patch (path, requestParameters, config) {
    return this.request('PATCH', path, requestParameters, config)
  }

  delete (path, requestParameters, config) {
    return this.request('DELETE', path, {}, config)
  }

  login (email, password) {
    return this.post('/auth/login', {email: email, password: password, remember: true}, {withCredentials: true})
  }

  logout () {
    return this.post('/auth/logout')
  }

  authenticatedUser () {
    return this.get('/auth/user').then(response => {
      return response.data.user
    })
  }

  register (email, password, passwordConfirm) {
    return this.post('/users', {email: email, password: password, passwordConfirm: passwordConfirm})
      .then(response => {
        this.store.commit('setAuthenticatedUser', response.data.user)

        return response.data.user
      })
  }

  startPasswordReset (email, finishUrl) {
    return this.post('/password-reset', {email: email, finishUrl: finishUrl})
  }

  verifyPasswordResetToken (token) {
    return this.get('/password-reset?resetToken=' + token)
  }

  finishPasswordReset (token, password, passwordConfirm) {
    return this.patch('/password-reset', {resetToken: token, password: password, passwordConfirm: passwordConfirm})
  }

  passwordChange (currentPassword, password, passwordConfirm) {
    return this.patch('/users', {currentPassword: currentPassword, password: password, passwordConfirm: passwordConfirm})
  }

  projectsList () {
    return this.get('/projects').then(response => {
      return response.data.projects
    })
  }

  addProject (label, description) {
    return this.post('/projects', {label: label, description: description}).then(response => {
      return response.data.project
    })
  }

  deleteProject (uuid) {
    return this.delete('/projects?uuid=' + uuid)
  }
}
