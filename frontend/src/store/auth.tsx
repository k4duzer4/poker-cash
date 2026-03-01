import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

type User = {
  email: string
}

type AuthContextData = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  signIn: (payload: { token: string; email: string }) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextData | null>(null)

const TOKEN_KEY = 'token'
const EMAIL_KEY = 'userEmail'

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY))
  const [user, setUser] = useState<User | null>(() => {
    const email = localStorage.getItem(EMAIL_KEY)
    return email ? { email } : null
  })

  const signIn = ({ token: nextToken, email }: { token: string; email: string }) => {
    localStorage.setItem(TOKEN_KEY, nextToken)
    localStorage.setItem(EMAIL_KEY, email)
    setToken(nextToken)
    setUser({ email })
  }

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(EMAIL_KEY)
    setToken(null)
    setUser(null)
  }

  const value = useMemo<AuthContextData>(() => {
    return {
      user,
      token,
      isAuthenticated: Boolean(token),
      signIn,
      signOut,
    }
  }, [token, user])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.')
  }

  return context
}
