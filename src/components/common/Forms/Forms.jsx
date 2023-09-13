import { useContext, useState } from 'react'
import { Input, InputGroup, InputLeftElement, Select, Button, Center, Text, Alert, AlertIcon, useToast } from "@chakra-ui/react"
import { LinkIcon } from "@chakra-ui/icons"
import { Link } from 'react-router-dom'
import './Forms.css'
import { AuthContext } from '../../../services/AuthContext'
import { useForm } from 'react-hook-form'
import { postReq } from '../../../services/http'
import { resetForm } from '../../../utils/formUtils'
import { useFetch } from '../../../hooks/useFetch'
import { handleLogin } from '../../../handlers/handleLogin'

const api = import.meta.env.VITE_API_URL


export function AddTutoForm() {
  const { token } = useContext(AuthContext)
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const toast = useToast()

  const { data, loading, error } = useFetch(api + '/categories')


  const onSubmit = async (data) => {
    try {
      const res = await postReq(`${api}/tutorials`, data, token)
      resetForm(reset, setError)
      toast({
        title: 'Tutorial propuesto con éxito',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      let errorMessage = ""

      if (error.message.includes('500')) {
        errorMessage = "Algo ha ido muy mal"
      } else if (error.message.includes('401')) {
        errorMessage = "El enlace no es válido o no existe"
      }
      toast({
        title: 'Ha habido un error',
        description: errorMessage,
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <LinkIcon color='gray.300' />
        </InputLeftElement>
        <Input size='lg' variant='outline' type="url" placeholder="YouTube url" {...register('url', { required: true })} />
      </InputGroup>
      {errors.url?.type === 'required' && <Text fontSize='sm' margin={2} color='red'>Inserta una url de YouTube</Text>}

      <Select size='lg' placeholder='Elige categoría' {...register('id_category')} required>
        {data?.map((item) => (
          <option value={item.id_category} key={item.id_category}>{item.name}</option>
        ))}
      </Select>

      <Text mt='5' textAlign='center'>¿Falta una categoría? <Link to='/categories/add'>Sugerir</Link></Text>
      <Center>
        <Button variant='outline' colorScheme="teal" type="submit" marginTop='7' >Enviar</Button>
      </Center>
    </form>
  )
}


export function LoginForm() {
  const { token, updateAuth } = useContext(AuthContext)
  const { register, formState: { errors }, handleSubmit } = useForm()
  const toast = useToast()

  const onSubmit = async (data) => {
    try {
      const { token, id_user, nick, role, avatar } = await handleLogin(data)
      updateAuth(token, id_user, nick, role, avatar)

    } catch (error) {
      toast({
        title: 'Nick o contraseña incorrecta',
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }

  return (
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
  )
}

export function SignupForm() {
  const { updateAuth } = useContext(AuthContext)
  const { register, formState: { errors }, handleSubmit } = useForm()
  const toast = useToast()

  const onSubmit = async (data) => {
    try {
      const { token, id_user, nick, role, avatar } = await handleSignup(data)
      updateAuth(token, id_user, nick, role, avatar)
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input size='lg' placeholder='Nick' {...register('nick', {
        required: true
      })} />
      <Input size='lg' type="password" placeholder="Contraseña" {...register('password', {
        required: true
      })} />
      <Input size='lg' type="email" placeholder="email" {...register('email', {
        required: true
      })} />

      <Center>
        <Button variant='outline' colorScheme="teal" type="submit" marginTop='7' >Enviar</Button>
      </Center>
    </form>
  )
}

export function AddCatForm() {
  const { token } = useContext(AuthContext)
  const [error, setError] = useState(null)
  const { register, formState: { errors }, handleSubmit, reset } = useForm()
  const toast = useToast()


  const onSubmit = async (data) => {
    try {
      const res = await postReq(`${api}/categories`, data, token)
      resetForm(reset, setError)
      toast({
        title: 'Categoría propuesta con éxito',
        status: 'success',
        duration: 2000,
        isClosable: true
      })
    } catch (error) {
      toast({
        title: 'Ha habido un error',
        description: error.message,
        status: 'error',
        duration: 2000,
        isClosable: true
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input size='lg' {...register('name', { required: true })} placeholder="Nombre de la categoría" />
      <Center>
        <Button variant='outline' colorScheme="teal" type="submit" marginTop='7'>Enviar</Button>
      </Center>
    </form>
  )
}