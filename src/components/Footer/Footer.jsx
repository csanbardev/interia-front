import { Heading, Text } from '@chakra-ui/react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { Icon } from '@chakra-ui/icons'
import { GrLinkedin, GrTwitter, GrGithub } from 'react-icons/gr'
import { useContext } from 'react'
import { AuthContext } from '../../services/AuthContext'

export function Footer() {

  const { token, role, id } = useContext(AuthContext)

  return (
    <section className='spaced' id="footer">
      <article className='footer-up' >
        <div>
          <Heading>Interia</Heading>
          <Text>Un mundo por aprender</Text>
        </div>
        <nav>
          <ul>
            <li><Link to='/' >Inicio</Link></li>
            {token ? (<FooterAuth role={role} userId={id}  />) : (<FooterNonAuth />)}
            <li><Link to='/contact' >Contacto</Link></li>
          </ul>
        </nav>
      </article>
      <article className='footer-down' >
        <Text>Desarrollado por <span>Cristian Sánchez</span> - {new Date().getFullYear()}</Text>
        <div id="media-icon-group">
          <Link to='https://www.linkedin.com/in/cristian-sanchez-barba/' ><Icon as={GrLinkedin} /></Link>
          <Link to='https://twitter.com/CristianSBDev' ><Icon as={GrTwitter} /></Link>
          <Link to='https://github.com/csanbardev' ><Icon as={GrGithub} /></Link>
        </div>
      </article>
    </section>
  )
}

function FooterAuth({ role, userId }) {
  return (
    <li><Link to={role === 'admin' ? '/admin/' + userId : '/user/' + userId}>Perfil</Link></li>
  )
}

function FooterNonAuth() {
  return (
    <>
      <li>
        <Link to='/signup'>Unirse</Link>
      </li>
      <li>
        <Link to='/login'>Iniciar sesión</Link>
      </li>
    </>
  )
}