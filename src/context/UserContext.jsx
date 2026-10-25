
import { createContext, useEffect, useState } from 'react'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('authToken'))
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setUser(null)
        setAuthLoading(false)
        return
      }

      try {
        const response = await fetch('http://localhost:5002/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Session expired')
        }

        setUser(data.user)
      } catch {
        localStorage.removeItem('authToken')
        setToken(null)
        setUser(null)
      } finally {
        setAuthLoading(false)
      }
    }

    loadProfile()
  }, [token])

  const login = async (email, password) => {
    const response = await fetch('http://localhost:5002/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Login failed')
    }

    localStorage.setItem('authToken', data.token)
    setToken(data.token)
    setUser(data.user)

    return data
  }

  const register = async (name, email, password) => {
    const response = await fetch('http://localhost:5002/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      const validationMessages = data.errors
        ?.map((error) => error.msg)
        .join(', ')

      throw new Error(
        validationMessages || data.message || 'Registration failed'
      )
    }

    return data
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setToken(null)
    setUser(null)
  }

  return (
    <UserContext.Provider
      value={{ user, token, authLoading, login, register, logout }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext


