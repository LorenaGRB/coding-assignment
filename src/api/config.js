import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    api_key: process.env.REACT_APP_API_KEY
  }
})

export default api
