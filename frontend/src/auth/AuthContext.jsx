import { createContext, useContext, useEffect, useState } from 'react'
import { apiRequest, removeItemToken, getToken, setToken } from '../api/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (!getToken()) {
            setLoading(false)
            return
        }

        apiRequest('/users/me')
            .then(setUser)
            .catch(() => removeItemToken())
            .finally(() => setLoading(false))
    }, [])

    async function register(username, email, password) {
        await apiRequest('/auth/register', {
            method: 'POST',
            body: { username, email, password }
        })
        await login(username, password)
    }

    async function login(username, password) {
        const response = await apiRequest('/auth/login', {
            method: 'POST',
            body: { username, password }
        })
        setToken(response.accessToken)
        const currentUser = await apiRequest('/users/me')
        setUser(currentUser)
    }

    function logout() {
        removeItemToken()
        setUser(null)
    }

    const value = { user, loading, register, login, logout }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
   const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used inside an AuthProvider')
  }
  return context
}