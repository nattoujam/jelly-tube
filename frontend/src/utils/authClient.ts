import axios from 'axios'

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_AUTHORIZATION_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-with': 'XMLHttpRequest'
  },
  responseType: 'json'
})
