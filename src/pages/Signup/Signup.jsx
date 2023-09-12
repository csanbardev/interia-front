import './Signup.css'
import { Alert, Button, Center, Heading, Input, useToast } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { AuthContext } from "../../services/AuthContext"
import { useForm } from "react-hook-form"
import { handleSignup } from "../../handlers/handleSignup"

export function Signup(){
  const {updateAuth} = useContext(AuthContext)
  const [ok, setOK] = useState(null)
  const [error, setError] = useState('')
  const {register, formState: {errors}, handleSubmit} = useForm()
  const toast = useToast()

  const onSubmit = async(data) => {
    try {
      const {token, id_user, nick, role, avatar} = await handleSignup(data)
      updateAuth(token, id_user, nick, role, avatar)
      setOK("¡Bienvenido!")
    } catch (error) {
      toast({
        title: 'Error al registrarse',
        description: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }

  return (
    <section className="spaced total-height" id="signup">
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
    </section>
  )
}