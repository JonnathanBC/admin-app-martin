import apiClient from './apiClient'

export const getSales = () => {
  apiClient.get('/sales', {
    withCredentials: true
  })
}

export const createSale = () => {
  apiClient.post('/sales', {
    operationDate: new Date(),
    totalAmount: 2000
  }, { withCredentials: true })
}
