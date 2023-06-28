import axios from 'axios'
import qs from 'qs'
import { env } from '~/env.mjs'

export const API_URL = env.NEXT_PUBLIC_BACKEND_BASE_URL

console.log('API_URL', API_URL)

const apiClient = axios.create({
  baseURL: API_URL
  // timeout: 1000,
  // headers: { 'accept': 'application/json' }
})

apiClient.interceptors.request.use(async request => {
  const accessToken = localStorage.getItem('token')

  request.headers = request.headers || {}
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
    // request.headers.AccessToken = accessToken
  }

  if (process.env.NODE_ENV === 'development' && document.cookie.includes('XDEBUG_SESSION=PHPSTORM')) {
    request.params = request.params || {}
    request.params.XDEBUG_SESSION_START = 'PHPSTORM'
    request.params.XDEBUG_TRIGGER = true
  }

  if (request.method === 'patch' && !request.headers?.['Content-Type']) {
    request.headers['Content-Type'] = 'application/merge-patch+json'
  }

  return request
})

apiClient.interceptors.request.use(config => {
  config.paramsSerializer = (params2: any) =>
    qs.stringify(params2, {
      arrayFormat: 'brackets',
      encode: false,
      skipNulls: true
    })
  return config
})

apiClient.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return await Promise.reject(error)
  })

export default apiClient
