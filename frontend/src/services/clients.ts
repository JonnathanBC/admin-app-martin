import apiClient from './apiClient'

export const createClient = (data: any) => {
  return apiClient.post('/clients', data, { withCredentials: true })
}
