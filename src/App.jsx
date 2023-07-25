import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Nav } from './components/Nav/Nav'
import { Tutorials } from './pages/Tutorials/Tutorials'
import { Categories } from './components/Categories/Categories'
import { useEffect, useState } from 'react'
import { Login } from './pages/Login/Login'
import { AddTutorial } from './pages/Tutorials/Add/Add'
import { Signup } from './pages/Signup/Signup'
import { Dashboard } from './pages/User/Dashboard/Dashboard'
import { AdminDashboard } from './pages/Admin/AdminDashboard'
import { AddCat } from './components/Categories/AddCat/AddCat'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token')
    if(authToken){
      setLoggedIn(true)
    }
  }, [])

  return (
    <>
      <Nav />
      <Routes>
        <Route path='/' element={<Categories />} />
        <Route path='/tutorials/:categoryId' element={<Tutorials />} />
        <Route path='/login' element={<Login />} />
        <Route path='/tutorials/add' element={<AddTutorial />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user/:userId' element={<Dashboard />} />
        <Route path='/admin/:userId' element={<AdminDashboard />} />
        <Route path='/categories/add' element={<AddCat />} />
      </Routes>
    </>
  )
}

export default App
