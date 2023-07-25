import './Nav.css'
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react"
import { HamburgerIcon, MoonIcon } from "@chakra-ui/icons"
import { Link } from 'react-router-dom'
import { Login } from '../../pages/Login/Login'
import { useContext } from 'react'
import { AuthContext } from '../../services/AuthContext'


export function Nav() {
  const { token, nick, logout, id, role } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
  }

  return (
    <nav>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant='ghostsm' />
        <MenuList>
          {token ? (<MenuAuth handleLogout={handleLogout} nick={nick} userId={id} role={role} />):(<MenuNonAuth />)}

        </MenuList>
      </Menu>
      <Link to='/'><MoonIcon id='logo' /> </Link>
    </nav>
  )
}


function MenuAuth({handleLogout, nick, userId, role}) {
  return (
    <>
     
      <MenuItem><Link to={role==='admin' ? '/admin/'+userId:'/user/'+userId}>{nick}</Link></MenuItem>
      <MenuItem><Link to='/tutorials/add'>Proponer</Link></MenuItem>
      <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
    </>
  )
}
function MenuNonAuth() {
  return (
    <>
      <MenuItem><Link to='/login'>Iniciar sesión</Link></MenuItem>
      <MenuItem><Link to='/signup'>Registrarse</Link></MenuItem>
    </>
  )
}

