import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem('hustleHapaUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Mock authentication - in real app, this would be an API call
    const mockUsers = {
      'user@example.com': { id: 1, email: 'user@example.com', name: 'John Doe', role: 'user', rating: 4.5 },
      'employer@example.com': { id: 2, email: 'employer@example.com', name: 'Jane Smith', role: 'employer' }
    }

    if (mockUsers[email] && password === 'password123') {
      const loggedInUser = mockUsers[email]
      setUser(loggedInUser)
      localStorage.setItem('hustleHapaUser', JSON.stringify(loggedInUser))
      return { success: true, user: loggedInUser }
    }
    return { success: false, error: 'Invalid email or password' }
  }

  const signup = (userData) => {
    // Mock signup - in real app, this would be an API call
    const newUser = {
      id: Date.now(),
      email: userData.email,
      name: userData.name,
      role: userData.role || 'user',
      rating: userData.role === 'user' ? 0 : undefined
    }
    setUser(newUser)
    localStorage.setItem('hustleHapaUser', JSON.stringify(newUser))
    return { success: true, user: newUser }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('hustleHapaUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
