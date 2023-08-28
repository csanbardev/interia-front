import './Signup.css'
import { Alert, Button, Center, Heading, Input } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { AuthContext } from "../../services/AuthContext"
import { useForm } from "react-hook-form"
import { handleSignup } from "../../handlers/handleSignup"

export function Signup(){
  const {updateAuth} = useContext(AuthContext)
  const [ok, setOK] = useState(null)
  const [error, setError] = useState('')
  const {register, formState: {errors}, handleSubmit} = useForm()
 

  const onSubmit = async(data) => {
    try {
      const {token, id_user, nick} = await handleSignup(data)
      updateAuth(token, id_user, nick)
      setOK("¡Bienvenido!")
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section className="spaced" id="signup">
      <Heading as='h2' textAlign='center' marginTop='10'>Registrarse</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input size='lg' placeholder='Nick' {...register('nick', {
          required: true
        })} />
        <Input size='lg' type="password"  placeholder="Contraseña" {...register('password', {
          required: true
        })} />
        <Input size='lg' type="email" placeholder="email" {...register('email', {
          required: true
        })} />

        <Center>
          <Button variant='outline' colorScheme="teal" type="submit" marginTop='7' >Enviar</Button>
        </Center>
      </form>
      {error && <p>{error}</p>}
      {ok && 
        <Alert status="success" variant='subtle'>
          <AlertIcon />
          {ok}
        </Alert>
        }
    </section>
  )
}