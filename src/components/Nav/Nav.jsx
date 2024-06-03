import './Nav.css'
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Heading } from "@chakra-ui/react"
import { EditIcon, HamburgerIcon, MoonIcon } from "@chakra-ui/icons"
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../services/AuthContext'
import { UserAvatarIcon } from '../common/AvatarIcons/AvatarIcons'

const api = import.meta.env.VITE_FRONT_URL


export function Nav() {
  const { token, nick, logout, id, role, avatar } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
  }

  return (
    <nav className='spaced'>
      {token ? (<MenuAuth handleLogout={handleLogout} nick={nick} userId={id} role={role} avatar={avatar} />) : (<MenuNonAuth />)}
    </nav>
  )
}


function MenuAuth({ handleLogout, nick, userId, role, avatar }) {
  const DEMO_AVATAR_PATH = "assets/demo/avatar.png"
  return (
    <>
      
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<UserAvatarIcon imageUrl={api+'/'+DEMO_AVATAR_PATH} />}
          variant='ghostsm' />
        <MenuList>
          <MenuItem style={{color: 'black'}}><Link to={role === 'admin' ? '/admin/' + userId : '/user/' + userId}>Perfil</Link></MenuItem>
          <MenuItem style={{color: 'black'}} onClick={handleLogout}>Cerrar sesión</MenuItem>
        </MenuList>
      </Menu>
      <Link style={{marginRight: '1.3rem'}} id='logo' to='/'>Interia</Link>
      <Link to='/tutorials/add'><EditIcon /></Link>
    </>

  )
}

function MenuNonAuth() {
  return (
    <>
      <Link className='session-link' to='/signup'>unirse</Link>
      <Link id='logo' to='/'>Interia</Link>
      <Link className='session-link' to='/login'>iniciar<br />sesión</Link>
    </>
  )
}

