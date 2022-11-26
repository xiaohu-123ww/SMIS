// import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  localStorage.setItem(TokenKey, token)
  localStorage.setItem('TokenInvalidFlag', 0)
}

export function removeToken () {
  localStorage.removeItem(TokenKey)
}
export function getTokenInvalidFlag () {
  return localStorage.getItem('TokenInvalidFlag')
}

export function setTokenInvalidFlag (tokenInvalidFlag) {
  localStorage.setItem('TokenInvalidFlag', tokenInvalidFlag)
}

