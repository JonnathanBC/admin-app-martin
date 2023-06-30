import apiClient from './apiClient'

export const getSales = () => {
  apiClient.get('/sales', { withCredentials: true })
}

export const createSale = () => {
  apiClient.post('/sales', {
    operationDate: new Date(),
    totalAmount: 2500
  }, { withCredentials: true }) // para que viaje la cookie
}
