import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";




export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('auth') || null)
  const [id, setId] = useState(localStorage.getItem('id') || null)
  const [nick, setNick] = useState(localStorage.getItem('nick') || null)
  const [role, setRole] = useState(localStorage.getItem('role') || null)

  const navigate = useNavigate()
 

  const updateAuth = (newToken, newId, newNick, newRole) => {
    setToken(newToken)
    setId(newId)
    setNick(newNick)
    setRole(newRole)

    localStorage.setItem('auth', newToken)
    localStorage.setItem('nick', newNick)
    localStorage.setItem('id', newId)
    localStorage.setItem('role', newRole)
    navigate("/")


  }

  const logout = () => {
    setToken(null)
    setId(null)
    setNick(null)
    setRole(null)

    localStorage.removeItem('auth')
    localStorage.removeItem('nick')
    localStorage.removeItem('id')
    localStorage.removeItem('role')

    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ token, id, nick, role, updateAuth, logout }}>
      {children}
    </AuthContext.Provider>
  )
}