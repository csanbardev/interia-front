import './Signup.css'
import { Heading} from "@chakra-ui/react"
import { SignupForm } from '../../components/common/Forms/Forms'

export function Signup() {

  return (
    <section className="spaced total-height" id="signup">
      <Heading as='h2' textAlign='center' marginTop='10'>Registrarse</Heading>
      <SignupForm />
    </section>
  )
}