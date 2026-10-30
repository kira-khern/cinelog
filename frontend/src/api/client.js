const API_BASE = import.meta.env.VITE_API_URL || ''
const TOKEN_KEY = 'cinelog_token'

export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token)
}

export function removeItemToken() {
    localStorage.removeItem(TOKEN_KEY)
}

export async function apiRequest(path, { method = 'GET', body } = {}) {
    const headers = {'Content-Type': 'application/json'}

    const token = getToken()
    if(token){
        headers.Authorization = `Bearer ${token}`
    }

    const response = await fetch(`${API_BASE}/api${path}` , {
        method,
        headers,
        body : body ? JSON.stringify(body) : undefined

    })

    if(response.status == 204){
        return null 
    }

    if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}))
    const error = new Error(errorBody.message || `Request failed (${response.status})`)
    error.status = response.status
    throw error
  }

    return response.json()
}