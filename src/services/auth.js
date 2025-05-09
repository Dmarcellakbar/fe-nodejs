import axios from 'axios'

const API_URL = `${import.meta.env.VITE_ENDPOINT_URL_DATABASE}/api/auth`

export const register = async (email, password) => {
  const res = await axios.post(`${API_URL}/register`, { email, password })
  return res.data
}

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/login`, { email, password })
  return res.data
}
