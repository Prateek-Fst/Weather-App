import axios from "axios"

const API_URL = "http://localhost:3001"

export const getWeather = async (city) => {
  console.log(`Callling api:  ${API_URL}/weather?city=${city}`)
  const response = await axios.get(`${API_URL}/weather?city=${city}`, { withCredentials: true })
  return response.data
}

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, { withCredentials: true })
  return response.data
}

export const toggleUserStatus = async (userId) => {
  const response = await axios.put(`${API_URL}/users/${userId}/toggle`, {}, { withCredentials: true })
  return response.data
}

