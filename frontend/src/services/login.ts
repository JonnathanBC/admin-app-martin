import apiClient from './apiClient'

export const generateCode = (email: string) => {
  return apiClient.post(`/auth/login/${email}/code`)
}

export const login = (email: string, code: string) => {
  return apiClient.post(
    `/auth/login/${email}`,
    { code },
    { withCredentials: true } // para setear la cookie en el navegador.
  )
}
