import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";




export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('auth') || null)
  const [id, setId] = useState(localStorage.getItem('id') || null)
  const [nick, setNick] = useState(localStorage.getItem('nick') || null)
  const [role, setRole] = useState(localStorage.getItem('role') || null)
  const [avatar, setAvatar] = useState(localStorage.getItem('avatar') || null)

  const navigate = useNavigate()
 

  const updateAuth = (newToken, newId, newNick, newRole, newAvatar) => {
    setToken(newToken)
    setId(newId)
    setNick(newNick)
    setRole(newRole)
    setAvatar(newAvatar)

    localStorage.setItem('auth', newToken)
    localStorage.setItem('nick', newNick)
    localStorage.setItem('id', newId)
    localStorage.setItem('role', newRole)
    localStorage.setItem('avatar', newAvatar)
    navigate("/")
  }

  const refreshAvatar = (newAvatar) => {
    setAvatar(newAvatar)
    
    localStorage.setItem('avatar', newAvatar)
  }

  const logout = () => {
    setToken(null)
    setId(null)
    setNick(null)
    setRole(null)
    setAvatar(null)

    localStorage.removeItem('auth')
    localStorage.removeItem('nick')
    localStorage.removeItem('id')
    localStorage.removeItem('role')
    localStorage.removeItem('avatar')

    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ token, id, nick, role, avatar, updateAuth, logout, refreshAvatar }}>
      {children}
    </AuthContext.Provider>
  )
}