import axios, { type AxiosInstance } from 'axios'

const http: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  },
  baseURL: '/'
})

export { http }
