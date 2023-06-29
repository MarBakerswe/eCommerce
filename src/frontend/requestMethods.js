import axios from "axios"

// Defining the base URL for the API endpoints.
const BASE_URL = "http://localhost:5000/api/"

// Defining the token to be used for authenticated requests.
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGY4MzczMmNjYTFlODNmYThhNTZhYyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NzEyNjk1MiwiZXhwIjoxNjg3Mzg2MTUyfQ.0XPS8ux8inlwSZPfnoYVFW1mfDU54sSIGRwvy1uYeHk"

// Creating an instance of axios with the base URL set. 
// This instance will be used for public requests that don't require authentication.
export const publicRequest = axios.create({
  baseURL: BASE_URL
})

// Creating an instance of axios with the base URL and token set in the headers. 
// This instance will be used for user specific requests that require authentication.
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` } // Note: This should be 'headers' not 'header'
})
