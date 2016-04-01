import { isObject } from 'lodash'
import cookie from 'cookie'
import config from '../config'
import { get, put, post } from '../utils/cruder'
import { isBrowser } from '../utils/env'
import { OAuth } from 'oauthio-web' // window/document undefined error

let token
let currentUser

export const createHeaders = _ => {
  let header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  if (isBrowser()) return header
  header.Authorization = `Bearer ${token}`
  return header
}

const setToken = nextToken => {
  if (isBrowser()) document.cookie = cookie.serialize('token', nextToken)
  token = nextToken
}

const removeToken = _ => {
  if (isBrowser()) document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  token = null
}

export const getCurrentUser = _ => {
  if (isBrowser()) currentUser = window.sessionStorage.getItem('currentUser')
  return JSON.parse(currentUser)
}

const setCurrentUser = nextCurrentUser => {
  if (isBrowser()) window.sessionStorage.setItem('currentUser', JSON.stringify(nextCurrentUser))
  currentUser = nextCurrentUser
}

const removeCurrentUser = _ => {
  if (isBrowser()) window.sessionStorage.removeItem('currentUser')
  currentUser = null
}

export const login = (username, password) => {
  if (!username) return Promise.reject({ message: 'Username or Email is required to login ' })
  if (isObject(username) && username.password) {
    password = username.password
    username = username.username
  }
  if (isObject(username) && username.provider) return authWithProvider(username)
  return put(`${config.tessellateRoot}/login`)({ username, password })
    .then(response => {
      const { token, user } = response
      if (token) setToken(token)
      if (user) setCurrentUser(user)
      return response
    })
}

export const logout = _ =>
  put(`${config.tessellateRoot}/logout`)()
    .then(response => {
      removeToken()
      removeCurrentUser()
      return response
    })

export const signup = userInfo =>
  post(`${config.tessellateRoot}/signup`)(userInfo)
    .then(response => {
      const { token, user } = response
      if (token) setToken(token)
      if (user) setCurrentUser(user)
      return response
    })

const handleOAuthPopup = (provider, params) =>
  OAuth
  .popup(provider, { state: params.token })
  .done(result => Promise.resolve(result))
  .fail(error => Promise.reject(error))
/**
* @description Authenticate using a token generated from the server (so server and client are both aware of auth state)
*/
export const authWithProvider = provider =>
  get(`${config.tessellateRoot}/stateToken`)()
    .then(params => {
      if (!config.oauthioKey) return Promise.reject({ message: 'OAuthio key is required ' })
      OAuth.initialize(config.oauthioKey)
      return handleOAuthPopup(provider, params).then(result =>
        post(`${config.tessellateRoot}/auth`)({
          provider,
          code: result.code,
          stateToken: params.token
        }).then(response => {
          const { token, user } = response
          if (token) setToken(token)
          if (user) setCurrentUser(user)
          return response
        })
      )
    }).catch(error => Promise.reject(error))

export default {
  get currentUser () {
    if (isBrowser()) currentUser = window.sessionStorage.getItem('currentUser')
    return JSON.parse(currentUser)
  },
  getCurrentUser,
  authWithProvider,
  login,
  logout,
  signup
}
