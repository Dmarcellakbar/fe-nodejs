import axios from 'axios'

const API_URL = `${import.meta.env.VITE_ENDPOINT_URL_DATABASE}/api/users`

export default {
  getAll: () => axios.get(API_URL),
  create: (data) => axios.post(API_URL, data),
  update: (id, data) => axios.put(`${API_URL}/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/${id}`)
}
