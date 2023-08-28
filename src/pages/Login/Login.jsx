import './Login.css'
import { useContext, useState } from "react"
import { AuthContext } from "../../services/AuthContext"
import { useForm } from "react-hook-form"
import { Button, Center, FormErrorMessage, Heading, Input, Spacer, Text } from "@chakra-ui/react"
import { handleLogin } from "../../handlers/handleLogin"
import { ErrorMessage } from "../../components/common/Errors/Errors"

export function Login() {
  const { token, updateAuth } = useContext(AuthContext)
  const [error, setError] = useState('')
  const { register, formState: { errors }, handleSubmit } = useForm()


  const onSubmit = async (data) => {
    try {
      const {token, id_user, nick, role, avatar} = await handleLogin(data)
      updateAuth(token, id_user, nick, role, avatar)

    } catch (error) {
      if(error.message === '401'){
        setError("Nick o contraseña incorrecta")
      }
    }
  }

  return (
    <section className="spaced" id="login">
      <Heading as='h2' textAlign='center' marginTop='10'>Iniciar Sesión</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input size='lg' placeholder="Nick" {...register('nick', {
          required: true
        })} />
        {errors.nick?.type === 'required' && <Text fontSize='sm' margin={2} color='red'>El nick es obligatorio.</Text>}

        <Input size='lg' type="password" placeholder="Contraseña" {...register('password', {
          required: true
        })} />
        {errors.password?.type === 'required' && <Text fontSize='sm' margin={2} color='red'>La contraseña es obligatoria.</Text>}
        <Center>
          <Button variant='outline' colorScheme="teal" type="submit" marginTop='7' >Enviar</Button>
        </Center>
      </form>
      {error && <ErrorMessage message={error} />}
    </section>
  )
}