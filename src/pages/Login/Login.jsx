import './Login.css'
import { Heading } from "@chakra-ui/react"
import { LoginForm } from '../../components/common/Forms/Forms'

export function Login() {
 

  return (
    <section className="spaced total-height" id="login">
      <Heading as='h2' textAlign='center' marginTop='10'>Iniciar Sesión</Heading>
      <LoginForm />
    </section>
  )
}