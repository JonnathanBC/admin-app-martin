import apiClient from './apiClient'

export const getAllClients = async () => {
  const res = await apiClient.get('/clients', { withCredentials: true })
  return res.data.data
}

export const createClient = (data: any) => {
  return apiClient.post('/clients', data, { withCredentials: true })
}

export const getClientById = (clientId: string) => {
  return apiClient.get(`/clients/${clientId}`, { withCredentials: true })
}
