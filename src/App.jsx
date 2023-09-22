import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
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
import { Error404 } from './components/error-pages/Error404/Error404'
import { Footer } from './components/Footer/Footer'
import { UpButton } from './components/common/UpButton/UpButton'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token')
    if (authToken) {
      setLoggedIn(true)
    }
  }, [])

  return (
    <>
      <Nav />
      <Routes>
        <Route path='*' element={<Navigate to='/404' />} />
        <Route path='/' element={<Categories />} />
        <Route path='/tutorials/:categoryId' element={<Tutorials />} />
        <Route path='/login' element={<Login />} />
        <Route path='/tutorials/add' element={loggedIn ? <AddTutorial /> : <Navigate to='/login' />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/user/:userId' element={loggedIn ? <Dashboard /> : <Navigate to='/login' />} />
        <Route path='/admin/:userId' element={loggedIn ? <AdminDashboard /> : <Navigate to='/login' />} />
        <Route path='/categories/add' element={loggedIn ? <AddCat /> : <Navigate to='/login' />} />
        <Route path='/404' element={<Error404 />} />
      </Routes>
      <UpButton />
      <Footer />
    </>
  )
}

export default App
